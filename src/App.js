import Header from './components/Header';
import Matches from './components/Matches';
import { useState, useEffect } from 'react';
import NewMatch from './components/NewMatch';

function App() {
  const [showNewMatch, setShowNewMatch ] = useState(false)
  const [showKeepScore, setShowKeepScore ] = useState(false)


  const [matches, setMatches] = useState([])

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
    const res = await fetch('https://json-server-smoky-three.vercel.app/matches')
    const data = await res.json()
    return data
  }

  //Create new match
  const newMatch = async (match) => {
    const res = await fetch('https://json-server-smoky-three.vercel.app/matches', {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(match)
    })

    const data = await res.json()
    setMatches([...matches, data])
  }

  //Delete match
  const deleteMatch = async (id) => {
    await fetch(`https://json-server-smoky-three.vercel.app/matches/${id}`, {
      method: 'DELETE',
    })
    setMatches(matches.filter((match) => match.id !== id))
  }

  return (
    <div className="App">
      <div className='container'>
        <Header onAdd={() => setShowNewMatch(!showNewMatch)} showAdd={showNewMatch}/>
        {showNewMatch &&<NewMatch onAdd={newMatch}/>}
        { matches.length > 0  ? <Matches matches={matches} onDelete={deleteMatch} onKeep={() => setShowKeepScore(!showKeepScore)} showKeep={showKeepScore}/> : 'No matches Available'}
      </div>
      
    </div>
  );
}

export default App;
