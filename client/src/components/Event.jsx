import React, { useState, useEffect } from 'react';
import CarsAPI from '../services/CarsAPI';

const Event = (props) => {
    const [data, setData] = useState({});

    useEffect(() => {
        (async () => {
            try {
                let eventData;
                switch (props.type) {
                    case 'exteriors':
                        eventData = await CarsAPI.getExteriorById(props.id);
                        break;
                    case 'interiors':
                        eventData = await CarsAPI.getInteriorById(props.id);
                        break;
                    case 'roofs':
                        eventData = await CarsAPI.getRoofById(props.id);
                        break;
                    case 'wheels':
                        eventData = await CarsAPI.getWheelById(props.id);
                        break;
                    default:
                        break;
                }
                setData(eventData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, [props.id, props.type]);

    return (
        <article className='event-information'>
            <img src={data.image} alt={data.color} />
            <div className='event-information-overlay'>
                <div className='text'>
                    <div>{data.color}</div>
                    <div>{data.price}</div>
                    {props.type === 'interiors' && <div>{data.iscombo}</div>}
                    {props.type === 'roofs' && <div>{data.isconvertible}</div>}
                </div>
            </div>
        </article>
    );
};

export default Event;
