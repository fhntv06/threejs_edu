import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css'
export default function Header () {
    return (
        <div className={'header'}>
            <>
                <NavLink to='/'>Главная</NavLink>
                <NavLink to='/products'>Продукция</NavLink>
            </>
        </div>
    )
}

