import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import axios from 'axios';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, account} = location.state || {};
    const date = parseISO(id.teetime_id.date);
    const offsetDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const formattedTime = format(offsetDate, 'EEEE MMMM d, yyyy h:mmaaa');

    const [price, setPrice] = useState(0);
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelctedPayment] = useState("")

    const getPayments = async () => {
        try {
            const response = await axios.get(`http://senior-project-421916.appspot.com/customer/payment-method/${account._id}`)
            setPayments(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const p = calculatePrice()
        setPrice(p)
        getPayments()
    }, [])

    const calculatePrice = () => {
        const date = new Date(id.date);
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

    const payForReservation = async () => {
        try {
            const accountParam = account
            await axios.post(`http://senior-project-421916.appspot.com/pay/${id.teetime_id._id}`, accountParam)
            navigate('/account')
        } catch (error) {
            console.log(error);
        }
    }
       
    return (
        <div>
            <h1>Payment Details</h1>
            <p>{formattedTime}</p>
            <p>
                {account ? account.firstName + " " + account.lastName: 'Loading...'}
            </p>

            <p>{id.teetime_id.players.length} Players</p>
            <p>18 Holes</p>
            <p>Total Due: ${price * id.teetime_id.players.length}</p>
            <p>Select Payment: </p>
            {payments.map((payment, index) => (
                <p key={index}>
                    Card Ending in: {payment.card_number.slice(-4)} | Exp. {payment.exp}
                    {selectedPayment === payment.card_number && "Selected"}
                    {selectedPayment !== payment.card_number &&
                        <button onClick={() => {setSelctedPayment(payment.card_number)}}>Select</button>
                    }                   
                </p>
            ))}
            <button onClick={payForReservation}>Pay Now</button>
        </div>
    );
};

export default Checkout;
