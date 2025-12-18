import React, { useState } from "react";
import "./LahoreFort.css"; // you can reuse the same styling as LahoreFort.css

export default function Minar() {
  const images = ["/5.1.jpg", "/5.2.jpg", "/5.3.jpg"];

  const [rating] = useState(4.6);
  const [numRatings] = useState(145);
  const [numVisitors] = useState(420);

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
    if (
      !bookingData.name ||
      !bookingData.email ||
      !bookingData.phone ||
      !bookingData.date
    ) {
      setBookingStatus("Please fill all required fields.");
      return;
    }

    setBookingStatus(
      `Thank you, ${bookingData.name}! Your tour for ${bookingData.date} has been booked. Our agent will contact you at ${bookingData.phone}.`
    );

    setBookingData({
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: 1,
    });
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
          src="/minar.mp4"
        />
        <div className="video-overlay">
          <h1>Minar-e-Pakistan</h1>
        </div>
      </div>

      <div className="content-wrapper">

        {/* IMAGES */}
        <div className="image-gallery">
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={`Minar ${idx+1}`} className="gallery-img" />
          ))}
        </div>

        {/* DESCRIPTION */}
       <section className="description-section">
  <h2>About Minar-e-Pakistan</h2>
  <p>
    Minar-e-Pakistan is a national monument in Iqbal Park, Lahore, built to
    commemorate the Lahore Resolution passed on 23rd March 1940, which led to the
    creation of Pakistan. The monument combines modern and Mughal architectural styles.
  </p>
  <p>
    📍 <b>Location:</b> Iqbal Park, Lahore, near Lahore Fort and Badshahi Mosque<br/>
    🕰️ <b>Visiting Hours:</b> Daily 8:00 AM – 8:00 PM<br/>
    🎫 <b>Entry Fee:</b> Free<br/>
    ⚠️ <b>Tips:</b> Best visited in the evening for sunset photos; combine with nearby landmarks for a full cultural tour.
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
            title="Minar-e-Pakistan Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.345678!2d74.316!3d31.576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919a13b2c2e1e!2sMinar-e-Pakistan!5e0!3m2!1sen!2s!4v1706523456789"
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
