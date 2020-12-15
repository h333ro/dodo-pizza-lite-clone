import {useEffect, useRef} from "react";

export function useHandlerOnOutsideClick<T>(handler:Function){
    const domNode = useRef<T>(null);
    useEffect(() => {
        const mouseDownHandler = (e: any) => {
            if (e.target === domNode.current && e.which === 1) {
                const mouseUpHandler = function func (e: any){
                    if (e.target === domNode.current && e.which === 1) {
                        handler();
                    }
                    document.removeEventListener('mouseup', func);
                };
                document.addEventListener('mouseup', mouseUpHandler);
            }
        };
        document.addEventListener('mousedown', mouseDownHandler);
        return () => {
            document.removeEventListener('mousedown', mouseDownHandler);
        }
    }, [handler]);
    return domNode;
};