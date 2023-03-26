import { useEffect, useReducer, useId, useRef, useCallback } from 'react';
import { useAnimationControls } from 'framer-motion';
import { Howl } from 'howler';
import sounds from '../audio/sounds_effect.mp3';

const initialState = {
    round: 0,
    sequence: [],
    player: false,
    gameOver: false,
    loading: true
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'new-round':
            return { ...state, round: state.round + 1, sequence: [...state.sequence, action.element] };
        case 'switch-player':
            return { ...state, player: !state.player };
        case 'game-over':
            return { ...state, gameOver: true, player: false };
        case 'loaded':
            return { ...state, loading: false };
        case 'reset':
            return initialState;
        default:
            return state;
    }
};

const useSimon = () => {

    const GameButtons = useRef([
        {
            color: '#ff0000',
            border: 'TL',
            id: useId(),
            audio: 'red',
            controls: useAnimationControls()
        },
        {
            color: '#297fb8',
            border: 'TR',
            id: useId(),
            audio: 'blue',
            controls: useAnimationControls()
        },
        {
            color: '#27ae61',
            border: 'BL',
            id: useId(),
            audio: 'green',
            controls: useAnimationControls()
        },
        {
            color: '#f1c40f',
            border: 'BR',
            id: useId(),
            audio: 'yellow',
            controls: useAnimationControls()
        }
    ]);

    const sequenceRef = useRef();

    const [state, dispatch] = useReducer(reducer, initialState);

    // CONTROS FOR THE ROUND COUNT
    const roundControls = useAnimationControls();

    // SOUNDS
    const soundEffects = useRef(new Howl({
        src: [sounds],
        sprite: {
            red: [0, 513],
            blue: [513, 461],
            green: [974, 516],
            yellow: [1490, 446],
            error: [1936, 662],
            slide: [2598, 772]
        },
        onload: () => {
            setTimeout(() => {
                dispatch({ type: 'loaded' });
                console.log('loaded');
            }, 2000)
        }
    }));

    // BUTTON ANIMATION
    const animateButton = useCallback(async (el) => {
        GameButtons.current[el].controls.set({
            opacity: .5, scale: .9
        })
        soundEffects.current.play(GameButtons.current[el].audio);
        GameButtons.current[el].controls.start({
            opacity: 1, scale: 1
        })
    }, []);

    const checkSequence = (sequenceEl, audio) => {
        if (state.player) {

            if (sequenceEl === sequenceRef.current[0]) {

                if (sequenceRef.current.length === 1) {
                    soundEffects.current.play(audio);
                    dispatch({ type: 'switch-player' });
                    setTimeout(async () => {
                        //setSlide('round__wrap down');
                        soundEffects.current.play('slide');
                        await roundControls.start({
                            y: '25%',
                            transition: { duration: 1 }
                        });
                        roundControls.set({
                            y: '-25%',
                        });
                        dispatch({ type: 'new-round', element: Math.floor(Math.random() * 4) });
                    }, 700);
                } else {
                    soundEffects.current.play(audio);
                    sequenceRef.current.shift();
                }

            } else {
                soundEffects.current.play('error');
                dispatch({ type: 'game-over' });
            }

        }
    }

    useEffect(() => {

        const promises = state.sequence.map((el, i) => {
            return new Promise(res => {
                setTimeout(() => {
                    animateButton(el);
                    res(el);
                }, 1000 * (i + 1))
                return res;
            });
        });

        if (promises.length) {
            Promise.allSettled(promises)
                .then(res => res.map(el => el.value))
                .then(sequence => sequenceRef.current = sequence)
                .then(() => setTimeout(() => {
                    dispatch({ type: 'switch-player' });
                }, 700));
        }


    }, [state.sequence, animateButton]);

    return { state, dispatch, checkSequence, roundControls, GameButtons };
}

export default useSimon;