import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { shopContext } from '../context/shopContext'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'


function Orders() {
    const {backendUrl,token, currency} = useContext(shopContext)
    const [orderData, setOrderData] = useState([])

    const loadOrderData = async ()=>{
        try {
            if(!token){
                return null
            }
            const response = await axios.post(backendUrl + '/api/order/userorders',{}, {headers:{token}})
            console.log(response.data)
            if(response.data.success){
                let allOrdersItems = []
                response.data.orders.map((order)=>{
                    order.items.map((item)=>{
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItems.push(item)
                    })
                    setOrderData(allOrdersItems.reverse())
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    } 

    useEffect(()=>{
        loadOrderData()
    },[token])
  return (
     <div>
        <div className='bg-primary mb-16'>
            {/* Container  */}
            <div className='max-padd-container py-10'>
               <Title title1={'Order'} title2={' List'} titleStyles={'pb-4'} />
                {/* container  */}
                 {orderData.map((Items,i)=>(
                    <div key={i} className='bg-white p-2 mt-3 rounded-lg'>
                        <div className='text-gray-700 flex flex-col gap-4'>
                            <div className='flex gap-x-3 w-full'>
                                {/* Image  */}
                                <div className='flex gap-6'>
                                    <img src={Items.image[0]} alt="OrderImg" className='sm:w-[77px] rounded-lg' />
                                </div>

                                {/* Order Info  */}
                                <div className='block w-full'>
                                    <h5 className='h5 capitalize'>{Items.name}</h5>
                                    <div className='flexBetween flex-wrap'>
                                        <div className=''>

                                            <div className='flex items-center gap-x-2 sm:gap-x-3'>
                                                
                                                <div className='flexCenter gap-x-2'>
                                                    <h5 className='medium-14'>Price:</h5>
                                                    <p>{currency}{Items.price}</p>
                                                </div>
                                                
                                                
                                                <div className='flexCenter gap-x-2'>
                                                    <h5 className='medium-14'>Quantity:</h5>
                                                    <p>{Items.quantity}</p>
                                                </div>
                                                
                                                
                                                <div className='flexCenter gap-x-2'>
                                                    <h5 className='medium-14'>Size:</h5>
                                                    <p>{Items.size}</p>
                                                </div>

                                            </div>

                                            {/* Payment Method  */}
                                            <div className="flex items-center gap-x-2">
                                                  <h5 className='medium-14'>Date:</h5>
                                                  <p>{new Date(Items.date).toDateString()}</p>
                                            </div>

                                            <div className="flex items-center gap-x-2">
                                                  <h5>Payment</h5>
                                                  <p>{Items.paymentMethod}</p>
                                            </div>

                                        </div>

                                        {/* Status && Button  */}
                                        <div className='flex gap-3 '>
                                            <div className='flex items-center gap-2'>
                                                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                                <p>{Items.status}</p>
                                            </div>

                                            <button onClick={loadOrderData} className='btn-secondary !p-1.5 !py-1 !text-xs'>Track Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
        <Footer/>
     </div>
  )
}

export default Orders
