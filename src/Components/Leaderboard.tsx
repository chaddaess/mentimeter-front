import Podium from "./Podium.tsx";
import LeaderboardList from "./LeaderboardList.tsx";

// Mock participants data
const mockParticipants = [{
    id: 1, name: 'Eva Green', score: 225, avatar: 'https://randomuser.me/api/portraits/women/24.jpg'
}, {id: 2, name: 'James Smith', score: 200, avatar: 'https://randomuser.me/api/portraits/men/24.jpg'}, {
    id: 3, name: 'Isabella Johnson', score: 250, avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
}, {id: 4, name: 'Ethan Williams', score: 195, avatar: 'https://randomuser.me/api/portraits/men/25.jpg'}, {
    id: 5, name: 'Sophia Brown', score: 180, avatar: 'https://randomuser.me/api/portraits/women/26.jpg'
}, {id: 6, name: 'Daniel Davis', score: 210, avatar: 'https://randomuser.me/api/portraits/men/26.jpg'}, {
    id: 7, name: 'Olivia Garcia', score: 205, avatar: 'https://randomuser.me/api/portraits/women/27.jpg'
}, {id: 8, name: 'Matthew Rodriguez', score: 175, avatar: 'https://randomuser.me/api/portraits/men/27.jpg'}, {
    id: 9, name: 'Ava Martinez', score: 230, avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
}, {id: 10, name: 'Michael Hernandez', score: 190, avatar: 'https://randomuser.me/api/portraits/men/28.jpg'}, {
    id: 11, name: 'Emily Gonzalez', score: 215, avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
}, {id: 12, name: 'Jacob Wilson', score: 165, avatar: 'https://randomuser.me/api/portraits/men/29.jpg'}, {
    id: 13, name: 'Mia Anderson', score: 220, avatar: 'https://randomuser.me/api/portraits/women/30.jpg'
}, {
    id: 14, name: 'Alexander Thomas', score: 160, avatar: 'https://randomuser.me/api/portraits/men/30.jpg'
}, // Add more if necessary
];

const Leaderboard = () => {
    const sortedParticipants = [...mockParticipants].sort((a, b) => b.score - a.score);
    const topParticipants = sortedParticipants.slice(0, 3);
    const restParticipants = sortedParticipants.slice(3);

    return (<div className="app wrapper flow">
        <Podium topParticipants={topParticipants}/>
        <LeaderboardList participants={restParticipants}/>
    </div>);
};

export default Leaderboard;
