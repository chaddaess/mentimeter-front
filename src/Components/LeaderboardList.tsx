import Participant from './Participant';

const LeaderboardList = ({participants}) => {
    return (<div className="leaderboard-list">
        {participants.map(participant => (<Participant key={participant.name} data={participant}/>))}
    </div>);
};

export default LeaderboardList;