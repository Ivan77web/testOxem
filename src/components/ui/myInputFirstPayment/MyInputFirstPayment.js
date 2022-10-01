import React, { useEffect, useRef, useState } from "react";
import cl from "./MyInputFirstPayment.module.css"

export default function MyInputFirstPayment({ 
    intro, 
    symbol, 
    start, 
    end, 
    value,
    setValue,
    firstPayment,
    setFirstPayment,
    allPayment,
}) {
    const line = useRef(null);
    const slider = useRef(null);
    const myInput = useRef(null)
    const activeLine = useRef(null)

    const [percentOfLine, setPercentOfLine] = useState((Number(value) * 100) / (Number(end) - Number(start)))
    const [leftOfLine, setLeftOfLine] = useState(percentOfLine / 100 * 363);
    const [error, setError] = useState(false);

    const changeLeftOfLine = (value) => {
        let valueLeft = value;

        if (!!Number(valueLeft) || valueLeft === "") {
            if (Number(valueLeft) < Number(start)) {
                setValue(valueLeft)
                setLeftOfLine(0)
            } else if (Number(valueLeft) > Number(end)) {
                setValue(valueLeft)
                setLeftOfLine(363)
            } else {
                setValue(valueLeft)
                setLeftOfLine((Number(valueLeft) * 100) / (Number(end) - Number(start)))
            }
        }
    }

    const startDnD = (event) => {
        event.preventDefault();

        let shiftX = event.clientX - slider.current.getBoundingClientRect().left;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(event) {
            let newLeft = event.clientX - shiftX - line.current.getBoundingClientRect().left;
            let rightEdge = line.current.offsetWidth - slider.current.offsetWidth;

            if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            setLeftOfLine(newLeft)
            setValue(Math.round((((Number(newLeft) * 100) / 36300) * (Number(end) - Number(start))) + Number(start)));
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    };

    function ondragstart() {
        return false;
    };

    useEffect(() => {
        slider.current.style.left = leftOfLine + "px";
        activeLine.current.style.width = leftOfLine + 'px';
    }, [leftOfLine])

    useEffect(() => {
        (Number(value) < Number(start) || Number(value) > Number(end))
            ?
            setError(true)
            :
            setError(false)

    }, [value])

    useEffect( () => {
        setFirstPayment(Number(allPayment) * Number(value) / 100)
    }, [value, allPayment])

    return (
        <div className={cl.myInput} ref={myInput}>
            <p className={cl.intro}>{intro}</p>

            <div className={cl.inputBlock}>
                <input className={cl.input} value={value} onChange={(e) => changeLeftOfLine(e.target.value)} />

                <div className={cl.line} ref={line}>
                    <div className={cl.activeLine} ref={activeLine}>
                        <div className={cl.slider} ref={slider} onMouseDown={startDnD} onDragStart={ondragstart} />
                    </div>
                </div>
            </div>

            <div className={cl.sizePayment}>
                {firstPayment} &#8381;
            </div>

            <div className={error ? cl.error : cl.active}>
                {`* Ограничение от ${start}% до ${end}%`}
            </div>

            <div className={cl.symbol}>{symbol}</div>
        </div>
    )
}