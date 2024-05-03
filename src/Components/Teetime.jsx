import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Teetime = ({ time }) => {
    const navigate = useNavigate();
    const date = parseISO(time.date);
    const offsetDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const formattedTime = format(offsetDate, 'h:mm a');

    const openSlots = 4 - time.players.length;

    const [price, setPrice] = useState(0)

    const navigateToCheckout = () => {
        navigate('/reserve', { state: { time, price} });
    };

    useEffect(() => {
        setPrice(calculatePrice()); // Calculate and set price when component mounts
    }, []);

    const calculatePrice = () => {
        const date = new Date(time.date);
        const hours = date.getUTCHours();
        const day = date.getUTCDay(); 
        // Pricing rules
        if (day === 0 || day === 6) { // Weekend
            if (hours < 14) { // Before 2pm
                return 50; 
            } else if (hours >= 15) { // After 3pm
                return 35;
            } else {
                return 50; // Default price between 2pm and 3pm on weekends
            }
        } else { // Weekday
            if (hours < 14) { // Before 2pm
                return 40;
            } else { // After 2pm
                return 30;
            }
        }
    };

    return (
        <div>
            <div>
                <div>{formattedTime}</div>
                <div>Price: ${price}</div>
                <div>Slots Available: {openSlots}</div>
                <button onClick={navigateToCheckout}>Go to Checkout</button>
            </div>
        </div>
    );
};

export default Teetime;
