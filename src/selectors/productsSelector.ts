import {AppStateType} from "../redux/redux";

export const getPizzas = (state:AppStateType) =>{
    return state.products.products.pizza;
}