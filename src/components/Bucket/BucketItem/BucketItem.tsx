import React, {useCallback, useRef, useState} from 'react';
import {CountButton} from "../../CountButton/CountButton";
import {bucketActions, BucketItemType} from "../../../redux/reducers/bucketReducer";
import {useDispatch} from "react-redux";
import {BucketConfigInfo} from "../BucketConfigInfo/BucketConfigInfo";

type PropsType = {
    bucketItem:BucketItemType,
    minified?:boolean,
}

export const BucketItem:React.FC<PropsType> = React.memo(({bucketItem,minified=false}) =>{

    const item = bucketItem.item;
    const removedIngredients = item.ingredients.filter(i => i.removed);
    const dispatch = useDispatch();
    const bucketInfoRef = useRef(null as null | HTMLDivElement);

    //Вычисление длины кнопок взаимодействия элемента исходя из размера блока информации элемента
    const [interactionWidth,setInteractionWidth] = useState('auto');
    const adjustInteraction = useCallback(()=>{
        if(minified) {
            setInteractionWidth(bucketInfoRef.current?.clientWidth + 'px')
        }else{
            setInteractionWidth('auto');
        }
    },[minified]);

    //Коллбек увеличения уменьшения счетчика
    const increaseDecreaseFlow = useCallback((type:'increase'|'decrease')=>{
        dispatch(bucketActions.increaseDecreaseFlow(bucketItem.id,type));
    },[dispatch,bucketItem]);

    //Коллбек удаления элемента из корзины
    const removeItem = useCallback((id:number)=>{
        dispatch(bucketActions.removeItem(id));
    },[dispatch]);

    return(
        <div className={`bucket__item bucket-item ${minified ? 'bucket-item_minified' :''}`}>
            <div className="bucket-item__image-name-container">
                <div className={`bucket-item__img ${minified ? 'bucket-item__img_minified' :''}`}>
                    <img src={item.imgURL} onLoad={adjustInteraction} alt="product"/>
                </div>
                <div className="bucket-item__info" ref={bucketInfoRef}>
                    <div className={`bucket-item__name ${minified ? 'bucket-item__name_minified' :''}`}>
                        <span>{item.name}</span>
                    </div>
                    <div className={`bucket-item__config ${minified ? 'bucket-item__config_minified' :''}`}>
                        <span>{item.type.name} {item.type.diameter} см, {item.dough} тесто</span>
                    </div>
                    <BucketConfigInfo array={removedIngredients} minified={minified} text={'Убрано'}/>
                    <BucketConfigInfo array={item.additional} minified={minified} text={'Добавлено'}/>
                </div>
            </div>
            <div style={{width:interactionWidth}} className={`bucket-item__user-interactions ${minified ? ' bucket-item__user-interactions_minified' :''}`}>
                <CountButton counter={bucketItem.count} increaseDecreaseFlow={increaseDecreaseFlow}/>
                <div className="bucket-item__cost">
                    <span>{item.totalCost*bucketItem.count} Р</span>
                </div>
                <i onClick={()=>removeItem(bucketItem.id)} className="fas fa-trash"/>
            </div>
        </div>
    )
});