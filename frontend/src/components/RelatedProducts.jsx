import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/shopContext';
import Items from './Items';
import Title from './Title';

const RelatedProducts = ({category, subCategory})=>{
   
  const {products} = useContext(shopContext)
  const [related, setRelated] = useState([])

  useEffect(()=>{
    if(products.length > 0) {
      let filtered = products.slice()
      filtered = filtered.filter((Items)=>category === Items.category)
      filtered = filtered.filter((Items)=>subCategory === Items.subCategory)

      setRelated(filtered.slice())
    }
  },[products,category,subCategory])
  return (
    <section className='py-16'>
      <Title title1={'Related'} title2={'Products'} titleStyles={'pb-4'} />
      <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8'>
        {related.map((product, i)=>(
          <Items key={product._id||i} product={product}/>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
