import { GAME_WIDTH } from './GAME_CONST'

export const GameScore = ({playerOne, playerTwo}) => {
    return (
      <div style={{display: 'flex', justifyContent: 'space-between', width: `${GAME_WIDTH}px`}}>
        <h3>Player 1 {playerOne}</h3>
        <h3>Player 2 {playerTwo}</h3>
      </div>
    )
  }