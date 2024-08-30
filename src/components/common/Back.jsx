import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const Back = ({ title = '' }) => {
    const location = useLocation();
    return (
        <>
            <section className="back">
                <div className="overlay-back"></div>
                <h1>{title}</h1>
                <h2>Home / Pages / {location.pathname.split('/')[1]}</h2>
            </section>
            <div className="margin"></div>
        </>
    );
};

Back.propTypes = {
    title: PropTypes.string, // Define the expected type of 'title' prop
};

export default Back;
