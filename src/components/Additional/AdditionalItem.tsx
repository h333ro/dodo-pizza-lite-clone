import React from "react";
import {AdditionalType} from "../../redux/reducers/productsReducer";

type PropsType = {
    item:AdditionalType,
    active:boolean,
    activeToggle:()=>void,
    pizzaSize:string,
    itemCount:number,
}

export const AdditionalItem:React.FC<PropsType> = React.memo(({item,active,activeToggle,pizzaSize,itemCount}) =>{

    const activeStyle = active ? ' additional__item_active' : '';
    const cost = item.cost[pizzaSize as keyof typeof item.cost];

    const ItemStyle = {
        flex: `0 1 calc(${100/itemCount}% - 8px)`,
        maxWidth: `calc(33% - 8px)`,
        margin: '3px 4px',
    };
    return (
        <div onClick={activeToggle} style={ItemStyle} className={"additional__item" + activeStyle}>
            <div className="additional__img">
                <img src={item.imgURL} alt="additional"/>
            </div>
            <div className="additional__name">
                <span>{item.name}</span>
            </div>
            <div className="additional__cost">
                <span>{cost} ₽</span>
            </div>
            {active ? (
            <div className="additional__active-icon">
                <i className="fas fa-check"/>
            </div>
        ):null}
        </div>
    )
});