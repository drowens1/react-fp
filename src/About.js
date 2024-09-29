import React from 'react';
import { Image } from 'react-bootstrap';

function About() {
    return (
        <div className="d-flex justify-content-center align-items-center m-5">
            <div className="w-5 text-center">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Marketplace_Logo.png/1200px-Marketplace_Logo.png" alt="Marketplace logo" fluid style={{ maxWidth: '550px' }}/>
            </div>
            <div className="w-50 m-5 text-center">
                <p style={{ fontSize: '40px' }}>Marketplace placeholder text!</p>
            </div>
        </div>
    )
}

export default About