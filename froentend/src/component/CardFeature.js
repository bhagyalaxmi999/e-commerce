import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlide'
import { useDispatch } from 'react-redux';


const CardFeature = ({image,name,price,category,loading,id}) => {
  const dispatch = useDispatch()
  const handleAddCartProduct = (e) =>{
    
    dispatch(addCartItem({
        _id : id,
        name: name,
        price : price,
        category : category,
        image: image
    }))
      
  }

  return (
    
        <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer  flex flex-col ">
           {
            image ? <>
           
            <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
                <div className="h-14 items-center flex flex-col justify-center items-center">
                <img src={image} className="h-full " alt="" />
                </div>
                <h3 className='font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden'>{name}</h3>
              <p className=' text-slate-500 font-medium'>{category}</p>
              <p className=' font-bold'><span className='text-red-500'> ₹</span>
            <span>{price}</span></p> 
     </Link>
     <button className='w-full bg-yellow-500 py-1 px-2 my-4 rounded hover:bg-yellow-600' onClick={handleAddCartProduct}>Add Cart</button>
    
            </>
            :
            <div className="min-h-[150px] flex justify-center items-center">
                <p>{loading}</p>
            </div>
           }

    </div>
   
      

  )
}

export default CardFeature
