import React, {useCallback, useState} from "react";
import {Modal} from "../../Modal/Modal";
import {PizzaModal} from "../PizzaModal/PizzaModal";
import {getPizzas} from "../../../selectors/productsSelector";
import {useDispatch, useSelector} from "react-redux";
import {PizzaItem} from "./PizzaItem";
import {pizzaModalActions} from "../../../redux/reducers/pizzaModalReducer";
import {PizzaType} from "../../../redux/reducers/productsReducer";

export const PizzaContent: React.FC = props => {

    const pizzaItems = useSelector(getPizzas);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const closeModal = useCallback(() => {
        setIsOpen(false);
        document.documentElement.style.overflow = 'auto';
        document.documentElement.style.paddingRight = 0 + 'px';
    },[]);
    const setPizzaModalOpened = useCallback((item:PizzaType) =>{
        dispatch(pizzaModalActions.setItem(item));
        setIsOpen(true);
    },[dispatch]);

    return (
        <div className={'container'}>
            <h2>Пицца</h2>
            <div className="products">
                {pizzaItems.map(pizzaItem => <PizzaItem key={pizzaItem.id} setModalOpened={setPizzaModalOpened} item={pizzaItem}/>)}
            </div>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <PizzaModal closeModal={closeModal}/>
            </Modal>
        </div>
    )
};