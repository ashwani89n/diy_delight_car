import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CarsAPI from '../services/CarsAPI'
import '../css/Card.css'

const Card = (props) => {

    const [event, setEvent] = useState([])
    const [ext, setExt] = useState({})
    const [int, setInt] = useState({})
    const [roof, setRoof] = useState({})
    const [wheel, setWheel] = useState({})
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
            try {
                const eventData = await CarsAPI.getCarById(props.id)
                setEvent(eventData)

                if(eventData.exterior != 0){
                    const ext = await CarsAPI.getExteriorById(eventData.exterior);
                    setExt(ext);
                }
                
                if(eventData.interior != 0){
                const int = await CarsAPI.getInteriorById(eventData.interior);
                setInt(int);}

                if(eventData.roof != 0){
                const roof= await CarsAPI.getRoofById(eventData.roof);
                setRoof(roof);}

                if(eventData.wheel != 0){
                const wheel = await CarsAPI.getWheelById(eventData.wheels);
                setWheel(wheel);}
                        
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    const handleOnClick = () => {
        navigate(`/customcars/${props.id}`, {
            state: {
                id:props.id,
                name: event.name,
                exterior: event.exterior,
                roof: event.roof,
                wheel: event.wheels,
                interior: event.interior,
                price: event.price,
                isconvertible: event.isconvertible,
            }
        });
    };

    return (
        <div className="card"> 
            <header>
            <h3>{event.name}</h3>
            </header>
            <div className="car-summary-row">
            <div className="car-summary">
                <p>🖌️ Exterior: {ext.color}</p>
                <p>😎 Roof: {roof.color}</p>
            </div>
            <div className="car-summary">
                <p>🛴 Wheels: {wheel.color}</p>
                <p>💺 Interior: {int.color}</p>
            </div>
            <div className="car-price">
                <p>
                Price: 💰${event.price}
                </p>
                <p>Convertible: {event.isconvertible ? "Yes" : "No"}</p>
            </div>
            <div className='car-price'><button onClick={handleOnClick}>Details</button></div>
            </div>        
            </div>
    )
}

export default Card