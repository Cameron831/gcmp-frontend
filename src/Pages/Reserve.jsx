import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useLogin } from '../context/LoginContext';
import axios from 'axios';

const Reserve = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { time, price } = location.state || {};
    const date = parseISO(time.date);
    const offsetDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const formattedTime = format(offsetDate, 'EEEE MMMM d, yyyy h:mmaaa');

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
            const body = {"customer_id": account._id, "teetime_id": time._id, "numberOfPlayers": players.length + 1}
            await axios.post(`http://senior-project-421916.appspot.com/reservation`, body)
            await axios.put(`http://senior-project-421916.appspot.com/teetime/reserve/${time._id}`, player);
            navigate('/account')
        } catch (error) {
            console.error('Error submitting reservation:', error);
        }
    };
    
    const handleBack = () => {
        navigate('/book');
    }

    return (
        <div>
            <h1>Reservation Details</h1>
            <p>{formattedTime}</p>
            <p>
                {account ? account.firstName + " " + account.lastName: 'Loading...'}
            </p>
            {players.map((index) => (
                <div key={index}>
                    <p>Player {index}</p>
                    <button onClick={() => handleRemovePlayer(index)}>X</button>
                </div>
            ))}

            <p>{players.length + 1} Players</p>
            <p>18 Holes</p>
            <p>Total Due: ${price * (players.length + 1)}</p>

            <button onClick={handleBack}>Back</button>
            <button onClick={handleReserve}>Reserve Now</button>
        </div>
    );
};

export default Reserve;
