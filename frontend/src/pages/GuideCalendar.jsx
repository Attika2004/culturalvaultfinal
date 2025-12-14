import React, { useState } from 'react';

const GuideCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024

  const bookings = [
    { date: '2024-12-10', site: 'Anarkali Bazaar', time: '05:00 PM', tourist: 'Ayesha Farooq', status: 'completed' },
    { date: '2024-12-12', site: 'Minar-e-Pakistan', time: '03:00 PM', tourist: 'Hassan Raza', status: 'completed' },
    { date: '2024-12-15', site: 'Badshahi Mosque', time: '09:00 AM', tourist: 'Ahmed Khan', status: 'confirmed' },
    { date: '2024-12-15', site: 'Lahore Fort', time: '02:00 PM', tourist: 'Sara Ali', status: 'confirmed' },
    { date: '2024-12-16', site: 'Shalimar Gardens', time: '10:00 AM', tourist: 'Usman Malik', status: 'pending' },
    { date: '2024-12-17', site: 'Wazir Khan Mosque', time: '11:00 AM', tourist: 'Fatima Noor', status: 'confirmed' },
    { date: '2024-12-18', site: 'Jahangir Tomb', time: '09:30 AM', tourist: 'Bilal Ahmed', status: 'pending' },
    { date: '2024-12-20', site: 'Personal Day', time: 'All Day', status: 'timeoff' },
    { date: '2024-12-22', site: 'Shahi Qila', time: '10:00 AM', tourist: 'Maria Shahid', status: 'confirmed' },
    { date: '2024-12-25', site: 'Christmas Holiday', time: 'All Day', status: 'timeoff' },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getBookingsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(booking => booking.date === dateStr);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#3b82f6';
      case 'timeoff': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>
        Calendar View
      </h1>

      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        {/* Calendar Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <button
            onClick={previousMonth}
            style={{
              padding: '10px 16px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              color: '#374151'
            }}
          >
            ← Previous
          </button>

          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
            {monthName}
          </h2>

          <button
            onClick={nextMonth}
            style={{
              padding: '10px 16px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              color: '#374151'
            }}
          >
            Next →
          </button>
        </div>

        {/* Day Headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          marginBottom: '8px'
        }}>
          {days.map(day => (
            <div key={day} style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#6b7280',
              padding: '12px',
              fontSize: '14px'
            }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px'
        }}>
          {/* Empty cells for days before month starts */}
          {[...Array(startingDayOfWeek)].map((_, index) => (
            <div key={`empty-${index}`} style={{
              minHeight: '120px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }} />
          ))}

          {/* Days of the month */}
          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            const dayBookings = getBookingsForDate(day);
            const isToday = day === 14; // December 14, 2024

            return (
              <div key={day} style={{
                minHeight: '120px',
                backgroundColor: isToday ? '#dbeafe' : 'white',
                border: isToday ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  fontWeight: 'bold',
                  color: isToday ? '#1e40af' : '#1f2937',
                  marginBottom: '8px',
                  fontSize: '16px'
                }}>
                  {day}
                </div>

                {dayBookings.map((booking, idx) => (
                  <div key={idx} style={{
                    backgroundColor: getStatusColor(booking.status) + '20',
                    borderLeft: `3px solid ${getStatusColor(booking.status)}`,
                    padding: '4px 6px',
                    marginBottom: '4px',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }}>
                    <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '2px' }}>
                      {booking.time}
                    </div>
                    <div style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '9px' }}>📍</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {booking.site}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#10b981', borderRadius: '4px' }} />
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Confirmed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#f59e0b', borderRadius: '4px' }} />
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Pending</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '4px' }} />
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Completed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '4px' }} />
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Time Off</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCalendar;