import Match from "./Match"


const Matches = ({ matches, onDelete, onKeep, showKeep }) => {
  return (
    <div>
        {matches.map((match, index) => (
            <Match key={index} match={match} onDelete={onDelete} onKeep={onKeep} showKeep={showKeep}/>
        ))}
    </div>
  )
}

export default Matches
