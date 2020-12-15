import React from "react";
import {Link} from "react-router-dom";
import logo from '../../assets/image/logo.png';

export const Header:React.FC = props =>{
    return(
        <header id={'header'} className={'header container'}>
            <div className="header__logo">
                <Link to={'/'}>
                    <img src={logo} alt="header logo"/>
                </Link>
            </div>
            <div className="header__info">
                <span>Доставка пиццы</span>
                <span className="header__rating">
                    35 мин - 4.76
                </span>
            </div>
            <button className={'header__button'}>Войти</button>
        </header>
    )
};