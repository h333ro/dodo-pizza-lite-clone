import React from 'react';

type PropsType = {
    counter:number,
    increaseDecreaseFlow:(type:'increase'|'decrease')=>void;
}

export const CountButton:React.FC<PropsType> = React.memo(({counter,increaseDecreaseFlow}) =>{
    return(
        <div className={'count-button'}>
            <div onClick={()=>increaseDecreaseFlow("decrease")}>&ndash;</div>
            <div className={'count-button__number'}>
                {counter}
            </div>
            <div onClick={()=>increaseDecreaseFlow("increase")}>+</div>
        </div>
    )
});