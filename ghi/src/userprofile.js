import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function UserProfile() {
    const [profileData, setProfileData] = useState(null);
    const [reviewData, setReviewData] = useState([]);
    const { token } = useToken();
    const { account_id } = useParams();

    const fetchProfileData = async () => {
        const URL = `http://localhost:8000/api/profile/${account_id}`;
        const response = await fetch(URL);
        if (response.ok) {
        const profileData = await response.json();
        setProfileData(profileData);
        console.log(profileData);
        }
    };
    const fetchReviewData = async () => {
        const URL = `http://localhost:8000/api/account_reviews?account_id=${account_id}`;
        const response = await fetch(URL);
        if (response.ok) {
        const reviewData = await response.json();
        setReviewData(reviewData);
        console.log(reviewData);
        }
    };

    useEffect(() => {
        fetchProfileData();
        fetchReviewData();
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

    if (profileData && profileData["account_id"] != null) {
        return (
        <div className="container">
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
                    <button className="btn btn-success align-self-end">
                    EDIT PROFILE
                    </button>
                </div>
                </div>
                <div className="card m-3 ">
                <div className="d-flex flex-column align-items-center">
                    <img
                    src={profileData.avatar}
                    alt=""
                    className="img-fluid img-thumbnail"
                    style={{ width: "150px", padding: "10px" }}
                    />
                    <h3 className="text-center">First LastName</h3>
                    <p className="text-center"> </p>
                    <div className="card m-3 ">
                    <div className="text-center">
                        <h4>About Me</h4>
                        <p
                        className="fw-light"
                        style={{ backgroundcolor: "#f8f9fa" }}
                        >
                        {" "}
                        {profileData.description}{" "}
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
                    <p className="mb-0">
                    <a href="#!" className="text-muted">
                        Show all
                    </a>
                    </p>
                </div>
                <div className="card">
                    <div className="row">
                    <div className="col-2">
                        <img
                        src={profileData.avatar}
                        alt=""
                        width="100"
                        height="110"
                        className=" rounded-circle"
                        />
                    </div>
                    <div className="col-10">
                        <div className="comment mt-4 text-justify float-left">
                        <h3>Reviews:</h3>
                        {reviewData.map((review) => {
                            const stars = rating(review.rating);
                            return (
                            <div className="card" key={review.id}>
                                <div className="card-body">
                                <p>
                                    {review.first_name} {review.last_name}
                                </p>
                                <p>Rating - {stars}</p>
                                <p>{review.review}</p>
                                </div>
                            </div>
                            );
                        })}

                        <h4>Name</h4>
                        <h5> CAMP LOCATION </h5>
                        <div> RATING ++++</div>
                        <span> date</span>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Accusamus numquam assumenda hic aliquam vero sequi
                            velit molestias doloremque molestiae dicta?
                        </p>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent photos</p>
                    <p className="mb-0">
                    <a href="#!" className="text-muted">
                        Show all
                    </a>
                    </p>
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
