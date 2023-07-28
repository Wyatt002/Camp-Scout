import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./FacilityDetail.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import AnchorLink from "react-anchor-link-smooth-scroll";

function Weather(facility) {
    const [active, setActive] = useState(false);
    const [weather, setWeather] = useState('');
    const prop = facility.facility;

    const getWeather = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/weather?lat=${prop.lat}&lon=${prop.lon}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setWeather(data);
            setActive(true);
        }
    }

    const dayArray = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    function DisplayWeather(day) {
        const prop = day.day;
        const forecastDate = new Date(prop.date);
        return (
            <div className="col" key={prop.date}>
                <div className={styles.weatherCard}>
                    <div className="card-body">
                        <p className="card-text"><strong>{ dayArray[forecastDate.getDay()] }</strong></p>
                        <img src={`https://openweathermap.org/img/w/${prop.weather_icon}.png`} />
                        <p className="card-text">Weather - { prop.weather } ({ prop.weather_description })</p>
                        <p className="card-text">Wind - { prop.wind }MPH</p>
                        <p className="card-text">Temperature - { prop.temp}°F</p>
                        <p className="card-text">Humidity - { prop.humidity }%</p>
                    </div>
                </div>
            </div>
        )
    }

    if (active === false) {
        return (
            <div className="card-body">
                <h3>Weather Overview</h3>
                <p>{ prop.weather_overview }</p>
                <button className={styles.getWeather} onClick={getWeather}>Get the weather!</button>
            </div>
        );
    } else if (active === true) {
        return (
            <div className="container">
                <div className="row text-center">
                    <DisplayWeather day={weather["1"]} />
                    <DisplayWeather day={weather["2"]} />
                    <DisplayWeather day={weather["3"]} />
                    <DisplayWeather day={weather["4"]} />
                    <DisplayWeather day={weather["5"]} />
                </div>
            </div>
        );
    }
}

function Reviews() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const { parkCode, facilityId } = useParams();
    const { token } = useToken()
    const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
    };

    const SubmitReview = (e) => {
        e.preventDefault();
        navigate(`/reviews/${parkCode}/${facilityId}`);
    }

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

    const fetchReviews = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/facility_reviews?facility_id=${facilityId}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setReviews(data);
        }
    }

    useEffect(() => {
        fetchReviews();
        }, []);

    return (
        <div className="card-body" id='Reviews'>
            <h3>Reviews</h3>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                centerMode={true}
            >
            {reviews.map((review) => {
                return (
                    <div className="card" key={review.id}>
                        <div className="card-body">
                            <Link to={`/profile/${review.account_id}/`}>
                                <h4>{ review.first_name } { review.last_name }</h4>
                            </Link>
                            <p style={{ color: "#f1c232", fontSize: "25px"}}> { rating(review.rating) }</p>
                            <p>{ review.review }</p>
                        </div>
                    </div>
                )
            })}
            </Carousel>
            {token && (
                <button onClick={SubmitReview} className={styles.leaveReview}>Leave a review!</button>
            )}
        </div>
    );
}

function OperatingHours(facility) {
    const prop = facility.facility;
    function ExceptionHours(facility) {
        const prop = facility.facility;
        if (prop["facility_id"] != null) {
            if (prop.operating_hours["0"].exceptions.length > 0) {
                const exception = prop.operating_hours["0"].exceptions["0"];
                return (
                    <>
                        <p>Exceptions ({ exception.name }):</p>
                        <p>Starts - { exception.startDate }</p>
                        <p>Ends - { exception.endDate }</p>
                        <ul key="exceptions">
                            <li key="eSunday">Sunday - { exception.exceptionHours.sunday }</li>
                            <li key="eMonday">Monday - { exception.exceptionHours.monday }</li>
                            <li key="eTuesday">Tuesday - { exception.exceptionHours.tuesday }</li>
                            <li key="eWednesday">Wednesday - { exception.exceptionHours.wednesday }</li>
                            <li key="eThursday">Thursday - { exception.exceptionHours.thursday }</li>
                            <li key="eFriday">Friday - { exception.exceptionHours.friday }</li>
                            <li key="eSaturday">Saturday - { exception.exceptionHours.saturday }</li>
                        </ul>
                    </>
                );
            } else {
                return (
                    <>
                    <h3>Exceptions:</h3>
                    <p>None</p>
                    </>
                );
            }
        }
    }
    if (prop["operating_hours" != []]) {
        return (
            <div className="card-body">
                <h3>Operating Hours:</h3>
                <p>{ facility.operating_hours["0"].description }</p>
                <p>Standard: </p>
                <ul key="operatingHours">
                    <li key="sunday">Sunday - { facility.operating_hours["0"].standardHours.sunday }</li>
                    <li key="monday">Monday - { facility.operating_hours["0"].standardHours.monday }</li>
                    <li key="tuesday">Tuesday - { facility.operating_hours["0"].standardHours.tuesday }</li>
                    <li key="wednesday">Wednesday - { facility.operating_hours["0"].standardHours.wednesday }</li>
                    <li key="thursday">Thursday - { facility.operating_hours["0"].standardHours.thursday }</li>
                    <li key="friday">Friday - { facility.operating_hours["0"].standardHours.friday }</li>
                    <li key="saturday">Saturday - { facility.operating_hours["0"].standardHours.saturday }</li>
                </ul>
                <ExceptionHours facility={facility} />
            </div>
        );
    }
}

function FacilityDetail() {
    const [facility, setFacility] = useState('');
    const { parkCode, facilityId } = useParams();
    const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1200 },
        items: 3,
    },
    desktop: {
        breakpoint: { max: 1200, min: 768 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 770, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
    };

    const fetchFacility  = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/facility_details?park_code=${parkCode}&facility_id=${facilityId}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setFacility(data);
        }
    }



    useEffect(() => {
        fetchFacility();
        }, []);

    if (facility["facility_id"] != null) {
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <div>
                                <div className={styles.facilityDetailContainer}>
                                    <h1>{facility.name}</h1>
                                </div>
                                <div className={styles.address}>
                                    <p style={{ fontWeight: 'bold' }} >Address</p>
                                    {facility.addresses.map(address => {
                                        return (
                                            <p key={address.line1}>
                                                { address.city }, { address.stateCode }, { address.postalCode } - { address.line1 }
                                            </p>
                                        )
                                    })}
                                </div>
                            <div className={styles.contactInfo}>
                                <p style={{ fontWeight: 'bold' }} >Contact Info</p>
                                {facility.contacts.emailAddresses.map(email =>
                                    <p key={email.emailAddress}>
                                        <FontAwesomeIcon icon={faEnvelope} color="#ba7000"/> {email.emailAddress} </p>
                                )}
                                {facility.contacts.phoneNumbers.map(phone =>
                                    <p key={phone.phoneNumber}>
                                        <FontAwesomeIcon icon={faPhone} color="#ba7000"/> {phone.phoneNumber} </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.reviewsScroll}>
                        <AnchorLink href='#Reviews'><a><strong>CampSites Reviews</strong></a></AnchorLink>
                    </div>
                    <div className={styles.container}>
                            <Carousel
                                responsive={responsive}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={6000}
                            >
                                {facility.images.map((image) => {
                                    return (
                                        <div>
                                            <img key={Math.random()} src={image.url} />
                                        </div>
                                    )
                                })}
                            </Carousel>
                    </div>
                    <hr />
                    <div className={styles.mainDetailContainer}>
                        <div className={styles.about}>
                            <h3>About</h3>
                                <p>{facility.description}</p>
                        </div>
                        <div className={styles.detailContainer}>
                            <div className={styles.section}>
                                <h3>Campsites</h3>
                                <p><strong>Total Campsites</strong> - { facility.campsites.totalSites }</p>
                                <p><strong>Electrical Hookups</strong> - { facility.campsites.electricalHookups }</p>
                                <p><strong>Group</strong> - { facility.campsites.group }</p>
                                <p><strong>Horse</strong> - { facility.campsites.horse }</p>
                                <p><strong>Other</strong> - { facility.campsites.other }</p>
                                <p><strong>RV Only</strong> - { facility.campsites.rvOnly }</p>
                                <p><strong>Tent Only</strong> - { facility.campsites.tentOnly }</p>
                                <p><strong>Walk Boat To</strong> - { facility.campsites.walkBoatTo }</p>
                            </div>
                            <div className={styles.section}>
                                <h3>Amenities</h3>
                                <p><strong>Amphitheater</strong> - { facility.amenities.amphitheater }</p>
                                <p><strong>Camp Store</strong> - { facility.amenities.campStore }</p>
                                <p><strong>Cell Reception</strong> - { facility.amenities.cellPhoneReception }</p>
                                <p><strong>Dump Station</strong> - { facility.amenities.dumpStation }</p>
                                <p><strong>Firewood</strong> - { facility.amenities.firewoodForSale }</p>
                                <p><strong>Food Storage</strong> - { facility.amenities.foodStorageLockers }</p>
                                <p><strong>Ice</strong> - { facility.amenities.iceAvailableForSale }</p>
                                <p><strong>Internet</strong> - { facility.amenities.internetConnectivity }</p>
                                <p><strong>Laundry</strong> - { facility.amenities.laundry }</p>
                                <p><strong>Potable Water</strong> - { facility.amenities.potableWater["0"] }</p>
                                <p><strong>Showers</strong> - { facility.amenities.showers["0"] }</p>
                                <p><strong>Staff on Site</strong> - { facility.amenities.staffOrVolunteerHostOnsite }</p>
                                <p><strong>Toilets</strong> - { facility.amenities.toilets["0"] }</p>
                                <p><strong>Trash Collection Point</strong> - { facility.amenities.trashRecyclingCollection }</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.weatherOverview}>
                        <Weather facility={facility} />
                    </div>
                    <hr />
                    <div className={styles.accessibility}>
                        <h3>Accessibility</h3>
                    </div>
                    <div className={styles.accessibility}>
                        <div className={styles.individual}>
                            {facility.accessibility.accessRoads.map(road => {
                                return (
                                    <p key={Math.random}>
                                        { road }
                                    </p>
                                )
                            })}
                        </div>
                        <div className={styles.individual}>
                            <p>{ facility.accessibility.adaInfo }</p>
                        </div>
                        <div className={styles.individual}>
                            <p><strong>Cell Phone Info</strong> - { facility.accessibility.cellPhoneInfo }</p>
                            {facility.accessibility.classifications.map((classification) => (
                            <p key={Math.random()}><strong>Classification</strong> - {classification}</p>
                            ))}
                        </div>
                        <div className={styles.individual}>
                            <p><strong>Fire Stove Policy</strong> - { facility.accessibility.fireStovePolicy }</p>
                        </div>
                        <div className={styles.individual}>
                            <p><strong>Internet Info</strong> - { facility.accessibility.internetInfo }</p>
                        </div>
                        <div className={styles.individual}>
                            <p>
                                <strong>RV Info</strong> - { facility.accessibility.rvInfo }
                                , <strong>Allowed</strong> - { facility.accessibility.rvAllowed }
                                , <strong>Max Length</strong> - { facility.accessibility.rvMaxLength }
                            </p>
                        </div>
                        <div className={styles.individual}>
                            <p>
                                <strong>Trailer Info</strong> - { facility.accessibility.trailerInfo }
                                , <strong>Max Length</strong> - { facility.accessibility.trailerMaxLength }
                            </p>
                        </div>
                        <div className={styles.individual}>
                            <p><strong>Wheelchair Access</strong> - { facility.accessibility.wheelchairAccess }</p>
                        </div>
                        <div className={styles.individual}>
                            <p><strong>Additional Info</strong> - { facility.accessibility.additionalInfo }</p>
                        </div>
                    </div>
                    <OperatingHours facility={facility} />
                    <div className={styles.reviews}>
                        <Reviews/>
                    </div>
                </div>
            </div>
        </div>
    );
}}
export default FacilityDetail;
