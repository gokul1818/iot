// src/App.js
import React from 'react';
import Weather from './components/weather';
import Clock from './components/clock';
import DeviceControl from './components/deviceControl';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div className="app">
            <Clock />
            <Weather />
            <DeviceControl />
        </div>
    );
};

export default App;
