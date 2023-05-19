import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './User';
import Search from './Search';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<User />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App