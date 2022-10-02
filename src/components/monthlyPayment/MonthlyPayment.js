import React, { useEffect } from "react";
import cl from "./MonthlyPayment.module.css"

export default function MonthlyPayment({
    allPayment,
    firstPayment,
    period,
    monthlyPayment,
    setMonthlyPayment,
    errorAll
}) {
    useEffect(() => {
        setMonthlyPayment( Math.round((allPayment - firstPayment) * ((0.035 * Math.pow((1 + 0.035), period)) / (Math.pow((1 + 0.035), period) - 1))) );
    }, [allPayment, firstPayment, period])

    return (
        <div className={errorAll ? cl.block + " " + cl.disabled : cl.block}>
            <p className={cl.intro}>Ежемесячный платеж от</p>

            <p className={cl.sum}>{monthlyPayment} &#8381;</p>
        </div>
    )
}