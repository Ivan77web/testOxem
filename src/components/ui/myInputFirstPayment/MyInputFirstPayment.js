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
    errorAll,
    error,
    setError
}) {
    const line = useRef(null);
    const slider = useRef(null);
    const myInput = useRef(null)
    const activeLine = useRef(null)
    const percentOfLine = (Number(value) * 100) / (Number(end) - Number(start))
    const [widthInput, setWidthInput] = useState(0)
    // const [leftOfLine, setLeftOfLine] = useState(percentOfLine / 100 * 363);
    const [leftOfLine, setLeftOfLine] = useState(percentOfLine / 100 * widthInput);

    const changeLeftOfLine = (value) => {
        let valueLeft = value;

        if ( (!!Number(valueLeft) || valueLeft === "") && valueLeft.length <= 2) {
            if (Number(valueLeft) < Number(start)) {
                setValue(valueLeft)
                setLeftOfLine(0)
            } else if (Number(valueLeft) > Number(end)) {
                setValue(valueLeft)
                setLeftOfLine(widthInput)
            } else {
                setValue(valueLeft)
                setLeftOfLine( (valueLeft * widthInput)/(Number(end) - Number(start)))
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
            // setValue(Math.round((((Number(newLeft) * 100) / 36300) * (Number(end) - Number(start))) + Number(start)));
            setValue(Math.round((((Number(newLeft) * 100) / (widthInput * 100) ) * (Number(end) - Number(start))) + Number(start)));
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

    useEffect(() => {
        setFirstPayment(Number(allPayment) * Number(value) / 100)
    }, [value, allPayment])

    useEffect( () => {
        setWidthInput(myInput.current.clientWidth - 64)
        setLeftOfLine(percentOfLine / 100 * (myInput.current.clientWidth - 64))
    }, [myInput.current])

    useEffect( () => {
        if(leftOfLine > widthInput){
            setLeftOfLine(widthInput)
        }
    }, [leftOfLine, widthInput])

    window.onresize = () => setWidthInput(myInput.current.clientWidth - 64);

    return (
        <div className={errorAll ? error ? cl.myInput : cl.myInput + " " + cl.disabled : cl.myInput} ref={myInput}>
            <p className={cl.intro}>{intro}</p>

            <div className={cl.inputElem}>
                <input 
                    className={cl.input} 
                    disabled={errorAll ? error ? false : true : false} 
                    value={value} 
                    onChange={(e) => changeLeftOfLine(e.target.value)} 
                />
                
                <div className={cl.percent}>%</div>
            </div>

            <div className={cl.line} ref={line}>
                <div className={cl.activeLine} ref={activeLine}>
                    <div className={cl.slider} ref={slider} onMouseDown={startDnD} onDragStart={ondragstart} />
                </div>
            </div>

            <div className={cl.sizePayment}>
                {Math.round(firstPayment)} &#8381;
            </div>

            <div className={error ? cl.error : cl.active}>
                {`* Ограничение от ${start}% до ${end}%`}
            </div>

            <div className={cl.symbol}>{symbol}</div>
        </div>
    )
}