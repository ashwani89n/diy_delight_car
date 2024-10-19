import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CarsAPI from '../services/CarsAPI';
import '../css/EditCar.css'
import { useNavigate } from 'react-router-dom';

const EditCar = () => {
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

                if(ext != 0){
                const ext = await CarsAPI.getExteriorById(exterior);
                setExt(ext);
                }
                
                if(int != 0){
                const int = await CarsAPI.getInteriorById(interior);
                setInt(int);
                }

                if(rof != 0){
                const rof = await CarsAPI.getRoofById(roof);
                setRoof(rof);
                }

                if(whe != 0){
                const whe = await CarsAPI.getWheelById(wheel);
                setWheel(whe);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [exterior, interior, roof, wheel]);

    const updateGift = async () => {

        const carData = {
			id: id,
            name: carName,
            isconvertible: isConvertible,
            exterior: selectedOptions.exteriors?.id, 
            roof: selectedOptions.roofs?.id,         
            wheels: selectedOptions.wheels?.id,      
            interior: selectedOptions.interiors?.id, 
            price: totalPrice,                       
        };
		
        const options = {
		  method: 'PATCH',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(carData),
		}

        try {
            const response = await fetch(`/cars/${id}`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json(); 
            navigate('/customcars');
        } catch (error) {
            console.error('Error Updating car:', error);
        }
    };

    const deleteGift = async () => {

        const options = {
		  method: 'DELETE'
		}
        try {
            const response = await fetch(`/api/cars/${id}`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await response.json(); 
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <div className="card-cardetails"> 
            <header>
                <h3>{name}</h3>
            </header>
            <div className="car-summary-row1">
                <div className="car-summary1">
                    <div onClick={() => togglePopup('exterior')} className="option-card1">
                        <p>🖌️ Exterior: {ext.color}</p>
                        <p>Price: ${ext.price}</p>
                    </div>
                    <div onClick={() => togglePopup('roof')} className="option-card1">
                        <p>😎 Roof: {rof.color}</p>
                        <p>Price: ${rof.price}</p>
                    </div>
                    <div  className="option-card">
                    <p>Price: 💰${price}</p>
                </div>
                </div>
                <div className="car-summary1">
                    <div onClick={() => togglePopup('wheel')} className="option-card1">
                        <p>🛴 Wheels: {whe.color}</p>
                        <p>Price: ${whe.price}</p>
                    </div>
                    <div onClick={() => togglePopup('interior')} className="option-card1">
                        <p>💺 Interior: {int.color}</p>
                        <p>Price: ${rof.price}</p>
                    </div>
                    <div onClick={() => togglePopup('isConvertible')} className="option-card1">
                    <p>Convertible: {isconvertible ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <input className='submitButton' type='submit' value='Submit' onClick={updateGift} />
                <button className='deleteButton' onClick={deleteGift}>Delete</button>
            </div>
        </div>
    );
};

export default EditCar;
