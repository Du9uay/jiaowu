import React, { useState, useRef, useEffect } from 'react';

const JobStrategyCarousel = ({ onBackToLive }) => {
  console.log('JobStrategyCarousel组件初始化');
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);

  // 策略图表数据
  const strategyCharts = [
    {
      id: 1,
      title: '岗位阶段图',
      description: '不同阶段岗位分布与要求分析',
      type: 'position-hierarchy'
    },
    {
      id: 2,
      title: '职业发展时间线',
      description: '从毕业到资深专家的发展路径规划',
      type: 'career-timeline'
    }
  ];

  console.log('JobStrategyCarousel渲染参数:', {
    currentSlide,
    chartsCount: strategyCharts.length,
    isDragging,
    轮播图配置: {
      轨道宽度: '200%',
      单张幻灯片宽度: '50%',
      预期移动距离: `${currentSlide * 50}%`
    }
  });

  // 处理返回直播间
  const handleBackToLive = () => {
    console.log('用户点击返回直播间');
    if (onBackToLive) {
      onBackToLive();
    }
  };

  // 切换到指定幻灯片
  const goToSlide = (index) => {
    console.log('切换到幻灯片:', index);
    // 添加边界检查
    const validIndex = Math.max(0, Math.min(index, strategyCharts.length - 1));
    console.log('边界检查后的索引:', validIndex);
    setCurrentSlide(validIndex);
    setTranslateX(0);
  };

  // 上一张
  const goToPrevSlide = () => {
    const newIndex = currentSlide > 0 ? currentSlide - 1 : strategyCharts.length - 1;
    console.log('上一张幻灯片:', { 当前: currentSlide, 目标: newIndex });
    goToSlide(newIndex);
  };

  // 下一张
  const goToNextSlide = () => {
    const newIndex = currentSlide < strategyCharts.length - 1 ? currentSlide + 1 : 0;
    console.log('下一张幻灯片:', { 当前: currentSlide, 目标: newIndex });
    goToSlide(newIndex);
  };

  // 触摸开始
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  // 鼠标按下
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    e.preventDefault();
  };

  // 触摸移动/鼠标移动
  const handleMove = (clientX) => {
    if (!isDragging) return;
    
    const diff = clientX - startX;
    const maxTranslate = 100;
    const clampedTranslate = Math.max(-maxTranslate, Math.min(maxTranslate, diff));
    setTranslateX(clampedTranslate);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  // 触摸结束/鼠标释放
  const handleEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50;
    if (translateX > threshold) {
      goToPrevSlide();
    } else if (translateX < -threshold) {
      goToNextSlide();
    }
    
    setIsDragging(false);
    setTranslateX(0);
  };

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'Escape') {
        handleBackToLive();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // 渲染岗位阶段图
  const renderPositionHierarchy = () => (
    <div className="chart-content position-hierarchy">
      <div className="hierarchy-levels">
        {/* 高阶岗 */}
        <div className="hierarchy-level high-level">
          <div className="level-label">高阶岗</div>
          <div className="positions-grid">
            {Array.from({length: 9}, (_, i) => (
              <div key={i} className="position-item">
                <div className="position-avatar"></div>
                <span className="position-title">XXX岗位</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 中阶岗 */}
        <div className="hierarchy-level mid-level">
          <div className="level-label">中阶岗</div>
          <div className="positions-grid">
            {Array.from({length: 9}, (_, i) => (
              <div key={i} className="position-item">
                <div className="position-avatar"></div>
                <span className="position-title">XXX岗位</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 普通岗 */}
        <div className="hierarchy-level basic-level">
          <div className="level-label">普通岗</div>
          <div className="positions-grid">
            {Array.from({length: 9}, (_, i) => (
              <div key={i} className="position-item">
                <div className="position-avatar"></div>
                <span className="position-title">XXX岗位</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 渲染职业发展时间线
  const renderCareerTimeline = () => {
    console.log('渲染职业发展时间线 - 阶梯式设计');
    return (
    <div className="chart-content career-timeline">
      {/* 时间轴 */}
      <div className="timeline-axis">
        {['毕业', '1年', '2年', '3年', '4年', '5年', '6年'].map((year, index) => (
          <div key={index} className="timeline-point">
            <span className="timeline-label">{year}</span>
          </div>
        ))}
        <div className="timeline-arrow">→</div>
      </div>
      
             {/* 阶梯式职业发展路径 */}
       <div className="career-path-steps">
         {/* 连接线 */}
         <div className="career-connection-lines">
           <svg className="path-svg" viewBox="0 0 1000 300" preserveAspectRatio="none">
             <path d="M 70 250 L 180 250 L 200 200 L 310 200 L 330 150 L 440 150 L 460 100 L 570 100 L 590 60 L 700 60 L 720 20 L 830 20" 
                   stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="6,3"/>
           </svg>
         </div>
         
         {/* 职业发展节点 - 对应时间轴 */}
         <div className="career-timeline-step year-0">
           <div className="career-node">
             <div className="node-avatar level-0"></div>
             <span className="node-title">实习生岗位</span>
           </div>
         </div>
         
         <div className="career-timeline-step year-1">
           <div className="career-node">
             <div className="node-avatar level-1"></div>
             <span className="node-title">初级开发工程师</span>
           </div>
         </div>
         
         <div className="career-timeline-step year-2">
           <div className="career-node">
             <div className="node-avatar level-2"></div>
             <span className="node-title">开发工程师</span>
           </div>
         </div>
         
         <div className="career-timeline-step year-3">
           <div className="career-node">
             <div className="node-avatar level-3"></div>
             <span className="node-title">高级开发工程师</span>
           </div>
         </div>
         
         <div className="career-timeline-step year-4">
           <div className="career-node">
             <div className="node-avatar level-4"></div>
             <span className="node-title">技术专家</span>
           </div>
         </div>
         
         <div className="career-timeline-step year-5">
           <div className="career-node">
             <div className="node-avatar level-5"></div>
             <span className="node-title">技术经理</span>
           </div>
         </div>
         
                   <div className="career-timeline-step year-6">
            <div className="career-node">
              <div className="node-avatar level-6"></div>
              <span className="node-title">技术总监</span>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">团队管理</span>
              <span className="skill-tag">战略规划</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="job-strategy-carousel">
      {/* 头部导航 */}
      <div className="carousel-header">
        <button className="back-button" onClick={handleBackToLive}>
          <span className="back-icon">←</span>
          返回
        </button>
        <div className="carousel-title">
          <h1>{strategyCharts[currentSlide].title}</h1>
          <p>{strategyCharts[currentSlide].description}</p>
        </div>
        <div className="slide-indicators">
          {strategyCharts.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* 轮播内容 */}
      <div 
        className="carousel-container"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={isDragging ? handleMouseMove : undefined}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        {console.log('轮播图移动计算:', {
          currentSlide,
          moveDistance: currentSlide * 50,
          translateX,
          finalTransform: `translateX(calc(-${currentSlide * 50}% + ${translateX}px))`
        })}
        <div 
          className="carousel-track"
          style={{
            transform: `translateX(calc(-${currentSlide * 50}% + ${translateX}px))`,
            transition: isDragging ? 'none' : 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {strategyCharts.map((chart, index) => (
            <div key={chart.id} className="carousel-slide">
              <div className="chart-wrapper">
                {chart.type === 'position-hierarchy' && renderPositionHierarchy()}
                {chart.type === 'career-timeline' && renderCareerTimeline()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 导航按钮 */}
      <button className="nav-button prev-button" onClick={goToPrevSlide}>
        <span>‹</span>
      </button>
      <button className="nav-button next-button" onClick={goToNextSlide}>
        <span>›</span>
      </button>

      {/* 内联样式 */}
      <style>{`
        .job-strategy-carousel {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #f8fafc;
          z-index: 1000;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .carousel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 32px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          flex-shrink: 0;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: 1px solid #d1d5db;
          padding: 8px 16px;
          border-radius: 8px;
          color: #374151;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 150ms ease;
        }

        .back-button:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .back-icon {
          font-size: 16px;
        }

        .carousel-title {
          text-align: center;
          flex: 1;
          margin: 0 32px;
        }

        .carousel-title h1 {
          margin: 0 0 4px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .carousel-title p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .slide-indicators {
          display: flex;
          gap: 8px;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: #d1d5db;
          cursor: pointer;
          transition: background-color 150ms ease;
        }

        .indicator.active {
          background: #3b82f6;
        }

        .carousel-container {
          flex: 1;
          overflow: hidden;
          position: relative;
          cursor: grab;
        }

        .carousel-container:active {
          cursor: grabbing;
        }

        .carousel-track {
          display: flex;
          height: 100%;
          width: 200%;
        }

        .carousel-slide {
          width: 50%;
          height: 100%;
          padding: 32px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chart-wrapper {
          width: 100%;
          height: 100%;
          max-width: 1200px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        /* 岗位阶段图样式 */
        .position-hierarchy {
          padding: 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hierarchy-levels {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .hierarchy-level {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .level-label {
          width: 120px;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          color: white;
          flex-shrink: 0;
        }

        .high-level .level-label {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }

        .mid-level .level-label {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .basic-level .level-label {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }

        .positions-grid {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 16px;
          flex: 1;
        }

        .position-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .position-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e5e7eb, #d1d5db);
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>');
          background-size: 24px;
          background-repeat: no-repeat;
          background-position: center;
          border: 2px solid #f3f4f6;
        }

        .position-title {
          font-size: 11px;
          color: #6b7280;
          text-align: center;
          font-weight: 500;
        }

        /* 职业发展时间线样式 */
        .career-timeline {
          padding: 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .timeline-axis {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          margin-bottom: 40px;
          padding: 20px 0;
        }

        .timeline-axis::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 60px;
          height: 2px;
          background: #3b82f6;
          transform: translateY(-50%);
        }

        .timeline-point {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .timeline-point::before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #3b82f6;
          margin-bottom: 8px;
        }

        .timeline-label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .timeline-arrow {
          font-size: 24px;
          color: #3b82f6;
          font-weight: bold;
        }

                 /* 阶梯式职业发展路径 */
         .career-path-steps {
           flex: 1;
           position: relative;
           background: linear-gradient(135deg, #fef3c7, #fde68a);
           border-radius: 16px;
           padding: 40px 20px;
           overflow: hidden;
         }

         .career-connection-lines {
           position: absolute;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           pointer-events: none;
         }

         .path-svg {
           width: 100%;
           height: 100%;
           opacity: 0.8;
         }

                   /* 职业发展时间线节点 */
          .career-timeline-step {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 2;
          }

          /* 对应时间轴的精确位置 */
          .year-0 {
            left: 7%;
            bottom: 15%;
          }

          .year-1 {
            left: 20%;
            bottom: 30%;
          }

          .year-2 {
            left: 33%;
            bottom: 45%;
          }

          .year-3 {
            left: 46%;
            bottom: 60%;
          }

          .year-4 {
            left: 59%;
            bottom: 75%;
          }

          .year-5 {
            left: 72%;
            bottom: 85%;
          }

          .year-6 {
            left: 85%;
            bottom: 92%;
          }

         .career-node {
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 8px;
         }

         .node-avatar {
           width: 56px;
           height: 56px;
           border-radius: 50%;
           background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>');
           background-size: 28px;
           background-repeat: no-repeat;
           background-position: center;
           border: 3px solid white;
           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
         }

                   .node-avatar.level-0 {
            background: linear-gradient(135deg, #9ca3af, #6b7280);
          }

          .node-avatar.level-1 {
            background: linear-gradient(135deg, #06b6d4, #0891b2);
          }

          .node-avatar.level-2 {
            background: linear-gradient(135deg, #10b981, #059669);
          }

          .node-avatar.level-3 {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
          }

          .node-avatar.level-4 {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          }

          .node-avatar.level-5 {
            background: linear-gradient(135deg, #f59e0b, #d97706);
          }

          .node-avatar.level-6 {
            background: linear-gradient(135deg, #ef4444, #dc2626);
          }

         .node-title {
           font-size: 13px;
           color: #374151;
           font-weight: 600;
           text-align: center;
         }

         .stage-info {
           text-align: center;
         }

         .stage-title {
           font-size: 14px;
           font-weight: 600;
           color: #92400e;
           margin-bottom: 4px;
         }

         .stage-desc {
           font-size: 11px;
           color: #a16207;
           line-height: 1.4;
         }

         .skill-tags {
           display: flex;
           gap: 6px;
           flex-wrap: wrap;
           justify-content: center;
         }

         .skill-tag {
           font-size: 9px;
           padding: 3px 6px;
           background: #dbeafe;
           color: #1e40af;
           border-radius: 8px;
           font-weight: 500;
         }

        /* 导航按钮 */
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: white;
          border: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 24px;
          cursor: pointer;
          transition: all 150ms ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .nav-button:hover {
          background: #f8fafc;
          color: #374151;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .prev-button {
          left: 20px;
        }

        .next-button {
          right: 20px;
        }

        /* 响应式设计 */
        @media (max-width: 1024px) {
          .carousel-header {
            padding: 16px 24px;
          }

          .carousel-slide {
            padding: 24px;
          }

          .position-hierarchy {
            padding: 24px;
          }

          .career-timeline {
            padding: 24px;
          }

          .positions-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 12px;
          }

          .position-avatar {
            width: 40px;
            height: 40px;
          }

          .position-title {
            font-size: 10px;
          }
        }

        @media (max-width: 768px) {
          .carousel-header {
            flex-direction: column;
            gap: 16px;
            padding: 16px;
          }

          .carousel-title {
            margin: 0;
          }

          .hierarchy-level {
            flex-direction: column;
            gap: 16px;
          }

          .level-label {
            width: 100%;
            font-size: 16px;
          }

          .positions-grid {
            grid-template-columns: repeat(4, 1fr);
          }

                                .career-path-steps {
             padding: 20px 10px;
             flex-direction: column;
             gap: 16px;
           }

           .career-timeline-step {
             position: relative !important;
             left: auto !important;
             bottom: auto !important;
             margin-bottom: 0;
             width: 100%;
           }

           .career-node {
             background: rgba(255, 255, 255, 0.9);
             padding: 12px;
             border-radius: 8px;
             box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
             border: 1px solid #e5e7eb;
             width: 100%;
             display: flex;
             align-items: center;
             gap: 12px;
           }

           .node-avatar {
             width: 40px;
             height: 40px;
             flex-shrink: 0;
           }

           .node-title {
             font-size: 14px;
             text-align: left;
           }

           .path-svg {
             display: none;
           }

          .nav-button {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default JobStrategyCarousel; 