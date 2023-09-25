import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReplyAll } from '@fortawesome/free-solid-svg-icons'
import { motion as m } from 'framer-motion';
import Spinner from './Spinner';
import './Modal.css';

const Backdrop = ({ loading, setInfos }) => {

    const closeInfos = () => setInfos(false);

    return (
        <> 
            {!loading && setInfos && <div onClick={closeInfos} className='back info__back'/>}
            {!loading && !setInfos && <m.div className='back'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: .5 }}
            />}
            {loading && <div className='back loading'>
                <Spinner />
            </div>
            }
        </>
    );
};

const ResetButton = ({ dispatch }) => {
    return (
        <m.button
            type='button'
            className='reset'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .3, delay: .5 }}
            onClick={() => dispatch({ type: 'reset' })}

        >
            <FontAwesomeIcon icon={faReplyAll} size='2x' />
        </m.button>
    );
};

const Message = ({ round }) => {

    return (
        <div className='message'>
            <m.p
                className='game__over'
                initial={{ y: '30%', scale: .5, opacity: 0 }}
                animate={{ y: 1, scale: 1, opacity: 1 }}
                transition={{ duration: .3, ease: 'easeOut', delay: .5 }}
            >Game Over!</m.p>
            <m.p
                className='round__completed'
                initial={{ y: '30%', scale: .5, opacity: 0 }}
                animate={{ y: 1, scale: 1, opacity: 1 }}
                transition={{ duration: .3, ease: 'easeOut', delay: .75 }}
            >Completed levels: {round - 1}</m.p>
        </div>
    );
};

const Infos = () => <div className='infos'>infos</div>

const portalElement = document.getElementById('overlays');

const Modal = ({ round, dispatch, loading, infos, setInfos }) => {

    return (
        <>
            {ReactDOM.createPortal(<Backdrop loading={loading} setInfos={setInfos} />, portalElement)}
            {infos && ReactDOM.createPortal(<Infos/>, portalElement)}
            {!loading && !infos && ReactDOM.createPortal(<Message round={round} />, portalElement)}
            {!loading && !infos && ReactDOM.createPortal(<ResetButton dispatch={dispatch} />, portalElement)}
        </>
    );
};

export default Modal;