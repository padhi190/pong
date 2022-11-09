import { useEffect, useState } from 'react';
import { Ball } from './Ball';
import { GameBox } from './GameBox';
import { GameContainer } from './GameContainer';

const BALL_SIZE = 20;
const GAME_HEIGHT = 500;
const GAME_WIDTH = 800;
const INIT_SPEED = 3;

function App() {
  const initialBallPos = { top: (GAME_HEIGHT - BALL_SIZE) / 2, left: (GAME_WIDTH + BALL_SIZE) / 2 };
  const [ballPos, setBallPos] = useState(initialBallPos);
  const [speed, setSpeed] = useState({ x: INIT_SPEED, y: INIT_SPEED });
  const [gameInProgress, setGameInProgress] = useState(true);
  const [gamePlay, setGamePlay] = useState(true);

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

  useEffect(() => {
    if (ballPos.top === GAME_HEIGHT - BALL_SIZE || ballPos.top === 0) {
      setSpeed(speed => ({...speed, y: -speed.y}));
    }
  }, [ballPos.top, ballPos.left]);

  return (
    <GameContainer>
      <GameBox width={GAME_WIDTH} height={GAME_HEIGHT}>
        <Ball size={BALL_SIZE} position={ballPos} />
      </GameBox>
    </GameContainer>
  );
}

export default App;
