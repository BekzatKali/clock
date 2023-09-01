import React from "react";
import './App.css';

export default function Clock() {
    const [breakLength, setBreakLength] = React.useState(5)
    const [sessionLength, setSessionLength] = React.useState(25)
    const [timeLeft, setTimeLeft] = React.useState(1500)
    const [timingType, setTimingType] = React.useState("SESSION")
    const [play, setPlay] = React.useState(false)

    const audio = document.getElementById("beep")

    const breakIncrement = () => {
        if (breakLength < 60) {
            setBreakLength(prevBreakLength => prevBreakLength + 1)
        }
    }

    const breakDecrement = () => {
        if (breakLength > 1) {
            setBreakLength(prevBreakLength => prevBreakLength - 1)
        }
    }

    const sessionIncrement = () => {
        if (sessionLength < 60) {
            setSessionLength(prevSessionLength => prevSessionLength + 1)
            setTimeLeft(prevTimeLeft => prevTimeLeft + 60)
        }
    }

    const sessionDecrement = () => {
        if (sessionLength > 1) {
            setSessionLength(prevSessionLength => prevSessionLength - 1)
            setTimeLeft(prevTimeLeft => prevTimeLeft - 60)
        } 
    }

    const timeout = setTimeout(() => {
        if (timeLeft && play) {
            setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
        }
    }, 1000)

    const handlePlay = () => {
        clearTimeout(timeout)
        setPlay(prevPlay => !prevPlay);
    }

    const handleReset = () => {
        clearTimeout(timeout);
        setPlay(false);
        setTimingType("SESSION");
        setBreakLength(5);
        setSessionLength(25); 
        setTimeLeft(1500); 
        audio.pause();
        audio.currentTime = 0;
    }

    const resetTimer = () => {
        if (!timeLeft && timingType === "SESSION") {
            setTimeLeft(breakLength * 60);
            setTimingType("BREAK");
            audio.play();
        }
        if (!timeLeft && timingType === "BREAK") {
            setTimeLeft(sessionLength * 60);
            setTimingType("SESSION");
            audio.pause();
            audio.currentTime = 0;
        }
    }
     
    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60)
        const seconds = timeLeft % 60
        return (
            (minutes < 10 ? "0" + minutes : minutes)
            + ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        )
    }

    const clock = () => {play ? resetTimer() : clearTimeout(timeout)}

    const title = timingType === "SESSION" ? "Session" : "Break";

    React.useEffect(() => {
        clock()
    }, [play, timeLeft, timeout])

    return (
        <div className="App">
            <div className="app-wrapper">
                <div className="setting-time-wrapper">
                    <div className="break">
                        <div id="break-label">Break Length</div>
                        <div className="break-display">
                            <button disabled={play} id="break-decrement" onClick={breakDecrement}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
                            </button>
                            <div id="break-length" style={{display: "inline-block"}}>
                                {breakLength}
                            </div>
                            <button disabled={play} id="break-increment" onClick={breakIncrement}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z"/></svg>
                            </button>
                        </div>
                    </div>
                    <div className="session">
                        <div id="session-label">Session Length</div>
                        <div className="session-display">
                            <button disabled={play} id="session-decrement" onClick={sessionDecrement}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
                            </button>
                            <div id="session-length" style={{display: "inline-block"}}>
                                {sessionLength}
                            </div>
                            <button disabled={play} id="session-increment" onClick={sessionIncrement}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <audio
                    id="beep" 
                    preload="auto"
                    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                />
                <div className="timer-wrapper">
                    <div id="timer-label">
                        <h2 className="time-title">{title}</h2>
                        <h2 id="time-left">{formatTime()}</h2>
                    </div>
                    <div className="times-buttons">
                    <button id="start_stop" onClick={handlePlay}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
                    </button>
                    <button id="reset" onClick={handleReset}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>  
                    </button>
                    </div>
                </div>
                <div className="creator">By Bekzat Kali</div>
            </div>
        </div>
    )
}


