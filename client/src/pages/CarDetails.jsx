import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CarsAPI from '../services/CarsAPI';
import '../css/CarDetails.css'
import { useNavigate } from 'react-router-dom';

const CarDetails = () => {
    const location = useLocation();
    const {id, name, exterior, roof, wheel, interior, price, isconvertible } = location.state || {};
    const [ext, setExt] = useState({});
    const [int, setInt] = useState({});
    const [rof, setRoof] = useState({});
    const [whe, setWheel] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const ext = await CarsAPI.getExteriorById(exterior);
                setExt(ext);
                
                const int = await CarsAPI.getInteriorById(interior);
                setInt(int);

                const rof = await CarsAPI.getRoofById(roof);
                setRoof(rof);

                const whe = await CarsAPI.getWheelById(wheel);
                setWheel(whe);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [exterior, interior, roof, wheel]);

    const handleOnClick = () => {
        console.log('Navigating to edit with ID:', id);
        navigate(`/edit/${id}`, {
        state: {
            id: id,
            name: name,
            exterior: exterior,
            roof: roof,
            wheel: wheel,
            interior: interior,
            price: price,
            isconvertible: isconvertible,
        }
    });
    };


    return (
        <div className="card-cardetails"> 
            <header>
                <h3>{name}</h3>
            </header>
            <div className="car-summary-row1">
                <div className="car-summary1">
                    <div className="option-card">
                        <p>🖌️ Exterior: {ext.color}</p>
                        <p>Price: ${ext.price}</p>
                    </div>
                    <div  className="option-card">
                        <p>😎 Roof: {rof.color}</p>
                        <p>Price: ${rof.price}</p>
                    </div>
                    <div  className="option-card">
                    <p>Price: 💰${price}</p>
                </div>
                </div>
                <div className="car-summary1">
                    <div  className="option-card">
                        <p>🛴 Wheels: {whe.color}</p>
                        <p>Price: ${whe.price}</p>
                    </div>
                    <div  className="option-card">
                        <p>💺 Interior: {int.color}</p>
                        <p>Price: ${rof.price}</p>
                    </div>
                    <div  className="option-card">
                    <p>Convertible: {isconvertible ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button onClick={handleOnClick}>Edit</button>
                <button onClick={handleOnClick}>Delete</button>
            </div>
        </div>
    );
};

export default CarDetails;
