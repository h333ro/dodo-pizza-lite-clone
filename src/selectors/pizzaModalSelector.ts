import {AppStateType} from "../redux/redux";

export const getPizzaForModal = (state:AppStateType) =>{
    return state.pizzaModal.pizzaItem;
};

export const getToggleButtons = (state:AppStateType) =>{
    return {
        sizeButtons: state.pizzaModal.sizeButtons,
        doughButtons: state.pizzaModal.doughButtons,
    }
};

export const getAdditionalActiveArray = (state:AppStateType) =>{
    return state.pizzaModal.additionalActive;
};