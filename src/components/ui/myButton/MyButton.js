import React, { useState } from "react";
import cl from "./MyButton.module.css"

export default function MyButton({
    errorAll,
    allPayment,
    percentPayment,
    firstPayment,
    period,
    allSum,
    monthlyPayment,
}) {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [animation, setAnimation] = useState(true); // Вариации анимации (по ТЗ), на каждое нажатие кнопки будут разные анимации

    const send = async () => {
        if (animation) {
            setDisabled(true);
        } else {
            setLoading(true);
        }

        let json = JSON.stringify({
            allPayment: allPayment,
            percentPayment: percentPayment,
            firstPayment: firstPayment,
            period: period,
            allSum: allSum,
            monthlyPayment: monthlyPayment
        });

        fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        }).then(() => {
            if (animation) {
                setDisabled(false);
            } else {
                setLoading(false);
            }

            setAnimation(!animation)
        });
    }

    return (
        <button
            className={loading
                ?
                cl.notActiveButton
                :
                disabled
                    ?
                    cl.notActiveButton + " " + cl.disabled
                    :
                    (errorAll || disabled)
                        ?
                        cl.button + " " + cl.disabled
                        :
                        cl.button}
            onClick={send}
            disabled={(errorAll || disabled) ? true : false}
        >
            {
                loading
                    ?
                    <div className={cl.loader} />
                    :
                    <p>Оставить заявку</p>
            }
        </button>
    )
}