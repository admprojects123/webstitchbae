import React, { useState, useEffect } from "react";
import styles from "./ProductDisReview.module.css";
import { domain } from "../../../api.service";
import { useNavigate } from "react-router-dom";

const ProductDisReview = ({ productId, discription }) => {
  const navigate = useNavigate();

  // Tabs and overall review states
  const [activeTab, setActiveTab] = useState("description");
  const [reviewData, setReviewData] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [error, setError] = useState(null);

  // Popup Modal state for add/edit review
  const [showPopup, setShowPopup] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [reviewFormData, setReviewFormData] = useState({ stars: 5, comment: "" });

  // User review states (for the logged in user)
  const [userReview, setUserReview] = useState(null);

  // Check for user authentication
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const token = sessionStorage.getItem("authToken");
  const isLoggedIn = token && userData;
  const userId = isLoggedIn ? userData.id : null;

  // Fetch overall review data for the product
  useEffect(() => {
    const fetchReviewData = async () => {
      setLoadingReviews(true);
      try {
        const response = await fetch(
          `${domain}/user/productReviewDetails/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch review data.");
        }
        const data = await response.json();
        setReviewData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
      setLoadingReviews(false);
    };

    if (productId) {
      fetchReviewData();
    }
  }, [productId]);

  // Fetch logged-in user's review (if exists)
  useEffect(() => {
    if (isLoggedIn && productId && userId) {
      const fetchUserReview = async () => {
        try {
          const response = await fetch(
            `${domain}/user/product/${productId}/user/${userId}/review`,
           { headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },}
          );
          if (response.ok) {
            const data = await response.json();
            // When review found, set the user review
            setUserReview(data.review);
          } else if (response.status === 404) {
            setUserReview(null);
          }
        } catch (err) {
          console.error("Error fetching user review:", err);
        }
      };
      fetchUserReview();
    }
  }, [productId, userId, isLoggedIn]);

  // Handler to open popup for add or edit review
  const openReviewPopup = (mode) => {
    setFormMode(mode);
    if (mode === "edit" && userReview) {
      setReviewFormData({
        stars: userReview.stars,
        comment: userReview.comment,
      });
    } else {
      setReviewFormData({ stars: 5, comment: "" });
    }
    setShowPopup(true);
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle review submission for add or edit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const { stars, comment } = reviewFormData;
    try {
      let url = "";
      let method = "";
      let body = {};

      if (formMode === "edit") {
        // Update review API call
        url = `${domain}/user/product/${productId}/user/${userId}/updateReview`;
        method = "PUT";
        body = JSON.stringify({ stars: parseInt(stars), comment });
      } else {
        // Add review API call
        // Adjust the endpoint if needed; here we're assuming a POST route exists.
        url = `${domain}/user/productReview`;
        method = "POST";
        body = JSON.stringify({ productId, userId, stars: parseInt(stars), comment });
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      if (!response.ok) {
        throw new Error("Review submission failed.");
      }

      const data = await response.json();

      // After successful submission, update the user's review state.
      setUserReview(formMode === "edit" ? data.updatedReview || data.review : data.review);
      setShowPopup(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Destructure overallReview and topReviews from fetched data
  const overallReview = reviewData?.overallReview || { avgRating: 0, totalReviews: 0 };
  const topReviews = reviewData?.topReviews || [];

  return (
    <div className={styles.container}>
      {/* Tab Buttons */}
      <div className={styles.tabButtons}>
        <button
          className={
            activeTab === "description" ? styles.activeTabButton : styles.tabButton
          }
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={
            activeTab === "reviews" ? styles.activeTabButton : styles.tabButton
          }
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <hr />

      {/* Description Section */}
      {activeTab === "description" && (
  <div className={styles.descriptionSection}>
    <h2 style={{ margin: "0px" }}>Description</h2>
    <div className={styles.descriptionContent}>
      {discription.split('\n').map((paragraph, index) => (
        paragraph.trim() ? <p key={index}>{paragraph.trim()}</p> : null
      ))}
    </div>
  </div>
)}

      {/* Reviews Section */}
      {activeTab === "reviews" && (
        <div className={styles.reviewsSection}>
          <h2>Reviews</h2>
          {loadingReviews ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <>
              {/* Overall Review Data */}
              <div className={styles.overallReview}>
                <span className={styles.avgRating}>
                  Overall Rating: {overallReview.avgRating} / 5
                </span>
                <span className={styles.totalReviews}>
                  ({overallReview.totalReviews} reviews)
                </span>
              </div>

            

              {/* Popup Modal for Add/Edit Review */}
              {showPopup && (
                <div className={styles.popupOverlay}>
                  <div className={styles.popupContent}>
                    <h3>{formMode === "edit" ? "Edit Your Review" : "Add Your Review"}</h3>
                    <form onSubmit={handleReviewSubmit}>
                      <label>
                        Rating:
                        <select
                          name="stars"
                          value={reviewFormData.stars}
                          onChange={handleInputChange}
                          required
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>
                              {star} Star{star > 1 && "s"}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Comment:
                        <textarea
                          name="comment"
                          value={reviewFormData.comment}
                          onChange={handleInputChange}
                          required
                        />
                      </label>
                      <div className={styles.popupButtons}>
                        <button type="submit" className={styles.primaryButton}>
                          {formMode === "edit" ? "Update Review" : "Submit Review"}
                        </button>
                        <button type="button" onClick={() => setShowPopup(false)} className={styles.cancelButton}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Display Other Reviews */}
{(isLoggedIn
  ? topReviews.filter((review) => review.userId._id !== userId)
  : topReviews
).length > 0 ? (
  <div className={styles.rootReview}>
    {(isLoggedIn
      ? topReviews.filter((review) => review.userId._id !== userId)
      : topReviews
    ).map((review) => (
      <div key={review._id} className={styles.reviewCard}>
        <div className={styles.reviewHeader}>
          <span className={styles.userName}>{review.userId.name}</span>
          <span className={styles.rating}>
            {Array(review.stars).fill("★").join("")}
          </span>
        </div>
        <p className={styles.comment}>{review.comment}</p>
        <small className={styles.date}>
          {new Date(review.createdAt).toLocaleDateString()}
        </small>
      </div>
    ))}
  </div>
) : (
  <p className={styles.noReviews}>
    No reviews available for this product.
  </p>
)}

                {/* Logged in user review UI */}
                {isLoggedIn && (
                <div className={styles.rootReview}>
                  {userReview ? (
                    <div className={styles.reviewCard}>
                      <h3 style={{"margin":"0px"}}>Your Review</h3>
                      <p className={styles.rating}>
                        {Array(userReview.stars).fill("★").join("")}
                      </p>
                      <p className={styles.comment}>{userReview.comment}</p>
                      <small className={styles.date}>
                        {new Date(userReview.createdAt).toLocaleDateString()}
                      </small>
                      <button onClick={() => openReviewPopup("edit")} className={styles.primaryButton}>
                        Edit Review
                      </button>
                    </div>
                  ) : (
                    <button style={{"width":"100px"}} onClick={() => openReviewPopup("add")}  >
                      Add Review
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDisReview;
