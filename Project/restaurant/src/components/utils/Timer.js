import React, { useState, useEffect } from 'react';

export default function Timer({ initialDate }) {
    const [intrv, setIntrv] = useState(null);
    const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

    useEffect(() => {
        if (initialDate) {
            if (intrv) {
                clearInterval(intrv);
            }

            var delta = Math.abs(initialDate - (new Date).getDate()) / 1000;

            // calculate (and subtract) whole hours
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;

            // calculate (and subtract) whole minutes
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;

            // what's left is seconds
            var seconds = delta % 60;  // in theory the modulus is not required
            let startTime = { h: hours, m: minutes, s: seconds };
            setTime(startTime);
            setIntrv(setInterval(() => {
                let { h, m, s } = time;
                s += 1;

                if (s > 59) {
                    s = 0;
                    m += 1;
                }

                if (m > 59) {
                    m = 0;
                    h += 1;
                }
                setTime({ h, m, s });
            }, 1000));
        }
    }, [])

    return (
        <div>
            {time.h < 9 ? `0${time.h}` : time.h}:
            {time.m < 9 ? `0${time.m}` : time.m}:
            {time.s < 9 ? `0${time.s}` : time.s}
        </div>
    );
}