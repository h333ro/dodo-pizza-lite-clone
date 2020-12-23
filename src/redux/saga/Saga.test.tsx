import React from 'react';
import {getAndSetPizza} from "./PizzaSaga";
import {PizzaType, productActions} from "../reducers/productsReducer";
import {runSaga} from 'redux-saga';
import {PizzaApiInstance} from "../../api/api";

const mockedPizzaArray:Array<PizzaType> = [
    {
        "id":0,
        "name": "Пепперони фреш",
        "imgURL": "https://dodopizza-a.akamaihd.net/static/Img/Products/5dffe4c7d3bc49668f50c1d08d920992_292x292.jpeg",
        "ingredients": [
            {"id": 0, "name": "Пикантная пепперони", "editable": false},
            {"id": 1, "name": "увеличенная порция моцареллы", "editable": true},
            {"id": 2, "name": "томаты", "editable": true},
            {"id": 3, "name": "томатный соус", "editable": false}
        ],
        "types": [
            {"size": "small","name":"Маленькая", "weight": 410, "diameter": 25, "traditionalDough": true, "thinDough": false, "cost": 245},
            {"size": "medium","name":"Средняя", "weight": 610, "diameter": 30, "traditionalDough": true, "thinDough": true, "cost": 375},
            {"size": "big", "name":"Большая", "weight": 800, "diameter": 35, "traditionalDough": true, "thinDough": true, "cost": 495}
        ],
        "additional": [
            {"id": 0, "imgURL": "https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA5E376B4DF", "name": "Острый холапеньо", "cost": {"small": 29, "medium": 39, "big": 49}},
            {"id": 1, "imgURL": "https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F", "name": "Бекон" ,"cost": {"small": 29, "medium": 39, "big": 49}},
            {"id": 3, "imgURL": "https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796", "name": "Сыр Пармезан", "cost": {"small": 29, "medium": 39, "big": 49}}
        ]
    }
];


describe('pizza saga test',()=>{
    it('pizza array should be fetched and dispatched',async ()=>{
        const request = jest.spyOn(PizzaApiInstance,'getPizza').mockImplementation(()=>Promise.resolve(mockedPizzaArray));
        const dispatched:any = [];
        //@ts-ignore
        await runSaga({
            dispatch:(action) => dispatched.push(action),
        },getAndSetPizza);
        expect(request).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([productActions.setPizza(mockedPizzaArray)]);
    })
});
