import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Teetime from '../components/Teetime';
import { format } from 'date-fns';
import '../Styles/Teesheet.css';
import '../Styles/Filter.css';

const Teesheet = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [teetimes, setTeetimes] = useState([]);
    const [holes, setHoles] = useState('18 holes');
    const [players, setPlayers] = useState('4 players');
    const [cart, setCart] = useState('W/ Cart');

    useEffect(() => {
        if (!selectedDate) return;

        const retrieveTeetimesForDay = async () => {
            const dateString = selectedDate.toISOString().split('T')[0];
            try {
                const response = await axios.get(`http://senior-project-421916.appspot.com/teetimes?date=${dateString}`);
                var filteredTeetimes = response.data.filter(teetime => teetime.players.length < 4);
                const now = new Date();
                now.setHours(now.getHours() - 7);
                filteredTeetimes = filteredTeetimes.filter(teetime => {
                    const teetimeDate = new Date(teetime.date);
                    return teetimeDate > now;
                });
                setTeetimes(filteredTeetimes);
            } catch (error) {
                console.error('There was an error fetching the teetimes:', error);
            }
        };

        retrieveTeetimesForDay();
    }, [selectedDate]);

    return (
        <div className='container'>
            <div className='filter-container'>
                <div className='filter-item'>
                    <span>Show Tee Times For:</span>
                    <input 
                        type='date' 
                        value={format(selectedDate, 'yyyy-MM-dd')}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                </div>
                <div className='filter-item'>
                    <select value={holes} onChange={(e) => setHoles(e.target.value)}>
                        <option value="18 holes">18 holes</option>
                        <option value="9 holes">9 holes</option>
                    </select>
                </div>
                <div className='filter-item'>
                    <select value={players} onChange={(e) => setPlayers(e.target.value)}>
                        <option value="4 players">4 players</option>
                        <option value="3 players">3 players</option>
                        <option value="2 players">2 players</option>
                        <option value="1 player">1 player</option>
                    </select>
                </div>
                <div className='filter-item'>
                    <select value={cart} onChange={(e) => setCart(e.target.value)}>
                        <option value="W/ Cart">W/ Cart</option>
                        <option value="No Cart">No Cart</option>
                    </select>
                </div>
            </div>
            <div className='teetimes-container'>
                {(teetimes.length === 0) && <p>No Available Teetimes</p>}
                {(teetimes.length !== 0) && teetimes.map((time, index) => (
                    <Teetime key={index} time={time} />
                ))}
            </div>
        </div>
    );
}

export default Teesheet;
