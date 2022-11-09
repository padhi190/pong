import { useEffect, useState } from 'react';
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

function App() {
  const initialBallPos = {
    top: (GAME_HEIGHT - BALL_SIZE) / 2,
    left: (GAME_WIDTH + BALL_SIZE) / 2,
  };
  const [ballPos, setBallPos] = useState(initialBallPos);
  const [speed, setSpeed] = useState({ x: -INIT_SPEED, y: INIT_SPEED });
  const [gameInProgress, setGameInProgress] = useState(true);
  const [gamePlay, setGamePlay] = useState(true);
  const [playerOnePos, setPlayerOnePos] = useState({ top: (GAME_HEIGHT - PADDLE_HEIGHT) / 2, left: 0 });
  const [playerTwoPos, setPlayerTwoPos] = useState({ top: (GAME_HEIGHT - PADDLE_HEIGHT) / 2, left: GAME_WIDTH - PADDLE_WIDTH})

  const resetBallPosition = () => {
    setBallPos(initialBallPos);
  };

  // Paddle movement Player 1
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setPlayerOnePos((playerOnePos) => ({
        ...playerOnePos,
        top: Math.max(0, playerOnePos.top - PADDLE_SPEED),
      }));
    }
    if (e.key === 'ArrowDown') {
      setPlayerOnePos((playerOnePos) => ({
        ...playerOnePos,
        top: Math.min(
          GAME_HEIGHT - PADDLE_HEIGHT,
          playerOnePos.top + PADDLE_SPEED
        ),
      }));
    }
  };

  //Ball movement logic
  useEffect(() => {
    let ballTimerID;
    if (ballTimerID) clearInterval(ballTimerID);
    if (gamePlay && gameInProgress) {
      ballTimerID = setInterval(() => {
        setBallPos(({ top, left }) => ({
          top: top + speed.y,
          left: left + speed.x,
        }));
      }, INTERVAL);
    }

    return () => clearInterval(ballTimerID);
  }, [speed.x, speed.y, gamePlay, gameInProgress]);

  // Ball bounce logic
  useEffect(() => {
    // Bounce off top and bottom wall
    if (ballPos.top === GAME_HEIGHT - BALL_SIZE || ballPos.top === 0) {
      setSpeed((speed) => ({ ...speed, y: -speed.y }));
    }

    // Bounce off left paddle
    const touchLeftPaddle =
      ballPos.left <= playerOnePos.left + PADDLE_WIDTH &&
      ballPos.top >= playerOnePos.top &&
      ballPos.top <= playerOnePos.top + PADDLE_HEIGHT;
    
    if (touchLeftPaddle) {
      setSpeed((speed) => ({ ...speed, x: -INC_SPEED*speed.x }));
    }

    //Bounce off right paddle
    const touchRightPaddle =
      ballPos.left >= playerTwoPos.left &&
      ballPos.top >= playerTwoPos.top &&
      ballPos.top <= playerTwoPos.top + PADDLE_HEIGHT;
    
    if (touchRightPaddle) {
      setSpeed((speed) => ({ ...speed, x: -INC_SPEED*speed.x }));
    }
  }, [ballPos.top, ballPos.left, playerOnePos.left, playerOnePos.top]);

  // Paddle movement listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Score logic
  useEffect(() => {
    if (ballPos.left <= -100) {
      setGamePlay(false);
      setSpeed((speed) => ({ x: INIT_SPEED, y: INIT_SPEED }));
      resetBallPosition();
      setGamePlay(true);
    }
  }, [ballPos.top, ballPos.left])

  // Player 2 movement logic
  useEffect(() => {
    if (gamePlay && gameInProgress) {
        if (speed.x > 0) {
          if (ballPos.top > playerTwoPos.top + PADDLE_HEIGHT) {
            setPlayerTwoPos(pos => ({...pos, top: Math.min(GAME_HEIGHT - PADDLE_HEIGHT, pos.top + PADDLE_SPEED) }))
          }
          if (ballPos.top < playerTwoPos.top + PADDLE_HEIGHT) {
            setPlayerTwoPos(pos => ({...pos, top: Math.max(0, pos.top - PADDLE_SPEED) }))
          }
        }
    }
  },[gameInProgress, gamePlay, speed.x, ballPos.top])

  return (
    <GameContainer>
      <GameBox width={GAME_WIDTH} height={GAME_HEIGHT}>
        <Ball size={BALL_SIZE} position={ballPos} />
        <Paddle
          width={PADDLE_WIDTH}
          height={PADDLE_HEIGHT}
          position={playerOnePos}
        />
        <Paddle
          width={PADDLE_WIDTH}
          height={PADDLE_HEIGHT}
          position={playerTwoPos}
        />
      </GameBox>
    </GameContainer>
  );
}

export default App;
