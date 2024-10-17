import https from 'https';
import './dotenv.js'
import pg from 'pg'

const config = {
    user: 'postgres',
    password: 'XxeopsjwSTgtRPYrQBsuMbIvvlJTiSzV',
    host: 'junction.proxy.rlwy.net',
    port: '30404',
    database: 'railway'
}
console.log(config)
const pool = new pg.Pool(config)


const createCustomTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS customitem CASCADE;

        CREATE TABLE IF NOT EXISTS customitem (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            isconvertible BOOLEAN NOT NULL, 
            exterior INTEGER NOT NULL,
            roof INTEGER NOT NULL,
            wheels INTEGER NOT NULL,
            interior INTEGER NOT NULL,
            price INTEGER NOT NULL 
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('CustomItem table created successfully.');
    } catch (error) {
        console.error('Error creating CustomItem table:', error);
    }
};

const createInteriors = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS interiors;

        CREATE TABLE IF NOT EXISTS interiors (
            id SERIAL PRIMARY KEY,
            color TEXT NOT NULL, 
            image TEXT NOT NULL,
            price INTEGER NOT NULL, 
            iscombo BOOLEAN
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Interiors table created successfully.');
    } catch (error) {
        console.error('Error creating Interiors table:', error);
    }
};

const createExteriors = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS exteriors;

        CREATE TABLE IF NOT EXISTS exteriors (
            id SERIAL PRIMARY KEY,
            color TEXT NOT NULL,
            image TEXT NOT NULL,
            price INTEGER NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Exteriors table created successfully.');
    } catch (error) {
        console.error('Error creating Exteriors table:', error);
    }
};

const createRoofs = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS roofs;

        CREATE TABLE IF NOT EXISTS roofs (
            id SERIAL PRIMARY KEY,
            color TEXT NOT NULL, 
            image TEXT NOT NULL,
            price INTEGER NOT NULL, 
            isconvertible BOOLEAN NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Roofs table created successfully.');
    } catch (error) {
        console.error('Error creating Roofs table:', error);
    }
};

const createWheels = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS wheels;

        CREATE TABLE IF NOT EXISTS wheels (
            id SERIAL PRIMARY KEY,
            color TEXT NOT NULL, 
            image TEXT NOT NULL, 
            price INTEGER NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Wheels table created successfully.');
    } catch (error) {
        console.error('Error creating wheels table:', error);
    }
};

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const fetchAndInsertCars = async () => {
    try {
        const carsData = await fetchData('https://boltbucket.up.railway.app/api/cars');
        for (const car of carsData) {
            const insertCarQuery = {
                text: 'INSERT INTO customitem (name, isconvertible, exterior, roof, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                values: [car.name, car.isconvertible, car.exterior, car.roof, car.wheels, car.interior, car.price],
            };
            await pool.query(insertCarQuery);
        }
        
        console.log(`✅ Records added successfully to customitem.`);
    } catch (error) {
        console.error('Error fetching or inserting cars:', error);
    }
};

const fetchAndInsertInteriors = async () => {
    try {
        const interiorsData = await fetchData('https://boltbucket.up.railway.app/api/interiors');
        for (const interior of interiorsData) {
            const insertInteriorQuery = {
                text: 'INSERT INTO interiors (color, image, price, iscombo) VALUES ($1, $2, $3, $4)',
                values: [ interior.color, interior.image, interior.price, interior.iscombo],
            };
            await pool.query(insertInteriorQuery);
            
        }
        
        console.log(`✅ Records added successfully to interiors.`);
    } catch (error) {
        console.error('Error fetching or inserting interiors:', error);
    }
};

const fetchAndInsertExteriors = async () => {
    try {
        const exteriorsData = await fetchData('https://boltbucket.up.railway.app/api/exteriors');
        for (const exterior of exteriorsData) {
            const insertExteriorQuery = {
                text: 'INSERT INTO exteriors (color, image, price) VALUES ($1, $2, $3)',
                values: [exterior.color, exterior.image, exterior.price],
            };

            await pool.query(insertExteriorQuery);
        }

        console.log(`✅ Records added successfully to exteriors.`);
    } catch (error) {
        console.error('Error fetching or inserting exteriors:', error);
    }
};

const fetchAndInsertRoofs = async () => {
    try {
        const roofsData = await fetchData('https://boltbucket.up.railway.app/api/roofs');
        for (const roof of roofsData) {
            const insertRoofQuery = {
                text: 'INSERT INTO roofs (color, image, price, isconvertible) VALUES ($1, $2, $3, $4)',
                values: [roof.color, roof.image, roof.price, roof.isconvertible],
            };

            await pool.query(insertRoofQuery);
            
        }
        console.log(`✅ Records added successfully to roofs.`);
    } catch (error) {
        console.error('Error fetching or inserting roofs:', error);
    }
};

const fetchAndInsertWheels = async () => {
    try {
        const wheelsData = await fetchData('https://boltbucket.up.railway.app/api/wheels');
        for (const wheel of wheelsData) {
            const insertWheelQuery = {
                text: 'INSERT INTO wheels (color, image, price) VALUES ($1, $2, $3)',
                values: [wheel.color, wheel.image, wheel.price],
            };

            await pool.query(insertWheelQuery);
            
        }
        console.log(`✅ Records added successfully to wheels.`);
    } catch (error) {
        console.error('Error fetching or inserting wheels:', error);
    }
};

const fetchAndInsertData = async () => {
    await createCustomTable();
    await createInteriors();
    await createExteriors();
    await createRoofs();
    await createWheels();

    await fetchAndInsertCars();
    await fetchAndInsertInteriors();
    await fetchAndInsertExteriors();
    await fetchAndInsertRoofs();
    await fetchAndInsertWheels();
};

fetchAndInsertData();
