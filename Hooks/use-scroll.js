import { useState, useEffect } from "react";
//
// export function useScroll() {
//     const isSSR = typeof window !== "undefined";
//
//     const [lastScrollTop, setLastScrollTop] = useState(0);
//     const [bodyOffset, setBodyOffset] = useState(
//         isSSR ? document.body.getBoundingClientRect() : 0
//     );
//     const [scrollY, setScrollY] = useState(bodyOffset.top);
//     const [scrollDirection, setScrollDirection] = useState();
//
//     const listener = e => {
//         setBodyOffset(document.body.getBoundingClientRect());
//         setScrollY(window.scrollY);
//         setScrollDirection(lastScrollTop > -window.scrollY ? "up" : "down");
//         // setLastScrollTop(-window.scrollY);
//     };
//
//     useEffect(() => {
//         isSSR && window.addEventListener("scroll", listener);
//         return () => {
//             isSSR && window.removeEventListener("scroll", listener);
//         };
//     });
//
//     return {
//         scrollY,
//         scrollDirection
//     };
// }


const SCROLL_UP = "up";
const SCROLL_DOWN = "down";

export const useScrollDirection = ({
    initialDirection,
    thresholdPixels,
    off
} = {}) => {
    const [scrollDir, setScrollDir] = useState(initialDirection);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const threshold = thresholdPixels || 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                // We haven't exceeded the threshold
                ticking = false;
                return;
            }

            setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
            setScrollY(scrollY);
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        /**
         * Bind the scroll handler if `off` is set to false.
         * If `off` is set to true reset the scroll direction.
         */
        !off
            ? window.addEventListener("scroll", onScroll)
            : setScrollDir(initialDirection);

        return () => window.removeEventListener("scroll", onScroll);
    }, [initialDirection, thresholdPixels, off]);

    return {scrollDir, scrollY};
};