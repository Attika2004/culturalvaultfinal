import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, TrendingUp, CheckCircle } from 'lucide-react';

const GuideDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 24,
    sitesManaged: 8,
    totalTourists: 156,
    hoursGuided: 96,
    completedTours: 18,
    upcomingTours: 4,
    pendingRequests: 2,
    earnings: 85000
  });

  const [upcomingBookings, setUpcomingBookings] = useState([
    { id: 1, tourist: 'Ahmed Khan', site: 'Badshahi Mosque', date: '2024-12-15', time: '09:00 AM', tourists: 4, status: 'confirmed' },
    { id: 2, tourist: 'Sara Ali', site: 'Lahore Fort', date: '2024-12-15', time: '02:00 PM', tourists: 2, status: 'confirmed' },
    { id: 3, tourist: 'Usman Malik', site: 'Shalimar Gardens', date: '2024-12-16', time: '10:00 AM', tourists: 6, status: 'pending' },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, activity: 'Completed tour at Minar-e-Pakistan', time: '2 hours ago', type: 'completed' },
    { id: 2, activity: 'Updated availability for next week', time: '5 hours ago', type: 'update' },
    { id: 3, activity: 'New booking received for Wazir Khan Mosque', time: '1 day ago', type: 'booking' },
    { id: 4, activity: 'Completed tour at Anarkali Bazaar', time: '2 days ago', type: 'completed' },
  ]);

  const [showNotification, setShowNotification] = useState('');

  const handleViewDetails = (booking) => {
    setShowNotification(`Viewing details for ${booking.tourist}'s tour at ${booking.site}`);
    setTimeout(() => setShowNotification(''), 3000);
  };

  const handleContactTourist = (booking) => {
    setShowNotification(`Opening contact details for ${booking.tourist}`);
    setTimeout(() => setShowNotification(''), 3000);
  };

  const handleConfirmBooking = (bookingId) => {
    setUpcomingBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: 'confirmed' } : b)
    );
    setStats(prev => ({ ...prev, pendingRequests: prev.pendingRequests - 1 }));
    setShowNotification('Booking confirmed successfully!');
    setTimeout(() => setShowNotification(''), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'completed': return '✓';
      case 'booking': return '📅';
      case 'update': return '🔄';
      default: return '•';
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      {/* Notification */}
      {showNotification && (
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
          {showNotification}
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: '#6b7280' }}>Welcome back! Here's your performance summary</p>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px', 
        marginBottom: '32px' 
      }}>
        {[
          { icon: <Calendar size={28} />, label: 'Total Bookings', value: stats.totalBookings, color: '#3b82f6', change: '+12%' },
          { icon: <MapPin size={28} />, label: 'Sites Managed', value: stats.sitesManaged, color: '#10b981', change: '+2' },
          { icon: <Users size={28} />, label: 'Total Tourists', value: stats.totalTourists, color: '#f59e0b', change: '+23%' },
          { icon: <Clock size={28} />, label: 'Hours Guided', value: stats.hoursGuided, color: '#8b5cf6', change: '+8h' },
        ].map((stat, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              fontSize: '32px',
              color: stat.color,
              backgroundColor: `${stat.color}20`,
              padding: '16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {stat.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>{stat.label}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{stat.value}</p>
                <span style={{ 
                  fontSize: '12px', 
                  color: '#10b981', 
                  backgroundColor: '#dcfce7',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        {/* Upcoming Bookings */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} color="#3b82f6" />
            Upcoming Bookings
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {upcomingBookings.map(booking => (
              <div key={booking.id} style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                borderLeft: `4px solid ${getStatusColor(booking.status)}`,
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>{booking.tourist}</p>
                    <p style={{ fontSize: '14px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} color="#ef4444" /> {booking.site}
                    </p>
                  </div>
                  <span style={{
                    backgroundColor: `${getStatusColor(booking.status)}20`,
                    color: getStatusColor(booking.status),
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {booking.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                  <span>📅 {booking.date}</span>
                  <span>🕐 {booking.time}</span>
                  <span>👥 {booking.tourists} tourists</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleViewDetails(booking)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleContactTourist(booking)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                  >
                    Contact
                  </button>
                  {booking.status === 'pending' && (
                    <button 
                      onClick={() => handleConfirmBooking(booking.id)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="#10b981" />
            Recent Activities
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivities.map(activity => (
              <div key={activity.id} style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                borderLeft: '4px solid #10b981',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <span style={{ 
                    fontSize: '20px',
                    backgroundColor: 'white',
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getActivityIcon(activity.type)}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#1f2937', marginBottom: '4px', lineHeight: '1.4' }}>{activity.activity}</p>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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

export default GuideDashboard;