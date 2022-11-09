import { useEffect, useState } from 'react';
import { Ball } from './Ball';
import { GameBox } from './GameBox';
import { GameContainer } from './GameContainer';

const BALL_SIZE = 20;
const GAME_HEIGHT = 500;
const GAME_WIDTH = 800;

function App() {
  const initialBallY = (GAME_HEIGHT - BALL_SIZE) / 2;
  const initialBallX = (GAME_WIDTH + BALL_SIZE) / 2;
  const [ballPositionX, setBallPositionX] = useState(initialBallX);
  const [ballPositionY, setBallPositionY] = useState(initialBallY);
  const [speedX, setSpeedX] = useState(0);
  const [speedY, setSpeedY] = useState(1);

  useEffect(() => {
    let timerID;
    if (timerID) clearInterval(timerID);
    timerID = setInterval(
      () => {
        setBallPositionX(ballPositionX => ballPositionX + speedX);
        setBallPositionY(ballPositionY => ballPositionY + speedY);
      },
      25
    );

    return () => clearInterval(timerID);
  }, [speedX, speedY]);

  useEffect(() => {
    console.log(ballPositionX, ballPositionY, GAME_HEIGHT);
    if (ballPositionY === GAME_HEIGHT - BALL_SIZE) {
      setSpeedY(speed => -speed);
    }
    if (ballPositionY === 0) {
      setSpeedY(speed => -speed);
    }
  }, [ballPositionX, ballPositionY]);

  return (
    <GameContainer>
      <GameBox width={GAME_WIDTH} height={GAME_HEIGHT}>
        <Ball size={BALL_SIZE} ballPositionX={ballPositionX} ballPositionY={ballPositionY} />
      </GameBox>
    </GameContainer>
  );
}

export default App;
