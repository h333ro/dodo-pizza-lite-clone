import {GetActionType} from "../redux";

const OPEN_POPUP = 'navbarPopup/OPEN_POPUP';
const CLOSE_POPUP = 'navbarPopup/CLOSE_POPUP';

const initialState = {
    isOpen:false,
}
type InitialState = typeof initialState;

export const navbarPopupReducer = (state:InitialState=initialState,action:ActionType):InitialState =>{
    switch (action.type) {
        case OPEN_POPUP:return{
            ...state,
            isOpen: true,
        }
        case CLOSE_POPUP:return{
            ...state,
            isOpen: false,
        }
    }
    return state;
}

type ActionType = GetActionType<typeof navbarPopupAction>;
export const navbarPopupAction = {
    openPopup:()=>({type:OPEN_POPUP} as const),
    closePopup:()=>({type:CLOSE_POPUP} as const),
}