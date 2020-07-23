import React, { useState, useEffect } from 'react'

const Timer = (props) => {
    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    // Not started = 0
    // started = 1
    // stopped = 2

    const timeFrom = (startDate) => {
        let startTime = startDate || (new Date());

        let dif = (new Date()).getTime() - startTime.getTime();
        let hours   = Math.floor(dif / 3600);
        let minutes = Math.floor((dif - (hours * 3600)) / 60);
        let seconds = dif - (hours * 3600) - (minutes * 60);
        
        // round seconds
        seconds = Math.round(seconds * 100) / 100
        setTime({
            h: hours,
            m: minutes,
            s: seconds
        })
    }

    const start = () => {
        run();
        setStatus(1);
        timeFrom(props.startTime);
        setInterv(setInterval(run, 1000));
    };

    useEffect(() => {
        if (props.play) start();
        else stop();
    }, [props.play])

    useEffect(() => {
        timeFrom(props.startTime);
    }, [props.startTime])

    useEffect(() => {
        
        return () => {
            clearInterval(interv);
        }
    }, [])

    useEffect(() => {
        if (props.reset) reset();
    }, [props.reset])

    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        updatedS++;
        return setTime({ s: updatedS, m: updatedM, h: updatedH });
    };

    const stop = () => {
        clearInterval(interv);
        setStatus(2);
    };

    const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, s: 0, m: 0, h: 0 })
    };

    const resume = () => start();

    return ( `${time.h > 9 ? time.h : ('0' + time.h)}:${time.m > 9 ? time.m : ('0' + time.m)}:${time.s > 9 ? time.s : ('0' + time.s)}` );
}

export default Timer;