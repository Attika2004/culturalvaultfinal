import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BadshahiMosque.css";

const sampleImages = [
  "/Badshahi1.jpg",
  "/Badshahi2.jpg",
  "/Badshahi3.jpg",
  "/Badshahi4.jpg",
];

export default function BadshahiMosque() {
  const navigate = useNavigate();
  
  const [rating] = useState(4.5);
  const [numRatings] = useState(112);
  const [numVisitors] = useState(380);

  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  function handleReviewSubmit(e) {
    e.preventDefault();
    if (!reviewText.trim() || userRating === 0) return;
    setReviews((prev) => [...prev, { text: reviewText, rating: userRating }]);
    setReviewText("");
    setUserRating(0);
  }

  return (
    <div className="badshahi-page">
      {/* Video Section */}
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
          src="/badshaivideo.mp4"
        />
        <div className="video-overlay">
          <h1>Badshahi Mosque</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-wrapper">
        
        {/* Image Gallery */}
        <div className="image-gallery">
          {sampleImages.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`Badshahi Mosque ${idx + 1}`}
              className="gallery-img"
            />
          ))}
        </div>

        {/* Description */}
        <section className="description-section">
  <h2>About Badshahi Mosque</h2>

  <p>
    The Badshahi Mosque, located in Lahore, Pakistan, is one of the city’s most
    iconic landmarks and a masterpiece of Mughal architecture. Constructed in
    1673 by Emperor Aurangzeb, it is among the largest mosques in the world and
    stands as a powerful symbol of Islamic culture and Mughal heritage.
  </p>

  <p>
    Built using red sandstone with marble inlay, the mosque is renowned for its
    massive courtyard, grand domes, and towering minarets. For centuries, it has
    remained a place of worship, history, and spiritual peace.
  </p>

  <h3>📍 Location</h3>
  <p>
    Badshahi Mosque is located in the heart of Lahore, right next to the Lahore
    Fort (Shahi Qila) and opposite Minar-e-Pakistan, inside the historic Walled
    City (Androon Lahore).
  </p>

  <ul>
    <li>Lahore Fort (walking distance)</li>
    <li>Minar-e-Pakistan</li>
    <li>Fort Road Food Street</li>
    <li>Data Darbar (short drive)</li>
  </ul>

  <p>
    <strong>Tip:</strong> Search <em>“Badshahi Mosque Lahore”</em> on Google Maps
    to reach the main entrance directly.
  </p>

  <h3>🕰️ Visiting Timings</h3>
  <ul>
    <li><strong>Morning:</strong> 8:00 AM – 12:00 PM</li>
    <li><strong>Afternoon:</strong> 2:00 PM – 5:00 PM</li>
    <li><strong>Evening:</strong> 6:00 PM – 8:00 PM</li>
  </ul>

  <p>
    The mosque is temporarily closed during prayer times, especially on Fridays
    (Jumma) and Eid prayers.
  </p>

  <p>
    <strong>Best time to visit:</strong> Early morning for peace or evening
    before sunset for photography.
  </p>

  <h3>🧍 Who Can Visit?</h3>
  <ul>
    <li>Muslims and non-Muslims are welcome</li>
    <li>Families, solo travelers, and tour groups</li>
    <li>Visitors from all countries</li>
  </ul>

  <h3>👕 Dress Code</h3>
  <ul>
    <li><strong>Men:</strong> Long pants, covered shoulders</li>
    <li><strong>Women:</strong> Long sleeves, long trousers/skirt, headscarf</li>
    <li>No shorts, sleeveless, or tight clothing</li>
  </ul>

  <p>Headscarves are usually available at the entrance if needed.</p>

  <h3>🎫 Entry Fee</h3>
  <ul>
    <li>Pakistani visitors: Free</li>
    <li>Foreign tourists: Small fee (may vary)</li>
  </ul>

  <h3>🏛️ Why Is It Important?</h3>
  <ul>
    <li>Built in 1673 by Emperor Aurangzeb</li>
    <li>Once the largest mosque in the world</li>
    <li>Capacity of over 100,000 worshippers</li>
    <li>One of Pakistan’s most photographed landmarks</li>
  </ul>

  <h3>🏗️ What You’ll See Inside</h3>
  <ul>
    <li>Vast red sandstone courtyard</li>
    <li>Three white marble domes</li>
    <li>Four towering minarets</li>
    <li>Islamic calligraphy and Mughal designs</li>
    <li>Peaceful prayer hall</li>
  </ul>

  <p>
    Photography is allowed, but visitors should avoid taking photos during
    prayers and always respect worshippers.
  </p>

  <h3>🍽️ Nearby Facilities</h3>
  <ul>
    <li>Fort Road Food Street</li>
    <li>Local tea stalls</li>
    <li>Souvenir shops</li>
    <li>Rickshaws and taxis</li>
  </ul>

  <p>Washrooms and ablution (wudu) areas are available.</p>

  <h3>🚗 How to Get There</h3>
  <ul>
    <li>By car: Parking near Lahore Fort</li>
    <li>Ride-hailing apps: Uber, Careem, InDrive</li>
    <li>Rickshaw: Affordable for short distances</li>
  </ul>

  <h3>⚠️ Important Tips</h3>
  <ul>
    <li>Leave shoes in the designated area</li>
    <li>Carry water during summer</li>
    <li>Avoid unofficial guides asking for money</li>
    <li>Respect prayer times and local customs</li>
  </ul>

  <h3>🌟 Best Experience Tip</h3>
  <p>
    Visit Badshahi Mosque, Lahore Fort, and Fort Road Food Street in one trip for
    a complete cultural, historical, and food experience.
  </p>
</section>

        {/* Stats */}
        <section className="stats-section">
          <div className="stat-box">
            <h3>Rating</h3>
            <p>{rating} / 5 ★</p>
            <p>{numRatings} people rated</p>
          </div>
          <div className="stat-box">
            <h3>Visitors</h3>
            <p>{numVisitors} visitors booked tours</p>
          </div>
        </section>

        {/* Reviews */}
        <section className="review-section">
          <h2>Reviews</h2>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <label>
              Your Rating:
              <select
                value={userRating}
                onChange={(e) => setUserRating(Number(e.target.value))}
                required
              >
                <option value={0}>Select Rating</option>
                <option value={1}>1 ★</option>
                <option value={2}>2 ★</option>
                <option value={3}>3 ★</option>
                <option value={4}>4 ★</option>
                <option value={5}>5 ★</option>
              </select>
            </label>
            <label>
              Review:
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="btn-book">
              Submit Review
            </button>
          </form>

          <div className="reviews-list">
            {reviews.map((rev, idx) => (
              <div key={idx} className="review-card">
                <p>{rev.text}</p>
                <p>Rating: {rev.rating} ★</p>
              </div>
            ))}
          </div>
        </section>

        {/* Map */}
        <section className="map-section">
          <h2>Location</h2>
          <iframe
            title="Badshahi Mosque Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.9836331451226!2d74.34528161500414!3d31.58892708134813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190306f5b8f5a1%3A0x694f5e5f2c7b3dfd!2sBadshahi%20Mosque!5e0!3m2!1sen!2s!4v1701300000000!5m2!1sen!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </section>
      </div>
    </div>
  );
}