import Podium from "./Podium.tsx";
import LeaderboardList from "./LeaderboardList.tsx";
import { useLocation } from 'react-router-dom';



const Leaderboard = () => {
    const {state} = useLocation();
    const mockParticipants =state['payload']
    const sortedParticipants = [...mockParticipants].sort((a, b) => b.score - a.score);
    const topParticipants = sortedParticipants.slice(0, 3);
    const restParticipants = sortedParticipants.slice(3);

    return (<div className="app wrapper flow">
        <Podium topParticipants={topParticipants}/>
        <LeaderboardList participants={restParticipants}/>
    </div>);
};

export default Leaderboard;
