import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FacilityDetail = () => {
    const { facility_id } = useParams();
    const [facility, setFacility] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/facility_details?facility_id=${facility_id}`)
            .then(response => response.json())
            .then(data => setFacility(data));
    }, [facility_id]);

    if (!facility) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{facility.name}</h1>
            <p>{facility.description}</p>
        </div>
    );
};

export default FacilityDetail;
