import './Control.css';
import { motion as m } from 'framer-motion';

const Control = ({ start, round, controls }) => {

  const startHandler = () => {
    start();
  }

  let button;

  if (round === 0) {
    button = <h2 className='start' onClick={startHandler}>START</h2>
  } else if (round !== 0) {
    button = <h2 className='game'>Round&#160;
      <m.span
        initial={{ height: '200%', y: '-25%' }}
        animate={controls}
      >
        <span className='round__count'>{round + 1}</span>
        <span className='round__count'>{round}</span>
      </m.span>
    </h2>
  }

  return (
    <div className='control' >
      {button}
    </div>
  );
}

export default Control;