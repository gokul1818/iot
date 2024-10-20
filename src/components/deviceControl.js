import React, { useEffect, useState } from 'react';
import { FaFan, FaLightbulb, FaPlug } from 'react-icons/fa';
import { db } from '../firebase';
import { ref, set, onValue } from 'firebase/database';
import './DeviceControl.css'; // Import the CSS file for styles

const DeviceControl = () => {
    const [devices, setDevices] = useState({});
    const [activeDevice, setActiveDevice] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        const devicesRef = ref(db, 'board1/outputs/digital');
        onValue(devicesRef, (snapshot) => {
            const data = snapshot.val();
            setDevices(data || {});

            // Check if the device is online by evaluating the timestamp
            const timestampStr = data ? data["timestamp"] : null; // Assuming timestamp is stored as a string

            if (timestampStr) {
                const timestamp = parseTimestamp(timestampStr);
                const currentTimeInMillis = Date.now();
                const timeDifference = Math.floor((currentTimeInMillis - timestamp) / 1000); // Difference in seconds

                console.log(`Timestamp: ${timestamp}, Current Time: ${currentTimeInMillis}, Difference: ${timeDifference} seconds`);

                // Set isOnline based on a time threshold (e.g., 30 seconds)
                setIsOnline(timeDifference < 30); // 30 seconds
            } else {
                setIsOnline(false); // No valid timestamp means OFFline
                console.log('Invalid or missing timestamp.');
            }

            // Update the current time in formatted string
            setCurrentTime(getFormattedTimestamp());
        });
    }, []);

    const parseTimestamp = (timestampStr) => {
        // Parse the timestamp string (e.g., "20/10/2024 14:38:08")
        const [datePart, timePart] = timestampStr.split(' ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);

        // Create a Date object
        return new Date(year, month - 1, day, hours, minutes, seconds).getTime(); // Get milliseconds
    };

    const getFormattedTimestamp = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const handleButtonClick = (device) => {
        const newStatus = devices[device] === 0 ? 1 : 0;
        const deviceRef = ref(db, `board1/outputs/digital/${device}`);

        // Log the timestamp
        const timestamp = getFormattedTimestamp();
        console.log(`Device: ${device}, Status: ${newStatus}, Timestamp: ${timestamp}`);

        set(deviceRef, newStatus).then(() => {
            console.log(`${device} toggled to ${newStatus}`);
            // Update timestamp in the database
            const timestampRef = ref(db, 'board1/outputs/digital/timestamp');
            set(timestampRef, timestamp); // Store as string in the specified format
        });
    };

    return (
        <div className="device-buttons">

            <>
                <button
                    className={`device-button ${activeDevice === '12' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('12')}
                >
                    <div className={isOnline ? "device-online" : "device-offline"}></div>
                    <FaFan /> Fan ({devices["12"] === 0 ? 'OFF' : 'ON'})
                </button>
                <button
                    className={`device-button ${activeDevice === '13' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('13')}
                >
                    <div className={isOnline ? "device-online" : "device-offline"}></div>
                    <FaLightbulb /> Light ({devices["13"] === 0 ? 'OFF' : 'ON'})
                </button>
                <button
                    className={`device-button ${activeDevice === '14' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('14')}
                >
                    <div className={isOnline ? "device-online" : "device-offline"}></div>
                    <FaPlug /> Socket ({devices["14"] === 0 ? 'OFF' : 'ON'})
                </button>
            </>

            {/* <div>Current Time: {currentTime}</div> */}
        </div>
    );
};

export default DeviceControl;
