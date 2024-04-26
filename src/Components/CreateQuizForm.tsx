import {useState} from "react";
import {randomQuizName} from '../utils/quizname-generator.ts'
import {useNavigate} from "react-router";
export default function CreateQuizForm(props) {
    const [formData, setFormData] = useState({
        name: ''
    });
    const navigate=useNavigate()

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        //Todo:put the correct endpoint to create a quiz here
        fetch(`http://localhost:3000/quiz/create`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res)=>{
                return res.json();
            }).then((data)=>{
                console.log(data)
                navigate('/build')
        })



        //reset
        setFormData({
            name: '',
        });
    };
    const formStyle={
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start"
    }
    const buttonStyle={
        width:"10em",
        height:"4em",
        borderRadius:"50px",
        marginTop:"1em",
        backgroundColor:"rgba(225,175,209,0.94)"
    }
    const inputStyle={
        width:"100%",
        height:"3em",
        borderRadius:"50px",
        border:"none",
        paddingLeft:"1em"
    }
    return (
        <>
            <h3>Let's give your new quiz a name </h3>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <input
                        style={inputStyle}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={randomQuizName}
                    />
                </div>
                <button  style={buttonStyle}>Let's Go ! </button>
            </form>
        </>
    )
}