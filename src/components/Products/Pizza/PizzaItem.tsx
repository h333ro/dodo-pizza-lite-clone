import React, {useCallback} from "react";
import {PizzaType} from "../../../redux/reducers/productsReducer";

type PropsType = {
    setModalOpened:(item:PizzaType)=>void;
    item:PizzaType,
}

export const PizzaItem:React.FC<PropsType> = React.memo(({setModalOpened,item}) =>{

    const ingredientsString = item.ingredients.map(i => i.name).join(', ');
    const allCosts = item.types.map(i => i.cost);

    const openModal = useCallback((e:React.MouseEvent<HTMLDivElement>) =>{
        const target = e.target as HTMLElement;
        if(target.dataset.clickable){
            setModalOpened(item);
        }
    },[item,setModalOpened]);

    return(
        <div className="products__item" onClick={openModal}>
            <div className="products__item-image">
                <img data-clickable={true} src={item.imgURL} alt={'pizza'}/>
            </div>
            <span className={'products__item-name'}>{item.name}</span>
            <span className={'products__item-ingredients'}>{ingredientsString}</span>
            <div className="products__user-interactions">
                <div className="products__item-cost">
                    <span>от {Math.min(...allCosts)} Р</span>
                </div>
                <button data-clickable={true} className="products__choose-button">Выбрать</button>
            </div>
        </div>
    )
});