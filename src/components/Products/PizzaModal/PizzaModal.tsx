import {ToggleButton} from "../../ToggleButton/ToggleButton";
import React, {useCallback, useEffect, useMemo} from "react";
import {Additional} from "../../Additional/Additional";
import {useDispatch, useSelector} from "react-redux";
import {getAdditionalActiveArray, getPizzaForModal, getToggleButtons} from "../../../selectors/pizzaModalSelector";
import {pizzaModalActions} from "../../../redux/reducers/pizzaModalReducer";
import {ChooseButton} from "../../ChooseButton/ChooseButon";
import {PizzaModalIngredients} from "./PizzaModalIngredients/PizzaModalIngredients";
import {bucketActions, BucketPizzaItem} from "../../../redux/reducers/bucketReducer";
import {PizzaTypesType} from "../../../redux/reducers/productsReducer";
import {PizzaModalImage} from "./PizzaModalImage/PizzaModalImage";

type PropsType = {
    closeModal:()=>void,
}

export const PizzaModal:React.FC<PropsType> = React.memo(({closeModal}) =>{

    let item = useSelector(getPizzaForModal);
    const {sizeButtons,doughButtons} = useSelector(getToggleButtons);
    const additionalActiveArray = useSelector(getAdditionalActiveArray);
    const dispatch = useDispatch();
    const ingredients = useMemo(()=>item.ingredients,[item]);

    //Ресет продукта в корзине после unmount
    useEffect(()=>{
        return()=>{
            dispatch(pizzaModalActions.resetItem());
        }
    },[dispatch]);

    //Коллбеки для изменения кнопок
    const setSizesButtonActive = useCallback((index:number) =>{
        dispatch(pizzaModalActions.setSizeButtonActive(index));
    },[dispatch]);
    const setDoughItemActive = useCallback((index:number) =>{
        dispatch(pizzaModalActions.setDoughButtonActive(index));
    },[dispatch]);
    const removeReturnIngredientToggle = useCallback((id:number)=>{
        dispatch(pizzaModalActions.removeReturnIngredientToggle(id));
    },[dispatch]);

    //Подсчет общей цены продукта после изменения кнопок
    const activeSize = useMemo(()=>item.types.find(i => i.name === sizeButtons.items[sizeButtons.active].name)!.size,[sizeButtons,item]);
    const costForSize = useMemo(()=>item.types.find(i => i.name === sizeButtons.items[sizeButtons.active].name)!.cost,[item,sizeButtons]);
    const additionalCost = useMemo(()=>item.additional.reduce((prev,i,index)=>{
        if(additionalActiveArray.includes(index)) return prev + i.cost[activeSize as keyof typeof i.cost];
        return prev;
    },0),[item,additionalActiveArray,activeSize]);
    const totalCost = costForSize + additionalCost;

    //Выборка отдельных характеристик продукта для HTML и коллбэка
    const activePizzaSizeType = useMemo(()=>item!.types.find(i => i.size === activeSize),[item,activeSize]);
    const activeDiameter = useMemo(()=>activePizzaSizeType!.diameter,[activePizzaSizeType]);
    const activeDoughString = useMemo(()=>doughButtons.items[doughButtons.active].name.toLowerCase(),[doughButtons]);
    const activePizzaWeight = useMemo(()=>activePizzaSizeType!.weight,[activePizzaSizeType]);

    //Коллбэк для добавления продукта в корзину
    const onAddItemInBucket = useCallback(()=>{
        const bucketItem:BucketPizzaItem = {
            name:item.name as string,
            id:item.id,
            imgURL:item.imgURL,
            additional:item.additional.filter((i,index) => additionalActiveArray.includes(index)),
            bucketItemType:'pizza',
            dough:activeDoughString,
            ingredients:item.ingredients,
            type: activePizzaSizeType as PizzaTypesType,
            totalCost:totalCost,
        };
        dispatch(bucketActions.addItem(bucketItem));
        const nameForAlert = `${item.name}, ${activePizzaSizeType?.diameter} см`;
        dispatch(bucketActions.addSuccessfulAddedItem(nameForAlert));
        closeModal();
    },[dispatch,item,additionalActiveArray,activeDoughString,totalCost,activePizzaSizeType,closeModal]);

    return(
        <div className={'pizza-modal'}>
            <PizzaModalImage activeSize={activeSize} imgSrc={item.imgURL}/>
            <div className="pizza-modal__settings">
                <div className={'pizza-modal__title'}>
                    <span>{item.name}</span>
                </div>
                <div className={'pizza-modal__info'}><span>{activeDiameter} см, {activeDoughString} тесто, {activePizzaWeight}г</span></div>
                <PizzaModalIngredients ingredients={ingredients} editCallback={removeReturnIngredientToggle}/>
                <ToggleButton buttons={sizeButtons} setActive={setSizesButtonActive}/>
                <ToggleButton buttons={doughButtons} setActive={setDoughItemActive}/>
                {item.additional.length > 0 ?(
                    <div className={'pizza-modal__add-title'}><span>Добавить в пиццу</span></div>
                ) :null}
                <Additional items={item.additional}
                            pizzaSize={activeSize}/>
                <ChooseButton customClass={'pizza-modal__choose-button'} handler={onAddItemInBucket} text={`Добавить в корзину за ${totalCost} Р`}/>
            </div>
        </div>
    )
});