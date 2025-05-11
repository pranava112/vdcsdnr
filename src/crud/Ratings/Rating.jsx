import React, { useEffect, useState } from "react";

import Api from "../others/Api"; // Ensure correct path to the Api instance
import ReactDOM from "react-dom";

const RatingPopup = ({ onClose, onSubmit }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3 className="profile">Rate this website:</h3>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setSelectedRating(star)}
            style={{
              fontSize: "30px",
              cursor: "pointer",
              color: star <= selectedRating ? "gold" : "gray",
            }}
          >
            ★
          </span>
        ))}
        <div>
          <button style={styles.button} onClick={() => onSubmit(selectedRating)}>
            Submit
          </button>
          <button style={styles.button} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Rating = () => {
  const [ratings, setRatings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await Api.get("/ratings");
        setRatings(response.data.map((item) => item.rating));
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, []);

  const handleRatingSubmit = async (newRating) => {
    if (newRating < 1 || newRating > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }
    try {
      await Api.post("/ratings", { rating: newRating });
      alert("Rating submitted successfully!");
      setRatings((prevRatings) => [...prevRatings, newRating]);
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating.");
    }
  };

  const calculateAverage = () => {
    if (ratings.length === 0) return 0;
    return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
  };

  const renderStars = (rating) => (
    <span>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: "18px",
            color: star <= rating ? "gold" : "gray",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );

  return (
    <div className="bg-gray-900 text-white p-4">
      <button style={styles.button} onClick={() => setShowPopup(true)}>
        Ratings
      </button>
      <p>
        App Rating: {renderStars(calculateAverage())} 
        {/* ({ratings.length} Members) */}
      </p>

      {showPopup && (
        <RatingPopup
          onClose={() => setShowPopup(false)}
          onSubmit={(rating) => {
            setShowPopup(false);
            handleRatingSubmit(rating);
          }}
        />
      )}
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  button: {
    marginTop: "10px",
    marginRight: "10px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "gray",
    borderRadius: "10px",
    color: "white",
    border: "none",
  },
};

export default Rating;
