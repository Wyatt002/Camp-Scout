import React from "react";
import styles from './main.module.css';

function MainPage() {
  return (



    <body className={styles.backgroundImage}>



        <div className="main-page">
      <header>
        <h1>Welcome to the National Parks Website</h1>
      </header>
      <main>
        <section>
          <h2>Featured Parks</h2>
          <div className="park-card">
            <img src="./images/park1.jpg" alt="Park 1" />
            <h3>Park 1</h3>
            <p>Description of Park 1</p>
          </div>
          <div className="park-card">
            <img src="./images/park2.jpg" alt="Park 2" />
            <h3>Park 2</h3>
            <p>Description of Park 2</p>
          </div>
        </section>
        <section>
          <h2>Popular Activities</h2>
          <ul>
            <li>Hiking</li>
            <li>Camping</li>
            <li>Wildlife Viewing</li>
            <li>Photography</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>© 2023 National Parks Website. All rights reserved.</p>
      </footer>
    </div>
    </body>
  );
};


export default MainPage;
