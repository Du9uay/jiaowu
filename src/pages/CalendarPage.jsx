import React, { useState } from 'react';
import { mockData } from '../data/mockData';
import CalendarHeader from '../components/Calendar/CalendarHeader';
import MonthView from '../components/Calendar/MonthView';
import WeekView from '../components/Calendar/WeekView';
import EventDetailModal from '../components/Calendar/EventDetailModal';
import Breadcrumb from '../components/Profile/Breadcrumb';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  
  const { calendarEvents } = mockData;

  console.log('CalendarPage rendering with view:', currentView, 'date:', currentDate);
  console.log('事件详情模态框状态:', { 
    显示状态: showEventDetail ? '显示' : '隐藏',
    选中事件: selectedEvent ? selectedEvent.title : '无'
  });

  const breadcrumbItems = ['主页', '日历'];

  const handleViewChange = (view) => {
    console.log('View changed to:', view);
    setCurrentView(view);
  };

  const handleNavigate = (newDate) => {
    console.log('Navigating to date:', newDate);
    setCurrentDate(newDate);
  };

  const handleDateClick = (date) => {
    console.log('Date selected:', date);
    setSelectedDate(date);
    
    // 如果在月视图中点击日期，可以切换到周视图
    if (currentView === 'month') {
      setCurrentDate(date);
      // 可选：自动切换到周视图
      // setCurrentView('week');
    }
  };

  const handleEventClick = (event) => {
    console.log('日历事件被点击:', event);
    console.log('准备显示事件详情模态框');
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  const handleCloseEventDetail = () => {
    console.log('关闭事件详情弹窗');
    setShowEventDetail(false);
    setSelectedEvent(null);
  };

  const renderCalendarView = () => {
    if (currentView === 'month') {
      return (
        <MonthView
          currentDate={currentDate}
          events={calendarEvents}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          selectedDate={selectedDate}
        />
      );
    } else {
      return (
        <WeekView
          currentDate={currentDate}
          events={calendarEvents}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      );
    }
  };

  return (
    <div className="calendar-page">
      {/* 面包屑导航 */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* 日历头部控制栏 */}
      <CalendarHeader
        currentDate={currentDate}
        currentView={currentView}
        onViewChange={handleViewChange}
        onNavigate={handleNavigate}
      />
      
      {/* 日历主体 */}
      <div className="calendar-container">
        {renderCalendarView()}
      </div>

      {/* 事件详情模态框 */}
      <EventDetailModal
        isOpen={showEventDetail}
        event={selectedEvent}
        onClose={handleCloseEventDetail}
      />
    </div>
  );
};

export default CalendarPage; 