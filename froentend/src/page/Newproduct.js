import React,{ useState }  from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import {ImagetoBase64} from '../utility/ImagetoBase64'
import {toast} from 'react-hot-toast'
 

const Newproduct = () => {
  const [data,setData] = useState({
    name:"",
    category:"",
    image: "",
    price: "",
    description: ""
  })

  const handleOnChange =  (e) => {
     const {name,value} = e.target 

     setData((preve) => {
      return{
        ...preve,
        [name]:value
      }
     })
  }

  const uploadImage = async(e) => {
   
    const data = await ImagetoBase64(e.target.files[0])

    // console.log(data)
    setData((preve) => {
      return{
        ...preve,
        image:data
      }
    })
  }
    const handleSubmit =async (e) => {
     e.preventDefault()
      console.log(data)

      const {name,image,category,price} = data

      if(name && image && category && price) {

      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method:"POST",
        headers: {
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const fetchRes = await fetchData.json()

      console.log(fetchRes)
      toast(fetchRes.message)

      setData(() => {
        return{
          name:"",
          category:"",
          image: "",
          price: "",
          description: ""
        }
      })
    }
    else{
      toast("Enter required fileds")
    }
    }
  return (
    <div className=' p-4 '>
      <form action="" className='m-auto w-full max-w-md p-4 shadow flex flex-col p-3 bg-white ' onSubmit={handleSubmit} >
        <label htmlFor="name">Name</label>
        <input type={"text"} name="name" className='bg-slate-200 p-3 my-1' value={data.name} onChange={handleOnChange} />

         <label htmlFor="category">Category</label>
        <select name="category" id="category" className='bg-slate-200 p-3 my-1' value={data.category} onChange={handleOnChange}>
          <option value={"other"}>choose category</option>
          <option value={"fruits"} >Fruits</option>
          <option value={"vegetables"}>Vegetables</option>
          <option value={"icecream"}>Ice cream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"nonveg"}>nonvag</option>
          <option value={"chicken"}>chicken</option>
          <option value={"sandwich"}>sandwich</option>
          <option value={"noodles"}>noodles</option>
          <option value={"panner"}>panner</option>
          

        </select>
         
         <label htmlFor="image">Image

        <div className="h-40 w-full bg-slate-200 my-3 rounded flex items-center justify-center cursor-pointer">
            {
              data.image ? <img src={data.image} className="h-full" alt="" /> :<span className="text-5xl"><BsCloudUpload/></span>
            }
            
            <input type={"file"}  accept="image/*" id="image"   onChange={uploadImage} className="hidden"  />
        </div>
        </label>
        <label htmlFor="price" className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-200 p-3 my-1'name="price" id="price" value={data.price} onChange={handleOnChange}/>

        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" cols="30" rows={3} className='bg-slate-200 p-3 my-1 resize-none'  value={data.description} onChange={handleOnChange}></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-lg font-medium my-2 drop-shadow'>Save</button>
      </form>
    </div>
  )
}

export default Newproduct
