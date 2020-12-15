import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getSuccessfulAddedArray } from '../../../selectors/bucketSelector';
import {BucketSuccessItem} from "./BucketSuccessItem";
import {bucketActions} from "../../../redux/reducers/bucketReducer";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import '../../../CSSTransition/popup.css';

export const BucketSuccess:React.FC = props =>{

    const dispatch = useDispatch();
    const alertItems = useSelector(getSuccessfulAddedArray);

    const removeItemAfterTime = useCallback((id:number)=>{
        let timer = setTimeout(()=>{
            dispatch(bucketActions.removeSuccessfulAddedItem(id));
        },1500);
    },[dispatch]);

    return(
        <div className={'navbar__bucket-success'}>
            <TransitionGroup>
                {alertItems.map(i => (
                    <CSSTransition timeout={300} key={i.id} classNames={'popup'} unmountOnExit>
                        <BucketSuccessItem item={i} removeItem={removeItemAfterTime}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
};