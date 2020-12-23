import React from 'react';
import {IngredientType} from "../../../../redux/reducers/productsReducer";
import {PizzaModalSingleIngredient} from "./PizzaModalSingleIngredient/PizzaModalSingleIngredient";

type PropsType ={
    ingredients:Array<IngredientType>,
    editCallback:(id:number)=>void,
}

export const PizzaModalIngredients:React.FC<PropsType> = React.memo(({ingredients,editCallback}) =>{

    return(
        <div className={'pizza-modal__ingredients'}>
            {ingredients.map((ingredient,index,array) => <PizzaModalSingleIngredient ingredient={ingredient}
                                                                                     key={ingredient.id}
                                                                                     editCallback={editCallback}
                                                                                     lastOneInArray={index === array.length - 1}/>)}
        </div>
    )
});