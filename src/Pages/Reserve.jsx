import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useLogin } from '../context/LoginContext';
import axios from 'axios';
import '../Styles/Reserve.css'; // Import the new CSS file

const Reserve = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { time, price } = location.state || {};
    const date = parseISO(time.date);
    const formattedTime = format(date, 'EEEE, MMMM d, yyyy h:mm a');

    const { account } = useLogin();

    const initialPlayers = Array.from({ length: 3 - time.numberOfPlayers }, (_, index) => index + 2);
    const [players, setPlayers] = useState(initialPlayers);

    const handleRemovePlayer = () => {
        setPlayers(currentPlayers => currentPlayers.slice(0, -1));
    };

    const handleReserve = async () => {
        const player = {
            firstname: account.firstName,
            lastname: account.lastName,
            riding: true,
            nine: false,
            numberOfPlayers: players.length + 1
        };
    
        try {
            const body = {"customer_id": account._id, "teetime_id": time._id, "numberOfPlayers": players.length + 1};
            await axios.post(`http://senior-project-421916.appspot.com/reservation`, body);
            await axios.put(`http://senior-project-421916.appspot.com/teetime/reserve/${time._id}`, player);
            navigate('/account');
        } catch (error) {
            console.error('Error submitting reservation:', error);
        }
    };
    
    const handleBack = () => {
        navigate('/book');
    };

    return (
        <div className="reservation-container">
            <div className="reservation-details">
                <div className="details-left">
                    <h1>Reservation Details</h1>
                    <div className="player-info">
                        <div>{account ? `${account.firstName} ${account.lastName} (you)` : 'Loading...'} - ${price}</div>
                        {players.map((index) => (
                            <div key={index} className="player-row">
                                <div>Player {index}</div>
                                <button onClick={() => handleRemovePlayer(index)}>X</button>
                            </div>
                        ))}
                    </div>
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
                <div className="details-right">
                    <div className="course-info">
                        <h2>Golf Course Managment Platform</h2>
                        <p>{formattedTime}</p>
                        <p>{players.length + 1} Players</p>
                        <p>18 Holes</p>
                        <p>Green Fees: ${price * (players.length + 1)}</p>
                        <h3>Total Due for Booking: ${price * (players.length + 1)}</h3>
                    </div>
                    <button className="reserve-button" onClick={handleReserve}>Reserve Now</button>
                </div>
            </div>
        </div>
    );
};

export default Reserve;
