import React, { useState } from 'react';
import GameButton from './GameButton';
import Control from './Control';
import Infos from './Infos';
import InfoButton from './InfoButton';
import Modal from './Modal';
import useSimon from '../hooks/useSimon';
import './Simon.css';

const Simon = () => {

  const [infos, setInfos] = useState(false);

  const { state, dispatch, checkSequence, roundControls, GameButtons, loading } = useSimon();

  const start = () => {
    dispatch({ type: 'new-round', element: Math.floor(Math.random() * 4) });
  };

  return (
    <div className='board'>
      {GameButtons.current.map((e, i) => <GameButton controls={e.controls} key={e.id} id={i} color={e.color} border={e.border} audio={e.audio} player={state.player} checkSequence={checkSequence} />)}
      <Control start={start} round={state.round} controls={roundControls} />
      {(state.gameOver || loading) && <Modal round={state.round} dispatch={dispatch} loading={loading} />}
      {infos && <Infos setInfos={setInfos} />}
      <InfoButton setInfos={setInfos} />
    </div>
  );
}

export default Simon;