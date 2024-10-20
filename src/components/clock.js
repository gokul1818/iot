// src/components/Clock.js
import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const getGreeting = () => {
        const hours = time.getHours();

        if (hours < 12) {
            return "Good Morning";
        } else if (hours < 18) {
            return "Good Afternoon";
        } else {
            return "Good Night";
        }
    };

    return (
        <div className='d-flex align-items-center justify-content-between'>
            <h2 >{getGreeting()}</h2>
            <h6>{time.toLocaleTimeString()}</h6>
        </div>
    );
};

export default Clock;
