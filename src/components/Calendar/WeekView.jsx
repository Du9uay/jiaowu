import React, { useEffect, useRef } from 'react';
import { getWeekDays } from '../../data/mockData';

const WeekView = ({ currentDate, events, onDateClick, onEventClick }) => {
  const containerRef = useRef(null);
  
  console.log('WeekView rendering for:', currentDate);
  console.log('WeekView接收到onEventClick回调函数:', typeof onEventClick === 'function' ? '是函数' : '不是函数');

  const weekDays = getWeekDays(currentDate);
  const timeSlots = Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  const weekDayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  // 滚动到当前时间
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const scrollTop = currentHour * 60; // 每小时60px
    
    if (containerRef.current) {
      containerRef.current.scrollTop = Math.max(0, scrollTop - 120); // 提前2小时显示
    }
  }, []);

  // 获取指定日期的事件
  const getEventsForDate = (date) => {
    if (!events || events.length === 0) return [];
    
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    return events.filter(event => {
      const eventDate = event.startTime.split(' ')[0];
      return eventDate === dateString;
    });
  };

  // 计算事件在时间轴上的位置和高度
  const calculateEventStyle = (event) => {
    const startTime = event.startTime.split(' ')[1];
    const endTime = event.endTime.split(' ')[1];
    
    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1]);
    const endHour = parseInt(endTime.split(':')[0]);
    const endMinute = parseInt(endTime.split(':')[1]);
    
    const startOffset = startHour * 60 + startMinute; // 转换为分钟
    const endOffset = endHour * 60 + endMinute;
    const duration = endOffset - startOffset;
    
    const top = startOffset; // 1分钟 = 1px
    const height = Math.max(duration, 30); // 最小高度30px
    
    return {
      top: `${top}px`,
      height: `${height}px`
    };
  };

  const handleDateClick = (date) => {
    console.log('Week date clicked:', date);
    if (onDateClick) {
      onDateClick(date);
    }
  };

  const getCurrentTimeLine = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const totalMinutes = currentHour * 60 + currentMinute;
    
    // 只在今天显示当前时间线
    const isToday = weekDays.some(date => 
      date.toDateString() === now.toDateString()
    );
    
    if (!isToday) return null;
    
    return (
      <div 
        className="current-time-line" 
        style={{ top: `${totalMinutes}px` }}
      />
    );
  };

  return (
    <div className="week-view">
      {/* 周标题 */}
      <div className="week-header">
        <div className="time-header">时间</div>
        {weekDays.map((date, index) => {
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <div 
              key={date.toISOString()} 
              className={`day-header ${isToday ? 'today' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              <div className="day-name">{weekDayNames[index]}</div>
              <div className="day-date">{date.getDate()}</div>
            </div>
          );
        })}
      </div>

      {/* 周网格 */}
      <div className="week-grid" ref={containerRef}>
        {/* 时间列 */}
        <div className="time-column">
          {timeSlots.map(time => (
            <div key={time} className="time-slot">
              {time}
            </div>
          ))}
        </div>

        {/* 日期列 */}
        {weekDays.map(date => {
          const dayEvents = getEventsForDate(date);
          
          return (
            <div key={date.toISOString()} className="day-column">
              {/* 小时格子 */}
              {timeSlots.map(time => (
                <div key={time} className="hour-slot" />
              ))}
              
              {/* 事件块 */}
              {dayEvents.map(event => {
                const style = calculateEventStyle(event);
                
                return (
                  <div
                    key={event.id}
                    className={`event-block ${event.type}`}
                    style={style}
                    title={event.description}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('周视图事件被点击:', event);
                      if (onEventClick) {
                        console.log('调用父组件的onEventClick回调');
                        onEventClick(event);
                      } else {
                        console.log('警告: onEventClick回调函数未提供');
                      }
                    }}
                  >
                    <div className="event-title">{event.title}</div>
                    <div className="event-time">
                      {event.startTime.split(' ')[1]} - {event.endTime.split(' ')[1]}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        
        {/* 当前时间线 */}
        {getCurrentTimeLine()}
      </div>
    </div>
  );
};

export default WeekView; 