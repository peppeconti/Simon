import { useState } from 'react';
import { motion as m } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import './GameButton.css';

const GameButton = ({ border, color, controls, audio, player, checkSequence, id}) => {

  const medium = useMediaQuery('(max-width: 414px)');
  const small = useMediaQuery('(max-width: 375px)');
  const smaller = useMediaQuery('(max-width: 280px)');

  let boardSize;

  if (smaller) {
    boardSize = '.15rem';
  } else if (small) {
    boardSize = '.25rem';
  } else if (medium) {
    boardSize = '.3rem';
  } else {
    boardSize = '.5rem';
  }

  const buttonStyles = {
    backgroundColor: color,
    borderRadius: `${border === 'TL' ? 600 : 0}px ${border === 'TR' ? 600 : 0}px ${border === 'BR' ? 600 : 0}px ${border === 'BL' ? 600 : 0}px`,
    borderLeft: `${border === 'BR' || border === 'TR' ? `${boardSize} solid #15263F` : 'none'}`,
    borderTop: `${border === 'BR' || border === 'BL' ? `${boardSize} solid #15263F` : 'none'}`,
    borderRight: `${border === 'TL' || border === 'BL' ? `${boardSize} solid #15263F` : 'none'}`,
    borderBottom: `${border === 'TL' || border === 'TR' ? `${boardSize} solid #15263F` : 'none'}`,
  };

  const [animation, setAnimation] = useState(false);

  const animate = async () => {
    if (!animation && player) {
      setAnimation(true);
      await controls.set({
        opacity: .5, scale: .9
      })
      await checkSequence(id, audio);
      await controls.start({
        opacity: 1, scale: 1
      });
      setAnimation(false);
    }
  }

  return <m.div
    className='button'
    style={buttonStyles}
    type='button'
    animate={controls}
    transition={{ ease: "easeOut", duration: .7 }}
    onClick={animate}
  />;

}

export default GameButton;