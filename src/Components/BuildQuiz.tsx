import {useState} from 'react';
import {useNavigate} from "react-router";
import {useLocation} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'

export const Topics = {
    ANIMALS: 'animals',
    SCIENCE: 'science',
    PHYSICS: 'physics',
    BIOLOGY: 'biology',
    CHEMISTRY: 'chemistry',
    MATH: 'math',
    GEOGRAPHY: 'geography',
    HISTORY: 'history',
    SPORTS: 'sports',
    MOVIES: 'movies',
    MUSIC: 'music',
    LITERATURE: 'literature',
    ART: 'art',
    POLITICS: 'politics',
    PROGRAMMING: 'programming',
    SPACE: 'space',
} as const;

export type Topic = (typeof Topics)[keyof typeof Topics];

const styles = `.quiz-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Topic selection dropdown */
.select-container {
  width: 100%;
  margin-bottom: 10px;
}

select.topic-dropdown {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

/* Heading */
h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* Question input and options container */
.question-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Question input field */
.question-input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
}

.option-container {
  display: flex;
  align-items: center;
}

/* Option input field */
.option-input {
  width: 80%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 10px;
}

/* Validity checkbox */
.validity-checkbox {
  margin-right: 5px;
}

/* Option button (remove) */
.option-remove-btn {
  background-color: lightgrey;
  opacity : 0.8;
  color: rgba(0, 0, 0, 1);
  padding: 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}

/* Add question/option buttons */
.add-btn {
  background-color: #0095ff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;
}

/* Submit button */
.submit-btn {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  .quiz-form {
    width: 100%;
    padding: 10px;
  }
  
  .question-input,
  .option-input {
    width: 100%;
  }
}
`;

function BuildQuiz() {
    const location = useLocation();
    let quizName = location.state.quizName;
    const userinfo = JSON.parse(localStorage.getItem('loginInfo'))
    const token = userinfo != null ? userinfo['access-token'] : "stranger"
    const decoded = jwtDecode(token)
    const email = decoded['email']
    const navigate = useNavigate()
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([{text: '', options: [''], validity: [false]}]);

    const addQuestion = () => {
        setQuestions([...questions, {text: '', options: [''], validity: [false]}]);
    };

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].text = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleValidityChange = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].validity[optionIndex] = !newQuestions[questionIndex].validity[optionIndex];
        setQuestions(newQuestions);
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push('');
        newQuestions[questionIndex].validity.push(false);
        setQuestions(newQuestions);
    };

    const removeOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        newQuestions[questionIndex].validity.splice(optionIndex, 1);
        setQuestions(newQuestions);
    };

    const removeQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    };


    const handleSubmit = () => {
        if (quizName === "") {
            quizName = "Untitled Quiz-" + topic;
        }
        const quizData = {
            name: quizName, userEmail: email, code: null, topic: topic, questions: questions.map(question => ({
                question: question.text, options: question.options.map((option, index) => ({
                    label: option, isCorrect: question.validity[index]
                }))
            }))
        };
        //console.log(quizData);

        fetch('http://localhost:3000/quizzes', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(quizData)
        })
            .then(data => {
                console.log(data);
                navigate('/home');
                console.log("la ileh ela lah");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (<div className='quiz-form'>
        <h1>Create Your Impossible Quiz</h1>
        <p>Quiz Name: {quizName}</p>
        <div className='select-container'>
            <select
                className='topic-dropdown'
                value={topic}
                onChange={handleTopicChange}
            >
                <option value="">Select Topic</option>
                {Object.entries(Topics).map(([key, value]) => (<option key={key} value={value}>
                    {key}
                </option>))}
            </select>
        </div>
        {questions.map((question, index) => (<div key={index} className='question-container'>
            <label>Question {index + 1}</label>
            <input
                type="text"
                className="question-input"
                value={question.text}
                onChange={(e) => handleQuestionChange(index, e)}
                placeholder="Enter question"
            />
            {question.options.map((option, optionIndex) => (<div key={optionIndex} className='option-container'>
                <input
                    type="text"
                    className="option-input"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                    placeholder="Enter option"
                />
                <input
                    type="checkbox"
                    className="validity-checkbox"
                    checked={question.validity[optionIndex]}
                    onChange={() => handleValidityChange(index, optionIndex)}
                />
                <label>Correct </label>
                <button className='option-remove-btn'
                        onClick={() => removeOption(index, optionIndex)}>Remove Option
                </button>
            </div>))}
            <button className='add-btn' onClick={() => addOption(index)}>Add Option</button>
            <button onClick={() => removeQuestion(index)}>Remove Question</button>
        </div>))}
        <button className='add-btn' onClick={addQuestion}>Add Question</button>
        <br/>
        <button className='submit-btn' onClick={handleSubmit}>Submit Quiz</button>
        <style>{styles}</style>
    </div>);
}

export default BuildQuiz;
