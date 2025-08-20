import React, { useContext } from 'react'
import { shopContext } from '../context/shopContext'
import Title from './Title'

function CartTotal() {
    const {currency, getCartAmount, delivery_charges}=useContext(shopContext)
  return (
  <section className='w-full'>
    <Title title1={'Total'} title2={' Cart'} titleStyles={'pb-4'} />
      <div className='flexBetween pt-3'>
        <h5 className='h5'>SubTotal:</h5>
        <p className='h5'>{currency}{getCartAmount()}.00</p>
      </div>

      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1'/>

      <div className='flexBetween pt-3'>
        <h5 className='h5'>Shipping Fees:</h5>
        <p className='h5'>{getCartAmount() === 0 ? "0.00":`${currency}${delivery_charges}`}.00</p>
      </div>
      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1'/>

      <div className='flexBetween pt-3'>
        <h5 className='h5'>Total Amount:</h5>
        <p className='h5'>{getCartAmount() === 0 ? "0.00":getCartAmount() + delivery_charges}.00</p>
      </div>

      <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1'/>
  </section>
  )
}

export default CartTotal
