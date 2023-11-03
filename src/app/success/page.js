import React from 'react'
import style from './style.module.css'
import Image from 'next/image'
import Success from '../../../public/success.svg'
import Header from '../../../components/header'
function Successful() {
  return (
    <>
    <Header back={true}></Header>
    <div className={style.container}>
        <p  className={style.image}><Image src={Success} width="200"></Image></p>
        <p>Your order was successful</p>
    </div>
    </>
  )
}

export default Successful