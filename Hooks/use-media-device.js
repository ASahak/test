import React, {useEffect, useState} from "react";
import {breakpoints, deviceChecking} from '../utils/constants';

const useWidth = (width) => {
    const keys = Object.keys(breakpoints.keys).reverse();
    const devices = keys.filter(key => width <= breakpoints.keys[key])
    return devices.pop();
}

export default function useMediaDevice() {
    const isSSR = typeof window !== "undefined";
    const [deviceSize, setDeviceSize] = useState(useWidth(isSSR ? window.innerWidth : 1200));
    const [windowWidth, setWindowWidth] = useState(isSSR ? window.innerWidth : 1200);
    const [deviceType, setDeviceType] = useState('desktop');

    function changeWindowSize() {
        setWindowWidth(window.innerWidth);
        setDeviceSize(useWidth(window.innerWidth));
    }

    useEffect(() => {
        if (breakpoints.keys[deviceSize] <= deviceChecking.mobile) setDeviceType('mobile');
        else if (breakpoints.keys[deviceSize] >= deviceChecking.tablet[0] && breakpoints.keys[deviceSize] <= deviceChecking.tablet[1]) setDeviceType('tablet')
        else setDeviceType('desktop')
    }, [deviceSize]);

    React.useEffect(() => {
        isSSR && window.addEventListener("resize", changeWindowSize);

        return () => {
            isSSR && window.removeEventListener("resize", changeWindowSize);
        };
    }, []);

    return {
        windowWidth,
        deviceSize,
        deviceType,
    };
}
