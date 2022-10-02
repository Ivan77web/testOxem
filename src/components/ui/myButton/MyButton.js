import React from "react";
import cl from "./MyButton.module.css"

export default function MyButton({errorAll}) {
    const send = () => {
        console.log("Send");
    }

    return(
        <button 
            className={errorAll ? cl.button + " " + cl.disabled : cl.button} 
            onClick={send}
            disabled={errorAll ? true : false} 
        >
            Оставить заявку
        </button>
    )
}