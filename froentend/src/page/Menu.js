import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import AllProduct from '../component/AllProduct';
import { addCartItem } from '../redux/productSlide';
import { useNavigate } from 'react-router-dom';

const Menu = () => {

  const {filterby} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector(state => state.product.productList)
  

  const productDisplay = productData.filter(el => el._id === filterby)[0]
  console.log(productDisplay)

  const handleAddCartProduct = (e) =>{
    dispatch(addCartItem(productDisplay))    
  };

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay))
    navigate("/cart")
  }


  
  return (
    <div className='p-2 md:p-4'>
     <div className="w-full max-w-4xl m-auto md:flex bg-white">
      <div className="max-w-sm  overflow-hidden w-full p-5" >
       
        <img src={productDisplay.image} alt="" className='hover:scale-105 transition-all '/>
      </div>
      <div className="">
      <h3 className='font-semibold text-slate-600  capitalize text-2xl md:text-4xl'>{productDisplay.name}</h3>
      <p className=' text-slate-500 font-medium text-2xl'>{productDisplay.category}</p>
      <p className=' font-bold md:text-2xl'><span className='text-red-500'> ₹</span>
     <span>{productDisplay.price}</span></p>
     <div className="flex gap-4">
     <button className=' bg-yellow-500 py-1 px-2 my-4 rounded hover:bg-yellow-600 min-w-[100px] ' onClick={handleBuy}>Buy</button>
     <button onClick ={handleAddCartProduct} className=' bg-yellow-500 py-1 px-2 my-4 rounded hover:bg-yellow-600 min-w-[100px]'>Add Cart</button>
     </div>
     <div className="">
      <p className='text-slate-600 font-medium'>Description : </p>
      <p>{productDisplay.description}</p>
     </div>
      </div>
     </div>
      <AllProduct heading={"Related Product"}/>
    </div>
  )
}

export default Menu