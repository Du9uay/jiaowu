import React, { useState } from 'react';

const CourseList = ({ courseUnits, currentCourseId, onCourseSelect, statusConfig }) => {
  const [expandedUnits, setExpandedUnits] = useState(new Set([1])); // 默认展开第一个单元

  // 切换单元展开状态
  const toggleUnit = (unitId) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedUnits(newExpanded);
  };

  // 处理课程选择
  const handleCourseSelect = (course) => {
    console.log('课程列表：用户选择课程', course.title);
    if (onCourseSelect) {
      onCourseSelect(course);
    }
  };

  // 获取状态样式
  const getStatusStyle = (status) => {
    const config = statusConfig?.statusTypes?.[status];
    if (!config) return {};
    
    return {
      backgroundColor: config.bgColor,
      color: config.color
    };
  };

  // 格式化观看人数
  const formatViewCount = (count) => {
    if (count === 0) return '0';
    if (count < 1000) return count.toString();
    if (count < 10000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 10000).toFixed(1)}w`;
  };

  return (
    <div className="course-sidebar">
      {/* 侧边栏标题 */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">课程列表</h2>
      </div>

      {/* 课程单元列表 */}
      <div className="course-units">
        {courseUnits && courseUnits.length > 0 ? (
          courseUnits.map(unit => {
            const isExpanded = expandedUnits.has(unit.id);
            
            return (
              <div key={unit.id} className="course-unit">
                {/* 单元标题 */}
                <button
                  className={`unit-header ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => toggleUnit(unit.id)}
                >
                  <h3 className="unit-title">{unit.title}</h3>
                  <span className="expand-icon">
                    ▼
                  </span>
                </button>

                {/* 课程列表 */}
                <div className={`course-list ${isExpanded ? 'expanded' : ''}`}>
                  {unit.courses && unit.courses.length > 0 ? (
                    unit.courses.map(course => {
                      const isActive = course.id === currentCourseId;
                      const statusStyle = getStatusStyle(course.status);
                      
                      return (
                        <div
                          key={course.id}
                          className={`course-item ${isActive ? 'active' : ''}`}
                          onClick={() => handleCourseSelect(course)}
                        >
                          {/* 课程缩略图 */}
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="course-thumbnail"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />

                          {/* 课程详情 */}
                          <div className="course-details">
                            <h4 className="course-title">{course.title}</h4>
                            <div className="course-meta">
                              <span className="course-teacher">{course.teacher}</span>
                              <span className="course-time">{course.time}</span>
                            </div>
                          </div>

                          {/* 课程状态和统计 */}
                          <div className="course-stats">
                            <div 
                              className={`course-status ${course.status}`}
                              style={statusStyle}
                            >
                              {statusConfig?.statusTypes?.[course.status]?.name || course.status}
                            </div>
                            {course.viewCount > 0 && (
                              <div className="view-count">
                                👁 {formatViewCount(course.viewCount)}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="empty-courses">
                      <div className="empty-courses-icon">📚</div>
                      <div className="empty-courses-text">暂无课程</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-courses">
            <div className="empty-courses-icon">📚</div>
            <div className="empty-courses-text">暂无课程单元</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList; 