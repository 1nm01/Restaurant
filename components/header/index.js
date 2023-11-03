import React from 'react'
import style from './style.module.css'
import Image from 'next/image'
import BackArrow from '../../public/backArrow.svg'
import Link from 'next/link'
function Header(props) {
  return (
    <>
    <div className={style.container}>
      {
        !!props?.back ?
      <Link href="/">
    <Image src={BackArrow} width="100"></Image>
    </Link>
    : null
    }
      <p className={style.paragraph}>khana</p>
          
      </div>
    </>
  )
}

export default Header