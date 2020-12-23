import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import './scss/App.scss'
import {MainPage} from "./pages/MainPage";
import {BucketPage} from "./pages/BucketPage";
import {useDispatch} from "react-redux";
import {fetchPizza} from "./redux/saga/PizzaSaga";
// import {getAndSetPizza} from "./redux/reducers/productsReducer";

function App() {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchPizza());
    },[dispatch]);

    return (
        <div className="app">
            <Route exact path={'/'} render={()=><MainPage/>}/>
            <Route exact path={'/bucket'} render={()=><BucketPage/>}/>
        </div>
    );
}

export default App;








