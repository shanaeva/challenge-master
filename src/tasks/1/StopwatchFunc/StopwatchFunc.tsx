import React, { useEffect, useState } from "react";

export const StopwatchFunc = () => {
    const [status, setStatus] = useState(false);
    const [runningTime, setRunningTime] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect(() => clearInterval(timer), []);

    const getUnits = (time: number) => {
        const seconds = time / 1000;

        const min = Math.floor(seconds / 60).toString();
        const sec = Math.floor(seconds % 60).toString();
        const msec = (seconds % 1).toFixed(3).substring(2);

        return `${min}:${sec}:${msec}`;
    };

    const handleClick = () => {
        if (status) {
            clearInterval(timer);
        } else {
            const startTime = Date.now() - runningTime;
            const timer = setInterval(() => {
                setRunningTime(Date.now() - startTime);
            });
            setTimer(timer);
        }
        setStatus((status) => !status);
    };

    const handleReset = () => {
        clearInterval(timer);
        setRunningTime(0);
        setStatus(false);
    };

    const handleLap = () => {
        console.log(getUnits(runningTime));
    };

    return (
        <div>
            <p>{getUnits(runningTime)}</p>
            <button onClick={handleClick}>{status ? "Stop" : "Start"}</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleLap}>Lap</button>
        </div>
    );
};
