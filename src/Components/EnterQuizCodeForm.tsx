import { useState } from 'react';

const QuizJoinForm = () => {
    const [quizCode, setQuizCode] = useState('');
    const [playerName, setPlayerName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const socket = new WebSocket('ws://localhost:3001');
        socket.onopen = () => {
            console.log('WebSocket connection established successfully.');
            socket.send(JSON.stringify({ type: 'joinQuiz', data: { quizCode, playerName } }));
        };

        // Handle messages received from the server
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case 'playerJoined':
                    console.log('Player joined:', message.data);
                    // You can navigate to the quiz room or update UI accordingly
                    break;
                case 'errorMsg':
                    console.error('Error joining quiz:', message.data);
                    // Display error to the user
                    break;
                default:
                    console.warn('Unknown message type:', message.type);
            }
        };

        // Handle WebSocket errors
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter quiz code"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <button type="submit">Join Quiz</button>
        </form>
    );
};

export default QuizJoinForm;
