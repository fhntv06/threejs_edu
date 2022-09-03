import React from "react";
import { NavLink } from 'react-router-dom';
import DetailView from '../DetailView/DetailView';

import './Products.css';

export default function Products ({ numberProduct }) {
    return (
        numberProduct ? <DetailView numberProduct={numberProduct} /> 
        : (
            <div className="container__products">
                <h1>Продукция</h1>
                <div className="products__items">
                    <NavLink to={'/products/1'}>
                        <div className="item">
                            <h3>Трансформатор 110кВ</h3>
                            <div className="image-anons"></div>
                            <div className="date">20.08.2035</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/products/2'}>
                        <div className="item">
                            <h3>Трансформатор 220кВ</h3>
                            <div className="image-anons"></div>
                            <div className="date">20.08.2025</div>
                        </div>
                    </NavLink>
                </div>
            </div>)
        
    )
}