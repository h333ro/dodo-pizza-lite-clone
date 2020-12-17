import {combineReducers, createStore,applyMiddleware, compose} from 'redux';
import {productReducer} from "./reducers/productsReducer";
import {pizzaModalReducer} from "./reducers/pizzaModalReducer";
import {bucketReducer} from './reducers/bucketReducer';
import { navbarPopupReducer } from './reducers/navbarPopupReducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    products:productReducer,
    pizzaModal:pizzaModalReducer,
    bucket:bucketReducer,
    navbarPopup:navbarPopupReducer,
});
export type AppStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

export type GetActionType<T> = T extends {[key:string]:(...args:any[]) => infer U} ? U : never;



