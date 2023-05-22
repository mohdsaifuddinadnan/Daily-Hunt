import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';

import React, { Component } from 'react'
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<News key='general' pageSize={6} country='us' category='general' />} />
            <Route path='entertainment' element={<News key='entertainment' pageSize={6} country='us' category='entertainment' />} />
            <Route path='science' element={<News key='science' pageSize={6} country='us' category='science' />} />
            <Route path='sports' element={<News key='sports' pageSize={6} country='us' category='sports' />} />
            <Route path='buisness' element={<News key='buisness' pageSize={6} country='us' category='buisness' />} />
            <Route path='health' element={<News key='health' pageSize={6} country='us' category='health' />} />
            <Route path='technology' element={<News key='technology' pageSize={6} country='us' category='technology' />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}