import React, {useCallback} from "react";
import {AdditionalItem} from "./AdditionalItem";
import {useDispatch, useSelector} from "react-redux";
import {getAdditionalActiveArray} from "../../selectors/pizzaModalSelector";
import {pizzaModalActions} from "../../redux/reducers/pizzaModalReducer";
import {AdditionalType} from "../../redux/reducers/productsReducer";


type PropsType = {
    items:Array<AdditionalType>,
    pizzaSize:string,
}

export const Additional:React.FC<PropsType> = ({items,pizzaSize}) =>{

    const active = useSelector(getAdditionalActiveArray);
    const dispatch = useDispatch();
    const activeToggle = useCallback((index:number)=>{
        dispatch(pizzaModalActions.additionalActiveToggle(index));
    },[dispatch]);

    return(
        <div className="additional">
            {items.map((i,index,array) =>
                <AdditionalItem item={i}
                                key={i.id}
                                itemCount={array.length}
                                pizzaSize={pizzaSize}
                                activeToggle={()=>activeToggle(index)}
                                active={active.includes(index)}/>)}
        </div>
    )
};