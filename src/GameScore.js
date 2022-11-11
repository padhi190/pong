import { GAME_WIDTH, WIN_SCORE } from './GAME_CONST'

export const GameScore = ({playerOne, playerTwo, gameState}) => {
    return (
      <div style={{display: 'flex', justifyContent: 'space-between', width: `${GAME_WIDTH}px`}}>
        <h3>Player 1 {playerOne}</h3>
        {gameState.winner && <h3>{gameState.winner} Won</h3>}
        {!gameState.inPlay && gameState.inProgress && <h3>Press Spacebar to Continue</h3>}
        {!gameState.inProgress && <h3>Press Enter to Start Playing</h3>}
        <h3>Player 2 {playerTwo}</h3>
      </div>
    )
  }