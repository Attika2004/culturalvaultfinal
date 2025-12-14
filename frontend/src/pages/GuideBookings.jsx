import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, Users, Check, X, Eye } from 'lucide-react';

const GuideBookings = () => {
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState('');
  
  const [bookings, setBookings] = useState([
    {
      id: 1,
      tourist: 'Ahmed Khan',
      email: 'ahmed.khan@email.com',
      phone: '+92 300 1234567',
      site: 'Badshahi Mosque',
      date: '2024-12-15',
      time: '09:00 AM',
      duration: '2 hours',
      tourists: 4,
      status: 'confirmed',
      amount: 'PKR 3,000'
    },
    {
      id: 2,
      tourist: 'Sara Ali',
      email: 'sara.ali@email.com',
      phone: '+92 301 7654321',
      site: 'Lahore Fort',
      date: '2024-12-15',
      time: '02:00 PM',
      duration: '3 hours',
      tourists: 2,
      status: 'confirmed',
      amount: 'PKR 2,500'
    },
    {
      id: 3,
      tourist: 'Usman Malik',
      email: 'usman.malik@email.com',
      phone: '+92 321 9876543',
      site: 'Shalimar Gardens',
      date: '2024-12-16',
      time: '10:00 AM',
      duration: '2.5 hours',
      tourists: 6,
      status: 'pending',
      amount: 'PKR 4,500'
    },
    {
      id: 4,
      tourist: 'Fatima Noor',
      email: 'fatima.noor@email.com',
      phone: '+92 333 2468135',
      site: 'Wazir Khan Mosque',
      date: '2024-12-17',
      time: '11:00 AM',
      duration: '2 hours',
      tourists: 3,
      status: 'confirmed',
      amount: 'PKR 2,800'
    },
    {
      id: 5,
      tourist: 'Hassan Raza',
      email: 'hassan.raza@email.com',
      phone: '+92 345 1357924',
      site: 'Minar-e-Pakistan',
      date: '2024-12-12',
      time: '03:00 PM',
      duration: '1.5 hours',
      tourists: 5,
      status: 'completed',
      amount: 'PKR 3,200'
    },
    {
      id: 6,
      tourist: 'Ayesha Farooq',
      email: 'ayesha.farooq@email.com',
      phone: '+92 312 8642097',
      site: 'Anarkali Bazaar',
      date: '2024-12-10',
      time: '05:00 PM',
      duration: '3 hours',
      tourists: 4,
      status: 'completed',
      amount: 'PKR 3,500'
    },
    {
      id: 7,
      tourist: 'Bilal Ahmed',
      email: 'bilal.ahmed@email.com',
      phone: '+92 300 5551234',
      site: 'Jahangir Tomb',
      date: '2024-12-18',
      time: '09:30 AM',
      duration: '2 hours',
      tourists: 2,
      status: 'pending',
      amount: 'PKR 2,200'
    }
  ]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAccept = (bookingId) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'confirmed' } : b
    ));
    const booking = bookings.find(b => b.id === bookingId);
    showNotification(`✓ Booking for ${booking.tourist} has been accepted!`);
  };

  const handleDecline = (bookingId) => {
    if (window.confirm('Are you sure you want to decline this booking?')) {
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      showNotification('Booking has been declined and removed.');
    }
  };

  const handleViewDetails = (booking) => {
    showNotification(`Opening details for ${booking.tourist}'s booking...`);
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return { bg: '#dcfce7', text: '#166534', border: '#10b981' };
      case 'pending': return { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' };
      case 'completed': return { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' };
      default: return { bg: '#f3f4f6', text: '#4b5563', border: '#9ca3af' };
    }
  };

  const getFilterCount = (status) => {
    if (status === 'all') return bookings.length;
    return bookings.filter(b => b.status === status).length;
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

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px', 
        flexWrap: 'wrap', 
        gap: '16px' 
      }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
            My Bookings
          </h1>
          <p style={{ color: '#6b7280' }}>
            Manage and track all your tour bookings
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'confirmed', 'pending', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: filter === status ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                cursor: 'pointer',
                fontWeight: '600',
                textTransform: 'capitalize',
                backgroundColor: filter === status ? '#3b82f6' : 'white',
                color: filter === status ? 'white' : '#6b7280',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (filter !== status) {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#d1d5db';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== status) {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.borderColor = '#e5e7eb';
                }
              }}
            >
              {status}
              <span style={{
                backgroundColor: filter === status ? 'rgba(255,255,255,0.3)' : '#e5e7eb',
                color: filter === status ? 'white' : '#6b7280',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {getFilterCount(status)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div style={{
          backgroundColor: 'white',
          padding: '60px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <h3 style={{ fontSize: '20px', color: '#1f2937', marginBottom: '8px' }}>
            No bookings found
          </h3>
          <p style={{ color: '#6b7280' }}>
            {filter === 'all' 
              ? 'You don\'t have any bookings yet.' 
              : `No ${filter} bookings at the moment.`}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredBookings.map(booking => {
            const statusStyle = getStatusColor(booking.status);
            return (
              <div key={booking.id} style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderLeft: `5px solid ${statusStyle.border}`,
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
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'start', 
                  marginBottom: '16px', 
                  flexWrap: 'wrap', 
                  gap: '12px' 
                }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                      {booking.tourist}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', color: '#6b7280' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Mail size={16} /> {booking.email}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Phone size={16} /> {booking.phone}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span style={{
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.text
                    }}>
                      {booking.status}
                    </span>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>
                      {booking.amount}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={20} color="#ef4444" />
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>Site</p>
                      <p style={{ fontWeight: '600', color: '#1f2937' }}>{booking.site}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Calendar size={20} color="#3b82f6" />
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>Date</p>
                      <p style={{ fontWeight: '600', color: '#1f2937' }}>{booking.date}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Clock size={20} color="#8b5cf6" />
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>Time & Duration</p>
                      <p style={{ fontWeight: '600', color: '#1f2937' }}>{booking.time} ({booking.duration})</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Users size={20} color="#f59e0b" />
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>Tourists</p>
                      <p style={{ fontWeight: '600', color: '#1f2937' }}>{booking.tourists} people</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  {booking.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleAccept(booking.id)}
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
                        <Check size={18} /> Accept
                      </button>
                      <button 
                        onClick={() => handleDecline(booking.id)}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#ef4444',
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
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                      >
                        <X size={18} /> Decline
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => handleViewDetails(booking)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#6b7280',
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
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
                  >
                    <Eye size={18} /> View Details
                  </button>
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

export default GuideBookings;