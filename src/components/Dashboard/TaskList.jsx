import React from 'react';
import { mockData } from '../../data/mockData';

const TaskList = () => {
  const { tasks } = mockData;

  console.log('TaskList component rendering');

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task.course);
  };

  return (
    <div className="dashboard-module module-tasks">
      <div className="module-header">
        <h3 className="module-title">事项</h3>
      </div>

      <div className="module-content">
        <div className="task-list">
          {tasks.map(task => {
            console.log('TaskList模块内容区域已应用固定高度和滚动条 - 渲染任务:', task.course, '教师:', task.teacher);
            return (
              <div 
                key={task.id} 
                className="task-item"
                onClick={() => handleTaskClick(task)}
                style={{ cursor: 'pointer' }}
              >
                <div className="task-avatar"></div>
                <div className="task-content">
                  <div className="task-teacher">{task.teacher}</div>
                  <div className="task-time">{task.time}</div>
                  <div className="task-course">
                    单元名称（{task.type}）
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: 'var(--text-secondary)', 
                    marginTop: '4px',
                    lineHeight: '1.3'
                  }}>
                    课程名称：{task.course}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskList; 