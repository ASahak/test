import React, {useEffect} from 'react';

export default function usePortal(id) {
    const rootElemRef = React.useRef(document.createElement('div'));

    useEffect(() => {
        // Look for existing target dom element to append to
        const parentElem = document.querySelector(id ? `#${id}` : 'body');
        // Add the detached element to the parent
        parentElem.appendChild(rootElemRef.current);
        // This function is run on unmount
        return () => {
            rootElemRef.current.remove();
        }
    }, []);

    return rootElemRef.current;
}
