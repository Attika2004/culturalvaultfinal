import React, { useState } from "react";
import "./LahoreFort.css";

export default function LahoreFort() {
  const images = ["/2.1.jpg", "/2.2.jpg", "/2.3.jpg", "/2.4.jpg"];

  const [rating] = useState(4.7);
  const [numRatings] = useState(198);
  const [numVisitors] = useState(540);

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
    <div className="fort-page">

      {/* VIDEO HEADER */}
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
          src="/lahorefort.mp4"
        />
        <div className="video-overlay">
          <h1>Lahore Fort</h1>
        </div>
      </div>

      <div className="content-wrapper">

        {/* IMAGES */}
        <div className="image-gallery">
          {images.map((img, idx) => (
            <img key={idx} src={img} alt="Lahore Fort" className="gallery-img" />
          ))}
        </div>

        {/* DESCRIPTION */}
       <section className="description-section">
  <h2>About Lahore Fort</h2>
  <p>
    Lahore Fort, also called Shahi Qila, is a UNESCO World Heritage Site located
    in the heart of Lahore, next to Badshahi Mosque. It was built and expanded by
    various Mughal emperors and stands as a majestic symbol of art, culture, and
    architectural excellence.
  </p>
  <p>
    Key attractions include Sheesh Mahal, Alamgiri Gate, Naulakha Pavilion, and
    royal gardens. The Fort showcases grandeur, intricate frescoes, and Mughal
    architecture.
  </p>
  <p>
    📍 <b>Location:</b> Inside Lahore Walled City, near Badshahi Mosque and Food Street.<br/>
    🕰️ <b>Visiting Hours:</b> Daily 9:00 AM – 5:00 PM<br/>
    🎫 <b>Entry Fee:</b> Small fee for locals; slightly higher for foreign tourists<br/>
    👕 <b>Dress Code:</b> Modest clothing; comfortable shoes for walking<br/>
    📌 <b>Nearby:</b> Badshahi Mosque, Minar-e-Pakistan, Fort Road Food Street<br/>
    ⚠️ <b>Tips:</b> Guided tours available; best visited early morning for fewer crowds.
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
            title="Lahore Fort Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27218.69209343613!2d74.3181626!3d31.5880539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919037bb2a9c2dd%3A0x198e148d464472b3!2sLahore%20Fort%20%F0%9F%94%A5!5e0!3m2!1sen!2s!4v1706523456789"
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
