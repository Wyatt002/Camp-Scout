import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./FacilityDetail.module.css";

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
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">{ dayArray[forecastDate.getDay()] }</p>
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
                <h3>Weather Overview:</h3>
                <p>{ prop.weather_overview }</p>
                <button onClick={getWeather}>Get the weather!</button>
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

function Reviews(facility) {
    const [reviews, setReviews] = useState([]);
    const prop = facility.facility;
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
        const url = `${process.env.REACT_APP_API_HOST}/api/facility_reviews?facility_id=${prop.facility_id}`;
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
        <div className="card-body">
            <h3>Reviews:</h3>
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
                            <p>{ review.first_name } { review.last_name }</p>
                            <p>Rating - { rating(review.rating) }</p>
                            <p>{ review.review }</p>
                        </div>
                    </div>
                )
            })}
            </Carousel>
            <button value={prop.facility_id}>Leave a review!</button>
        </div>
    );
}

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

function FacilityDetail() {
    const [facility, setFacility] = useState('');
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
    const id = "9D607267-5063-463F-8487-DF928F788339";

    const fetchFacility  = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/facility_details?facility_id=${id}`;
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
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-1 mt-1">
                        <div className="card">
                            <div className="card-body">
                                <h1>{facility.name}</h1>
                                <p>{facility.description}</p>
                            </div>
                            <div className={styles.container}>
                            <Carousel
                                responsive={responsive}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={4000}

                            >
                                {facility.images.map((image) => {
                                    return (
                                        <div><img key={Math.random()} src={image.url} /></div>
                                    )
                                })}
                            </Carousel>
                            </div>
                            <div className="card-body">
                                <h3>Campsites:</h3>
                                <p>Total Campsites - { facility.campsites.totalSites }</p>
                                <p>Electrical Hookups - { facility.campsites.electricalHookups }</p>
                                <p>Group - { facility.campsites.group }</p>
                                <p>Horse - { facility.campsites.horse }</p>
                                <p>Other - { facility.campsites.other }</p>
                                <p>RV Only - { facility.campsites.rvOnly }</p>
                                <p>Tent Only - { facility.campsites.tentOnly }</p>
                                <p>Walk Boat To - { facility.campsites.walkBoatTo }</p>
                            </div>
                            <div className="card-body">
                                <h3>Amenities:</h3>
                                <p>Amphitheater - { facility.amenities.amphitheater }</p>
                                <p>Camp Store - { facility.amenities.campStore }</p>
                                <p>Cell Reception - { facility.amenities.cellPhoneReception }</p>
                                <p>Dump Station - { facility.amenities.dumpStation }</p>
                                <p>Firewood - { facility.amenities.firewoodForSale }</p>
                                <p>Food Storage - { facility.amenities.foodStorageLockers }</p>
                                <p>Ice - { facility.amenities.iceAvailableForSale }</p>
                                <p>Internet - { facility.amenities.internetConnectivity }</p>
                                <p>Laundry - { facility.amenities.laundry }</p>
                                <p>Potable Water - { facility.amenities.potableWater["0"] }</p>
                                <p>Showers - { facility.amenities.showers["0"] }</p>
                                <p>Staff on Site - { facility.amenities.staffOrVolunteerHostOnsite }</p>
                                <p>Toilets - { facility.amenities.toilets["0"] }</p>
                                <p>Trash Collection Point - { facility.amenities.trashRecyclingCollection }</p>
                            </div>
                            <div className="card-body">
                                <h3>Accessibility:</h3>
                                <div className={styles.individual}>
                                {facility.accessibility.accessRoads.map(road => {
                                    return (
                                        <p>
                                            { road }
                                        </p>
                                    )
                                })}
                                </div>
                                <div className={styles.individual}>
                                <p>{ facility.accessibility.adaInfo }</p>
                                </div>
                                <div className={styles.individual}>
                                <p>Cell Phone Info - { facility.accessibility.cellPhoneInfo }</p>
                                {facility.accessibility.classifications.map((classification) => (
                                <p key={Math.random()}>Classifcation - {classification}</p>
                                ))}
                                </div>
                                <div className={styles.individual}>
                                <p>Fire Stove Policy - { facility.accessibility.fireStovePolicy }</p>
                                </div>
                                <div className={styles.individual}>
                                <p>Internet Info - { facility.accessibility.internetInfo }</p>
                                </div>
                                <div className={styles.individual}>
                                <p>
                                    RV Info - { facility.accessibility.rvInfo }
                                    , Allowed - { facility.accessibility.rvAllowed }
                                    , Max Length - { facility.accessibility.rvMaxLength }
                                </p>
                                </div>
                                <div className={styles.individual}>
                                <p>
                                    Trailer Info - { facility.accessibility.trailerInfo }
                                    , Max Length - { facility.accessibility.trailerMaxLength }
                                </p>
                                </div>
                                <div className={styles.individual}>
                                <p>Wheelchair Access - { facility.accessibility.wheelchairAccess }</p>
                                </div>
                                <div className={styles.individual}>
                                <p>Additional Info - { facility.accessibility.additionalInfo }</p>
                                </div>
                            </div>
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
                            <div className="card-body">
                                <h3>Addresses: </h3>
                                {facility.addresses.map(address => {
                                    return (
                                        <p key={address.line1}>
                                            { address.city }, { address.stateCode }, { address.postalCode } - { address.line1 }
                                        </p>
                                    )
                                })}
                            </div>
                            <div className="card-body">
                                <h3>Contacts:</h3>
                                <p> Emails:</p>
                                {facility.contacts.emailAddresses.map(email => {
                                    return (
                                        <p key={email.emailAddress}>
                                            { email.emailAddress }
                                        </p>
                                    )
                                })}
                            </div>
                            <div className="card-body">
                                <p>Phone Numbers:</p>
                                {facility.contacts.phoneNumbers.map(phone => {
                                    return (
                                        <p key={phone.phoneNumber}>
                                            { phone.phoneNumber }
                                        </p>
                                    )
                                })}
                            </div>
                            <Reviews facility={facility} />
                            <Weather facility={facility} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FacilityDetail;
