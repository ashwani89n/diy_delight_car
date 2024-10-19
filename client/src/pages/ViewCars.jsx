import React, { useState, useEffect } from 'react'
import '../App.css'
import Card from '../components/Card'
import '../css/Card.css'
import CarsAPI from '../services/CarsAPI'


const ViewCars = () => {
    const [events, setEvents] = useState([])
    
    useEffect(() => {
        (async () => {
            try {
                const eventsData = await CarsAPI.getAllCars();
                console.log('Fetched car data:', eventsData); 
                if (Array.isArray(eventsData)) {
                    setEvents(eventsData);
                } else {
                    console.warn('Expected an array but got:', eventsData);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        })();
    }, []);
    return (
        <div className='car-decription'>
            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Card
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            isconvertible={event.isconvertible}
                            exterior={event.exterior}
                            roof={event.roof}
                            wheel={event.wheel}
                            interior={event.interior}
                            price={event.price}
                        />
                    ) : <h2>{'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default ViewCars