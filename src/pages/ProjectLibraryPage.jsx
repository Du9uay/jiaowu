import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';

const ProjectLibraryPage = () => {
  const { projectLibrary } = mockData;
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  console.log('ProjectLibraryPage 渲染，项目数据:', projectLibrary.title, '项目总数:', projectLibrary.projects.length);

  const handleProjectClick = (project) => {
    console.log('项目卡片被点击:', project.title, '项目ID:', project.id);
    console.log('准备跳转到项目详情页面，路径:', `/project/${project.id}`);
    navigate(`/project/${project.id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log('搜索词变更:', e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('搜索提交:', searchTerm);
  };

  const filteredProjects = projectLibrary.projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  console.log('过滤后的项目数量:', filteredProjects.length);

  return (
    <div className="project-library-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">{projectLibrary.title}</h1>
      </div>

      {/* 简化搜索栏 */}
      <div className="search-section">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder={projectLibrary.searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">搜索</button>
        </form>
      </div>

      {/* 简化项目网格 */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => handleProjectClick(project)}
          >
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <div className="project-tags">
                {project.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="project-action">
              <button 
                className="detail-button"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('项目详情按钮被点击:', project.title);
                  handleProjectClick(project);
                }}
              >
                项目详情
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredProjects.length === 0 && (
        <div className="empty-state">
          <p className="empty-text">没有找到匹配的项目</p>
          <p className="empty-subtext">尝试修改搜索关键词或浏览所有项目</p>
        </div>
      )}
    </div>
  );
};

export default ProjectLibraryPage; 