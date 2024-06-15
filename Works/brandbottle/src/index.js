import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Products from './components/Products/Products';
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import DetailView from './components/DetailView/DetailView';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.Fragment>
      <div className='mask'></div>
      <div className={'wrapper'}>
        <BrowserRouter>
          <Header />
          <div className={'section'}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<DetailView />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  </React.Fragment>
);

