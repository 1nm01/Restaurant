"use client";
import React, { useState } from 'react'
import style from './style.module.css'
import Expand from '../../public/expand.svg'
import Collapse from '../../public/collapse.svg'
import Image from 'next/image'
import ItemContainer from '../itemContainer';
function index(props) {
    const [expand, setExpand] = useState(true);
    const handleToggle=(event)=>{
        setExpand(!expand);
    }
  return (
    <>
    <div className={style.container}>
        <div className='pt-2'>
            {props.containerName}
        </div>
        {
            expand ?
        <div className={style.expandButton} onClick={handleToggle}>
        <Image src={Expand} width="12"></Image>
        </div>
        :
        <div className={style.expandButton} onClick={handleToggle}>
        <Image src={Collapse} width="12"></Image>
        
        </div>
}
</div>
    {!expand ? 
            props.containerValue.map((value,index)=>{
                return (
                    <ItemContainer items={value} key={index+value.itemId}/>
                )
            })
        :null}
    </>
  )
}

export default index