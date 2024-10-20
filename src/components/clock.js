// src/components/Clock.js
import React, { useEffect, useState } from 'react';
import "./clock.css"
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

    const formatTime = () => {
        let hours = time.getHours();
        const minutes = time.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with zero if needed
        const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM

        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        return { hours: hours.toString().padStart(2, '0'), minutes };
    };

    const { hours, minutes } = formatTime();

    const showtime = () => {
        return (

            <div className='format-time-style1  '>
                <p className='time-show1'>{hours[0]}</p>
                <p className='time-show2'>{hours[1]}</p>
                <p className='time-show3'>{minutes[0]}</p>
                <p className='time-show4'>{minutes[1]}</p>
            </div>
        )
    }


    return (
        <div className='d-flex align-items-center justify-content-between'>
            <h2>{getGreeting()}</h2>
            <div>  {showtime()}
                {/* <p>{time.getHours() >= 12 ? 'PM' : 'AM'}</p> Display AM/PM */}
            </div>
        </div>
    );
};

export default Clock;
