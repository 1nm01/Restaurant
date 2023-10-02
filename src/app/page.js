"use client"
import Image from 'next/image'
import Header from '../../components/header'
import style from './style.module.css'
import expand from '../../public/expand.svg'
import CategoryContainer from '../../components/categoryContainer'
import axios from 'axios'
import { Provider, useSelector } from 'react-redux';
import { store } from '../../redux/reducer'
import Link from "next/link"
export default async function Home() {
  
  
  const data =await getData();
  // const cartData = useSelector(state=>state);
  return (
      <Provider store={store}>
      <div>
      <Header></Header>
      <div className={style.buttonSection}>
      <button className={[style.button69,"mr-6" ].join(' ')}>Beverages</button>
      <button className={[style.button69,"mr-6" ].join(' ')}>Food</button>
      <button className={style.button69}>Desserts</button>
      </div>

      <div>
        {
          Object.keys(data).map((key, index)=>{
            
            return (
  <CategoryContainer containerName={key} containerValue={data[key]} key={index+key}></CategoryContainer>
            )
          })
        }

    <Image src={expand} width="12"></Image>

      </div>
      {/* <Link href={{pathname:"/cart", query:{cartData}}}>
      <div className={style.footer} >Go to cart</div>
      </Link> */}
      </div>
      </Provider>
  )
}

async function getData() {
  // const res = await axios('https://mt2hwo1l96.execute-api.ap-south-1.amazonaws.com/test/items?restaurantId=2')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // console.log(res.data);
  // return res.data;
const data = [
  {
    restId: '2',
    category: 'Noodle',
    itemId: '305dc15a-8ac5-4955-9e86-6ff7f26d6565',
    itemName: 'Schezwan Noodle',
    price: 110
  },
  {
    restId: '2',
    category: 'Noodle',
    itemId: '305dc15a-8ac5-4955-9e86-6ff7f26d6564',
    itemName: 'Schezwan Noodle1',
    price: 110
  },
  {
    restId: '2',
    category: 'Noodle',
    itemId: '305dc15a-8ac5-4955-9e86-6ff7f26d6563',
    itemName: 'Schezwan Noodle2',
    price: 110
  },
  {
    restId: '2',
    category: 'Momo',
    itemId: '305dc15a-8ac5-4955-9e86-6ff7f26d665',
    itemName: 'Schezwan Noodle3',
    price: 110
  },
  {
    restId: '2',
    category: 'Momo',
    itemId: '305dc15a-8ac5-4955-9e86-6ff726d6564',
    itemName: 'Schezwan Noodle4',
    price: 110
  },
  {
    restId: '2',
    category: 'Momo',
    itemId: '305dc15a-8ac5-4955-9e86-6f7f26d6563',
    itemName: 'Schezwan Noodle5',
    price: 110
  }
]
let foodMap = {};
for(let x of data){
  if(x.category in foodMap){
    foodMap[x.category].push(x);
  }
  else{
    foodMap[x.category] = [x];
  }
}
console.log("anmol")
console.log(foodMap)
return foodMap;
}

