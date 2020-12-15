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
    },[setIsOpen]);
    const setPizzaModalOpened = useCallback((item:PizzaType) =>{
        dispatch(pizzaModalActions.setItem(item));
        setIsOpen(true);
    },[setIsOpen,dispatch]);

    return (
        <div className={'container'}>
            <h2>Пицца</h2>
            <div className="products">
                {pizzaItems.map(i => <PizzaItem key={i.id} setModalOpened={setPizzaModalOpened} item={i}/>)}
            </div>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <PizzaModal closeModal={closeModal}/>
            </Modal>
        </div>
    )
};