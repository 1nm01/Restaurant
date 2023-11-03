import React from 'react'
import style from './style.module.css'
import Image from 'next/image'
import Failure from '../../../public/failure.svg'
import Header from '../../../components/header'
function Fail() {
  return (
    <>
    <Header back={true}></Header>
    <div className={style.container}>
        <p  className={style.image}><Image src={Failure} width="200"></Image></p>
        <p>Your order was not placed please try again</p>
    </div>
    </>
  )
}

export default Fail