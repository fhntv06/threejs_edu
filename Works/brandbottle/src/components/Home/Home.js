import React from 'react';
import './Home.css'

import Scene from '../../threeJS/model/Scene'
export default function Home () {
    return (
    <>
        <div className={'section__text'}>
            <div className='title'>
                <h1>Продажа трансформаторов!</h1>
            </div>
            <div className='description'>
                <h2>ВЫГОДНО!</h2>
                <h3>Только у нас лучшие трансформаторы по хорошей цене!</h3>
            </div>
        </div>
        <Scene />
    </>
    )
}

