import React from 'react';
import courseImage from '../assets/course.jpeg';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css'; // Import the new CSS file

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="home-container">
                <img src={courseImage} alt="Course" className="home-image" />
                <div className="home-text">Golf Course Management Platform
                </div>
                <button className="home-button" onClick={() => { navigate("/book") }}>BOOK A TEE TIME</button>
            </div>
            <h1>Whispering Cliffs Golf Resort</h1>
            <p>
                Located just minutes from the dramatic coastline of the North Atlantic, 
                nestled among ancient limestone cliffs and dense, whispering pines, 
                Whispering Cliffs Golf Resort offers an unparalleled golfing experience. 
                This 6,450-yard, par 72 course is renowned for its breathtaking vistas, 
                meticulously groomed fairways, and challenging, undulating greens.
            </p>
            <p>
                Designed in 1934 by the acclaimed architect duo, Thomas McArthur and 
                Elaine Mercier, the course originally served as a private haven for the 
                elite. During its storied history, it was transformed during World War II 
                into a strategic lookout post. Reopened in 1946, the course was 
                rededicated to peace and leisure and has since attracted golfers from 
                around the world seeking its challenging play and exquisite scenery.
            </p>
            <p>
                Today, Whispering Cliffs is celebrated not only for its historic legacy 
                and stunning landscape but also for its commitment to sustainability and 
                wildlife conservation. The course is integrated seamlessly into its 
                natural surroundings to preserve the local flora and fauna, offering 
                players a chance to experience golf at its most harmonious. Alongside 
                its famous 18th hole, which features a cliff-edge tee shot that descends 
                over a natural waterfall, the club provides first-class amenities and 
                exceptional service, ensuring a memorable golfing journey for every guest.
            </p>
        </div>
    );
}

export default Home;
