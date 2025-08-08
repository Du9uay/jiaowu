import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';

const InterviewQAPage = () => {
  console.log('InterviewQAPage rendering');
  
  const { industry: industryId, position: positionId } = useParams();
  const navigate = useNavigate();
  const { resumeInterview } = mockData;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  console.log('URL params:', { industryId, positionId });

  // 查找对应的行业和岗位数据
  const industry = resumeInterview.industries?.find(ind => ind.id === industryId);
  const position = industry?.positions?.find(pos => pos.id === positionId);

  console.log('Found industry:', industry?.name);
  console.log('Found position:', position?.name);

  // 返回按钮处理
  const handleBackClick = () => {
    console.log('Back button clicked');
    navigate('/resume-interview');
  };

  // 搜索处理
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log('Search term changed:', e.target.value);
  };

  // 分类筛选处理
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log('Category changed:', category);
  };

  // 题目展开/收起处理
  const toggleQuestion = (questionId) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
    console.log('Question toggled:', questionId);
  };

  // 如果未找到数据
  if (!industry || !position) {
    return (
      <div className="interview-qa-page">
        <div className="page-header">
          <button className="back-button" onClick={handleBackClick}>
            ← 返回
          </button>
          <h1 className="page-title">面试题未找到</h1>
        </div>
        <div className="qa-not-found">
          <p>抱歉，未找到对应的面试题信息。</p>
          <button className="back-button" onClick={handleBackClick}>
            返回列表
          </button>
        </div>
      </div>
    );
  }

  const { interviews } = position;
  
  // 获取所有题目（钩子题目 + 详细题目）
  const allQuestions = [
    ...interviews.hookQuestions.map((question, index) => ({
      id: `hook-${index}`,
      category: '热门问题',
      question: question,
      answer: '该题目的详细答案正在整理中，敬请期待...'
    })),
    ...interviews.allQuestions
  ];

  // 筛选题目
  const filteredQuestions = allQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 获取所有分类
  const categories = ['all', ...new Set(allQuestions.map(q => q.category))];

  return (
    <div className="interview-qa-page">
      {/* 页面头部 */}
      <div className="page-header">
        <button className="back-button" onClick={handleBackClick}>
          ← 返回
        </button>
        <div className="header-title">
          <h1 className="page-title">{position.name} - 面试题库</h1>
          <p className="page-subtitle">{position.company} · {position.level}</p>
        </div>
        <div className="qa-stats">
          <span className="stats-item">共 {allQuestions.length} 道题目</span>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="filter-section">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="搜索题目或答案..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>
      </div>

      {/* 面试题列表 */}
      <div className="questions-container">
        {filteredQuestions.length === 0 ? (
          <div className="empty-state">
            <p className="empty-text">没有找到匹配的面试题</p>
          </div>
        ) : (
          <div className="questions-list">
            {filteredQuestions.map((qa, index) => (
              <div key={qa.id} className="question-item">
                <div 
                  className="question-header"
                  onClick={() => toggleQuestion(qa.id)}
                >
                  <div className="question-content">
                    <span className="question-number">{index + 1}.</span>
                    <span className="question-category">[{qa.category}]</span>
                    <span className="question-text">{qa.question}</span>
                  </div>
                  <span className={`toggle-icon ${expandedQuestions.has(qa.id) ? 'expanded' : ''}`}>
                    ▼
                  </span>
                </div>
                
                {expandedQuestions.has(qa.id) && (
                  <div className="question-answer">
                    <div className="answer-content">
                      <h4 className="answer-title">参考答案：</h4>
                      <p className="answer-text">{qa.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 如果没有详细题目，显示提示 */}
      {allQuestions.length === interviews.hookQuestions.length && (
        <div className="qa-placeholder">
          <div className="placeholder-content">
            <h3 className="placeholder-title">更多面试题正在整理中</h3>
            <p className="placeholder-text">
              当前仅展示了该岗位的热门面试题，更多详细的面试题库和参考答案正在紧急整理中，敬请期待！
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewQAPage; 