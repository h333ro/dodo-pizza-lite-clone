import React, {useEffect} from 'react';

type PropsType ={
    item:{id:number,name:string},
    removeItem: (id:number) => void,
}

export const BucketSuccessItem:React.FC<PropsType> = React.memo(({item,removeItem}) =>{

    useEffect(()=>{
        removeItem(item.id);
    },[item.id,removeItem]);

    return(
        <div style={{width:'100%'}} className={'navbar__bucket-success-item'}>
            <div>Добавлено:</div>
            <div>{item.name}</div>
        </div>
    )
});