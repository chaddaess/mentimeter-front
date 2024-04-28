import {useState} from "react";
import {useNavigate} from "react-router";
export default function EnterQuizCodeForm(props) {
    const randomNumber = Math.floor(Math.random() * (50000) +13);
    const [formData, setFormData] = useState({
        name: ''
    });
    const navigate=useNavigate()

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };
    const handleSubmit = (event) => {

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
            <h3>Enter the quiz code </h3>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div>
                    <input
                        style={inputStyle}
                        type="text"
                        id="code"
                        name="code"
                        onChange={handleInputChange}
                        placeholder={randomNumber}
                    />
                </div>
                <button  style={buttonStyle}>Let's Go ! </button>
            </form>
        </>
    )
}