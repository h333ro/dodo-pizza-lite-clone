import React from 'react';

type PropsType= {
    array: Array<{id:number,name:string,[propName:string]:any}>,
    minified: boolean,
    text:string,
}

//Компонент вывода массива настроек элемента под его инормацей
export const BucketConfigInfo: React.FC<PropsType> = ({array, minified,text}) => {
    if (minified || array.length < 1) return null;

    return (
        <div className="bucket-item__config">
            <span>{text}:&nbsp;</span>
            {array.map((i, index, array) =>
                <span key={i.id}>{i.name} {index !== array.length - 1 ? <span>,&nbsp;</span> : null}</span>)}
        </div>
    )
};