import React from 'react';
import styles from './description.module.css';

function Description() {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.column}>
                <h2>Outdoor Adventures</h2>
                <p>Experience the thrill and tranquility of the great outdoors. From hiking mountain trails to camping under the stars, there's an adventure waiting for everyone.</p>
            </div>
            <div className={styles.column}>
                <h2>Packing List</h2>
                <p>Be well-prepared for your journey. A good packing list is essential for any outdoor adventure. Don't forget essentials like water, snacks, navigation tools, and your camping gear.</p>
            </div>
            <div className={styles.column}>
                <h2>The Journey and Profile Building</h2>
                <p>Make your trips more memorable by adding outdoor activities to your profile. Save national parks to visit, track the places you've visited, and share your experiences with others!</p>
            </div>
        </div>
    );
}

export default Description;
