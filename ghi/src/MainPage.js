import React, { useState } from 'react';
import styles from './main.module.css';
import zionImg from '../src/img/zion.jpg';
import alaskaImg from '../src/img/alaska.jpg';
import utahImg from '../src/img/utah.jpg';
import coloradoImg from '../src/img/colorado.jpg';
import arcadiaImg from '../src/img/arcadia.jpg'
import yellowStoneImg from '../src/img/yellow-stone.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import FacilitiesPage from './Facilities.js';

import defaultImg from '../src/img/Trailer-setup-at-campsite.jpg';
import { MDBCardOverlay, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

const Main = () => {

const topParks = [
    { name: "Yellow Stone National Park", img: yellowStoneImg },
    { name: "Alaska", img: alaskaImg },
    { name: "Zion National Park", img: zionImg  },
    { name: "Arcadia", img: arcadiaImg },
    { name: "Colorado", img: coloradoImg },
    { name: "Utah", img: utahImg }
];

    return (
    <div>
        <header className={styles.header}>
            <a href="/home" className={styles.homeText}>Home</a>
            <div className={styles.navBar} >
                <a href="/profile" className={styles.navText}>Profile</a>
                <a href="/login" className={styles.navText}>Login</a>
                <button className={styles.signupButton}>Signup</button>
            </div>
        </header>
        <div>
            <div className={styles.container}>
                <h1 style= {{color: '#333121'}}>Camp Scout</h1>
                <p className={styles.para} style= {{color: '#333121'}}>Welcome to Camp Scout, your guide to exploring national parks in your area.</p>
                <p className={styles.para} style= {{color: '#333121'}}>Begin your search and start your adventure!</p>
            </div>
        </div>
        <main>
            <div className={styles.hero}></div>
            <div>
                <FacilitiesPage />
            </div>
            <div>
                <h2 className={styles.containerTitle}>Top Locations of 2023</h2>
                <div className={styles.gridContainer}>
                    {topParks.map((park, index) => (
                    <MDBCard className={`${styles.smallCard} text-white`} key={index}>
                        <MDBCardImage overlay src={park.img} alt={park.name} />
                        <MDBCardOverlay>
                        <MDBCardTitle>{park.name}</MDBCardTitle>
                        </MDBCardOverlay>
                    </MDBCard>
                    ))}
                </div>
            </div>
        </main>
    </div>
);
};

export default Main;


