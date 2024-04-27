import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';

const SheetHeader = ({ selectedDate, onDateChange }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handlePrevDay = useCallback(() => {
        const prevDay = new Date(selectedDate);
        prevDay.setDate(selectedDate.getDate() - 1);
        onDateChange(prevDay);
    }, [selectedDate, onDateChange]);

    const handleNextDay = useCallback(() => {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        onDateChange(nextDay);
    }, [selectedDate, onDateChange]);

    const onChange = useCallback((event) => {
        const newDate = event.target.value ? new Date(event.target.value) : selectedDate;
        setShowDatePicker(false);
        if (newDate) {
            onDateChange(newDate);
        }
    }, [selectedDate, onDateChange]);

    return (
        <div className="container">
            <div>
                <div className="middleComponent">
                    <button onClick={handlePrevDay}>
                        {/* Placeholder for left arrow icon */}
                    </button>

                    <button onClick={() => setShowDatePicker(true)}>
                        <span>{selectedDate && !isNaN(selectedDate.getTime()) ? format(selectedDate, 'EEEE, MMMM do') : 'Invalid date'}</span>
                    </button>

                    {showDatePicker && (
                        <input
                            type="date"
                            value={selectedDate && !isNaN(selectedDate.getTime()) ? format(selectedDate, 'yyyy-MM-dd') : ''}
                            onChange={onChange}
                        />
                    )}

                    <button onClick={handleNextDay}>
                        {/* Placeholder for right arrow icon */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SheetHeader);
