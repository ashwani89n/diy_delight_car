import React, { useState, useEffect } from 'react';
import CarsAPI from '../services/CarsAPI';
import Event from './Event';
import '../App.css';
import '../css/Navigation.css';

const Navigation = () => {
    const [exteriors, setExteriors] = useState([]);
    const [interiors, setInteriors] = useState([]);
    const [roofs, setRoofs] = useState([]);
    const [wheels, setWheels] = useState([]);
    const [activePopup, setActivePopup] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const extData = await CarsAPI.getExteriors();
                setExteriors(extData);
                
                const intData = await CarsAPI.getInteriors();
                setInteriors(intData);

                const roofData = await CarsAPI.getRoofs();
                setRoofs(roofData);

                const wheelData = await CarsAPI.getWheels();
                setWheels(wheelData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);

    const togglePopup = (popupType) => {
        setActivePopup((prev) => (prev === popupType ? null : popupType));
    };

    return (
        <nav>
            <div className="nav-header">
                <div className="nav-buttons">
                    <h1>Bolt Bucket 🏎️</h1>
                    <a href='/' role='button'>Customize</a>
                    <a href='/customcars' role='button'>View Cars</a>
                </div>
                <div className="exterior-button-container">
                    <div className='convertible'>
                    <label><input type="checkbox" />Convertible</label></div>
                    <button onClick={() => togglePopup('exteriors')}>Exterior</button>
                    <button onClick={() => togglePopup('interiors')}>Interior</button>
                    <button onClick={() => togglePopup('roofs')}>Roof</button>
                    <button onClick={() => togglePopup('wheels')}>Wheel</button>
                    <div class="create-car-name">
                    <input type="text" id="name" name="name" placeholder="Name your Car.."/>
                    <input type="submit" class="create-car-button" value="Create"></input>
                    </div>
                </div>
                <div class="create-car-price">💰$65000</div>
            </div>
            
            {activePopup === 'exteriors' && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-grid">
                            {exteriors.length > 0 ? (
                                exteriors.map((exterior) => (
                                    <Event
                                        key={exterior.id}
                                        id={exterior.id}
                                        color={exterior.color}
                                        image={exterior.image}
                                        price={exterior.price}
                                        type="exteriors"
                                    />
                                ))
                            ) : (
                                <h2>No exteriors available!</h2>
                            )}
                        </div>
                        <button onClick={() => togglePopup('exteriors')}>Done</button>
                    </div>
                </div>
            )}

            {activePopup === 'interiors' && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-grid">
                            {interiors.length > 0 ? (
                                interiors.map((interior) => (
                                    <Event
                                        key={interior.id}
                                        id={interior.id}
                                        color={interior.color}
                                        image={interior.image}
                                        price={interior.price}
                                        iscombo={interior.iscombo}
                                        type="interiors"
                                    />
                                ))
                            ) : (
                                <h2>No interiors available!</h2>
                            )}
                        </div>
                        <button onClick={() => togglePopup('interiors')}>Done</button>
                    </div>
                </div>
            )}

            {activePopup === 'roofs' && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-grid">
                            {roofs.length > 0 ? (
                                roofs.map((roof) => (
                                    <Event
                                        key={roof.id}
                                        id={roof.id}
                                        color={roof.color}
                                        image={roof.image}
                                        price={roof.price}
                                        isconvertible={roof.isconvertible}
                                        type="roofs"
                                    />
                                ))
                            ) : (
                                <h2>No roofs available!</h2>
                            )}
                        </div>
                        <button onClick={() => togglePopup('roofs')}>Done</button>
                    </div>
                </div>
            )}

            {activePopup === 'wheels' && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-grid">
                            {wheels.length > 0 ? (
                                wheels.map((wheel) => (
                                    <Event
                                        key={wheel.id}
                                        id={wheel.id}
                                        color={wheel.color}
                                        image={wheel.image}
                                        price={wheel.price}
                                        type="wheels"
                                    />
                                ))
                            ) : (
                                <h2>No wheels available!</h2>
                            )}
                        </div>
                        <button onClick={() => togglePopup('wheels')}>Done</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
