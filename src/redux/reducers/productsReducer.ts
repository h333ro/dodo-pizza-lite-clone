import {GetActionType} from "../redux";

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

export const productsInitialState = {
    products: {
        pizza: [] as Array<PizzaType>
    }
};
type InitialStateType = typeof productsInitialState;


export const productReducer = (state: InitialStateType = productsInitialState, action: ActionType): InitialStateType => {
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
export const productActions = {
    setPizza: (pizza: Array<PizzaType>) => ({type: SET_PIZZA, pizza} as const)
};

// export const getAndSetPizza = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionType> =>
//     async (dispatch) => {
//         try{
//             const pizzaArray = await PizzaApiInstance.getPizza();
//             if(pizzaArray) dispatch(productActions.setPizza(pizzaArray));
//         }catch (e) {
//             alert(e.message);
//         }
//         return;
//     };



















