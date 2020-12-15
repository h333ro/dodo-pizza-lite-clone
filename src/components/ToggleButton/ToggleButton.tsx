import React from "react";

export type ToggleButtonsType = {
    items:Array<{name:string,disabled:boolean,[propName:string]:any}>,
    active:number,
}
type PropsTypes = {
    buttons:ToggleButtonsType,
    setActive:(activeIndex:number)=>void,
}

export const ToggleButton:React.FC<PropsTypes> = ({buttons,setActive}) =>{
    const active = buttons.active;

    const toddlerStyle = {
        width:(100/buttons.items.length ) + '%',
        transform: `translateX(${active * 100}%)`,
    };

    return(
        <div className={'toggle-button'}>
            <div className="toggle-button__toddler" style={toddlerStyle}/>
            {buttons.items.map((i,index,array) =>
                <div key={index}
                     onClick={i.disabled ? undefined : ()=>setActive(index)}
                     style={{flex:`0 1 ${100/array.length}%`}}
                     className={`toggle-button__item ${active === index ? 'toggle-button__item_active':''} ${i.disabled? 'toggle-button__item_disabled': ''}`}>
                    <span>{i.name}</span>
                </div>)}
        </div>
    )
};