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
            The Badshahi Mosque, located in Lahore, Pakistan, is one of the
            city's most iconic landmarks and a masterpiece of Mughal architecture.
            Constructed in 1673 by Emperor Aurangzeb, it is one of the largest
            mosques in the world and a symbol of cultural heritage and history.
          </p>
          <p>
            The mosque is renowned for its grand scale, intricate marble and red
            sandstone work, and beautiful frescoes. It has been a place of
            worship and a symbol of the rich history of the region for centuries.
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