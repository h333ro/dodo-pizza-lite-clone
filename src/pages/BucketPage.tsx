import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
import logo from '../assets/image/logo.png';
import {useSelector} from "react-redux";
import {getBucketItems} from '../selectors/bucketSelector';
import {BucketItem} from "../components/Bucket/BucketItem/BucketItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import '../CSSTransition/modal.css';
import {ChooseButton} from "../components/ChooseButton/ChooseButon";
import { useMemo } from 'react';

export const BucketPage: React.FC = props => {

    const bucketItems = useSelector(getBucketItems);
    const history = useHistory();

    const returnButtonHandler = () =>{
        history.push({
            pathname:'/',
        })
    };

    const totalCost = useMemo(()=>{
        return bucketItems.reduce((prev,bucketItem) =>{
            return prev + (bucketItem.item.totalCost * bucketItem.count);
        },0)
    },[bucketItems]);
    return (
        <div className={'bucket'}>
            <div className="bucket__header">
                <NavLink to={'/'}>
                    <img src={logo} alt="logo-header"/>
                </NavLink>
            </div>
            <div className="bucket__content">
                <h1>Корзина</h1>
                <div className="bucket__items-container">
                    <TransitionGroup>
                        {bucketItems.map(bucketItem =>
                            <CSSTransition key={bucketItem.id} timeout={300} classNames={'modal'} unmountOnExit>
                                <BucketItem bucketItem={bucketItem}/>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                    {bucketItems.length > 0 ? (
                        <div className="bucket__total-cost">
                            Сумма заказа:&nbsp;<span>{totalCost} Р</span>
                        </div>
                    ) : null}
                </div>
                {bucketItems.length < 1 ? <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px'}}>В данный момент корзина пуста</div> : null}
                {bucketItems.length > 0 ? (
                    <div className="bucket__buttons">
                        <div>
                            <ChooseButton handler={returnButtonHandler} text={'Вернуться в меню'}/>
                        </div>
                        <div>
                            <ChooseButton handler={()=>alert('Оформить заказ')} text={'Оформить заказ'}/>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
};