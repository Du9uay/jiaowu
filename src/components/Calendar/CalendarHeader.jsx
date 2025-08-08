import React from 'react';

const CalendarHeader = ({ 
  currentDate, 
  currentView, 
  onViewChange, 
  onNavigate 
}) => {
  console.log('CalendarHeader rendering with date:', currentDate, 'view:', currentView);

  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  const formatTitle = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    if (currentView === 'month') {
      return `${year}年${monthNames[month]}`;
    } else {
      // 周视图显示周的时间范围
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      startOfWeek.setDate(currentDate.getDate() - day);
      
      return `${year}年${monthNames[month]}`;
    }
  };

  const handlePrevious = () => {
    console.log('Previous navigation clicked');
    const newDate = new Date(currentDate);
    
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    
    onNavigate(newDate);
  };

  const handleNext = () => {
    console.log('Next navigation clicked');
    const newDate = new Date(currentDate);
    
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    
    onNavigate(newDate);
  };

  const handleToday = () => {
    console.log('Today button clicked');
    onNavigate(new Date());
  };

  const handleViewChange = (view) => {
    console.log('View changed to:', view);
    onViewChange(view);
  };

  return (
    <div className="calendar-header">
      <div className="calendar-nav">
        <button 
          className="nav-button"
          onClick={handlePrevious}
          title={currentView === 'month' ? '上一月' : '上一周'}
        >
          ‹
        </button>
        
        <h2 className="calendar-title">{formatTitle()}</h2>
        
        <button 
          className="nav-button"
          onClick={handleNext}
          title={currentView === 'month' ? '下一月' : '下一周'}
        >
          ›
        </button>
        
        <button 
          className="nav-button"
          onClick={handleToday}
          title="回到今天"
          style={{ marginLeft: '16px' }}
        >
          今
        </button>
      </div>

      <div className="view-switcher">
        <button
          className={`view-button ${currentView === 'month' ? 'active' : ''}`}
          onClick={() => handleViewChange('month')}
        >
          月
        </button>
        <button
          className={`view-button ${currentView === 'week' ? 'active' : ''}`}
          onClick={() => handleViewChange('week')}
        >
          日
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader; 