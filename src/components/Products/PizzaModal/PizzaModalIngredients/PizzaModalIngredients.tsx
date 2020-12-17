import React from 'react';
import {IngredientType} from "../../../../redux/reducers/productsReducer";

type PropsType ={
    ingredients:Array<IngredientType>,
    editCallback:(id:number)=>void,
}

export const PizzaModalIngredients:React.FC<PropsType> = React.memo(({ingredients,editCallback}) =>{

    return(
        <div className={'pizza-modal__ingredients'}>
            {ingredients.map((i,index,array) => {
                let style;
                let icon;
                const onClickCallback = i.editable ? (e:React.MouseEvent<HTMLDivElement>)=>{
                    let target = e.target as HTMLElement;
                    if(target.dataset.clickable){
                        editCallback(i.id);
                    }
                } : undefined;

                if(i.editable) style={borderBottom:'1px dashed grey',cursor:'pointer'};
                if(i.removed) style={...style,borderBottom:'1px dashed transparent',textDecoration:'line-through'};
                icon = <div className={'pizza-modal__ingredients-icon'}>
                       {i.removed ? <i data-clickable={true} className="fas fa-undo"/> : <i data-clickable={true} className="fas fa-times"/>}
                    </div>

                return (
                    <div key={i.id} onClick={onClickCallback} className={'pizza-modal__ingredients-item'}>
                        <span style={style} data-clickable={true}>{i.name}</span>
                        {i.editable ? icon : null}
                        {index !== array.length - 1 ? <span>,&nbsp;</span> : null}
                    </div>
                )
            })}
        </div>
    )
});