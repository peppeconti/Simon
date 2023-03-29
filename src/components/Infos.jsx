import React from 'react';
import ReactDOM from 'react-dom';
import './Infos.css';

const portalElement = document.getElementById('overlays');

const Infos = ({ setInfos }) => {

    return (
        <>
            {ReactDOM.createPortal(<div className='infos' onClick={() => setInfos(false)}>infos</div>, portalElement)}
        </>
    );
};

export default Infos;