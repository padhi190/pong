import { useEffect, useReducer } from 'react';
import { Ball } from './Ball';
import { GameBox } from './GameBox';
import { GameContainer } from './GameContainer';
import { Paddle } from './Paddle';

const BALL_SIZE = 20;
const GAME_HEIGHT = 500;
const GAME_WIDTH = 800;
const INIT_SPEED = 5; //initial ball speed
const INC_SPEED = 1; //increase speed on each touch by a factor of
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 35; //how fast paddle can move
const INTERVAL = 25; //used in setInterval

const INITIAL_STATE = {
  ballPos: {
    top: (GAME_HEIGHT - BALL_SIZE) / 2,
    left: (GAME_WIDTH + BALL_SIZE) / 2,
  },
  ballSpeed: {
    top: -INIT_SPEED,
    left: 0,
  },
  playerOne: {
    pos: {
      top: (GAME_HEIGHT - PADDLE_HEIGHT) / 2,
      left: 0,
    },
    score: 0,
  },
  playerTwo: {
    pos: {
      top: (GAME_HEIGHT - PADDLE_HEIGHT) / 2,
      left: GAME_WIDTH - PADDLE_WIDTH,
    },
    score: 0,
  },
  gameState: {
    inProgress: true,
    inPlay: true,
  },
};

const ACTION_TYPES = {
  MOVE_BALL: 'MOVE_BALL',
  BOUNCE_TOP: 'BOUNCE_TOP',
  BOUNCE_BOTTOM: 'BOUNCE_BOTTOM',
  BOUNCE_LEFT: 'BOUNCE_LEFT',
  BOUNCE_RIGHT: 'BOUNCE_RIGHT',
  LEAVE_LEFT: 'LEAVE_LEFT',
  LEAVE_RIGHT: 'LEAVE_RIGHT',
  MOVE_PLAYER_ONE: 'MOVE_PLAYER_ONE',
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.BOUNCE_TOP:
      return {
        ...state,
        ballSpeed: { ...state.ballSpeed, top: -Math.abs(state.ballSpeed.top) },
      };
    case ACTION_TYPES.BOUNCE_BOTTOM:
      return {
        ...state,
        ballSpeed: { ...state.ballSpeed, top: Math.abs(state.ballSpeed.top) },
      };
    case ACTION_TYPES.MOVE_BALL:
      return {
        ...state,
        ballPos: {
          top: state.ballPos.top + state.ballSpeed.top,
          left: state.ballPos.left + state.ballSpeed.left,
        },
      };
    case ACTION_TYPES.MOVE_PLAYER_ONE:
      if (action.payload === 'UP')
        return {
          ...state,
          playerOne: {
            ...state.playerOne,
            pos: {
              ...state.playerOne.pos,
              top: Math.max(0, state.playerOne.pos.top - PADDLE_SPEED),
            },
          },
        };
      else
        return {
          ...state,
          playerOne: {
            ...state.playerOne,
            pos: {
              ...state.playerOne.pos,
              top: Math.min(
                GAME_HEIGHT - PADDLE_HEIGHT,
                state.playerOne.pos.top + PADDLE_SPEED
              ),
            },
          },
        };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  //Ball movement logic
  useEffect(() => {
    let ballTimerID;
    if (ballTimerID) clearInterval(ballTimerID);
    if (state.gameState.inProgress && state.gameState.inPlay) {
      ballTimerID = setInterval(() => {
        dispatch({ type: ACTION_TYPES.MOVE_BALL });
      }, INTERVAL);
    }

    return () => clearInterval(ballTimerID);
  }, [state.ballSpeed.top, state.ballSpeed.left, state.gameState.inProgress, state.gameState.inPlay]);


  // Paddle movement Player 1
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      dispatch({ type: ACTION_TYPES.MOVE_PLAYER_ONE, payload: "UP" });
    }
    if (e.key === 'ArrowDown') {
      dispatch({ type: ACTION_TYPES.MOVE_PLAYER_ONE, payload: "DOWN" });
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  //Ball bounce logic
  useEffect(() => {
    // Bounce off top and bottom wall
    if (state.ballPos.top === GAME_HEIGHT - BALL_SIZE)
      dispatch({ type: ACTION_TYPES.BOUNCE_TOP });
    if (state.ballPos.top === 0) dispatch({ type: ACTION_TYPES.BOUNCE_BOTTOM });
  }, [state.ballPos.top, state.ballPos.left]);

  return (
    <GameContainer>
      <GameBox width={GAME_WIDTH} height={GAME_HEIGHT}>
        <Ball size={BALL_SIZE} position={state.ballPos} />
        <Paddle
          width={PADDLE_WIDTH}
          height={PADDLE_HEIGHT}
          position={state.playerOne.pos}
        />
        <Paddle
          width={PADDLE_WIDTH}
          height={PADDLE_HEIGHT}
          position={state.playerTwo.pos}
        />
      </GameBox>
    </GameContainer>
  );
}

export default App;
