import {AppStateType} from "../redux/redux";

export const getPopupIsOpen = (state:AppStateType) =>{
    return state.navbarPopup.isOpen;
};