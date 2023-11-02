"use client";
import React, {useEffect, useState} from 'react'
import style from './style.module.css'
import minus from '../../public/minus.svg'
import plus from '../../public/plus.svg'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import {incremented, decremented} from '../../redux/reducer'
function ItemContainer(props) {
    const [count, setCount] = useState(0);
    // const presentCount = useSelector((state)=>{
    //     if(props.items.itemName in state)
    //     return state[props.items.itemName].count
    //     else return 0
    // });
    // const dispatch = useDispatch();
    useEffect(()=>{
        setCount(!!window.sessionStorage.getItem("Order^" + props.items.itemName)? JSON.parse(window.sessionStorage.getItem("Order^" +props.items.itemName)).count : 0);
    },[])
    const handleClick=()=>{
        // const action = {
        //     ...props.items
        // }
        // dispatch(incremented(action))
        window.sessionStorage.setItem("Order^" + props.items.itemName,JSON.stringify({
            ...props.items,
            count:1
        }))
        setCount(1);
    }
    const handleMinus=()=>{
        // const action = {
        //         ...props.items
        // }
        // dispatch(decremented(action))
        count !== 1 ? 
        window.sessionStorage.setItem("Order^" + props.items.itemName, JSON.stringify({
            ...props.items,
            count: count-1
        }))
        : window.sessionStorage.removeItem("Order^" + props.items.itemName)
        setCount(count-1);
        if(!!props.handleChange){
            props.handleChange(props.items, count-1);
        }
    }
    const handlePlus=()=>{
        // const action = {
        //     ...props.items 
        // }
        // dispatch(incremented(action))
        window.sessionStorage.setItem("Order^" + props.items.itemName, JSON.stringify({
            ...props.items,
            count: count+1
        }))
        setCount(count+1);
        if(!!props.handleChange){
            props.handleChange(props.items, count+1);
        }
    }
    // console.log(presentCount);
  return (
    <>
        <div className={style.container}>
            <div>{props.items.itemName}<p className={style.price}>Rs {props.items.price}</p></div>
            {
            count === 0 ?
            <button className={style.button69} onClick={handleClick}><span className={style.buttonText}>Cart</span></button>
            : <div className={style.button69} ><span className={style.buttonText}><div className={style.imageSetting}><button onClick={handleMinus}><Image src={minus} width="20"></Image></button><p>{count}</p> <button onClick={handlePlus}><Image src={plus} width="20"></Image></button></div></span></div>
            }
        </div>

    </>
  )
}

export default ItemContainer