import React , { useEffect, useRef, useState } from 'react';
import { useDispatchCart , useCart } from './ContextReducer';

export default function Card(props) {
let foodItem = props.foodItem;
let dispatch = useDispatchCart();
const priceRef = useRef();
let data = useCart();
 let options = props.options;
 let priceOptions = Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
const handleAddToCart = async () => {
  let food = []
  for (const item of data) {
    if (item.id === foodItem._id) {
      food = item;

      break;
    }
  }

  if (food !== []) {
    if (food.size === size) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
      return
    }
    else if (food.size !== size) {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
      console.log("Size different so simply ADD one more to the list")
      return
    }
    return
  }

  await dispatch({type:"ADD" , id: props.foodItem._id ,name: props.foodItem.name ,price: finalPrice , qty:qty , size:size });
  // console.log(data);
}

let finalPrice = qty * parseInt(options[size])
 useEffect(()=>{
   setsize(priceRef.current.value)
 }, [])
  return (
     
      <div  
        className="card mt-3"
        style={{ width: '18rem', maxHeight: '360px', marginRight: '1rem' ,display: 'flex', justifyContent: 'space-between'}}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ maxHeight: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            <select
              className="m-2 h-100 bg-success rounded"
              style={{ marginRight: '0.5rem' }}
              onChange={(e)=>setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              style={{ marginRight: '0.5rem' }}
              ref = {priceRef}
              onChange={(e)=>setsize(e.target.value)}
            >
               {priceOptions.map((data)=>{
                return <option key = {data} value={data}>{data}</option>
               })}
            </select>
            <div>${finalPrice}/-</div>
          </div>
          <hr></hr>
          <button className='btn btn-success justify-center  ms-2' onClick={handleAddToCart}> Add To Cart</button>
        </div>
      </div>

       
     
  );
}
