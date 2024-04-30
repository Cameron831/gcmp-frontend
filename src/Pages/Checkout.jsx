import React from 'react';
import { useLocation } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const Checkout = () => {
    const location = useLocation();
    const { time } = location.state || {}; // Make sure to handle undefined state
    const date = parseISO(time.date);
    const offsetDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const formattedTime = format(offsetDate, 'EEEE MMMM d, yyyy h:mmaaa');

    const availableSpots = 4 - time.numberOfPlayers;


    return (
        <div>
            <h1>Checkout</h1>
            <p>{formattedTime}</p>
            {Array.from({ length: availableSpots }, (_, index) => (
                <div key={index}>Player {index + 1}</div>
            ))}
        </div>
    );
};


export default Checkout;
