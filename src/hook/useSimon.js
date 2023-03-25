import { useEffect, useReducer, useId, useRef, useCallback } from 'react';
import { useAnimationControls } from 'framer-motion';
import { audio_files } from '../audio/audio';

const initialState = {
    round: 0,
    sequence: [],
    player: false,
    gameOver: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'new-round':
            return { ...state, round: state.round + 1, sequence: [...state.sequence, action.element] };
        case 'switch-player':
            return { ...state, player: !state.player };
        case 'game-over':
            return { ...state, gameOver: true, player: false };
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
            audio: new Audio(audio_files[0]),
            controls: useAnimationControls()
        },
        {
            color: '#297fb8',
            border: 'TR',
            id: useId(),
            audio: new Audio(audio_files[1]),
            controls: useAnimationControls()
        },
        {
            color: '#27ae61',
            border: 'BL',
            id: useId(),
            audio: new Audio(audio_files[2]),
            controls: useAnimationControls()
        },
        {
            color: '#f1c40f',
            border: 'BR',
            id: useId(),
            audio: new Audio(audio_files[3]),
            controls: useAnimationControls()
        }
    ]);

    const sequenceRef = useRef();

    const [state, dispatch] = useReducer(reducer, initialState);

    const round__controls = useAnimationControls();

    // SOUNDS
    const slide_sound = new Audio(audio_files[5]);
    const error_sound = new Audio(audio_files[4]);

    const animateButton = useCallback(async (el) => {
        GameButtons.current[el].controls.set({
            opacity: .5, scale: .9
        })
        GameButtons.current[el].audio.play();
        GameButtons.current[el].controls.start({
            opacity: 1, scale: 1
        })
    }, []);

    const checkSequence = (sequenceEl, audio) => {
        if (state.player) {

            if (sequenceEl === sequenceRef.current[0]) {

                if (sequenceRef.current.length === 1) {
                    audio.play();
                    dispatch({ type: 'switch-player' });
                    setTimeout(async () => {
                        //setSlide('round__wrap down');
                        slide_sound.play();
                        await round__controls.start({
                            y: '25%',
                            transition: { duration: 1 }
                        });
                        round__controls.set({
                            y: '-25%',
                        });
                        dispatch({ type: 'new-round', element: Math.floor(Math.random() * 4) });
                    }, 700);
                } else {
                    audio.play();
                    sequenceRef.current.shift();
                }

            } else {
                error_sound.play();
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

    return { state, dispatch, checkSequence, round__controls, GameButtons };
}

export default useSimon;