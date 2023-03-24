import React from 'react'
import { useEffect, useState } from 'react'
import { AiFillMinusSquare, AiFillPlusSquare} from 'react-icons/ai'
import KeepScore from './KeepScore'

const Match = ({ match, onDelete, onKeep, showKeep }) => {

  const [matches, setMatches] = useState([])
  const game = [ 0, 15 , 30 , 40, 'A' ]
  let tieBreak = false
  useEffect(() =>  {
    const getMatches = async () => {
      const matchesFromServer = await fetchMatches()
      setMatches(matchesFromServer)
    }

    getMatches()
    }, []
  )
  
  //Fetch matches
  const fetchMatches = async () => {
    const res = await fetch('http://localhost:5000/matches')
    const data = await res.json()
    return data
  }

  const restorePoint = match

  const unDo = () => {
    match=restorePoint
    updateMatch(match)
  }

  const updateMatch = async (match) => {
    const res = await fetch(`http://localhost:5000/matches/${match.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(match)
    })

    const data = await res.json()
    setMatches([...matches, data])
  }
  
  // Add point to A
  const pointA = () => {
    isTiebreak()
    setCheck1()
    setCheck2()
    if (tieBreak) {
      match.tieBreakA = match.tieBreakA+1
     
    } else if (tieBreak===false && match.set3!==2){
      match.gameA = match.gameA+1
      if ((match.gameB === 4) && (match.gameA === 4)) {
        match.gameA=3
        match.gameB=3        
      }
    }
    if (match.set1===1) {
      setWriter1()      
    }
    if (match.set2===1){
      setWriter2()
    }
    if (match.set3===1) {
      setWriter3()
    }
    if (match.set3===2) {
      match.tieBreakA=match.tieBreakA+1
      updateMatch(match)
    }
    setCheck1()
    setCheck2()
  }

  //Add point to B
  const pointB = () => {
    isTiebreak()
    setCheck1()
    setCheck2()
    if (tieBreak) {
      match.tieBreakB = match.tieBreakB+1
     
    } else if (tieBreak===false && match.set3!==2){
      match.gameB = match.gameB+1
      if ((match.gameB === 4) && (match.gameA === 4)) {
        match.gameA=3
        match.gameB=3        
      }
    }
    if (match.set1===1) {
      setWriter1()      
    }
    if (match.set2===1){
      setWriter2()
    }
    if (match.set3===1) {
      setWriter3()
    }
    if (match.set3===2) {
      match.tieBreakB=match.tieBreakB+1
      updateMatch(match)
    }
    setCheck1()
    setCheck2()
  }
  
  const isTiebreak = () => {
    if ((match.set1A === 6 && match.set1B === 6) || (match.set2A === 6 && match.set2B === 6) || (match.set3A === 6 && match.set3B === 6)) {
      tieBreak=true
    } else {
      tieBreak=false
    }
  }
  const setCheck1 = () => {
    if ((match.set1A > 6) || (match.set1A > 5 && match.set1B < 5)) {
      match.set1 = 0
      match.set2 = 1
    }
    if ((match.set1B > 6) || (match.set1A < 5 && match.set1B > 5)) {
      match.set1 = 0
      match.set2 = 1
    }
  }

  const setCheck2 = () => {
    if ((match.set2A > 6) || (match.set2A > 5 && match.set2B < 5)) {
      match.set2 = 0
      match.set3 = 1
      if (match.superTie) {
        match.set3 = 2
      }
    }
    if ((match.set2B > 6) || (match.set2A < 5 && match.set2B > 5)) {
      match.set2 = 0
      match.set3 = 1
      if (match.superTie) {
        match.set3 = 2
      }
    }
  }
  
  const setWriter1 = () => {
    if (( match.gameA > 4 )|| ( match.gameA > 3 && match.gameB < 3 )) {
      match.set1A=match.set1A+1
      match.gameA=0
      match.gameB=0

    }

    if (( match.gameB > 4 )|| ( match.gameA < 3 && match.gameB > 3 )) {
      match.set1B=match.set1B+1
      match.gameA=0
      match.gameB=0

    }

    if ( match.tieBreakA > 6 && (match.tieBreakA-match.tieBreakB) > 1 ) {
      match.set1A=match.set1A+1
      match.tieBreakA=0
      match.tieBreakB=0
      tieBreak=false

    }

    if ( match.tieBreakB > 6 && (match.tieBreakB-match.tieBreakA) > 1 ) {
      match.set1B=match.set1B+1
      match.tieBreakA=0
      match.tieBreakB=0
      tieBreak=false

    }
   
    updateMatch(match)
  }

  const setWriter2 = () => {
    if (( match.gameA > 4 )|| ( match.gameA > 3 && match.gameB < 3 )) {
      match.set2A=match.set2A+1
      match.gameA=0
      match.gameB=0

    }

    if (( match.gameB > 4 )|| ( match.gameA < 3 && match.gameB > 3 )) {
      match.set2B=match.set2B+1
      match.gameA=0
      match.gameB=0

    }

    if ( match.tieBreakA > 6 && (match.tieBreakA-match.tieBreakB) > 1 ) {
      match.set2A=match.set2A+1
      match.tieBreakA=0
      match.tieBreakB=0
      tieBreak=false

    }

    if ( match.tieBreakB > 6 && (match.tieBreakB-match.tieBreakA) > 1 ) {
      match.set2B=match.set2B+1
      match.tieBreakA=0
      match.tieBreakB=0
      tieBreak=false

    }
   
    updateMatch(match)
  }

  const setWriter3 = () => {
    if (( match.gameA > 4 )|| ( match.gameA > 3 && match.gameB < 3 )) {
      match.set3A=match.set3A+1
      match.gameA=0
      match.gameB=0

    }

    if (( match.gameB > 4 )|| ( match.gameA < 3 && match.gameB > 3 )) {
      match.set3B=match.set3B+1
      match.gameA=0
      match.gameB=0

    }

    if ( match.tieBreakA > 6 && (match.tieBreakA-match.tieBreakB) > 1 ) {
      match.set3A=match.set3A+1
      match.tieBreakA=0
      match.tieBreakB=0
      tieBreak=false

    }

    if ( match.tieBreakB > 6 && (match.tieBreakB-match.tieBreakA) > 1 ) {
      match.set3B=match.set3B+1
      match.tieBreakA=0
      match.tieBreakB=0
      tieBreak=false

    }
   
    updateMatch(match)
  }

  return (
    <div className='match'>
        <table>
            <thead>
              <tr>
              <th colSpan="6">{match.matchInfo}</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{match.playerA}</td>
                    <td>{match.set1A}</td>
                    <td>{match.set2A}</td>
                    <td>{match.set3A}</td>
                    <td>{game[match.gameA]}</td>
                    <td>{match.tieBreakA}</td>
                </tr>
                <tr>
                    <td>{match.playerB}</td>
                    <td>{match.set1B}</td>
                    <td>{match.set2B}</td>
                    <td>{match.set3B}</td>
                    <td>{game[match.gameB]}</td>
                    <td>{match.tieBreakB}</td>
                </tr>
                <tr>
                <td>{showKeep ?  <AiFillMinusSquare onClick={onKeep} /> : <AiFillPlusSquare onClick={onKeep}/>}</td>
                </tr>

            </tbody>
        </table>
        
        {showKeep ? <KeepScore onDelete={onDelete} match={match} pointA={pointA} pointB={pointB} unDo={unDo} /> : ''}
    </div>
  )
}

export default Match