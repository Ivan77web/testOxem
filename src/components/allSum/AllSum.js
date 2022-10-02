import React, { useEffect } from "react";
import cl from "./AllSum.module.css"

export default function AllSum({
    allSum,
    setAllSum,
    firstPayment,
    period,
    monthlyPayment,
    errorAll
}) {
    useEffect( () => {
        setAllSum( Math.round((period * monthlyPayment) + firstPayment) )
    }, [firstPayment, period, monthlyPayment])

    return (
        <div className={errorAll ? cl.block + " " + cl.disabled : cl.block}>
            <p className={cl.intro}>Сумма договора лизинга</p>

            <p className={cl.sum}>{allSum} &#8381;</p>
        </div>
    )
}