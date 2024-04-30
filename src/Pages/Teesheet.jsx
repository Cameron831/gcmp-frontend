import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Teetime from '../components/Teetime'

import {format} from 'date-fns'
import { DayPicker } from 'react-day-picker'

const Teesheet = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [teetimes, setTeetimes] = useState([]);

    useEffect(() => {
        if (!selectedDate) return;
    
        const retrieveTeetimesForDay = async () => {
            const dateString = selectedDate.toISOString().split('T')[0];
            try {
                const response = await axios.get(`http://localhost:3001/teetimes?date=${dateString}`);
                const filteredTeetimes = response.data.filter(teetime => teetime.players.length < 4);
                setTeetimes(filteredTeetimes);
            } catch (error) {
                console.error('There was an error fetching the teetimes:', error);
            }
        };
    
        retrieveTeetimesForDay();
    }, [selectedDate]); // Only selectedDate is necessary here

    let footer = <p>Pick a day</p>
    if(selectedDate) {
        footer = <p>{format(selectedDate, 'PP')}</p>
    }

    return (
        <div className='container'>
                <DayPicker 
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    footer={footer}
                    showOutsideDays
                />
                <div>
                    {teetimes.map((time, index) => (
                        <Teetime key={index} time={time} />
                    ))}
                </div>
        </div>
    );
}

export default Teesheet;
