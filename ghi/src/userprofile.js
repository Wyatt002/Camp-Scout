import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./UserProfile.module.css";




function UserProfile() {
    const [profileData, setProfileData] = useState(null);
    const [reviewData, setReviewData] = useState([]);
    const [accountData, setAccountData] = useState(null);
    const { account_id } = useParams();
    const { fetchWithCookie } = useToken();
    const navigate = useNavigate();

    const fetchProfileData = async () => {
        const URL = `http://localhost:8000/api/profile/${account_id}`;
        const response = await fetch(URL);
        if (response.ok) {
        const profileData = await response.json();
        setProfileData(profileData);
        }
    };
    const fetchReviewData = async () => {
        try {
            const URL = `http://localhost:8000/api/account_reviews?account_id=${account_id}`;
            const response = await fetch(URL);
            if (response.ok) {
                const reviewData = await response.json();
                const reviewsWithFacilityData = await Promise.all(
                    reviewData.map(async (review) => {
                    const facilityResponse = await fetch(
                        `http://localhost:8000/api/facility_details?facility_id=${review.facility_id}`
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
            <div className="container">
                <div id="profile-body" className="row mtb-5 me-4">
                    <div className="card mb-5">
                        <div className="card inner-card m-3">
                            <div className="card-header  d-flex  justify-content-between  align-items-center"
                                style={{
                                backgroundImage: `url(${profileData.banner_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                                height: 300,
                                }}>
                                {isProfileOwner && (
                                <button
                                    className="btn btn-success align-self-end"
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
                                style={{ height: "200px", padding: "10px" }} />
                            <h3 className="text-center" id="title-name">
                                {`${profileData.first_name} ${profileData.last_name}`}
                            </h3>
                            <p className="text-center">
                                {`${profileData.location} `}
                            </p>
                            <div className="card m-3 ">
                                <div className="text-center">
                                    <h4>About Me</h4>
                                    <p className="fw-light"
                                    style={{ backgroundcolor: "#f8f9fa" }} >
                                    {profileData.description}
                                    </p>
                                </div>
                            </div>
                            <div className="card m-3 ">
                                <div className="text-center">
                                    <h3>Goals</h3>
                                    <p className="fw-light"> {profileData.goals}</p>
                                </div>
                            </div>
                            <div className="card m-3 ">
                                <div className="text-center">
                                    <h3>Status</h3>
                                    <p className="fw-light"> {profileData.status} </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Activity</h2>
                    </div>
                    <div className="card" id="review-activity">
                        <div className={styles.container}>
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
                                autoPlaySpeed={4000}>
                                {reviewData.map((review) => {
                                return (
                                    <div key={review.id} className="review-slide">
                                        <div className="row">
                                            <div className="col-2" id="review-avatar">
                                                <img
                                                    src={profileData.avatar}
                                                    alt=""
                                                    width="100"
                                                    height="110"
                                                    className="rounded-circle"/>
                                            </div>
                                            <div className="col-10" id="review-post">
                                                <div className="comment mt-4 text-justify float-left">
                                                    <h4>
                                                        {review.first_name} {review.last_name}
                                                    </h4>
                                                    {review.facility && (<h5>{review.facility}</h5>)}
                                                    <div>
                                                        {rating(review.rating)}
                                                    </div>
                                                    <div>
                                                        {review.review}
                                                    </div>
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
                        <p className="lead fw-normal mb-0">Recent photos</p>
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
                    <div className="row g-2">
                        <div className="col">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                            alt=""
                            className="w-100 rounded-3"
                        />
                        </div>
                        <div className="col">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                            alt=""
                            className="w-100 rounded-3"
                        />
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
