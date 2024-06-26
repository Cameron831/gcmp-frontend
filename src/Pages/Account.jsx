import React, { useState, useEffect }from 'react';
import { useLogin } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { format, parseISO} from 'date-fns';
import axios from 'axios';
import Modal from '../components/Modal';
import Reservation from '../components/Reservation';
import '../Styles/Account.css';  // Ensure you import the CSS file


const Account = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [payments, setPayments] = useState([]);
    const [addingPayment, setAddingPayment] = useState(false)
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [zipCode, setZipCode] = useState('')
    const [pastReservations, setPastReservations] = useState([]);
    const [upcomingReservations, setUpcomingReservations] = useState([]);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const { logout, account } = useLogin();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handlePaymentModal = async () => {
        getPayments()
        openModal()
    }

    const handleCancel = () => {
        setCardNumber('')
        setExpMonth('')
        setExpYear('')
        setZipCode('')
        setAddingPayment(false)
    }

    const handleCloseModal = () => {
        closeModal()
        setCardNumber('')
        setExpMonth('')
        setExpYear('')
        setZipCode('')
        setAddingPayment(false)
    }

    const getPayments = async () => {
        try {
            const response = await axios.get(`http://senior-project-421916.appspot.com/customer/payment-method/${account._id}`)
            setPayments(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const addPayment = async (e) => {
        e.preventDefault();
        try {
            const payment = {"customer_id": account._id, "card_number": cardNumber, "exp": expMonth + "/" + expYear}
            const response = await axios.post(`http://senior-project-421916.appspot.com/payment-method`, payment)
            if(response.status === 201) {
                getPayments()
                setAddingPayment(false)
                setCardNumber('')
                setExpMonth('')
                setExpYear('')
                setZipCode('')
            }

        } catch (error) {
            console.log(error);
        }
    }

    const removePayment = async (id) => {
        try {
            await axios.delete(`http://senior-project-421916.appspot.com/payment-method/${id}`)
            getPayments()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (account && account._id) {
            axios.get(`http://senior-project-421916.appspot.com/reservation/${account._id}`)
                 .then(response => {
                    const now = new Date();
                    now.setHours(now.getHours() - 7);
                    const past = [];
                    const upcoming = [];
                    response.data.forEach(reservation => {
                        if(reservation.teetime_id != null) {
                            const reservationDate = new Date(reservation.teetime_id.date)
                        if (reservationDate < now) {
                            past.push(reservation);
                        } else {
                            upcoming.push(reservation);
                        }
                        }
                    });
                    setPastReservations(past);
                    setUpcomingReservations(upcoming);
                 })
                 .catch(error => console.error('Error fetching reservations:', error));
        }
    }, [account, upcomingReservations]);

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


    if (!account) {
        return <div>Invalid URL</div>;
    }

    return (
        <div>
            <h1>Account Details</h1>
            <p>{account.email}</p>
            <p>{account.firstName} {account.lastName}</p>
            <div>
                <button onClick={handlePaymentModal}>Payment Options</button>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    {payments.map((payment, index) => (
                        <p key={index}>
                            Card Ending in: {payment.card_number.slice(-4)} | Exp. {payment.exp}
                            <button onClick={() => {removePayment(payment._id)}}>DELETE</button>
                        </p>
                    ))}

                    <button onClick={() => {setAddingPayment(true)}}>Add New Payment</button>
                    {addingPayment &&
                        <div>
                            <h2>Add New Payment</h2>
                            <form onSubmit={addPayment}>
                                <div>
                                <label >Card Number:</label>
                                <input 
                                    type="text" 
                                    value={cardNumber}
                                    onChange={e => setCardNumber(e.target.value)}
                                    required
                                />
                                </div>
                                <div>
                                <label >Expiration date:</label>
                                <input 
                                    type="text" 
                                    value={expMonth}
                                    placeholder="MM"
                                    onChange={e => setExpMonth(e.target.value)}
                                    required
                                />
                                <input 
                                    type="text" 
                                    value={expYear}
                                    placeholder="YY"
                                    onChange={e => setExpYear(e.target.value)}
                                    required
                                />
                                <label>Zip Code: </label>
                                <input 
                                    type="text" 
                                    value={zipCode}
                                    onChange={e => setZipCode(e.target.value)}
                                    required
                                />
                                </div>
                                <button onClick={handleCancel}>Cancel</button>
                                <button type="submit">Add Card</button>

                            </form>
                        </div>
                    }
                </Modal>
            </div>

            <p>Upcoming Reservations</p>
            {upcomingReservations.map((reservation, index) => (
                 <div key={index}>
                    <Reservation date={reservation.teetime_id.date} numPlayers={reservation.numberOfPlayers} res={reservation}/>
                </div>
            ))}


            <p>Past Reservations</p>
            {pastReservations.map((reservation, index) => (
                <div key={index}>
                    <p>
                        {formatDate(reservation.teetime_id.date)}        
                        {reservation.numberOfPlayers} Players 
                    </p>
                </div>
            ))}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Account;