import { useCallback, useRef,  } from 'react';


export const useDebouce = (delay = 300, notDelayFirstTime = true) => {

    const debouncing = useRef<NodeJS.Timeout>();
    const isFirstTime = useRef(notDelayFirstTime);
    
    const debounce = useCallback((func: () => void) => {

        if (isFirstTime.current) {
            isFirstTime.current = false;
            func();
        } else {
            if (debouncing.current) {
                clearTimeout(debouncing.current);
            }
            debouncing.current = setTimeout(() => func(), 1000);
        }

    }, [delay]);

    return { debounce };
};