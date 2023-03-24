import React from 'react'
import Button from './Button'

const KeepScore = ({onDelete, match, pointA, pointB, unDo}) => {
  return (
    <div className='keep-score-container'>
        <Button text={'delete'} onClick={() => onDelete(match.id)}/>
        {/* <Button text={'undo'} onClick={unDo} /> */}
        <Button text={match.playerA} color='green' onClick={pointA}/>
        <Button text={match.playerB} color='green' onClick={pointB}/>
    </div>
    
  )
}

export default KeepScore