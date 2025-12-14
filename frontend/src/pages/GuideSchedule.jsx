import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Phone, Mail, Navigation } from 'lucide-react';

const GuideSchedule = () => {
  const [selectedDate, setSelectedDate] = useState('2024-12-15');
  const [notification, setNotification] = useState('');
  
  const [scheduleData, setScheduleData] = useState({
    '2024-12-15': [
      {
        id: 1,
        time: '09:00 AM - 11:00 AM',
        tourist: 'Ahmed Khan',
        touristCount: 4,
        site: 'Badshahi Mosque',
        siteAddress: 'Walled City, Lahore',
        description: 'Guided tour of the historical Badshahi Mosque, including the main prayer hall, courtyard, and surrounding architecture.',
        route: ['Meet at main entrance', 'Prayer Hall', 'Courtyard', 'Minarets view', 'Exit through gift shop'],
        notes: 'Tourists requested special focus on Mughal architecture. One tourist has mobility issues - arrange wheelchair.',
        status: 'upcoming',
        phone: '+92 300 1234567',
        email: 'ahmed.khan@email.com'
      },
      {
        id: 2,
        time: '02:00 PM - 05:00 PM',
        tourist: 'Sara Ali',
        touristCount: 2,
        site: 'Lahore Fort',
        siteAddress: 'Fort Road, Walled City, Lahore',
        description: 'Comprehensive tour of Lahore Fort including Sheesh Mahal, Diwan-e-Aam, and Picture Wall.',
        route: ['Alamgiri Gate entrance', 'Diwan-e-Aam', 'Sheesh Mahal', 'Picture Wall', 'Naulakha Pavilion'],
        notes: 'Couple interested in photography - allow extra time at Picture Wall. They speak English.',
        status: 'upcoming',
        phone: '+92 301 7654321',
        email: 'sara.ali@email.com'
      }
    ],
    '2024-12-16': [
      {
        id: 3,
        time: '10:00 AM - 12:30 PM',
        tourist: 'Usman Malik',
        touristCount: 6,
        site: 'Shalimar Gardens',
        siteAddress: 'Grand Trunk Road, Lahore',
        description: 'Walking tour of the UNESCO World Heritage Site with focus on Mughal garden design and water features.',
        route: ['Lower terrace', 'Middle terrace fountains', 'Upper terrace', 'Royal pavilions', 'Water cascades'],
        notes: 'Large family group with children. Need to maintain engaging pace. Pending confirmation.',
        status: 'pending',
        phone: '+92 321 9876543',
        email: 'usman.malik@email.com'
      }
    ],
    '2024-12-17': [
      {
        id: 4,
        time: '11:00 AM - 01:00 PM',
        tourist: 'Fatima Noor',
        touristCount: 3,
        site: 'Wazir Khan Mosque',
        siteAddress: 'Walled City, Lahore',
        description: 'Detailed tour focusing on the intricate tile work and calligraphy of this 17th-century mosque.',
        route: ['Chowk entrance', 'Prayer hall', 'Tile work details', 'Calligraphy panels', 'Courtyard'],
        notes: 'Group interested in Islamic art and architecture. Mother and two daughters, all speak Urdu.',
        status: 'confirmed',
        phone: '+92 333 2468135',
        email: 'fatima.noor@email.com'
      }
    ],
    '2024-12-18': [
      {
        id: 5,
        time: '09:30 AM - 11:30 AM',
        tourist: 'Bilal Ahmed',
        touristCount: 2,
        site: 'Jahangir Tomb',
        siteAddress: 'Shahdara, Lahore',
        description: 'Tour of Emperor Jahangir\'s mausoleum with focus on Mughal funerary architecture.',
        route: ['Main entrance', 'Garden walkway', 'Tomb chamber', 'Minarets', 'Surrounding gardens'],
        notes: 'Young couple on honeymoon. Pending confirmation - follow up required.',
        status: 'pending',
        phone: '+92 300 5551234',
        email: 'bilal.ahmed@email.com'
      }
    ]
  });

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleViewDetails = (item) => {
    showNotification(`Opening full details for ${item.tourist}'s tour...`);
  };

  const handleContactTourist = (item) => {
    showNotification(`Contact info: ${item.phone} | ${item.email}`);
  };

  const handleConfirmBooking = (date, tourId) => {
    setScheduleData(prev => ({
      ...prev,
      [date]: prev[date].map(tour => 
        tour.id === tourId ? { ...tour, status: 'confirmed' } : tour
      )
    }));
    showNotification('✓ Booking confirmed successfully!');
  };

  const handleGetDirections = (address) => {
    showNotification(`Opening directions to: ${address}`);
  };

  const dates = Object.keys(scheduleData).sort();
  const selectedSchedule = scheduleData[selectedDate] || [];

  const getStatusStyle = (status) => {
    switch(status) {
      case 'confirmed':
        return { bg: '#dcfce7', text: '#166534', border: '#10b981', icon: '✓' };
      case 'pending':
        return { bg: '#fef3c7', text: '#92400e', border: '#f59e0b', icon: '⏳' };
      case 'upcoming':
        return { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6', icon: '📅' };
      default:
        return { bg: '#f3f4f6', text: '#4b5563', border: '#9ca3af', icon: '•' };
    }
  };

  const getTotalToursForDate = (date) => {
    return scheduleData[date]?.length || 0;
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
          My Schedule
        </h1>
        <p style={{ color: '#6b7280' }}>
          View and manage your tour schedule
        </p>
      </div>

      {/* Date Selector */}
      <div style={{
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px',
        display: 'flex',
        gap: '12px',
        overflowX: 'auto'
      }}>
        {dates.map(date => {
          const dateObj = new Date(date + 'T00:00:00');
          const isSelected = date === selectedDate;
          const tourCount = getTotalToursForDate(date);
          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                backgroundColor: isSelected ? '#dbeafe' : 'white',
                cursor: 'pointer',
                minWidth: '140px',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: isSelected ? '#1e40af' : '#1f2937'
              }}>
                {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '4px'
              }}>
                {tourCount} tour{tourCount !== 1 ? 's' : ''}
              </div>
            </button>
          );
        })}
      </div>

      {/* Schedule Items */}
      {selectedSchedule.length === 0 ? (
        <div style={{
          backgroundColor: 'white',
          padding: '60px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>No tours scheduled for this date</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {selectedSchedule.map((item, index) => {
            const statusStyle = getStatusStyle(item.status);
            return (
              <div key={item.id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                borderLeft: `6px solid ${statusStyle.border}`,
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}>
                {/* Header */}
                <div style={{
                  padding: '24px',
                  borderBottom: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        {statusStyle.icon} {item.status}
                      </span>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#1f2937'
                      }}>
                        Tour #{index + 1}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '16px' }}>
                      <Clock size={18} />
                      <span style={{ fontWeight: '600' }}>{item.time}</span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px'
                  }}>
                    <Users size={18} />
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>
                      {item.touristCount} tourist{item.touristCount > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  {/* Tourist & Site Info */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '24px'
                  }}>
                    <div>
                      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Tourist Name</p>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{item.tourist}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={16} color="#ef4444" /> Tour Site
                      </p>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{item.site}</p>
                      <button
                        onClick={() => handleGetDirections(item.siteAddress)}
                        style={{
                          fontSize: '14px',
                          color: '#3b82f6',
                          marginTop: '4px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 0'
                        }}
                      >
                        <Navigation size={14} /> {item.siteAddress}
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    marginBottom: '20px'
                  }}>
                    <p style={{ fontSize: '14px', color: '#1f2937', lineHeight: '1.6' }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Route */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <span style={{ fontSize: '20px' }}>🗺️</span>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>Tour Route</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px' }}>
                      {item.route.map((stop, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#10b981',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            flexShrink: 0
                          }}>
                            {idx + 1}
                          </div>
                          <p style={{ fontSize: '14px', color: '#374151' }}>{stop}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '8px',
                    borderLeft: '4px solid #f59e0b',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontSize: '18px' }}>ℹ️</span>
                      <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#92400e' }}>Important Notes</h3>
                    </div>
                    <p style={{ fontSize: '14px', color: '#92400e', lineHeight: '1.5' }}>
                      {item.notes}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap'
                  }}>
                    <button 
                      onClick={() => handleViewDetails(item)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                    >
                      View Full Details
                    </button>
                    <button 
                      onClick={() => handleContactTourist(item)}
                      style={{
                        padding: '10px 20px',
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
                      <Phone size={16} /> Contact Tourist
                    </button>
                    {item.status === 'pending' && (
                      <button 
                        onClick={() => handleConfirmBooking(selectedDate, item.id)}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
                      >
                        Confirm Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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

export default GuideSchedule;