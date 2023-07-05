import Match from "./Match"


const Matches = ({ matches, onDelete, onKeep, showKeep }) => {
  return (
    <div>
        {matches.map((match, id) => (
            <Match key={id} match={match} onDelete={onDelete} onKeep={onKeep} showKeep={showKeep}/>
        ))}
    </div>
  )
}

export default Matches
