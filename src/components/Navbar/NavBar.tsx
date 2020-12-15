import React, {useCallback, useEffect, useMemo} from "react";
import {NavLink} from "react-router-dom";
import {BucketPopup} from "../Bucket/BucketPopup/BucketPopup";
import {BucketSuccess} from "../Bucket/BucketSuccess/BucketSuccess";
import {useDispatch, useSelector} from "react-redux";
import {getBucketItems} from "../../selectors/bucketSelector";
import {getPopupIsOpen} from "../../selectors/navbarPopupSelector";
import {navbarPopupAction} from "../../redux/reducers/navbarPopupReducer";

const navbar:Array<{text:string}> = [
    {text:'Пицца'},
    {text:'Комбо'},
    {text:'Закуски'},
    {text:'Десерты'},
    {text:'Напитки'},
    {text:'Другие товары'},
    {text:'Акции'},
    {text:'Контакты'},
    {text:'О нас'},
];

export const NavBar:React.FC = props =>{

    const isPopupOpen = useSelector(getPopupIsOpen);
    const dispatch = useDispatch();

    const bucketItems = useSelector(getBucketItems);
    //Подсчет количества элем
    const bucketItemsLength = useMemo(()=> (
        bucketItems.reduce((prev, i) => {
            return prev + i.count;
        }, 0)
    ),[bucketItems]);

    //Обрабработчик события наведения мыши на кнопку корзины
    const onMouseEnterHandler = useCallback((e:React.MouseEvent<HTMLAnchorElement>)=>{
        dispatch(navbarPopupAction.openPopup());
        //Обработчик события когда мышь покидает кнопку корзины и всплывающее окно
        const handler:EventListener = (e)=>{
            const target = e.target as HTMLElement;
            if(!target.closest('[data-popup="true"]')){
                document.removeEventListener('mousemove',handler);
                        let timer = setTimeout(()=>{
                            dispatch(navbarPopupAction.closePopup());
                        document.removeEventListener('mousemove',handler);
                        document.removeEventListener('mousemove',resetIntervalOnMouseMove);
                },500);
                //Обработчик события возвращения мыши обратно на кнопку или всплывающее окно
                const resetIntervalOnMouseMove:EventListener = (e) =>{
                    const target = e.target as HTMLElement;
                    if(target.closest('[data-popup="true"]')){
                        clearInterval(timer);
                        document.addEventListener('mousemove',handler);
                        document.removeEventListener('mousemove',resetIntervalOnMouseMove);
                    }
                };
                document.addEventListener('mousemove',resetIntervalOnMouseMove);
            }
        };
        document.addEventListener('mousemove',handler);
    },[dispatch]);

    //Закрытия всплывающего окна корзины после unmount
    useEffect(()=>{
        return()=>{
            dispatch(navbarPopupAction.closePopup());
        }
    },[dispatch]);

    return(
        <div className={'sticky-container'}>
            <nav className="navbar container">
                <ul className="navbar__list">
                    {navbar.map((i,index) =>
                        <li key={index} className="navbar__item">{i.text}</li> )}
                </ul>
                <div className="navbar__bucket">
                    <NavLink to={'/bucket'} onMouseEnter={onMouseEnterHandler}>
                        <div className={'navbar__bucket-button'} data-popup={true}>
                            <span>Корзина</span>
                            {bucketItemsLength ? (
                                <div className={'navbar__bucket-button-counter'}>
                                    <div>{bucketItemsLength}</div>
                                    <div>&#8594;</div>
                                </div>
                            ) : null}
                        </div>
                    </NavLink>
                    <BucketPopup isOpen={isPopupOpen} bucketItems={bucketItems}/>
                    <BucketSuccess/>
                </div>
            </nav>
        </div>
    )
};


// const onMouseLeaveHandler = useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
//     const handler:EventListener = (e) =>{
//         const target = e.target as HTMLElement;
//         if(target.closest('[data-popup="true"]')){
//             clearInterval(timer);
//             document.removeEventListener('mousemove',handler);
//         }
//     };
//     document.addEventListener("mousemove", handler);
//
//     const timer = setTimeout(()=>{
//         setIsOpen(false);
//         document.removeEventListener('mousemove',handler);
//     },600);
// },[]);