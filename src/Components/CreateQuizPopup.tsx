import Popup from 'reactjs-popup';
import {FaPlusCircle} from "react-icons/fa";
import {CSSProperties, useState} from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import CreateQuizForm from "./CreateQuizForm.tsx";

export default function CreateQuizPopup(){
    const [open, setOpen] = useState(false);
    const buttonStyle={
        display: 'flex',
        alignItems: 'center',
        height:"4em",
        borderRadius:"50px ",
        fontSize:"1.1rem"
    }
    const modalStyle : CSSProperties ={
        width:"60%",
        height: "auto",
        backgroundColor:"#F6F5F2",
        borderRadius: "12px",
        position: "fixed",
        top: "50%",
        left: "56%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection:"column",
        padding:" 0.5em 2em"


    }
    const overlayStyle : CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backdropFilter: "blur(6px)", // Apply a blur effect
        zIndex: 0, // Ensure the overlay is below the modal
    };

    const closeModal = () => setOpen(false);
    return (
        <div>
            <button type="button" style={buttonStyle} className="button" onClick={() => setOpen(o => !o)}>
                    <FaPlusCircle style={{marginRight: "1em"}}/>New Quiz
            </button>
            {open && <div style={overlayStyle} onClick={closeModal}></div>}
            <Popup
                open={open}
                closeOnDocumentClick
                onClose={closeModal} >
                <div className="modal" style={modalStyle}>
                    <a className="close" onClick={closeModal}>
                        <FaRegCircleXmark  style={{height:"1.5em",width:"1.5em",alignSelf:"flex-end"}}/>
                    </a>
                    <CreateQuizForm/>
                </div>
            </Popup>
        </div>
    );
}
