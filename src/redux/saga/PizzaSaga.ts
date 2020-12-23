import {call, put, takeLatest} from "redux-saga/effects";
import {PizzaApiInstance} from "../../api/api";
import {productActions} from "../reducers/productsReducer";

const FETCH_PIZZA = 'pizzaSaga/FETCH_PIZZA';

export const fetchPizza = () => ({type:FETCH_PIZZA});
type FetchPizza =  ReturnType<typeof fetchPizza>;

export function* loadPizza(){
    yield takeLatest(FETCH_PIZZA,getAndSetPizza);
}

export function* getAndSetPizza(){
    try{
        const responsePizzaArray = yield call(PizzaApiInstance.getPizza.bind(PizzaApiInstance));
        if(Array.isArray(responsePizzaArray)){
            yield put(productActions.setPizza(responsePizzaArray));
        }
    }catch (e) {
        alert(e.message);
    }
}