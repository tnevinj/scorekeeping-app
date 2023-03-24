import React from 'react'
import { useState } from 'react'

const NewMatch = ({ onAdd}) => {
  const [matchInfo, setMatchInfo] = useState('')
  const [playerA, setPlayerA] = useState('')
  const [playerB, setPlayerB] = useState('')
  const [superTie, setSuperTie] = useState(false)
  const [ gameB ] = useState(0)
  const [ gameA ] = useState(0)
  const [ set1A] = useState(0)
  const [ set1B] = useState(0)
  const [ set2A] = useState(0)
  const [ set2B] = useState(0)
  const [ set3A] = useState(0)
  const [ set3B] = useState(0)
  const [ tieBreakA] = useState(0)
  const [ tieBreakB] = useState(0)
  const [ set1] = useState(1)
  const [ set2] = useState(0)
  const [ set3] = useState(0)
  
  const onSubmit = (e) => {
    e.preventDefault()

    if(!playerA) {
        alert('Please enter all player names!')
        return
    }
    if(!playerB) {
        alert('Please enter all player names!')
        return
    }

    onAdd({ playerA, playerB, superTie, set1A, set1B, set2A, set2B, set3A, set3B, gameA, gameB, tieBreakA, tieBreakB, set1, set2, set3, matchInfo})
    setPlayerA('')
    setPlayerB('')
    setMatchInfo('')
    setSuperTie(false)

  }

  return (
    <form className='new-match-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Match Info</label>
            <input type='text' placeholder='Match Information' value={matchInfo} onChange={(e) =>  setMatchInfo(e.target.value)}/>
        </div>

        <div className='form-control'>
            <label>Player A</label>
            <input type='text' placeholder='Player A' value={playerA} onChange={(e) =>  setPlayerA(e.target.value)}/>
        </div>

        <div className='form-control'>
            <label>Player B</label>
            <input type='text' placeholder='Player B' value={playerB} onChange={(e) =>  setPlayerB(e.target.value)}/>
        </div>

        <div className='form-control form-control-check'>
            <label>Third Set Super-Tiebreaker?</label>
            <input type='checkbox' checked={superTie} value={superTie} onChange={(e) =>  setSuperTie(e.currentTarget.checked)}/>
        </div>

        <input type='submit' value='Create Match' className='btn btn-block' />
    </form>
  )
}

export default NewMatch