import { GAME_WIDTH, WIN_SCORE } from './GAME_CONST'

export const GameScore = ({playerOne, playerTwo, gameState}) => {
    return (
      <div style={{display: 'flex', width: `100%`, backgroundColor: '#2574db', color: 'white', height: '82px'}}>
        <span style={{ width: '5%' }}/>
        <span style={{ width: '20%', textAlign: 'center' }} >
            <h3><span style={{ fontWeight: '200' }}>Player 1</span> &nbsp; {playerOne}</h3>
        </span>
        <span style={{ width: '50%', textAlign: 'center', paddingTop: '15px' }} >
          {gameState.winner && <h3 style={{ marginBottom: '0px', marginTop: '0px' }}>{gameState.winner} Won</h3>}
          {!gameState.inPlay && gameState.inProgress && <h3 style={{ marginBottom: '0px', marginTop: '0px' }}>Press Spacebar to Continue</h3>}
          {!gameState.inProgress && <h3 style={{ marginTop: '0px' }}><span style={{ fontWeight: '200' }}>Press Enter to Start Playing</span></h3>}
        </span>
        <span style={{ width: '20%', textAlign: 'center' }} >
          <h3>{playerTwo} &nbsp; <span style={{ fontWeight: '200' }}>Player 2</span></h3>
          <span style={{ width: '5%' }}/>
        </span>
      </div>
    )
  }