import {BucketItem} from "../BucketItem/BucketItem";
import React, {useMemo} from "react";
import empty from '../../../assets/image/bucket/empty.png';
import {BucketItemType} from "../../../redux/reducers/bucketReducer";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import '../../../CSSTransition/empty.css';
import '../../../CSSTransition/modal.css';
import {ChooseButton} from "../../ChooseButton/ChooseButon";

type PropsType = {
    isOpen: boolean,
    bucketItems: Array<BucketItemType>,
}

export const BucketPopup: React.FC<PropsType> = ({isOpen, bucketItems}) => {

    const totalCost = useMemo(()=>{
        return bucketItems.reduce((prev,i) =>{
            return prev + (i.item.totalCost * i.count);
        },0)
    },[bucketItems]);

    return (
        <CSSTransition in={isOpen} classNames={'popup'} timeout={300} unmountOnExit>
            <div className="navbar__bucket-popup bucket-popup" data-popup={true}>
                <div className="bucket">
                    <div className="bucket__items-container">
                        <TransitionGroup>
                            {bucketItems.map(i =>
                                <CSSTransition key={i.id} timeout={300} classNames={'modal'} unmountOnExit>
                                    <BucketItem minified bucketItem={i}/>
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                        {bucketItems.length > 0 ? (
                            <>
                                <div className="bucket__total-cost">
                                    Сумма заказа:&nbsp;<span>{totalCost} Р</span>
                                </div>
                                <ChooseButton handler={()=>alert('Оформить заказ')} text={'Оформить заказ'}/>
                            </>
                        ) : null}
                    </div>
                    <CSSTransition timeout={{enter:600,exit:0}} in={bucketItems.length <=0} classNames={'empty'} unmountOnExit>
                        <div className="bucket-popup__empty">
                            <img src={empty} alt="bucket-empty"/>
                            <div>Ой пусто</div>
                        </div>
                    </CSSTransition>
                </div>
            </div>
        </CSSTransition>
    )
}