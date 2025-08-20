import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Testimonials from './pages/Testimonials'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import { ToastContainer} from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Verify from './pages/Verify'

const App = () => {
  return (
    <main className='overflow-hidden text-[#404040]'>
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/testimonials' element={<Testimonials/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </main>
  )
}

export default App
