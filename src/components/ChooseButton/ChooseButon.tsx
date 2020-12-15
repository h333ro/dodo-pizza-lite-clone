import React from 'react';

type PropsType = {
    handler:Function,
    text:string,
    customClass?:string,
    color?:string,
    hoverColor?:string,
    backgroundColor?:string,
}

export const ChooseButton:React.FC<PropsType> = ({text,customClass,
                                                     handler,color,backgroundColor, hoverColor}) =>{
    customClass = ' '+customClass;
    return(
        <div className={'choose-button' + customClass} onClick={()=>handler()}>
            <button>
                {text}
            </button>
        </div>
    )
};
