import axios, {AxiosInstance} from 'axios';
import {PizzaType} from "../redux/reducers/productsReducer";

class Api {
    readonly axiosInstance: AxiosInstance;

    constructor(url: string) {
        this.axiosInstance = axios.create({
            baseURL: url,
        })
    }
}

class PizzaApi extends Api {
    public async getPizza() {
        return this.axiosInstance.get<Array<PizzaType>>('/pizza')
            .then(res => res.data).catch(e => {
                if(e.message === 'Network Error') throw new Error('Пожалуйста введите в терминал json-server --watch db.json');
            });
    }
}

export const PizzaApiInstance = new PizzaApi('http://localhost:3000');