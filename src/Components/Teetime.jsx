import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import '../Styles/Teesheet.css';

const Teetime = ({ time }) => {
    const navigate = useNavigate();
    const date = parseISO(time.date);
    const offsetDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const formattedTime = format(offsetDate, 'h:mm a');

    const openSlots = 4 - time.players.length;

    const [price, setPrice] = useState(0);

    const navigateToCheckout = () => {
        navigate('/reserve', { state: { time, price } });
    };

    useEffect(() => {
        setPrice(calculatePrice());
    }, []);

    const calculatePrice = () => {
        const date = new Date(time.date);
        const hours = date.getUTCHours();
        const day = date.getUTCDay();
        if (day === 0 || day === 6) {
            if (hours < 14) {
                return 50;
            } else if (hours >= 15) {
                return 35;
            } else {
                return 50;
            }
        } else {
            if (hours < 14) {
                return 40;
            } else {
                return 30;
            }
        }
    };

    return (
        <div className='teetime'>
            <div><strong>{formattedTime}</strong></div>
            <div>${price.toFixed(2)} ea</div>
            <div><i className="fas fa-users"></i> {openSlots}</div>
            <button onClick={navigateToCheckout}>Reserve {openSlots} Players</button>
        </div>
    );
};

export default Teetime;