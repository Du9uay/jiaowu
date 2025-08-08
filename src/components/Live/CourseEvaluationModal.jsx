import React, { useState } from 'react';
import Portal from '../common/Portal';

const CourseEvaluationModal = ({ isVisible, onClose, onSubmit, courseInfo }) => {
  // 评价状态
  const [ratings, setRatings] = useState({
    discipline: 0,     // 课堂纪律
    teaching: 0,       // 教学水平  
    effectiveness: 0,  // 课堂实效
    overall: 0         // 综合评价
  });
  
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('CourseEvaluationModal 渲染', { isVisible, courseInfo });

  // 管理body的modal-open类
  React.useEffect(() => {
    if (isVisible) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // 清理函数
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isVisible]);

  // 评价维度配置
  const ratingDimensions = [
    { key: 'discipline', label: '课堂纪律' },
    { key: 'teaching', label: '教学水平' },
    { key: 'effectiveness', label: '课堂实效' },
    { key: 'overall', label: '综合评价' }
  ];

  // 处理星级评分
  const handleStarRating = (dimension, rating) => {
    setRatings(prev => ({
      ...prev,
      [dimension]: rating
    }));
  };

  // 渲染星级评分
  const renderStarRating = (dimension, currentRating) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            className={`star ${star <= currentRating ? 'filled' : ''}`}
            onClick={() => handleStarRating(dimension, star)}
            onMouseEnter={(e) => {
              // 悬停效果
              const stars = e.currentTarget.parentElement.querySelectorAll('.star');
              stars.forEach((s, index) => {
                s.classList.toggle('hover', index < star);
              });
            }}
            onMouseLeave={(e) => {
              // 清除悬停效果
              const stars = e.currentTarget.parentElement.querySelectorAll('.star');
              stars.forEach(s => s.classList.remove('hover'));
            }}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  // 渲染评分条（模拟导师评分显示）
  const renderRatingBars = () => {
    const ratings = [
      { stars: 5, percentage: 88.1 },
      { stars: 4, percentage: 5.8 },
      { stars: 3, percentage: 3.6 },
      { stars: 2, percentage: 1.2 },
      { stars: 1, percentage: 0.2 }
    ];

    return (
      <div className="rating-bars">
        {ratings.map(item => (
          <div key={item.stars} className="rating-bar-row">
            <div className="stars-label">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`bar-star ${i < item.stars ? 'filled' : ''}`}>★</span>
              ))}
            </div>
            <div className="rating-bar">
              <div 
                className="rating-fill" 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <div className="percentage">{item.percentage}%</div>
          </div>
        ))}
      </div>
    );
  };

  // 处理提交
  const handleSubmit = async () => {
    console.log('提交课程评价', { ratings, comment });
    
    setIsSubmitting(true);
    
    // 模拟提交延迟
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmit) {
        onSubmit({ ratings, comment });
      }
      onClose();
    }, 1000);
  };

  // 处理关闭
  const handleClose = () => {
    console.log('关闭课程评价弹窗');
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Portal className="course-evaluation-portal">
      <div className="course-evaluation-overlay">
        <div className="course-evaluation-modal">
          {/* 弹窗头部 */}
          <div className="modal-header">
            <div className="header-content">
              <div className="book-icon">📖</div>
              <div className="header-text">
                <h2 className="modal-title">请对本节课进行评价</h2>
                <p className="modal-subtitle">请您客观公正的评价</p>
              </div>
            </div>
          </div>

          {/* 弹窗内容 */}
          <div className="modal-content">
            {/* 老师信息和评分展示 */}
            <div className="teacher-evaluation-section">
              <div className="teacher-info">
                <div className="teacher-avatar">
                  <img 
                    src="/api/placeholder/80/80" 
                    alt="老师头像"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="avatar-placeholder" style={{display: 'none'}}>顾</div>
                </div>
                <div className="teacher-details">
                  <h3 className="teacher-name">顾华</h3>
                  <p className="course-name">机械与智能制造班</p>
                  <div className="teacher-rating">
                    <span className="rating-score">9.5</span>
                    <span className="rating-text">（863位学员评价）</span>
                  </div>
                </div>
              </div>
              
              {/* 评分条形图 */}
              <div className="rating-visualization">
                {renderRatingBars()}
              </div>
            </div>

            {/* 评价维度 */}
            <div className="evaluation-dimensions">
              <div className="dimensions-grid">
                {ratingDimensions.map(dimension => (
                  <div key={dimension.key} className="dimension-item">
                    <div className="dimension-label">{dimension.label}</div>
                    {renderStarRating(dimension.key, ratings[dimension.key])}
                    <div className="rating-text">({ratings[dimension.key]}/5)</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 详细评价 */}
            <div className="detailed-evaluation">
              <div className="evaluation-label">详细评价</div>
              <textarea
                className="evaluation-textarea"
                placeholder="请详细描述您的评价和建议..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
              />
              <div className="char-count">{comment.length}/500</div>
            </div>
          </div>

          {/* 弹窗底部按钮 */}
          <div className="modal-footer">
            <button 
              className="cancel-button"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              取消
            </button>
            <button 
              className="submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? '提交中...' : '提交评价'}
            </button>
          </div>
        </div>
      </div>

      {/* 样式定义 */}
      <style>{`
        .course-evaluation-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          backdrop-filter: blur(4px);
        }

        .course-evaluation-modal {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalEnter 0.3s ease;
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-header {
          background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
          padding: 24px;
          border-radius: 16px 16px 0 0;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .book-icon {
          width: 48px;
          height: 48px;
          background: #2196f3;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }

        .header-text {
          flex: 1;
        }

        .modal-title {
          margin: 0 0 4px 0;
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .modal-subtitle {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .modal-content {
          padding: 24px;
        }

        .teacher-evaluation-section {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid #e9ecef;
        }

        .teacher-info {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .teacher-avatar {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          background: #ddd;
        }

        .teacher-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 600;
        }

        .teacher-details {
          flex: 1;
        }

        .teacher-name {
          margin: 0 0 4px 0;
          font-size: 24px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .course-name {
          margin: 0 0 8px 0;
          font-size: 16px;
          color: #666;
        }

        .teacher-rating {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .rating-score {
          font-size: 32px;
          font-weight: 700;
          color: #2196f3;
        }

        .rating-text {
          font-size: 14px;
          color: #666;
        }

        .rating-visualization {
          margin-top: 16px;
        }

        .rating-bars {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .rating-bar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
        }

        .stars-label {
          width: 60px;
          display: flex;
          gap: 2px;
        }

        .bar-star {
          color: #ddd;
          font-size: 10px;
        }

        .bar-star.filled {
          color: #ffc107;
        }

        .rating-bar {
          flex: 1;
          height: 8px;
          background: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }

        .rating-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffc107 0%, #ff9800 100%);
          transition: width 0.3s ease;
        }

        .percentage {
          width: 40px;
          text-align: right;
          color: #666;
          font-size: 12px;
        }

        .evaluation-dimensions {
          margin-bottom: 24px;
        }

        .dimensions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .dimension-item {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          text-align: center;
        }

        .dimension-label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 12px;
        }

        .star-rating {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 8px;
        }

        .star {
          background: none;
          border: none;
          font-size: 24px;
          color: #ddd;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 4px;
        }

        .star.filled,
        .star.hover {
          color: #ffc107;
          transform: scale(1.1);
        }

        .star:hover {
          transform: scale(1.2);
        }

        .rating-text {
          font-size: 12px;
          color: #666;
        }

        .detailed-evaluation {
          margin-bottom: 24px;
        }

        .evaluation-label {
          font-size: 16px;
          font-weight: 500;
          color: #333;
          margin-bottom: 12px;
        }

        .evaluation-textarea {
          width: 100%;
          min-height: 120px;
          padding: 16px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.5;
          resize: vertical;
          font-family: inherit;
          box-sizing: border-box;
        }

        .evaluation-textarea:focus {
          outline: none;
          border-color: #2196f3;
          box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
        }

        .char-count {
          text-align: right;
          font-size: 12px;
          color: #666;
          margin-top: 8px;
        }

        .modal-footer {
          padding: 24px;
          border-top: 1px solid #e9ecef;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .cancel-button,
        .submit-button {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .cancel-button {
          background: #f8f9fa;
          color: #666;
          border: 1px solid #e9ecef;
        }

        .cancel-button:hover:not(:disabled) {
          background: #e9ecef;
        }

        .submit-button {
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          color: white;
          min-width: 120px;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
        }

        .submit-button:disabled,
        .cancel-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
          .course-evaluation-overlay {
            padding: 12px;
          }

          .modal-header {
            padding: 20px;
          }

          .modal-content {
            padding: 20px;
          }

          .dimensions-grid {
            grid-template-columns: 1fr;
          }

          .teacher-info {
            flex-direction: column;
            text-align: center;
          }

          .teacher-avatar {
            width: 60px;
            height: 60px;
          }

          .teacher-name {
            font-size: 20px;
          }

          .rating-score {
            font-size: 28px;
          }
        }
      `}</style>
    </Portal>
  );
};

export default CourseEvaluationModal;