import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./UserProfile.module.css";
import { MdLocationPin } from "react-icons/md";


function UserProfile() {
    const [profileData, setProfileData] = useState(null);
    const [reviewData, setReviewData] = useState([]);
    const [accountData, setAccountData] = useState(null);
    const { account_id } = useParams();
    const { fetchWithCookie } = useToken();
    const navigate = useNavigate();

    const fetchProfileData = async () => {
        const URL = `${process.env.REACT_APP_API_HOST}/api/profile/${account_id}`;
        const response = await fetch(URL);
        if (response.ok) {
            const profileData = await response.json();
            setProfileData(profileData);
        }
        };
        const fetchReviewData = async () => {
        try {
            const URL = `${process.env.REACT_APP_API_HOST}/api/account_reviews?account_id=${account_id}`;
            const response = await fetch(URL);
            if (response.ok) {
            const reviewData = await response.json();
            const reviewsWithFacilityData = await Promise.all(
                reviewData.map(async (review) => {
                const facilityResponse = await fetch(
                    `${process.env.REACT_APP_API_HOST}/api/facility_details?park_code=${review.park_code}&facility_id=${review.facility_id}`
                );
                if (facilityResponse.ok) {
                    const facilityData = await facilityResponse.json();
                    return { ...review, facility: facilityData.name };
                } else {
                    return review;
                }
                })
            );
            setReviewData(reviewsWithFacilityData);
            }
        } catch (error) {
            console.error("Error fetching review data:", error);
            setReviewData([]);
        }
    };

    const fetchAccountData = async () => {
        try {
            const data = await fetchWithCookie(`${process.env.REACT_APP_API_HOST}/token`);
            if (data && data.account) {
                setAccountData(data.account);
            } else {
                setAccountData(null);
            }
        }catch (error) {
            console.error("Error fetching account data:", error);
            setAccountData(null);
        }
    };

    useEffect(() => {
        fetchProfileData();
        fetchReviewData();
        fetchAccountData();
    }, []);

    function rating(rating) {
        if (rating >= 0 && rating <= 5) {
            var stars = "";
            for (let num = 0; num < 5; num++) {
                if (num < rating) {
                    stars += "★";
                } else {
                    stars += "☆";
                }
            }
            return stars;
        }
    }

    const isProfileOwner = accountData &&profileData && accountData.id === account_id;

    if (profileData && profileData["account_id"] != null) {
        return (
          <div className={styles.profileBackground}>
            <div className="container d-flex justify-content-center align-items-center">
              <div id="profile-body" className="row mtb-5 me-4">
                <div className="card mb-5">
                  <div className="card inner-card m-3">
                    <div
                      className="card-header  d-flex  justify-content-between  align-items-center"
                      style={{
                        backgroundImage: `url(${profileData.banner_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        height: 300,
                      }}
                    >
                      {isProfileOwner && (
                        <button
                          className="btn btn-success align-self-end"
                          style={{ backgroundColor: "#464F2E" }}
                          onClick={() => navigate("/profile/edit")}
                        >
                          EDIT PROFILE
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="card m-3 ">
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={profileData.avatar}
                        alt=""
                        className=" rounded-circle"
                        style={{ height: "200px", width:"200px", padding: "10px" }}
                      />
                      <h3 className="text-center" id="title-name">
                        {`${profileData.first_name} ${profileData.last_name}`}
                      </h3>
                      <h5 className="text-center">
                        {`${profileData.location} `}
                        <MdLocationPin />
                      </h5>
                      <div className="card m-3 ">
                        <div className="text-center">
                          <h4>About Me</h4>
                          <hr />
                          <p
                            className="fw-light"
                            style={{ backgroundcolor: "#f8f9fa" }}
                          >
                            {profileData.description}
                          </p>
                        </div>
                      </div>
                      <div className="card m-3 ">
                        <div className="text-center">
                          <h3>Goals</h3>
                          <hr />
                          <p className="fw-light"> {profileData.goals}</p>
                        </div>
                      </div>
                      <div className="card m-3 ">
                        <div className="text-center">
                          <h3>Status</h3>
                          <hr />
                          <p className="fw-light"> {profileData.status} </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h2>Activity</h2>
                    </div>
                    <div className={styles.container}>
                      <div className="card" id="review-activity">
                        {reviewData.length > 0 ? (
                          <Carousel
                            responsive={{
                              superLargeDesktop: {
                                breakpoint: { max: 4000, min: 3000 },
                                items: 5,
                              },
                              desktop: {
                                breakpoint: { max: 3000, min: 1024 },
                                items: 3,
                              },
                              tablet: {
                                breakpoint: { max: 1024, min: 464 },
                                items: 2,
                              },
                              mobile: {
                                breakpoint: { max: 464, min: 0 },
                                items: 1,
                              },
                            }}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={4000}
                          >
                            {reviewData.map((review) => {
                              return (
                                <div key={review.id} className="review-slide">
                                  <div className="card">
                                    <div className="card-body">
                                      <img
                                        src={profileData.avatar}
                                        alt=""
                                        width="100"
                                        height="110"
                                        className="rounded-circle"
                                        style={{ height: "130px", width:"130px"}}
                                      />
                                    </div>
                                    <div
                                      className="text-center mt-3"
                                      id="review-post"
                                    >
                                      <div className="card-body">
                                        <h4>
                                          {review.first_name}  {review.last_name}
                                        </h4>
                                        <Link
                                          to={`/facility/${review.park_code}/${review.facility_id}`}
                                        >
                                          <h5>{review.facility}</h5>
                                        </Link>
                                        <div style={{ color: "#f1c232", fontSize: "25px"}}>
                                          {rating(review.rating)}
                                        </div>
                                        <div>{review.review}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </Carousel>
                        ) : (
                        <div className="text-center mt-4">
                          <p>No Activity</p>
                        </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p className="lead fw-normal  mt-4">Popular photos</p>
                    </div>
                    <div className="row g-2">
                      <div className="col mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                          alt=""
                          className="w-100 rounded-3"
                        />
                      </div>
                      <div className="col mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                          alt=""
                          className="w-100 rounded-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default UserProfile;
