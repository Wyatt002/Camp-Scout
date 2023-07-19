import React, { useState, useEffect } from "react";

function FacilityDetail() {
    const [facility, setFacility] = useState({});
    const [weather, setWeather] = useState('');

    const getWeather = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/weather?lat=${facility.lat}&lon=${facility.lon}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setWeather(data);
            console.log(weather["1"]);
            console.log(weather["2"]);
            console.log(weather["3"]);
            console.log(weather["4"]);
            console.log(weather["5"]);
        }
    }

    const fetchFacility  = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/facility_details?facility_id=1241C56B-7003-4FDF-A449-29DA8BCB0A41`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setFacility(data);
            console.log(data);
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
                            <div className="card-body">
                                <h3>Weather Overview:</h3>
                                <p>{ facility.weather_overview }</p>
                                <button onClick={getWeather}>Get the weather!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FacilityDetail;
