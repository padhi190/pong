import {
  PADDLE_SPEED,
  GAME_HEIGHT,
  PADDLE_HEIGHT,
  BALL_SIZE,
  GAME_WIDTH,
} from './GAME_CONST';

export const ACTION_TYPES = {
  MOVE_BALL: 'MOVE_BALL',
  BOUNCE_TOP: 'BOUNCE_TOP',
  BOUNCE_BOTTOM: 'BOUNCE_BOTTOM',
  BOUNCE_LEFT: 'BOUNCE_LEFT',
  BOUNCE_RIGHT: 'BOUNCE_RIGHT',
  LEAVE_LEFT: 'LEAVE_LEFT',
  LEAVE_RIGHT: 'LEAVE_RIGHT',
  MOVE_PLAYER_ONE: 'MOVE_PLAYER_ONE',
  MOVE_PLAYER_TWO: 'MOVE_PLAYER_TWO',
  PLAYER_ONE_SCORE: 'PLAYER_ONE_SCORE',
  PLAYER_TWO_SCORE: 'PLAYER_TWO_SCORE',
};

const INITIAL_BALL_POS = {
  top: (GAME_HEIGHT - BALL_SIZE) / 2,
  left: (GAME_WIDTH + BALL_SIZE) / 2,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.BOUNCE_TOP:
      return {
        ...state,
        ballSpeed: { ...state.ballSpeed, top: Math.abs(state.ballSpeed.top) },
      };
    case ACTION_TYPES.BOUNCE_BOTTOM:
      return {
        ...state,
        ballSpeed: { ...state.ballSpeed, top: -Math.abs(state.ballSpeed.top) },
      };
    case ACTION_TYPES.BOUNCE_LEFT:
      return {
        ...state,
        ballSpeed: { ...state.ballSpeed, left: Math.abs(state.ballSpeed.left) },
      };
    case ACTION_TYPES.BOUNCE_RIGHT:
      return {
        ...state,
        ballSpeed: {
          ...state.ballSpeed,
          left: -Math.abs(state.ballSpeed.left),
        },
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
    case ACTION_TYPES.MOVE_PLAYER_TWO:
      if (action.payload === 'UP')
        return {
          ...state,
          playerTwo: {
            ...state.playerTwo,
            pos: {
              ...state.playerTwo.pos,
              top: Math.max(0, state.playerTwo.pos.top - PADDLE_SPEED),
            },
          },
        };
      else
        return {
          ...state,
          playerTwo: {
            ...state.playerTwo,
            pos: {
              ...state.playerTwo.pos,
              top: Math.min(
                GAME_HEIGHT - PADDLE_HEIGHT,
                state.playerTwo.pos.top + PADDLE_SPEED
              ),
            },
          },
        };
    case ACTION_TYPES.PLAYER_ONE_SCORE:
      return {
        ...state,
        playerOne: {
          ...state.playerOne,
          score: state.playerOne.score + 1,
        },
        ballPos: INITIAL_BALL_POS,
      };
    case ACTION_TYPES.PLAYER_TWO_SCORE:
      return state
    default:
      return state;
  }
};
