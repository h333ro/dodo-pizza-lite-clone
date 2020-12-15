import axios, {AxiosInstance} from 'axios';
import {PizzaType} from "../redux/reducers/productsReducer";

class Api {
    axiosInstance: AxiosInstance;

    constructor(url: string) {
        this.axiosInstance = axios.create({
            baseURL: url,
        })
    }
}

class PizzaApi extends Api {
    async getPizza() {
        return this.axiosInstance.get<Array<PizzaType>>('/pizza')
            .then(res => res.data).catch(e => {
                console.log(e.message);
                return;
            });
    }
}

export const PizzaApiInstance = new PizzaApi('http://localhost:3000');