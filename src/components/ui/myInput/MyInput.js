import React, { useEffect, useRef, useState } from "react";
import cl from "./MyInput.module.css"

export default function MyInput({
    intro,
    symbol,
    start,
    end,
    value,
    setValue,
    type,
    errorAll,
    error,
    setError
}) {
    const line = useRef(null);
    const slider = useRef(null);
    const myInput = useRef(null)
    const activeLine = useRef(null)
    const percentOfLine = ((Number(value) - Number(start)) * 100) / (Number(end) - Number(start))
    const [widthInput, setWidthInput] = useState(0)
    const [leftOfLine, setLeftOfLine] = useState(percentOfLine / 100 * widthInput);

    const changeLeftOfLine = (value) => {
        let valueLeft = value;

        if (
            (!!Number(valueLeft) || valueLeft === "") &&
            ((type === "price" && valueLeft.length <= 7) ||
                (type === "mounth" && valueLeft.length < 3))
        ) {
            if (Number(valueLeft) < Number(start)) {
                setValue(valueLeft)
                setLeftOfLine(0)
            } else if (Number(valueLeft) > Number(end)) {
                setValue(valueLeft)
                setLeftOfLine(widthInput)
            } else {
                setValue(valueLeft)
                setLeftOfLine(( (valueLeft - Number(start)) * widthInput) / (Number(end) - Number(start)))
            }
        }
    }

    const startDnD = (event) => {
        if(event.type === "mousedown"){
            event.preventDefault();
        }

        let shiftX;

        if (event.type === "touchstart") {
            shiftX = Number(event.touches[0].clientX - slider.current.getBoundingClientRect().left);
        } else if (event.type === "mousedown") {
            shiftX = event.clientX - slider.current.getBoundingClientRect().left;
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchUp);

        function onMouseMove(event) {
            if (event.type === 'mousemove') {
                let newLeft = event.clientX - shiftX - line.current.getBoundingClientRect().left;
                let rightEdge = line.current.offsetWidth - slider.current.offsetWidth;

                if (newLeft < 0) {
                    newLeft = 0;
                } else if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                setLeftOfLine(newLeft)
                setValue(Math.round((((Number(newLeft) * 100) / (widthInput * 100)) * (Number(end) - Number(start))) + Number(start)));
            }
        }

        function onTouchMove(event) {
            if (event.type === 'touchmove') {
                let newLeft = event.touches[0].clientX - shiftX - line.current.getBoundingClientRect().left;
                let rightEdge = line.current.offsetWidth - slider.current.offsetWidth;

                if (newLeft < 0) {
                    newLeft = 0;
                } else if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                setLeftOfLine(newLeft)
                setValue(Math.round((((Number(newLeft) * 100) / (widthInput * 100)) * (Number(end) - Number(start))) + Number(start)));
            }
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }

        function onTouchUp() {
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchUp);
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
        setWidthInput(myInput.current.clientWidth - 64)
        setLeftOfLine(percentOfLine / 100 * (myInput.current.clientWidth - 64))
    }, [myInput.current])

    window.onresize = () => setWidthInput(myInput.current.clientWidth - 64);

    return (
        <div className={errorAll ? error ? cl.myInput : cl.myInput + " " + cl.disabled : cl.myInput} ref={myInput}>
            <p className={cl.intro}>{intro}</p>

            <div className={cl.inputBlock}>
                <input
                    className={cl.input}
                    disabled={errorAll ? error ? false : true : false}
                    value={value}
                    onChange={(e) => changeLeftOfLine(e.target.value)}
                />

                <div className={cl.line} ref={line}>
                    <div className={cl.activeLine} ref={activeLine}>
                        <div className={cl.slider} ref={slider} onTouchStart={startDnD} onMouseDown={startDnD} onDragStart={ondragstart} />
                    </div>
                </div>
            </div>

            <div className={error ? cl.error : cl.active}>
                {`* Ограничение от ${start + " " + symbol} до ${end + " " + symbol}`}
            </div>

            <div className={cl.symbol}>{symbol}</div>
        </div>
    )
}