import React from 'react';
import { format, parseISO } from 'date-fns';

const Teetime = ({ time }) => {
    const date = parseISO(time.date);
    const offsetDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const formattedTime = format(offsetDate, 'h:mm a');

    const openSlots = 4 - time.players.length;

    return (
        <div>
            <div>
                <div>{formattedTime}</div>
            </div>
        </div>
    );
};

export default Teetime;
