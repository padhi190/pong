import { useEffect, useReducer } from 'react';
import { Ball } from './Ball';
import { GameBox } from './GameBox';
import { GameContainer } from './GameContainer';
import { gameReducer, ACTION_TYPES } from './gameReducer';
import { GAME_HEIGHT, BALL_SIZE, GAME_WIDTH, INIT_SPEED, PADDLE_HEIGHT, PADDLE_WIDTH, INTERVAL } from './GAME_CONST';
import { Paddle } from './Paddle';

const INITIAL_STATE = {
  ballPos: {
    top: (GAME_HEIGHT - BALL_SIZE) / 2,
    left: (GAME_WIDTH + BALL_SIZE) / 2,
  },
  ballSpeed: {
    top: -INIT_SPEED,
    left: -INIT_SPEED,
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
  }, [
    state.ballSpeed.top,
    state.ballSpeed.left,
    state.gameState.inProgress,
    state.gameState.inPlay,
  ]);

  // Paddle movement Player 1
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      dispatch({ type: ACTION_TYPES.MOVE_PLAYER_ONE, payload: 'UP' });
    }
    if (e.key === 'ArrowDown') {
      dispatch({ type: ACTION_TYPES.MOVE_PLAYER_ONE, payload: 'DOWN' });
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Player 2 movement logic
  useEffect(() => {
    let timerID;

    timerID = setInterval(() => {
      if (state.gameState.inPlay && state.gameState.inProgress) {
        if (state.ballSpeed.left > 0) {
          // only move if ball is heading toward player 2
          if (state.ballPos.top > state.playerTwo.pos.top + PADDLE_HEIGHT + 50) {
            dispatch({ type: ACTION_TYPES.MOVE_PLAYER_TWO, payload: 'DOWN' });
          }
          if (state.ballPos.top < state.playerTwo.pos.top + PADDLE_HEIGHT - 50) {
            dispatch({ type: ACTION_TYPES.MOVE_PLAYER_TWO, payload: 'UP' });
          }
        }
      }
    }, 25);

    return () => clearInterval(timerID);
  }, [state.gameState.inPlay, state.gameState.inProgress, state.ballPos.top]);

  //Ball bounce & out logic
  useEffect(() => {
    const withinArea =
      state.ballPos.left >= 0 && state.ballPos.left <= GAME_WIDTH;
    // Bounce off top and bottom wall
    if (state.ballPos.top === GAME_HEIGHT - BALL_SIZE && withinArea)
      dispatch({ type: ACTION_TYPES.BOUNCE_BOTTOM });
    if (state.ballPos.top === 0 && withinArea)
      dispatch({ type: ACTION_TYPES.BOUNCE_TOP });

    // Bounce off left paddle
    const touchLeftPaddle =
      withinArea &&
      state.ballPos.left <= state.playerOne.pos.left + PADDLE_WIDTH &&
      state.ballPos.top >= state.playerOne.pos.top &&
      state.ballPos.top <= state.playerOne.pos.top + PADDLE_HEIGHT;

    if (touchLeftPaddle) dispatch({ type: ACTION_TYPES.BOUNCE_LEFT });

    // Bounce off right paddle
    const touchRightPaddle =
      withinArea &&
      state.ballPos.left >= state.playerTwo.pos.left - PADDLE_WIDTH &&
      state.ballPos.top >= state.playerTwo.pos.top &&
      state.ballPos.top <= state.playerTwo.pos.top + PADDLE_HEIGHT;

    if (touchRightPaddle) dispatch({ type: ACTION_TYPES.BOUNCE_RIGHT });

    // Scoring
    if (!withinArea && state.ballPos.left <= -BALL_SIZE) dispatch({ type: ACTION_TYPES.PLAYER_TWO_SCORE })
    if (!withinArea && state.ballPos.left >= GAME_WIDTH + BALL_SIZE) dispatch({ type: ACTION_TYPES.PLAYER_ONE_SCORE })
  }, [
    state.ballPos.top,
    state.ballPos.left,
    state.playerOne.pos.top,
    state.playerOne.pos.left,
    state.playerTwo.pos.top,
    state.playerTwo.pos.left,
  ]);

  const GameScore = ({playerOne, playerTwo}) => {
    return (
      <div style={{display: 'flex', justifyContent: 'space-between', width: `${GAME_WIDTH}px`}}>
        <h3>Player 1 {playerOne}</h3>
        <h3>Player 2 {playerTwo}</h3>
      </div>
    )
  }

  return (
    <GameContainer>
      <GameScore playerOne={state.playerOne.score} playerTwo={state.playerTwo.score} />
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
