import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';
import { createLinePathForCurve } from '../utils/LinePathGenerator';

const CareerTreePage = () => {
  const navigate = useNavigate();
  const { careerTree } = mockData;
  const [centerSections, setCenterSections] = useState(careerTree.centerSections);
  const [checkedCourse, setCheckedCourse] = useState(null);
  const [checkedCourseItem, setCheckedCourseItem] = useState(null);
  const [resumeResources, setResumeResources] = useState([]);
  const [projectResources, setProjectResources] = useState([]);
  const [canvas, setCanvas] = useState({
    width: 1650,
    height: 800,
    lines: []
  });
  const [isTallScreen, setIsTallScreen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('option1');

  const myCanvasRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  // Mock菜单数据
  const menuOptions = [
    { id: 'option1', label: '垂直方向一' },
    { id: 'option2', label: '垂直方向二' },
    { id: 'option3', label: '垂直方向三' },
    { id: 'option4', label: '垂直方向四' },
    { id: 'option5', label: '垂直方向五' }
  ];
  
  console.log('CareerTreePage rendering with data:', careerTree.title);

  useEffect(() => {
    // 初始化数据
    initData();
    checkScreenHeight();
    
    const handleResize = () => {
      checkScreenHeight();
      updateCanvas();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    updateCanvas();
  }, [checkedCourse, checkedCourseItem, resumeResources, projectResources]);

  const initData = () => {
    if (centerSections.length > 0) {
      // 默认选中第一个课程类别
      const firstSection = centerSections[0];
      setCheckedCourse(firstSection);
      if (firstSection.child && firstSection.child.length > 0) {
        const firstChild = firstSection.child[0];
        setCheckedCourseItem(firstChild);
        
        // 设置简历资源（左栏）
        if (firstChild.resume_resources) {
          const resumes = firstChild.resume_resources.split('\n').map((item, index) => ({
            id: index + 1,
            name: item.trim(),
            type: 'resume'
          }));
          setResumeResources(resumes);
        }
        
        // 设置项目资源（右栏）
        if (firstChild.portfolio_resources) {
          const projects = firstChild.portfolio_resources.split('\n').map((item, index) => ({
            id: index + 1,
            name: item.trim(),
            type: 'project'
          }));
          setProjectResources(projects);
        }
      }
    }
  };

  const checkScreenHeight = () => {
    setIsTallScreen(window.innerHeight > 1080);
  };

  const toggleCourse = (courseObj) => {
    setCenterSections(sections => 
      sections.map(section => 
        section.id === courseObj.id 
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
    
    if (courseObj.title !== checkedCourse?.title) {
      updateCanvas();
      return;
    }
    
    if (!courseObj.expanded) {
      setResumeResources([]);
      setProjectResources([]);
      setCanvas(prev => ({ ...prev, lines: [] }));
    }
  };

  const checkCourse = (courseObj, itemName) => {
    setCheckedCourse(courseObj);
    setCheckedCourseItem(itemName);
    console.log('Selected course:', courseObj, itemName);
    
    // 设置简历资源（左栏）
    if (itemName.resume_resources) {
      const resumes = itemName.resume_resources.split('\n').map((item, index) => ({
        id: index + 1,
        name: item.trim(),
        type: 'resume'
      }));
      setResumeResources(resumes);
    } else {
      setResumeResources([]);
    }
    
    // 设置项目资源（右栏）
    if (itemName.portfolio_resources) {
      const projects = itemName.portfolio_resources.split('\n').map((item, index) => ({
        id: index + 1,
        name: item.trim(),
        type: 'project'
      }));
      setProjectResources(projects);
    } else {
      setProjectResources([]);
    }
    
    // 延迟更新画布以等待DOM更新
    setTimeout(() => {
      updateCanvas();
      adjustPanelPositions();
    }, 100);
  };

  const adjustPanelPositions = () => {
    const centerEl = document.querySelector('.checked-course-item[data-itype="center-item"]');
    if (!centerEl || !myCanvasRef.current) return;

    const containerEl = myCanvasRef.current.parentElement;
    const containerRect = containerEl.getBoundingClientRect();
    const elementRect = centerEl.getBoundingClientRect();
    const centerY = elementRect.top - containerRect.top + elementRect.height / 2;

    // 调整左右面板位置
    if (leftPanelRef.current) {
      const leftPanelHeight = leftPanelRef.current.offsetHeight;
      leftPanelRef.current.style.top = `${Math.max(0, centerY - leftPanelHeight / 2)}px`;
    }

    if (rightPanelRef.current) {
      const rightPanelHeight = rightPanelRef.current.offsetHeight;
      rightPanelRef.current.style.top = `${Math.max(0, centerY - rightPanelHeight / 2)}px`;
    }
  };



  const updateCanvas = () => {
    setTimeout(() => {
      updateCanvasNow();
    }, 50);
  };

  const updateCanvasNow = () => {
    const centerEl = document.querySelector('.checked-course-item[data-itype="center-item"]');
    if (!centerEl || !myCanvasRef.current) return;

    const containerEl = myCanvasRef.current.parentElement;
    const containerRect = containerEl.getBoundingClientRect();
    
    // 更新画布尺寸
    setCanvas(prev => ({
      ...prev,
      width: containerRect.width,
      height: containerRect.height
    }));

    // 获取中心元素的连接点
    const centerRect = centerEl.getBoundingClientRect();
    const centerX = {
      left: centerRect.left - containerRect.left,
      right: centerRect.right - containerRect.left,
    };
    const centerY = centerRect.top - containerRect.top + centerRect.height / 2;
    const lines = [];

    // 处理左侧连接线
    document.querySelectorAll('[data-itype="left-item"]').forEach((item) => {
      const rect = item.getBoundingClientRect();
      const x = rect.right - containerRect.left;
      const y = rect.top - containerRect.top + rect.height / 2;
      lines.push({
        id: `left-${lines.length}`,
        pathData: createLinePathForCurve(x, y, centerX.left, centerY),
      });
    });

    // 处理右侧连接线
    document.querySelectorAll('[data-itype="right-item"]').forEach((item) => {
      const rect = item.getBoundingClientRect();
      const x = rect.left - containerRect.left;
      const y = rect.top - containerRect.top + rect.height / 2;
      lines.push({
        id: `right-${lines.length}`,
        pathData: createLinePathForCurve(x, y, centerX.right, centerY, true),
      });
    });

    setCanvas(prev => ({ ...prev, lines }));
  };

  // 处理简历资源点击
  const handleResumeClick = (resume) => {
    console.log('点击简历资源:', resume);
    // 跳转到简历和面试页面
    navigate('/resume-interview');
  };

  // 处理项目资源点击
  const handleProjectClick = (project) => {
    console.log('点击项目资源:', project);
    // 跳转到项目库页面
    navigate('/project-library');
  };

  // 处理菜单选择
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem.id);
    console.log('选择菜单项:', menuItem);
    // 这里可以添加切换内容的逻辑，但目前只需要UI交互
  };



  return (
    <div className={`career-tree-page ${isTallScreen ? 'tall-screen' : ''}`}>
      <div className="top-content-wrapper">
        <div className="top-content">
          <div className="relative canvas-container">
            <div className="tree-layout">
              {/* 菜单栏 */}
              <div className="menu-column">
                <div className="menu-panel">
                  <div className="menu-header">
                    <h3>复合技能培养</h3>
                  </div>
                  {menuOptions.map((menuItem) => (
                    <div
                      key={menuItem.id}
                      className={`menu-item ${selectedMenuItem === menuItem.id ? 'selected' : ''}`}
                      onClick={() => handleMenuItemClick(menuItem)}
                    >
                      {menuItem.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* 左栏 - 简历资源 */}
              <div className="left-column">
                {resumeResources.length > 0 && (
                  <div
                    ref={leftPanelRef}
                    className="left-panel"
                  >
                    <div className="panel-header">
                      <h3>简历资源</h3>
                    </div>
                    {resumeResources.map((resume, index) => (
                      <div
                        key={`resume-${resume.id}-${index}`}
                        data-itype="left-item"
                        className="left-item"
                      >
                        <div 
                          className="panel-item clickable"
                          onClick={() => handleResumeClick(resume)}
                        >
                          <div className="resource-info">
                            <svg className="resource-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="none"/>
                              <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                            <span className="resource-name">{resume.name}</span>
                          </div>
                          <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none"/>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 中栏 - 课程分类 */}
              <div className="center-column">
                <div className="center-panel">
                  {centerSections.map((section, index) => (
                    <div key={index} className="center-section">
                      <div
                        className={`section-header ${
                          checkedCourse && section.title === checkedCourse.title ? 'checked-course' : 'course'
                        }`}
                      >
                        <div className="section-title-area">
                          <div className="section-icon">
                            {section.title === '产业认知课' && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.92243 2.68367C3.18736 2.49622 3.52678 2.449 3.83282 2.55702L12 5.43955L20.1672 2.55702C20.4732 2.449 20.8126 2.49622 21.0776 2.68367C21.3425 2.87111 21.5 3.17547 21.5 3.50001V17.5C21.5 17.924 21.2326 18.3019 20.8328 18.443L12.3328 21.443C12.1175 21.519 11.8825 21.519 11.6672 21.443L3.16718 18.443C2.76737 18.3019 2.5 17.924 2.5 17.5V3.50001C2.5 3.17547 2.65749 2.87111 2.92243 2.68367Z" fill="currentColor"/>
                              </svg>
                            )}
                            {section.title === '产业技能课' && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.5 6.5C2.5 4.29086 4.29086 2.5 6.5 2.5C8.70914 2.5 10.5 4.29086 10.5 6.5V8.5H13.5V6.5C13.5 4.29086 15.2909 2.5 17.5 2.5C19.7091 2.5 21.5 4.29086 21.5 6.5C21.5 8.70914 19.7091 10.5 17.5 10.5H15.5V13.5H17.5C19.7091 13.5 21.5 15.2909 21.5 17.5C21.5 19.7091 19.7091 21.5 17.5 21.5C15.2909 21.5 13.5 19.7091 13.5 17.5V15.5H10.5V17.5C10.5 19.7091 8.70914 21.5 6.5 21.5C4.29086 21.5 2.5 19.7091 2.5 17.5C2.5 15.2909 4.29086 13.5 6.5 13.5H8.5V10.5H6.5C4.29086 10.5 2.5 8.70914 2.5 6.5Z" fill="currentColor"/>
                              </svg>
                            )}
                            {section.title !== '产业认知课' && section.title !== '产业技能课' && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.5 4C3.5 2.89543 4.39543 2 5.5 2H16.4142L20.5 6.08579V20C20.5 21.1046 19.6046 22 18.5 22H5.5C4.39543 22 3.5 21.1046 3.5 20V4Z" fill="currentColor"/>
                              </svg>
                            )}
                          </div>
                          <span className="section-title">{section.title}</span>
                        </div>
                        <svg
                          className={`expand-icon ${section.expanded ? 'expanded' : ''}`}
                          width="25"
                          height="25"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCourse(section);
                          }}
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      
                      {section.expanded && (
                        <div className="section-content">
                          {section.child
                            .sort((a, b) => a.unit_id - b.unit_id)
                            .map((item, itemIndex) => (
                            <div
                              key={`${item.unit_id}-${itemIndex}`}
                              data-itype="center-item"
                              data-unit-id={item.unit_id}
                              className={`center-item ${
                                checkedCourseItem === item && checkedCourse && section.title === checkedCourse.title
                                  ? 'checked-course-item'
                                  : ''
                              }`}
                              onClick={() => checkCourse(section, item)}
                            >
                              <div className="item-content">
                                {item.unit_name}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 右栏 - 项目资源 */}
              <div className="right-column">
                {projectResources.length > 0 && (
                  <div
                    ref={rightPanelRef}
                    className="right-panel"
                  >
                    <div className="panel-header">
                      <h3>项目资源</h3>
                    </div>
                    {projectResources.map((project, index) => (
                      <div
                        key={`project-${project.id}-${index}`}
                        data-itype="right-item"
                        className="right-item"
                      >
                        <div 
                          className="panel-item clickable"
                          onClick={() => handleProjectClick(project)}
                        >
                          <div className="resource-info">
                            <svg className="resource-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
                              <path d="m2 17 10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
                              <path d="m2 12 10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                            <span className="resource-name">{project.name}</span>
                          </div>
                          <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none"/>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SVG 连接线 */}
            <svg
              ref={myCanvasRef}
              className="connection-canvas"
              viewBox={`0 0 ${canvas.width} ${canvas.height}`}
              style={{ width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
              fill="none"
            >
              {canvas.lines.map((line) => (
                <g key={line.id}>
                  <path d={line.pathData} className="connection-line" />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerTreePage; 