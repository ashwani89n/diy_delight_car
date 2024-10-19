import React, { useState, useEffect } from 'react';
import CarsAPI from '../services/CarsAPI';
import Event from '../components/Event';
import '../App.css';
import '../css/Navigation.css';

const CreateCar = () => {
    const [exteriors, setExteriors] = useState([]);
    const [interiors, setInteriors] = useState([]);
    const [roofs, setRoofs] = useState([]);
    const [wheels, setWheels] = useState([]);
    const [activePopup, setActivePopup] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [isConvertible, setIsConvertible] = useState(false);
    const [carName, setCarName] = useState('');

    const basePrice = 65000; 
    const convertiblePrice = 10000;
    const totalPrice = basePrice + (isConvertible ? convertiblePrice : 0) + Object.values(selectedOptions).reduce((total, option) => total + option.price, 0);

    useEffect(() => {
        (async () => {
            try {
                const extData = await CarsAPI.getExteriors();
                setExteriors(extData);
                
                const intData = await CarsAPI.getInteriors();
                setInteriors(intData);

                const roofData = await CarsAPI.getRoofs();
                console.log('Roof data:', roofData);
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

    const handleConvertibleChange = (e) => {
        setIsConvertible(e.target.checked); 
        if (isChecked) {
            if (selectedOptions.roofs && !selectedOptions.roofs.isconvertible) {
                alert('⚠️ NOPE!\nnSorry, you can\'t put that roof on a convertible 😔\nnPlease choose a convertible roof option.');
                setSelectedOptions((prev) => ({ ...prev, roofs: null }));
            }
        } else {
            if (selectedOptions.roofs && selectedOptions.roofs.isconvertible) {
                alert('⚠️ NOPE!\nSorry, you can\'t select a convertible roof for a non-convertible car 😔\nPlease choose a non-convertible roof option.');
                setSelectedOptions((prev) => ({ ...prev, roofs: null }));
            }
        }
    };

    const handleOptionSelect = (type, option) => {
        if (type === 'roofs') {
            console.log("isConvertible:" + isConvertible + ",option.isconvertible" + option.isconvertible);
            if (isConvertible && !option.isconvertible) {
                alert('⚠️ NOPE!\nSorry, you can\'t put that roof on a convertible 😔\nPlease choose a convertible roof option.');
                return; 
            } else if (!isConvertible && option.isconvertible) {
                alert('⚠️ NOPE!\nSorry, you can\'t select a convertible roof for a non-convertible car 😔\nPlease choose a non-convertible roof option.');
                return; 
            }
        }
        
        setSelectedOptions((prev) => ({
            ...prev,
            [type]: option,
        }));
    };

    const handleCreateCar = async () => {

        if (!carName.trim()) {
            alert('Please enter a name for your car.'); 
            return; 
        }

        const carData = {
            name: carName,
            isconvertible: isConvertible,
            exterior: selectedOptions.exteriors?.id, 
            roof: selectedOptions.roofs?.id,         
            wheels: selectedOptions.wheels?.id,      
            interior: selectedOptions.interiors?.id, 
            price: totalPrice,                       
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        };

        try {
            const response = await fetch('/api/cars', options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await response.json(); 
            window.location = '/'; 
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };

    console.log('Selected options:', selectedOptions);
    const renderEventOptions = () => {
        let options = [];
        switch (activePopup) {
            case 'exteriors':
                options = exteriors;
                break;
            case 'interiors':
                options = interiors;
                break;
            case 'roofs':
                options = roofs;
                break;
            case 'wheels':
                options = wheels;
                break;
            default:
                return null;
        }

        return options.map((option) => {
            const isSelected = selectedOptions[activePopup]?.id === option.id; 
            console.log(`Option ID: ${option.id}, Selected: ${isSelected}`); 
            return (
                <Event
                    key={option.id}
                    id={option.id}
                    color={option.color}
                    price={option.price}
                    isSelected={isSelected}
                    type={activePopup}
                    {...(activePopup === 'interiors' ? { iscombo: option.iscombo } : {})} 
                    {...(activePopup === 'roofs' ? { isconvertible: option.isconvertible } : {})} 
                    onSelect={handleOptionSelect}

                />
            );
        });
    };

    return (
        <div>
            <div className="exterior-button-container">
                <div className='convertible'>
                    <label><input type="checkbox" checked={isConvertible} onChange={handleConvertibleChange}/>Convertible</label>
                </div>
                <button onClick={() => togglePopup('exteriors')}>Exterior</button>
                <button onClick={() => togglePopup('interiors')}>Interior</button>
                <button onClick={() => togglePopup('roofs')}>Roof</button>
                <button onClick={() => togglePopup('wheels')}>Wheel</button>
                <div className="create-car-name">
                    <input type="text" id="name" name="name" placeholder="Name your Car..." value={carName} 
                        onChange={(e) => setCarName(e.target.value)} />
                    <input type="submit" className="create-car-button" value="Create" onClick={handleCreateCar} />
                </div>
            </div>
            <div className="create-car-price">💰${totalPrice}</div>
            
            {activePopup && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-grid">
                            {renderEventOptions()}
                        </div>
                        <button onClick={() => togglePopup(activePopup)}>Done</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateCar;
