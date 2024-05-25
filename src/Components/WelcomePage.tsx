import Navbar from "./Navbar.tsx";
import Popup from "reactjs-popup";
import {FaRegCircleXmark} from "react-icons/fa6";
import {CSSProperties, useState} from "react";
import EnterQuizCodeForm from "./EnterQuizCodeForm.tsx";

function WelcomePage(){
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const modalStyle:CSSProperties={
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
    const overlayStyle:CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backdropFilter: "blur(6px)", // Apply a blur effect
        zIndex: 0, // Ensure the overlay is below the modal
    };
    return(
        <>
            <Navbar open={open} setOpen={setOpen}/>
            {open && <div style={overlayStyle} onClick={closeModal}></div>}
            <Popup
                open={open}
                closeOnDocumentClick
                onClose={closeModal} >
                <div className="modal" style={modalStyle}>
                    <a className="close" onClick={closeModal}>
                        <FaRegCircleXmark  style={{height:"1.5em",width:"1.5em",alignSelf:"flex-end"}}/>
                    </a>
                    <EnterQuizCodeForm/>
                </div>
            </Popup>
        </>
    )
}
export default WelcomePage