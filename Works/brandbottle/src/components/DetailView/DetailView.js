import React from "react";

import './DetailView.css';

import Scene from '../../threeJS/model/Scene';
export default function DetailView ({ numberProduct }) {
    return (
        <div className="container__detail_text">
            <div className="detail__title">
                <h1>Трансформатор 110кВ</h1>
                <h4>Описание</h4>
            </div>
            <Scene />
            <div className="detail__description">
                <p>Параметр 1</p>
                <p>Параметр 2</p>
                <p>Параметр 3</p>
                <p>Параметр 4</p>
                <p>Параметр 5</p>
                <p>Параметр 6</p>
            </div>
        </div>
    )
}