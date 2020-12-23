import {combineReducers, createStore,applyMiddleware, compose} from 'redux';
import {productReducer} from "./reducers/productsReducer";
import {pizzaModalReducer} from "./reducers/pizzaModalReducer";
import {bucketReducer} from './reducers/bucketReducer';
import { navbarPopupReducer } from './reducers/navbarPopupReducer';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {fork} from 'redux-saga/effects';
import {loadPizza} from "./saga/PizzaSaga";

const rootReducer = combineReducers({
    products:productReducer,
    pizzaModal:pizzaModalReducer,
    bucket:bucketReducer,
    navbarPopup:navbarPopupReducer,
});
export type AppStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer,composeEnhancers(applyMiddleware(sagaMiddleware)));

export type GetActionType<T> = T extends {[key:string]:(...args:any[]) => infer U} ? U : never;

sagaMiddleware.run(rootSaga);

function* rootSaga(){
    yield fork(loadPizza);
}



