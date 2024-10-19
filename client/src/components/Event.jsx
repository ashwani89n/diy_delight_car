import React, { useState, useEffect } from 'react';
import CarsAPI from '../services/CarsAPI';

const Event = ({ id, color, price, type, onSelect, iscombo, isconvertible, isSelected }) => {
 
    const [data, setData] = useState({});
    console.log(isSelected);
    useEffect(() => {
        (async () => {
            try {
                let eventData;
                switch (type) {
                    case 'exteriors':
                        eventData = await CarsAPI.getExteriorById(id);
                        break;
                    case 'interiors':
                        eventData = await CarsAPI.getInteriorById(id);
                        break;
                    case 'roofs':
                        eventData = await CarsAPI.getRoofById(id);
                        break;
                    case 'wheels':
                        eventData = await CarsAPI.getWheelById(id);
                        break;
                    default:
                        break;
                }
                setData(eventData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, [id, type]);

    const handleClick = () => {
        onSelect(type, { id, color, price , iscombo, isconvertible});
    };

    return (
        <article className={`event-information ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
            <div className='event-information-overlay'>
                <div className='text'>
                    <div>{data.color || color}</div>
                    <div>${data.price || price}</div>
                    {type === 'interiors' && iscombo && <div>Combo: {iscombo}</div>}
                    {type === 'roofs' && isconvertible && <div>Convertible: {isconvertible ? "Yes" : "No"}</div>}
                </div>
            </div>
        </article>
    );
};

export default Event;
