import React, {useMemo} from 'react';
import pepperoni from "../../../../assets/image/pizza/pepperoni/pepperoni.jpeg";

type PropsType = {
    activeSize:string,
    imgSrc:string,
}

export const PizzaModalImage:React.FC<PropsType> = React.memo(({activeSize,imgSrc})=>{

    const imgStyle = useMemo(()=>{
        let scale;
        switch (activeSize) {
            case 'small':{
                scale=1;
                break;
            }
            case 'medium':{
                scale=1.2;
                break;
            }
            case 'big':{
                scale=1.4;
                break;
            }
            default:{
                scale=1;
            }
        }
        return{
            transform:`scale(${scale})`,
        }
    },[activeSize]);
    const mediumCircleStyle =useMemo(()=>({
        top:'-5%',
        left:'-5%',
        bottom: '-5%',
        right: '-5%',
        opacity: activeSize === 'small' ? 1 : 0,
    }),[activeSize]);
    const bigCircleStyle =useMemo(()=>({
        top:'-15%',
        left:'-15%',
        bottom: '-15%',
        right: '-15%',
        opacity: activeSize === 'big' ? 0 : 1,
    }),[activeSize]);

    return(
        <div className="pizza-modal__img-container">
            <div className="pizza-modal__img-item pizza-image-scale">
                <div style={mediumCircleStyle} className="pizza-image-scale__circle"/>
                <div style={bigCircleStyle} className="pizza-image-scale__circle"/>
                <img style={imgStyle} src={imgSrc} alt="pizza"/>
            </div>
        </div>
    )
})