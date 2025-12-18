import React, { useState } from "react";
import "./LahoreFort.css"; // you can reuse the same CSS as other site pages

export default function WazirKhan() {
  const images = ["/7.2.jpg", "/7.3.jpg", "/7.4.jpg"];

  const [rating] = useState(4.7);
  const [numRatings] = useState(120);
  const [numVisitors] = useState(400);

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

  function handleInputChange(e) {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  }

  function handleBookingSubmit(e) {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.date) {
      setBookingStatus("Please fill all required fields.");
      return;
    }

    setBookingStatus(
      `Thank you, ${bookingData.name}! Your tour for ${bookingData.date} has been booked. Our agent will contact you at ${bookingData.phone}.`
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

      {/* VIDEO */}
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
          src="/wazir.mp4"
        />
        <div className="video-overlay">
          <h1>Wazir Khan Mosque</h1>
        </div>
      </div>

      <div className="content-wrapper">

        {/* IMAGES */}
        <div className="image-gallery">
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={`Wazir Khan Mosque ${idx + 1}`} className="gallery-img" />
          ))}
        </div>

        {/* DESCRIPTION */}
       <section className="description-section">
  <h2>About Wazir Khan Mosque</h2>
  <p>
    Wazir Khan Mosque, built in the 17th century during the reign of Emperor Shah Jahan,
    is a masterpiece of Mughal architecture. It is famous for its intricate faience tile work
    and frescoes. Located in Lahore's Walled City, it is a major cultural and historical landmark.
  </p>
  <p>
    📍 <b>Location:</b> Walled City of Lahore, near Delhi Gate<br/>
    🕰️ <b>Visiting Hours:</b> Daily 8:00 AM – 6:00 PM; closed during Friday prayers<br/>
    🎫 <b>Entry Fee:</b> Free<br/>
    👕 <b>Dress Code:</b> Modest clothing; headscarf for women recommended<br/>
    ⚠️ <b>Tips:</b> Photography allowed but avoid during prayers; carry water; combine visit with a walk through the Walled City.
  </p>
</section>


        {/* STATS */}
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

        {/* REVIEWS */}
        <section className="review-section">
          <h2>Reviews</h2>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <label>
              Rating:
              <select
                value={userRating}
                onChange={(e) => setUserRating(Number(e.target.value))}
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
              />
            </label>

            <button className="btn-book">Submit Review</button>
          </form>

          <div className="reviews-list">
            {reviews.map((r, idx) => (
              <div className="review-card" key={idx}>
                <p>{r.text}</p>
                <p>Rating: {r.rating} ★</p>
              </div>
            ))}
          </div>
        </section>

        

        {/* MAP */}
        <section className="map-section">
          <h2>Location</h2>
          <iframe
            title="Wazir Khan Mosque Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.456!2d74.329!3d31.580!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919037b2c3e2d!2sWazir%20Khan%20Mosque!5e0!3m2!1sen!2s!4v1706523456789"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </section>

      </div>
    </div>
  );
}
