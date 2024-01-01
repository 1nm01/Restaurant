"use client"
import React, { useState, useEffect } from 'react'
import expand from '../../public/expand.svg'
import style from '../../src/app/style.module.css'
import CategoryContainer from '../categoryContainer'
import Link from "next/link"
import buttonStyle from '../../src/app/cart/style.module.css'
import Image from 'next/image'
function Home(props) {
  const[foodMap, setFoodMap] = useState(props.data.foodMapBeverage);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=>{
    setIsMobile(window.innerWidth < 768);
      window.sessionStorage.setItem("restName", props.data.restName);
      window.sessionStorage.setItem("token", props.data.token);

  },[])
    const handleClick =(foodType)=>{
        if(foodType === "beverages"){
            setFoodMap(props.data.foodMapBeverage);
        }
        else if(foodType === "food"){
            setFoodMap(props.data.foodMapFood);
        }
        else if(foodType === "dessert"){
            setFoodMap(props.data.foodMapDessert);
        }
    }
  return (
    <>
    {isMobile ? <>
    <div className={style.buttonSection}>
      <button className={[style.button69,"mr-6" ].join(' ')} onClick={()=>handleClick("beverages")}>Beverages</button>
      <button className={[style.button69,"mr-6" ].join(' ')} onClick={()=>handleClick("food")}>Food</button>
      <button className={style.button69} onClick={()=>handleClick("dessert")}>Desserts</button>
      </div>

      <div>
        {
          Object.keys(foodMap).map((key, index)=>{
            
            return (
  <CategoryContainer containerName={key} containerValue={foodMap[key]} key={index+key}></CategoryContainer>
            )
          })
        }

    <Image src={expand} width="12"></Image>

      </div>
      <Link href={{pathname:"/cart"}}>
      <div className={style.footer} ><div className={buttonStyle.button69}><span className={buttonStyle.buttonText}>Go to cart</span></div></div>
      </Link>
      </> 
      : <div className={style.desktop}>
          Available for Mobile devices only
        </div>}
    </>
  )
}

export default Home