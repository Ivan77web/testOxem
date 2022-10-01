import React, { useEffect } from "react";
import cl from "./AllSum.module.css"

export default function AllSum({
    allSum,
    setAllSum,
    firstPayment,
    period,
    monthlyPayment,
}) {
    useEffect( () => {
        setAllSum( Math.round((period * monthlyPayment) + firstPayment) )
    }, [firstPayment, period, monthlyPayment])

    return (
        <div className={cl.block}>
            <p>Сумма договора лизинга</p>

            <div>{allSum}</div>
        </div>
    )
}