import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from './facilities.module.css';
import { Link } from 'react-router-dom';



const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
];


const FacilityInfo = ({ facility }) => (
    <div>
        <h3>{facility.name}</h3>
        <Link to={`/facility/${facility.facility_id}`}>
        <button className={styles.detailsButton}>Details</button>
        </Link>
    </div>
);

const FacilitiesPage = () => {
    const [selectedState, setSelectedState] = useState(null);
    const [facilities, setFacilities] = useState([]);
    const [displayCount, setDisplayCount] = useState(4);

    useEffect(() => {
        if (selectedState) {
            fetch(`http://localhost:8000/api/facilities?state_code=${selectedState.value}`)
                .then(response => response.json())
                .then(data => setFacilities(Object.values(data)))
        }
    }, [selectedState]);

    const loadMore = () => {
        setDisplayCount(prevCount => prevCount + 4);
    };

    return (
        <div>
            <div className={styles.searchContainer}>
            <Select
                className={styles.search}
                options={states}
                onChange={setSelectedState}
                placeholder="Select a state.."
            />
            </div>
            <div className={styles.cardContainer}>
                {facilities.slice(0, displayCount).map((facility, index) => (
                    <div key={index} className={styles.card}>
                        <FacilityInfo facility={facility} />
                    </div>
                ))}
                {displayCount < facilities.length && (
                    <button onClick={loadMore} className={styles.loadMore}>Load More</button>
                )}
            </div>
        </div>
    );
};

export default FacilitiesPage;
