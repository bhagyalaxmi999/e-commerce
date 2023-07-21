import React, { useRef } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature';
import {GrPrevious, GrNext} from "react-icons/gr"
// import FilterProduct from '../component/FilterProduct';
// import { useState, useEffect } from 'react';
import AllProduct from "../component/AllProduct";


const Home = () => {
  const productData = useSelector((state)=> state.product.productList)
  // console.log(productData)
  const homeProductCartList = productData.slice(1,5)
  const homeProductCartListVegetables = productData.filter(el => el.category === "vegetables",[])
  // console.log(homeProductCartListVegetables)

  const loadingArray= new Array(4).fill(null)
  const loadingArrayFeature= new Array(10).fill(null)


  const slideProductRef= useRef()
    const nextProduct =()=>{
      slideProductRef.current.scrollLeft += 200
    }

    const preveProduct=() => {
      slideProductRef.current.scrollLeft -= 200
    }


    
    return (
    <div className='p-2 md:p-4'>
     <div className="md:flex gap-4 py-2">

       <div className="md:w-1/2 ">
        <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
          <p className='text-sm font-bold text-slate-900'>Bike Delivery</p>
          <img src="https://i.pinimg.com/originals/c9/51/b2/c951b2ec3482fb798b41296f51231ec1.jpg" alt=""  className='h-7'/>
        </div>
        <h2 className='text-4xl md:text-7xl font-bold py-3'>The Fasted Delivery in <span className='text-red-500 text-'>Your Home</span></h2>
         <p className='py-3 text-base '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut velit posuere, mattis sem nec, pretium sapien. Fusce dapibus, eros vel aliquet dignissim, neque nunc gravida lectus, a mattis ex nibh et mauris. Pellentesque at velit sem. Vestibulum a commodo massa.
         </p>
         <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
       </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-2 justify-center ">
          { 
            homeProductCartList[0] ? homeProductCartList.map(el => {
              return (
                <HomeCard key={el._id} id={el._id} image={el.image} name={el.name} price={el.price} category={el.category}/>
              )
            })
            :loadingArray.map((el,index) => {
              return(
                <HomeCard key={index} loading={"Loading...."}/>
              )
            })
          }
         
        </div>

        
     </div>
     <div className="">
     <div className="flex w-full items-center">
     <h2 className='font-bold text-2xl text-slate-800 mb-4'>Fresh Vegitables</h2>
     <div className="ml-auto flex gap-4">
      <button onClick={preveProduct } className='bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded'><GrPrevious/></button>
      <button onClick={nextProduct }  className='bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded'>
        <GrNext/>
      </button>
     </div>
     </div>
          <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideProductRef}>
            { homeProductCartListVegetables[0] ?
              homeProductCartListVegetables.map(el =>{
                return(
                  <CardFeature key={el._id} id={el._id} name={el.name} category={el.category} price={el.price} image={el.image}
                  /> 
                )
              })
              :
              loadingArrayFeature.map((e,index)=>(<CardFeature loading="Loading...." key={index+"cartLoading"}/>))
            }
           
          </div>
        </div>

 
      
      <AllProduct heading={"Your Product"}/>
    </div>
  )
}

export default Home
