import React, { useState, useEffect } from 'react';
import '../App.css';
import '../css/Navigation.css';

const Navigation = () => {

    
    return (
        <nav>
            <div className="nav-header">
                <div className="nav-buttons">
                    <h1>Bolt Bucket 🏎️</h1>
                    <a href='/' role='button'>Customize</a>
                    <a href='/customcars' role='button'>View Cars</a>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
