import '../App.css';
import React, { useState, useEffect }from 'react';
import { useLogin } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { format, parseISO} from 'date-fns';
import axios from 'axios';

const Reservation = ({date, numPlayers, res}) => {
    const navigate = useNavigate();
    const { account } = useLogin();

    const [isPaid, setIsPaid] = useState(false)


    useEffect(() => {
        res.teetime_id.players.forEach(player => {
            if ((player.firstname + player.lastname).toLowerCase() === (account.firstName + account.lastName).toLowerCase() 
                && player.paid !== false
            ) {
                setIsPaid(true)
            }
        });
    }, [])

    const cancelReservation = async (id) => {
        const confirm = window.confirm("Are you sure you want to cancel this reservation?");
    
        if (confirm) {
            try {
                const accountParam = account;
                await axios.post(`http://senior-project-421916.appspot.com/cancel/${id._id}`, accountParam);
            } catch (error) {
                console.error("Failed to cancel reservation:", error);
                alert("There was an error cancelling the reservation."); 
            }
        }
    };

    const payForReservation = async (id) => {
        console.log(id)
        navigate('/checkout', { state: { id, account} });        
        
    }


    const formatDate = (date) => {
        const d = parseISO(date);
        const offsetDate = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
        const formattedTime = format(offsetDate, 'h:mm aaa');
        const formattedDate = formatDateWithOrdinal(offsetDate); 
        return `${formattedDate} ${formattedTime}`;
    }

    function formatDateWithOrdinal(date) {
        const formattedDate = format(date, 'EEEE, MMMM '); // 'Tuesday, April 30'
        const dayOfMonth = format(date, 'd'); // '30'
        const ordinal = getOrdinal(dayOfMonth);
        return `${formattedDate}${ordinal} ${format(date, 'yyyy')}`; // 'Tuesday, April 30th 2024'
    }

    function getOrdinal(n) {
        const num = parseInt(n, 10);
        const s = ["th", "st", "nd", "rd"],
              v = num % 100;
        return num + (s[(v-20)%10] || s[v] || s[0]);
    }


    return (
        <div>
            <p>
                {formatDate(date)}
                {" " + numPlayers} Players
                {isPaid &&
                    " Paid "
                }
                {!isPaid &&
                    <button onClick={() => {payForReservation(res)}}>Pay Now</button>
                }
                <button onClick={() => {cancelReservation(res.teetime_id)}}>Cancel Reservation</button>
            </p>
        </div>
    );
};

export default Reservation;
