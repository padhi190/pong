import { useEffect, useState } from 'react';
import { Ball } from './Ball';
import { GameBox } from './GameBox';
import { GameContainer } from './GameContainer';
import { Paddle } from './Paddle';

const BALL_SIZE = 20;
const GAME_HEIGHT = 500;
const GAME_WIDTH = 800;
const INIT_SPEED = 0;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;
const PADDLE_SPEED = 35;

function App() {
  const initialBallPos = { top: (GAME_HEIGHT - BALL_SIZE) / 2, left: (GAME_WIDTH + BALL_SIZE) / 2 };
  const [ballPos, setBallPos] = useState(initialBallPos);
  const [speed, setSpeed] = useState({ x: -INIT_SPEED, y: INIT_SPEED });
  const [gameInProgress, setGameInProgress] = useState(true);
  const [gamePlay, setGamePlay] = useState(true);
  const [playerOnePos, setPlayerOnePos] = useState({ top: 0, left: 0 });

  const resetBallPosition = () => {
    setBallPos(initialBallPos);
  }

  // Paddle movement Player 1
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setPlayerOnePos(playerOnePos => ({ ...playerOnePos, top: Math.max(0, playerOnePos.top - PADDLE_SPEED) }));
    }
    if (e.key === 'ArrowDown') {
      setPlayerOnePos(playerOnePos => ({...playerOnePos, top: Math.min(GAME_HEIGHT - PADDLE_HEIGHT, playerOnePos.top + PADDLE_SPEED)}))
    }
  }

  //Ball movement logic
  useEffect(() => {
    let timerID;
    if (timerID) clearInterval(timerID);
    if (gamePlay && gameInProgress) {
      timerID = setInterval(
        () => {
          setBallPos(({ top, left }) => ({ top: top + speed.y, left: left + speed.x }));
        },
        25
      );
    }

    return () => clearInterval(timerID);
  }, [speed.x, speed.y, gamePlay, gameInProgress]);

  // Ball bounce logic
  useEffect(() => {
    if (ballPos.top === GAME_HEIGHT - BALL_SIZE || ballPos.top === 0) {
      setSpeed(speed => ({...speed, y: -speed.y}));
    }
  }, [ballPos.top, ballPos.left]);

  // Paddle movement listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return (() => document.removeEventListener('keydown', handleKeyDown));
  },[])

  return (
    <GameContainer>
      <GameBox width={GAME_WIDTH} height={GAME_HEIGHT}>
        <Ball size={BALL_SIZE} position={ballPos} />
        <Paddle width={PADDLE_WIDTH} height={PADDLE_HEIGHT} position={playerOnePos} />
        <Paddle width={PADDLE_WIDTH} height={PADDLE_HEIGHT} position={{ top: 0, left: GAME_WIDTH - PADDLE_WIDTH }} />
      </GameBox>
    </GameContainer>
  );
}

export default App;
