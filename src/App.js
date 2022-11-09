import { useEffect, useState, useMemo } from 'react';
import { Ball } from './Ball';
import { GameBox } from './GameBox';
import { GameContainer } from './GameContainer';

const BALL_SIZE = 20;
const GAME_HEIGHT = 500;
const GAME_WIDTH = 800;

function App() {
  const initialBallPos = { top: (GAME_HEIGHT - BALL_SIZE) / 2, left: (GAME_WIDTH + BALL_SIZE) / 2 };
  // const initialBallY = (GAME_HEIGHT - BALL_SIZE) / 2;
  // const initialBallX = (GAME_WIDTH + BALL_SIZE) / 2;
  const [ballPos, setBallPos] = useState(initialBallPos);
  // const [ballPositionX, setBallPositionX] = useState(initialBallX);
  // const [ballPositionY, setBallPositionY] = useState(initialBallY);
  const [speedX, setSpeedX] = useState(0);
  const [speedY, setSpeedY] = useState(0);

  useEffect(() => {
    let timerID;
    if (timerID) clearInterval(timerID);
    timerID = setInterval(
      () => {
        // setBallPositionX(ballPositionX => ballPositionX + speedX);
        // setBallPositionY(ballPositionY => ballPositionY + speedY);
        setBallPos(({ top, left }) => ({ top: top + speedX, left: left + speedY }));
      },
      25
    );

    return () => clearInterval(timerID);
  }, [speedX, speedY]);

  useEffect(() => {
    console.log(ballPos, GAME_HEIGHT);
    if (ballPos.top === GAME_HEIGHT - BALL_SIZE) {
      setSpeedY(speed => -speed);
    }
    if (ballPos.left === 0) {
      setSpeedY(speed => -speed);
    }
  }, [ballPos]);

  return (
    <GameContainer>
      <GameBox width={GAME_WIDTH} height={GAME_HEIGHT}>
        <Ball size={BALL_SIZE} position={ballPos} />
      </GameBox>
    </GameContainer>
  );
}

export default App;
