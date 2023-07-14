import React, { useState } from 'react';
import styles from './main.module.css';
import zionImg from '../src/img/zion.jpg';
import alaskaImg from '../src/img/alaska.jpg';
import utahImg from '../src/img/utah.jpg';
import coloradoImg from '../src/img/colorado.jpg';
import arcadiaImg from '../src/img/arcadia.jpg'
import yellowStoneImg from '../src/img/yellow-stone.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';

import defaultImg from '../src/img/Trailer-setup-at-campsite.jpg';
import { MDBCardOverlay, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

const Main = () => {
    const parks = [
    {
    name: 'Park 1',
    img: defaultImg,
    description: 'Description for Park 1.'
    },
    {
    name: 'Park 2',
    img: defaultImg,
    description: 'Description for Park 2.'
    },
    ];

const topParks = [
    { name: "Yellow Stone National Park", img: yellowStoneImg },
    { name: "Alaska", img: alaskaImg },
    { name: "Zion National Park", img: zionImg  },
    { name: "Arcadia", img: arcadiaImg },
    { name: "Colorado", img: coloradoImg },
    { name: "Utah", img: utahImg }
];

    const [showCount, setShowCount] = useState(2);
    const [search, setSearch] = useState('');

    const handleSearchChange = event => {
        setSearch(event.target.value);
    }

    const handleLoadMore = () => {
        setShowCount(prevCount => prevCount + 4);
    };

    const filteredParks = parks.filter(park => park.name.toLowerCase().includes(search.toLowerCase()));

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
            <div className="input-group md-form form-sm form-1 pl-0">
                <div className="input-group-prepend">
                    <span className="input-group-text purple lighten-3" id="basic-text1">
                        <i className="fas fa-search text-white" aria-hidden="true"></i>
                    </span>
                </div>
                <input
                    className="form-control my-0 py-1"
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search By State e.g. (NY)"
                    aria-label="Search"
                />
            </div>
            <div>
                {filteredParks.slice(0, showCount).map((park, index) => (
                    <MDBCard className={`${styles.card} ${styles.mb3}`} style={{ maxWidth: '540px' }} key={index}>
                        <MDBRow className={`${styles.row} ${styles.g0}`}>
                            <MDBCol md='4' className={styles.colMd4}>
                                <MDBCardImage className={`${styles.imgFluid} ${styles.roundedStart}`} src={park.img ? park.img : 'https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp'} alt={park.name} fluid />
                            </MDBCol>
                            <MDBCol md='8' className={styles.colMd8}>
                                <MDBCardBody className={styles.cardBody}>
                                    <MDBCardTitle className={styles.cardTitle}>{park.name}</MDBCardTitle>
                                    <MDBCardText className={styles.cardText}>
                                        {park.description}
                                    </MDBCardText>
                                    <MDBCardText className={styles.textMuted}>
                                        <small>We need photos linked</small>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                ))}
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


