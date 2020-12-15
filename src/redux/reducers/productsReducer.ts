import {ThunkAction} from "redux-thunk";
import {AppStateType, GetActionType} from "../redux";
import {PizzaApiInstance} from "../../api/api";

export type IngredientType = {
    id: number,
    name: string,
    editable: boolean,
    removed?: boolean
}
export type PizzaTypesType = {
    size: string,
    name: string,
    weight: number,
    diameter: number,
    traditionalDough: boolean,
    thinDough: boolean,
    cost: number
}
export type AdditionalType = {
    id: number,
    imgURL: string,
    name: string,
    cost: { small: number, medium: number, big: number }
};
export type PizzaType = {
    id: number,
    name: string,
    imgURL:string,
    ingredients: Array<IngredientType>,
    types: Array<PizzaTypesType>,
    additional: Array<AdditionalType>,
}

const SET_PIZZA = 'productReducer/SET_PIZZA';

const initialState = {
    products: {
        pizza: [] as Array<PizzaType>
    }
};
type InitialStateType = typeof initialState;


export const productReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_PIZZA:
            return {
                ...state,
                products: {
                    ...state.products,
                    pizza: action.pizza,
                }
            }
        default:
            return state;
    }
};


type ActionType = GetActionType<typeof productActions>
const productActions = {
    setPizza: (pizza: Array<PizzaType>) => ({type: SET_PIZZA, pizza} as const)
};

export const getAndSetPizza = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionType> =>
    async (dispatch) => {
        const pizzaArray = await PizzaApiInstance.getPizza();
        if(pizzaArray) dispatch(productActions.setPizza(pizzaArray));
    };



















