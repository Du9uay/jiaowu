import React from 'react';
import { getMonthDays } from '../../data/mockData';

const MonthView = ({ currentDate, events, onDateClick, onEventClick, selectedDate }) => {
  console.log('MonthView rendering for:', currentDate);
  console.log('MonthView接收到onEventClick回调函数:', typeof onEventClick === 'function' ? '是函数' : '不是函数');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getMonthDays(year, month);
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  // 获取指定日期的事件
  const getEventsForDate = (date, month, year) => {
    if (!events || events.length === 0) return [];
    
    const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    
    return events.filter(event => {
      const eventDate = event.startTime.split(' ')[0];
      return eventDate === dateString;
    });
  };

  const handleDateClick = (day) => {
    console.log('Date clicked:', day);
    if (onDateClick) {
      const clickedDate = new Date(day.year, day.month, day.date);
      onDateClick(clickedDate);
    }
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getFullYear() === day.year &&
           selectedDate.getMonth() === day.month &&
           selectedDate.getDate() === day.date;
  };

  const renderEventItem = (event, index, dayEvents) => {
    const maxVisible = 3; // 每个日期最多显示3个事件
    
    if (index >= maxVisible - 1 && index === maxVisible - 1 && dayEvents.length > maxVisible) {
      // 显示"更多"指示器
      const remainingCount = dayEvents.length - maxVisible + 1;
      return (
        <div key={`more-${index}`} className="event-more">
          +{remainingCount}更多
        </div>
      );
    }
    
    if (index >= maxVisible) return null;

    return (
      <div
        key={event.id}
        className={`event-item ${event.type}`}
        title={`${event.title} (${event.startTime.split(' ')[1]} - ${event.endTime.split(' ')[1]})`}
        onClick={(e) => {
          e.stopPropagation();
          console.log('月视图事件被点击:', event);
          if (onEventClick) {
            console.log('调用父组件的onEventClick回调');
            onEventClick(event);
          } else {
            console.log('警告: onEventClick回调函数未提供');
          }
        }}
      >
        {event.title}
      </div>
    );
  };

  return (
    <div className="month-view">
      {/* 星期标题 */}
      <div className="month-header">
        {weekDays.map(day => (
          <div key={day} className="weekday-header">
            {day}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="month-grid">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day.date, day.month, day.year);
          const isToday = day.isToday;
          const isCurrentMonth = day.isCurrentMonth;
          const isSelectedDate = isSelected(day);

          return (
            <div
              key={index}
              className={`day-cell ${
                !isCurrentMonth ? 'other-month' : ''
              } ${isToday ? 'today' : ''} ${
                isSelectedDate ? 'selected' : ''
              }`}
              onClick={() => handleDateClick(day)}
            >
              <div className="day-number">{day.date}</div>
              
              <div className="event-list">
                {dayEvents.map((event, eventIndex) => 
                  renderEventItem(event, eventIndex, dayEvents)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView; 