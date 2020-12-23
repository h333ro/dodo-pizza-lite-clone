import React from 'react';
import {IngredientType} from "../../../../../redux/reducers/productsReducer";

type PropsType = {
    ingredient: IngredientType,
    editCallback: (id: number) => void,
    lastOneInArray: boolean,
}

export const PizzaModalSingleIngredient: React.FC<PropsType> = React.memo(({ingredient, editCallback, lastOneInArray}) => {
    let style;
    let icon;
    const onClickCallback = ingredient.editable ?
        (e: React.MouseEvent<HTMLDivElement>) => {
            let target = e.target as HTMLElement;
            if (target.dataset.clickable) {
                editCallback(ingredient.id);
            }
        } : undefined;

    if (ingredient.editable) style = {borderBottom: '1px dashed grey', cursor: 'pointer'};
    if (ingredient.removed) style = {...style, borderBottom: '1px dashed transparent', textDecoration: 'line-through'};
    icon = <div className={'pizza-modal__ingredients-icon'}>
        {ingredient.removed ? <i data-clickable={true} className="fas fa-undo"/> :
            <i data-clickable={true} className="fas fa-times"/>}
    </div>;

    return (
        <div onClick={onClickCallback} className={'pizza-modal__ingredients-item'}>
            <span style={style} data-clickable={true}>{ingredient.name}</span>
            {ingredient.editable ? icon : null}
            {!lastOneInArray ? <span>,&nbsp;</span> : null}
        </div>
    )
});