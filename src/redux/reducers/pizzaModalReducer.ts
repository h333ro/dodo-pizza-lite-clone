import {AdditionalType, IngredientType, PizzaType, PizzaTypesType} from "./productsReducer";
import {GetActionType} from "../redux";
import {ToggleButtonsType} from "../../components/ToggleButton/ToggleButton";

const SET_ITEM = 'pizzaModal/SET_ITEM';
const RESET_ITEM = 'pizzaModal/RESET_ITEM';
const SET_SIZE_BUTTON_ACTIVE = 'pizzaModal/SET_SIZE_BUTTON_ACTIVE';
const SET_DOUGH_BUTTON_ACTIVE = 'pizzaModal/SET_DOUGH_BUTTON_ACTIVE';
const ADDITIONAL_ACTIVE_TOGGLE = 'pizzaModal/ADDITIONAL_ACTIVE_TOGGLE';
const REMOVE_RETURN_INGREDIENT_TOGGLE ='pizzaModal/REMOVE_RETURN_INGREDIENT_TOGGLE';

const initialState = {
    isOpen:false,
    pizzaItem : {} as PizzaType,
    sizeButtons:{} as ToggleButtonsType,
    doughButtons:{} as ToggleButtonsType,
    additionalActive:[] as Array<number>,
};
type InitialStateType = typeof initialState;


export const pizzaModalReducer = (state:InitialStateType=initialState,action:ActionType):InitialStateType =>{
    switch(action.type){
        case SET_ITEM: {
            let item = action.item;
            const sizeButtons = {
                items:item.types.map(i => ({name:i.name,disabled:false})),
                active:0,
            };
            const doughButtons = {
                items:[
                    {name:'Традиционное',disabled:!item.types.find(i => i.name === sizeButtons.items[sizeButtons.active].name)!.traditionalDough},
                    {name:'Тонкое',disabled:!item.types.find(i => i.name === sizeButtons.items[sizeButtons.active].name)!.thinDough},
                ],
                active:0,
            };
            return {
                ...state,
                pizzaItem:item,
                sizeButtons:sizeButtons,
                doughButtons:doughButtons,
                additionalActive: [],
            };
        }
        case RESET_ITEM: return{...initialState};
        case SET_SIZE_BUTTON_ACTIVE: {
            const newSizeButtons:ToggleButtonsType = {
                ...state.sizeButtons,
                active:action.index,
            };
            let newDoughButtons:ToggleButtonsType = {
                ...state.doughButtons,
                items:state.doughButtons.items.map(i => {
                    let doughEnabledForNewSize = newSizeButtons.items[action.index].name;
                    if(i.name === 'Традиционное'){
                        return {...i,disabled:!state.pizzaItem.types.find(i => i.name === doughEnabledForNewSize)!.traditionalDough}
                    }
                    return {...i,disabled:!state.pizzaItem.types.find(i => i.name === doughEnabledForNewSize)!.thinDough}
                })
            };
            if(newDoughButtons.items[newDoughButtons.active].disabled){
                newDoughButtons = {...newDoughButtons,active:newDoughButtons.items.findIndex(i => !i.disabled)};
            }
            return {
                ...state,
                sizeButtons: newSizeButtons,
                doughButtons: newDoughButtons,
            };
        }
        case SET_DOUGH_BUTTON_ACTIVE:{
            const newDoughButtons:ToggleButtonsType = {
                ...state.doughButtons,
                active:action.index,
            };
            return {
                ...state,
                doughButtons: newDoughButtons,
            };
        }
        case ADDITIONAL_ACTIVE_TOGGLE:{
            const newAdditionalActive = state.additionalActive.includes(action.index) ?
                state.additionalActive.filter(i => i!==action.index) :
                [...state.additionalActive,action.index];
            return{
                ...state,
                additionalActive: newAdditionalActive,
            }
        }
        case REMOVE_RETURN_INGREDIENT_TOGGLE:{
            const newIngredients = state.pizzaItem.ingredients.map(i =>{
                if(i.id === action.id) return {...i,removed:!i.removed};
                return i;
            });
            return {
                ...state,
                pizzaItem: {...state.pizzaItem,ingredients: newIngredients}
            };
        }
        default: return state;
    }
};

type ActionType = GetActionType<typeof pizzaModalActions>
export const pizzaModalActions = {
    setItem:(item:PizzaType) => ({type:SET_ITEM,item} as const),
    resetItem:() => ({type:RESET_ITEM} as const),
    setSizeButtonActive:(index:number) => ({type:SET_SIZE_BUTTON_ACTIVE,index}as const),
    setDoughButtonActive:(index:number) => ({type:SET_DOUGH_BUTTON_ACTIVE,index} as const),
    additionalActiveToggle:(index:number) => ({type:ADDITIONAL_ACTIVE_TOGGLE,index} as const),
    removeReturnIngredientToggle:(id:number) => ({type:REMOVE_RETURN_INGREDIENT_TOGGLE,id} as const),
};