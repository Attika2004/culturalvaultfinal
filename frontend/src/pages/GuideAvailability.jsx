import React, { useState } from 'react';
import { Save, Plus, Trash2, Calendar, Clock } from 'lucide-react';

const GuideAvailability = () => {
  const [availability, setAvailability] = useState({
    monday: { morning: true, afternoon: true, evening: false },
    tuesday: { morning: true, afternoon: false, evening: true },
    wednesday: { morning: true, afternoon: true, evening: true },
    thursday: { morning: false, afternoon: true, evening: true },
    friday: { morning: true, afternoon: true, evening: false },
    saturday: { morning: true, afternoon: true, evening: true },
    sunday: { morning: false, afternoon: false, evening: false },
  });

  const [timeOffDates, setTimeOffDates] = useState([
    { id: 1, date: '2024-12-20', reason: 'Personal Day' },
    { id: 2, date: '2024-12-25', reason: 'Christmas Holiday' },
  ]);

  const [newTimeOff, setNewTimeOff] = useState({ date: '', reason: '' });
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const toggleSlot = (day, slot) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: !prev[day][slot]
      }
    }));
    showNotification(`${day.charAt(0).toUpperCase() + day.slice(1)} ${slot} slot updated!`);
  };

  const addTimeOff = () => {
    if (!newTimeOff.date) {
      showNotification('⚠️ Please select a date');
      return;
    }
    if (!newTimeOff.reason.trim()) {
      showNotification('⚠️ Please enter a reason');
      return;
    }

    const newEntry = { 
      id: Date.now(), 
      date: newTimeOff.date, 
      reason: newTimeOff.reason.trim() 
    };
    
    setTimeOffDates(prev => [...prev, newEntry].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    ));
    setNewTimeOff({ date: '', reason: '' });
    showNotification('✓ Time off request added successfully!');
  };

  const removeTimeOff = (id) => {
    const item = timeOffDates.find(t => t.id === id);
    if (window.confirm(`Remove time off for ${item.reason}?`)) {
      setTimeOffDates(prev => prev.filter(item => item.id !== id));
      showNotification('Time off request removed');
    }
  };

  const saveWeeklySchedule = () => {
    showNotification('✓ Weekly schedule saved successfully!');
  };

  const getSlotCounts = () => {
    const days = Object.keys(availability);
    const slots = ['morning', 'afternoon', 'evening'];
    let available = 0;
    
    days.forEach(day => {
      slots.forEach(slot => {
        if (availability[day][slot]) available++;
      });
    });

    return { available, total: days.length * slots.length };
  };

  const slotCounts = getSlotCounts();
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const slots = ['morning', 'afternoon', 'evening'];

  const getTimeRange = (slot) => {
    switch(slot) {
      case 'morning': return '6AM-12PM';
      case 'afternoon': return '12PM-6PM';
      case 'evening': return '6PM-10PM';
      default: return '';
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#10b981',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease'
        }}>
          {notification}
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
          Manage Availability
        </h1>
        <p style={{ color: '#6b7280' }}>
          Set your working hours and time off requests
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #10b981'
        }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Available Slots</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
            {slotCounts.available}/{slotCounts.total}
          </div>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #f59e0b'
        }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Time Off Requests</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>
            {timeOffDates.length}
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <Calendar size={24} color="#3b82f6" />
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
            Weekly Schedule
          </h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '12px', 
                  color: '#6b7280',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Day
                </th>
                {slots.map(slot => (
                  <th key={slot} style={{ 
                    textAlign: 'center', 
                    padding: '12px', 
                    color: '#6b7280',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    <div style={{ textTransform: 'capitalize' }}>{slot}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 'normal' }}>
                      {getTimeRange(slot)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day} style={{ backgroundColor: '#f9fafb' }}>
                  <td style={{ 
                    padding: '12px', 
                    fontWeight: '600', 
                    color: '#1f2937', 
                    textTransform: 'capitalize',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px'
                  }}>
                    {day}
                  </td>
                  {slots.map(slot => (
                    <td key={slot} style={{ textAlign: 'center', padding: '12px' }}>
                      <button
                        onClick={() => toggleSlot(day, slot)}
                        style={{
                          width: '100px',
                          padding: '10px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          margin: '0 auto',
                          backgroundColor: availability[day][slot] ? '#10b981' : '#ef4444',
                          color: 'white',
                          transition: 'all 0.2s',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                        }}
                      >
                        {availability[day][slot] ? (
                          <>✓ Open</>
                        ) : (
                          <>✕ Closed</>
                        )}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button 
          onClick={saveWeeklySchedule}
          style={{
            marginTop: '24px',
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          <Save size={18} /> Save Weekly Schedule
        </button>
      </div>

      {/* Time Off Requests */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <Clock size={24} color="#f59e0b" />
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
            Time Off Requests
          </h2>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '24px', 
          flexWrap: 'wrap',
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px'
        }}>
          <input
            type="date"
            value={newTimeOff.date}
            onChange={(e) => setNewTimeOff({ ...newTimeOff, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              flex: '1',
              minWidth: '200px',
              fontSize: '14px'
            }}
          />
          <input
            type="text"
            placeholder="Reason for time off"
            value={newTimeOff.reason}
            onChange={(e) => setNewTimeOff({ ...newTimeOff, reason: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addTimeOff()}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              flex: '2',
              minWidth: '250px',
              fontSize: '14px'
            }}
          />
          <button
            onClick={addTimeOff}
            style={{
              padding: '12px 24px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            <Plus size={18} /> Add Time Off
          </button>
        </div>

        {timeOffDates.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📅</div>
            <p>No time off requests yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {timeOffDates.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                borderLeft: '4px solid #f59e0b',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                    {new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p style={{ fontSize: '14px', color: '#92400e' }}>{item.reason}</p>
                </div>
                <button
                  onClick={() => removeTimeOff(item.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default GuideAvailability;