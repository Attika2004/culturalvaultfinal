import React, { useState } from "react";
import "./LahoreFort.css"; // same CSS used for other site pages

export default function FoodStreet() {
  const [rating, setRating] = useState(4.7);
  const [numRatings, setNumRatings] = useState(95);
  const [numVisitors, setNumVisitors] = useState(270);

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

  const images = [
    "/10.1.jpg",
    "/10.2.jpg",
    "/10.3.jpg"
   
  ];

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
      `Thank you, ${bookingData.name}! Your Food Street tour booking for ${bookingData.date} has been sent. Our agent will contact you at ${bookingData.phone}.`
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
      <div className="video-container">
        <video autoPlay loop muted playsInline className="video-bg" src="/foodstreet.mp4" />
        <div className="video-overlay">
          <h1>Food Street</h1>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="image-gallery">
          {images.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt={`Food Street ${idx + 1}`} className="gallery-img" />
          ))}
        </div>

        <section className="description-section">
  <h2>About Food Street</h2>
  <p>
    Lahore's Food Street, located on Fort Road near Badshahi Mosque, is a bustling hub
    for traditional Pakistani cuisine. Visitors can enjoy street food, live cultural
    ambiance, and beautiful views of historical landmarks.
  </p>
  <p>
    📍 <b>Location:</b> Fort Road, Lahore, opposite Badshahi Mosque<br/>
    🕰️ <b>Visiting Hours:</b> Daily 5:00 PM – 12:00 AM<br/>
    🎫 <b>Entry Fee:</b> Free (pay for food)<br/>
    ⚠️ <b>Tips:</b> Best during evening; peak hours can be crowded; ideal for photos with illuminated monuments.
  </p>
</section>


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

        <section className="review-section">
          <h2>Reviews</h2>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <label>
              Your Rating:
              <select value={userRating} onChange={(e) => setUserRating(Number(e.target.value))} required>
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
              <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} required />
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

        <section className="map-section">
          <h2>Location</h2>
          <iframe
            title="Food Street Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.123456!2d74.353!3d31.588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919037bb2a9c2dd%3A0xabcdef123456!2sFood%20Street%2C%20Lahore!5e0!3m2!1sen!2s!4v1706523456789"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </div>
    </div>
  );
}
