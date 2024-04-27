import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Teetime from '../components/Teetime'
import SheetHeader from '../components/SheetHeader'

const Teesheet = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [teetimes, setTeetimes] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Only state for loading and modal visibility

    useEffect(() => {
        retrieveTeetimesForDay(); // Call to load data on component mount or date change
    }, [selectedDate]);

    const retrieveTeetimesForDay = useCallback(async () => {
        const dateString = selectedDate.toISOString().split('T')[0];
        setIsLoading(true); // Ensure loading starts when fetching
        try {
            const response = await axios.get(`http://192.168.1.13:3000/teetimes?date=${dateString}`);
            setTeetimes(response.data);
        } catch (error) {
            console.error('There was an error fetching the teetimes:', error);
        } finally {
            setIsLoading(false); // Ensure loading ends regardless of the result
        }
    }, [selectedDate]); // Dependency array

    return (
        <div className='container'>
                <SheetHeader /*selectedDate={selectedDate} onDateChange={setSelectedDate}*/ />

                <div>
                    {teetimes.map((time, index) => (
                        <Teetime key={index} time={time} />
                    ))}
                </div>
        </div>
    );
}

export default Teesheet;
