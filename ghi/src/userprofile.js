import React from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function UserProfile() {
    const { token } = useAuthContext();

    if (token) {
        return (
            <div className="container">

                <div id="profile-body" className="row mt-5 me-3">
                    <div className="card mb-5">
                        <div className="card inner-card m-3">
                            <div
                                className="card-header  d-flex  justify-content-between  align-items-center"
                                style={{
                                backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp)",
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                                height: 300,
                                }}
                            >
                                <button className="btn btn-success align-self-end">
                                EDIT PROFILE
                                </button>
                            </div>
                            <div className="d-flex flex-column-reverse align-items-center">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt=""
                                    className="img-fluid img-thumbnail mt-4 mb-2"
                                    style={{ width: "150px", }}
                                />
                            </div>
                            < div>
                                <h3 className="text-center">First LastName</h3>
                                <p className="text-center"> Location</p>
                                <div className="text-center">
                                    <h4 >About Me</h4>
                                    <p className="fw-light" style={{backgroundcolor: "#f8f9fa;"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Donec enim diam vulputate ut pharetra sit amet aliquam. Gravida
                                    arcu ac tortor dignissim convallis aenean et. At ultrices mi tempus imperdiet nullaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Donec enim diam vulputate ut pharetra sit amet aliquam. Gravida
                                    arcu ac tortor dignissim convallis aenean et. At ultrices mi tempus imperdiet nulla</p>
                                </div>
                                <div className="text-center">
                                    Goals
                                    <p className="fw-light"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Donec enim diam vulputate ut pharetra sit amet aliquam. Gravida
                                    arcu ac tortor dignissim convallis aenean et. At ultrices mi tempus imperdiet nulla.</p>
                                </div>
                                <div className="text-center">
                                    Status
                                    <p className="fw-light"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Donec enim diam vulputate ut pharetra sit amet aliquam. Gravida
                                    arcu ac tortor dignissim convallis aenean et. At ultrices mi tempus imperdiet nulla</p>
                                </div>.
                            </div>
                        </div>
                        <div>
                            <h4 className="m-3">Activity</h4>
                            <div className="card m-3 ">
                                <div className="card-header d-flex flex-column">
                                <p className="mb-0">reviews</p>
                                <div className="card">
                                    <div className="row d-flex">
                                        <div className="">
                                            <img className="profile-pic" src="https://i.imgur.com/V3ICjlm.jpg" alt="" style={{ width: "80px", height: "80", marginright: "10" }}/>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <h3 className="mt-2 mb-0" >Vikram jit Singh</h3>
                                            <div>
                                                <p className="text-left"><span className="text-muted">4.0</span>
                                                <span className="fa fa-star star-active ml-3"></span>
                                                <span className="fa fa-star star-active"></span>
                                                <span className="fa fa-star star-active"></span>
                                                <span className="fa fa-star star-active"></span>
                                                <span className="fa fa-star star-inactive"></span></p>
                                            </div>
                                        </div>
                                        <div className="ml-auto">
                                            <p className="text-muted pt-5 pt-sm-3">10 Sept</p>
                                        </div>
                                    </div>
                                    <div className="row text-left">
                                        <h4 className="blue-text mt-3">"An awesome activity to experience"</h4>
                                        <p className="content">If you really enjoy spending your vacation 'on water' or would like to try something new and exciting for the first time.</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <p className="lead fw-normal mb-0">Recent photos</p>
                                <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                            </div>
                            <div className="row g-2">
                                <div className="col mb-2">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                    alt=""className="w-100 rounded-3"/>
                                </div>
                                <div className="col mb-2">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                    alt="" className="w-100 rounded-3"/>
                                </div>
                            </div>
                            <div className="row g-2">
                                <div className="col">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                    alt="" className="w-100 rounded-3"/>
                                </div>
                                <div className="col">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                    alt="" className="w-100 rounded-3"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );} else {
        return (
            <div className="d-center">
                <h4
                    className="alert alert-danger m-5 position-absolute top-50 start-50 translate-middle"
                    style={{ width: "600px" }}>
                    please log in and try again
                </h4>
            </div>
        );

        }
    }


export default UserProfile;
