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
import Description from './DescriptionPage';
import { MDBCardOverlay, MDBCard, MDBCardImage, MDBCardTitle } from 'mdb-react-ui-kit';

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
        <main>
            <div className={styles.parent}>
                <div className={styles.hero}>
                    <h1 className={styles.adventurousText} style= {{color: 'white'}}>Camp Scout</h1>
                </div>
                <div className={styles.helloContainer }>
                    <h1 className={styles.helloText} style= {{color: '#333121'}}>Hello!</h1>
                    <p className={styles.para} style= {{color: '#333121'}}>Welcome to Camp Scout, your guide to exploring national parks in your area.</p>
                    <p className={styles.para} style= {{color: '#333121'}}>Begin your search and start your adventure!</p>
                    <div>
                <FacilitiesPage />
            </div>
                </div>
            </div>
            <div>
                <Description />
            </div>
            <hr />
            <div className={styles.topLocationsContainer}>
                <h2 className={styles.containerTitle}>Top Locations of 2023</h2>
                <div className={styles.gridContainer}>
                    {topParks.map((park, index) => (
                    <MDBCard className={`${styles.smallCard} text-white`} key={index}>
                        <MDBCardImage overlay src={park.img} alt={park.name} className={styles.imgFit} />
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


