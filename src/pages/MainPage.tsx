import React from 'react';
import {Header} from "../components/Header/Header";
import {NavBar} from "../components/Navbar/NavBar";
import {AdCarousel} from "../components/AdCarousel/AdCarousel";
import {PizzaContent} from "../components/Products/Pizza/PizzaContent";

export const MainPage:React.FC = props =>{

    return(
        <>
            <Header/>
            <NavBar/>
            <AdCarousel/>
            <PizzaContent/>
        </>
    )
}
