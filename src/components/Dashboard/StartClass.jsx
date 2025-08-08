import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../../data/mockData';

const StartClass = () => {
  const { courses, todos, milestones, learningStages } = mockData;
  const navigate = useNavigate();

  console.log('StartClass组件渲染完成');

  // 获取当前时间用于筛选
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  // 解析课程时间字符串为Date对象
  const parseTimeString = (timeStr) => {
    const timeMap = {
      '昨天': yesterday,
      '今天': today,
      '明天': tomorrow,
      '后天': new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
      '前天': new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)
    };
    
    for (const [key, date] of Object.entries(timeMap)) {
      if (timeStr.includes(key)) {
        return date;
      }
    }
    return null;
  };

  // 筛选最近课程（昨天和今天的课程）
  const getRecentCourses = () => {
    return courses.filter(course => {
      const courseDate = parseTimeString(course.time);
      if (!courseDate) return false;
      
      // 最近课程：昨天和今天的课程
      return courseDate >= yesterday && courseDate <= today;
    }).sort((a, b) => {
      const dateA = parseTimeString(a.time);
      const dateB = parseTimeString(b.time);
      return dateA - dateB;
    });
  };

  // 筛选下次上课（未来最近的课程）
  const getUpcomingCourses = () => {
    return courses.filter(course => {
      const courseDate = parseTimeString(course.time);
      if (!courseDate) return false;
      
      // 下次上课：明天及以后的课程
      return courseDate > today;
    }).sort((a, b) => {
      const dateA = parseTimeString(a.time);
      const dateB = parseTimeString(b.time);
      return dateA - dateB;
    }).slice(0, 2); // 只显示最近的2个
  };

  // 检查当前学习阶段状态，判断是否需要显示垂直方向选择
  const checkVerticalDirectionSelection = () => {
    const currentStage = learningStages.find(stage => stage.status === 'in_progress');
    const verticalMilestone = milestones.find(m => m.id === 'vertical-direction-selection');
    
    // 如果当前在能力跃升阶段且进度接近完成，显示垂直方向选择任务
    if (currentStage && currentStage.name === '能力跃升阶段' && 
        currentStage.progressPercentage > 70 && 
        verticalMilestone && verticalMilestone.status === 'pending') {
      return verticalMilestone;
    }
    return null;
  };

  // 整合待办事项（包括里程碑任务）
  const getAllTodos = () => {
    const regularTodos = todos.map(todo => ({
      ...todo,
      type: 'homework',
      targetRoute: '/homework'
    }));

    const verticalTask = checkVerticalDirectionSelection();
    const milestoneTask = verticalTask ? [{
      id: 'milestone-' + verticalTask.id,
      task: verticalTask.name,
      deadline: '重要任务',
      type: 'milestone',
      targetRoute: verticalTask.interaction.targetRoute,
      priority: 'high'
    }] : [];

    return [...milestoneTask, ...regularTodos];
  };

  // 处理课程点击事件
  const handleCourseClick = (course) => {
    console.log('课程点击事件触发:', course.name, '状态:', course.status);
    
    // 所有最近课程和下次上课的信息条都可以点击
    console.log('跳转到直播间，课程ID:', course.courseId);
    navigate('/live', { 
      state: { 
        courseId: course.courseId,
        courseName: course.name 
      } 
    });
  };

  // 处理待办事项点击事件
  const handleTodoClick = (todo) => {
    console.log('待办事项点击:', todo.task, '类型:', todo.type);
    
    // 根据任务类型跳转到不同页面
    if (todo.type === 'milestone' && todo.targetRoute) {
      navigate(todo.targetRoute);
    } else if (todo.type === 'homework') {
      navigate('/homework');
    } else {
      console.log('未知任务类型，使用默认路由');
      navigate('/homework');
    }
  };

  // 获取各区块的数据
  const recentCourses = getRecentCourses();
  const upcomingCourses = getUpcomingCourses();
  const allTodos = getAllTodos();

  return (
    <div className="dashboard-module module-start-class">
      <div className="module-header">
        <div>
          <h3 className="module-title">开始上课</h3>
          <p className="module-subtitle">课程安排与待办事项</p>
        </div>
      </div>

      <div className="module-content">
        {/* 第一区块：最近课程 */}
        <div className="courses-section">
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px', color: 'var(--text-primary)' }}>
            最近课程
          </h4>
          {recentCourses.length > 0 ? (
            recentCourses.map(course => {
              console.log('渲染最近课程:', course.name, '时间:', course.time);
              
              return (
                <div 
                  key={course.id} 
                  className="course-item course-item-clickable"
                  onClick={() => handleCourseClick(course)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="course-avatar"></div>
                  <div className="course-info">
                    <h4>{course.name}</h4>
                    <p>{course.teacher} • {course.time}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ 
              fontSize: '13px', 
              color: 'var(--text-muted)', 
              textAlign: 'center', 
              padding: '12px 0' 
            }}>
              暂无最近课程
            </div>
          )}
        </div>

        {/* 分隔线 */}
        <div style={{ margin: '16px 0', height: '1px', background: '#f3f4f6' }}></div>

        {/* 第二区块：下次上课 */}
        <div className="upcoming-courses-section">
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px', color: 'var(--text-primary)' }}>
            下次上课
          </h4>
          {upcomingCourses.length > 0 ? (
            upcomingCourses.map(course => {
              console.log('渲染下次上课:', course.name, '时间:', course.time);
              
              return (
                <div 
                  key={course.id} 
                  className="course-item course-item-clickable"
                  onClick={() => handleCourseClick(course)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="course-avatar"></div>
                  <div className="course-info">
                    <h4>{course.name}</h4>
                    <p>{course.teacher} • {course.time}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ 
              fontSize: '13px', 
              color: 'var(--text-muted)', 
              textAlign: 'center', 
              padding: '12px 0' 
            }}>
              暂无即将开始的课程
            </div>
          )}
        </div>

        {/* 分隔线 */}
        <div style={{ margin: '16px 0', height: '1px', background: '#f3f4f6' }}></div>

        {/* 第三区块：待办事项 */}
        <div className="todos-section">
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px', color: 'var(--text-primary)' }}>
            待办事项
          </h4>
          {allTodos.length > 0 ? (
            allTodos.slice(0, 3).map(todo => {
              console.log('渲染待办事项:', todo.task, '类型:', todo.type);
              
              return (
                <div 
                  key={todo.id} 
                  className="todo-item-clickable"
                  onClick={() => handleTodoClick(todo)}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '8px',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    border: todo.priority === 'high' ? '1px solid #ef4444' : 'none',
                    backgroundColor: todo.priority === 'high' ? '#fef2f2' : 'transparent'
                  }}
                >
                  <span style={{ 
                    fontSize: '13px', 
                    color: todo.priority === 'high' ? '#ef4444' : 'var(--text-secondary)',
                    fontWeight: todo.priority === 'high' ? '500' : 'normal'
                  }}>
                    {todo.priority === 'high' && '★ '}{todo.task}
                  </span>
                  <span style={{ 
                    fontSize: '12px', 
                    color: todo.priority === 'high' ? '#ef4444' : 'var(--text-muted)'
                  }}>
                    {todo.deadline}
                  </span>
                </div>
              );
            })
          ) : (
            <div style={{ 
              fontSize: '13px', 
              color: 'var(--text-muted)', 
              textAlign: 'center', 
              padding: '12px 0' 
            }}>
              暂无待办事项
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartClass; 