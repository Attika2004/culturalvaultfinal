// src/pages/WaghaBorder.jsx
import React, { useState } from "react";
import "./LahoreFort.css";

export default function WaghaBorder() {
  const [rating, setRating] = useState(4.7);
  const [numRatings, setNumRatings] = useState(150);
  const [numVisitors, setNumVisitors] = useState(420);

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: 1,
  });
  const [bookingStatus, setBookingStatus] = useState("");

  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const images = ["/4.1.jpg", "/4.2.jpg", "/4.3.jpg"];

  function handleInputChange(e) {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  }

  function handleBookingSubmit(e) {
    e.preventDefault();
    if (
      !bookingData.name.trim() ||
      !bookingData.email.trim() ||
      !bookingData.phone.trim() ||
      !bookingData.date.trim()
    ) {
      setBookingStatus("Please fill all required fields.");
      return;
    }

    setBookingStatus(
      `Thank you, ${bookingData.name}! Your tour booking for ${bookingData.date} has been sent. Our agent will contact you at ${bookingData.phone}.`
    );

    setBookingData({ name: "", email: "", phone: "", date: "", guests: 1 });
  }

  function handleReviewSubmit(e) {
    e.preventDefault();
    if (!reviewText.trim() || userRating === 0) return;
    setReviews((prev) => [...prev, { text: reviewText, rating: userRating }]);
    setReviewText("");
    setUserRating(0);
  }

  return (
    <div className="site-page">
      {/* Video at top */}
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
          src="/waghavideo.mp4"
        />
        <div className="video-overlay">
          <h1>Wagha Border</h1>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Images */}
        <div className="image-gallery">
          {images.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`Wagha Border ${idx + 1}`}
              className="gallery-img"
            />
          ))}
        </div>

      <section className="description-section">
  <h2>About Wagah Border</h2>
  <p>
    Wagah Border is the ceremonial border crossing between Pakistan and India, famous for the
    daily flag-lowering ceremony performed by soldiers of both countries. It is a symbol of national pride.
  </p>
  <p>
    📍 <b>Location:</b> Wagah, 30 km from Lahore city center<br/>
    🕰️ <b>Visiting Hours:</b> Flag-lowering ceremony daily around sunset (timing varies with seasons)<br/>
    🎫 <b>Entry Fee:</b> Small fee for entry to seating area<br/>
    ⚠️ <b>Tips:</b> Arrive early for the best view. Patriotic flags and attire add to the experience. Avoid carrying large bags.
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
            <button type="submit" className="btn-book">Submit Review</button>
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
            title="Wagha Border Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.1!2d74.0!3d31.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919022aaa:0x11111111111!2sWagha%20Border!5e0!3m2!1sen!2s!4v1700000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </div>
    </div>
  );
}
