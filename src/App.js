import { useEffect, useReducer } from 'react';
import { Ball } from './Ball';
import { GameBox } from './GameBox';
import { GameContainer } from './GameContainer';
import { gameReducer, ACTION_TYPES } from './gameReducer';
import { GameScore } from './GameScore';
import { GAME_HEIGHT, BALL_SIZE, GAME_WIDTH, INIT_SPEED, PADDLE_HEIGHT, PADDLE_WIDTH, INTERVAL, WIN_SCORE } from './GAME_CONST';
import { Paddle } from './Paddle';

export const INITIAL_STATE = {
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
    inProgress: false,
    inPlay: false,
    winner: ''
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

  // Paddle movement Player 1 & continue game
  const handleKeyDown = (e) => {
    if (state.gameState.inProgress) {
      if (e.key === 'ArrowUp') {
        return dispatch({ type: ACTION_TYPES.MOVE_PLAYER_ONE, payload: 'UP' });
      }
      if (e.key === 'ArrowDown') {
        return dispatch({ type: ACTION_TYPES.MOVE_PLAYER_ONE, payload: 'DOWN' });
      }
      if (e.key === ' ') return dispatch({ type: ACTION_TYPES.CONTINUE_GAME });
    } else {
      if (e.key === 'Enter') return dispatch({ type: ACTION_TYPES.RESET_GAME });
    }
    
    
  };

  // Add listener on keydown
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.gameState.inProgress]);

  // Player 2 movement logic
  useEffect(() => {
    let timerID;

    timerID = setInterval(() => {
      if (state.gameState.inPlay && state.gameState.inProgress) {
        // only move if ball is heading towards player 2
        if (state.ballSpeed.left > 0) {
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
    if (state.ballPos.top >= GAME_HEIGHT - BALL_SIZE && withinArea)
      dispatch({ type: ACTION_TYPES.BOUNCE_BOTTOM });
    if (state.ballPos.top <= 0 && withinArea)
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

  // Check if player wins
  useEffect(() => {
    if (state.playerOne.score >= WIN_SCORE) dispatch({ type: ACTION_TYPES.STOP_GAME, payload: 'Player One' });
    if (state.playerTwo.score >= WIN_SCORE) dispatch({ type: ACTION_TYPES.STOP_GAME, payload: 'Player Two' });
  },[state.playerOne.score, state.playerTwo.score])

  return (
    <GameContainer>
      <GameScore playerOne={state.playerOne.score} playerTwo={state.playerTwo.score} gameState={state.gameState} />
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
