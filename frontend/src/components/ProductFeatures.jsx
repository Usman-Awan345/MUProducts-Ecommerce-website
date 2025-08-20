import React from 'react'
import { TbArrowBackUp, TbTruckDelivery } from 'react-icons/tb'
import { RiSecurePaymentLine } from 'react-icons/ri'

function ProductFeatures() {
  return (
    <section className='bg-primary rounded-xl mt-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 rounded-3xl'>
        
        <div className='flexCenter gap-x-4 p-2 rounded-3xl'>
          <div className='text-3xl text-yellow-500'><TbArrowBackUp/></div>
          <div className='mb-3 '>
            <h4 className='h4 capitalize'>Easy Return</h4>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi voluptas quasi vitae velit, voluptatem quidem.</p>

          </div>
        </div>


        <div className='flexCenter gap-x-4 p-2 rounded-3xl'>
          <div className='text-3xl text-secondary'><TbTruckDelivery/></div>
          <div className='mb-3 '>
            <h4 className='h4 capitalize'>Fast Delivery</h4>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi voluptas quasi vitae velit, voluptatem quidem.</p>

          </div>
        </div>


        <div className='flexCenter gap-x-4 p-2 rounded-3xl'>
          <div className='text-3xl text-red-500'><RiSecurePaymentLine/></div>
          <div className='mb-3 '>
            <h4 className='h4 capitalize'>Secure Payment</h4>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi voluptas quasi vitae velit, voluptatem quidem.</p>

          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductFeatures
