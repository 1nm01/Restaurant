
import Image from 'next/image'
import Header from '../../components/header'
import style from './style.module.css'
import expand from '../../public/expand.svg'
import CategoryContainer from '../../components/categoryContainer'
import axios from 'axios'
import { Provider, useSelector } from 'react-redux';
import { store } from '../../redux/reducer'
import Link from "next/link"
import buttonStyle from './cart/style.module.css'
import MainPage from '../../components/Home'
export default async function Home() {
  
  
  const data =await getData();

  // const cartData = useSelector(state=>state);
  return (

      <div>
      <Header></Header>
      <MainPage data={data}/>
      
      </div>

  )
}

async function getData() {
  const res = await axios('https://mt2hwo1l96.execute-api.ap-south-1.amazonaws.com/test/items?restaurantId=1')
  console.log(res.data);
  let token;
  let restName;
  let menuItem=[];
  for(let element of res.data){
    if(!!element.token){
      token = element.token;
      restName = element?.restName;
    }
    else{
      menuItem.push(element);
    }
  } 
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // console.log(res.data);
  // return res.data;
const data = [
  {
    restId: '2',
    category: 'Hot',
    itemId: '305dc15a-8ac5-4955-9e86-6ff7f26d6565',
    itemName: 'Tea',
    price: 110,
    type:"beverages"
  },
  {
    restId: '2',
    category: 'Hot',
    itemId: '305dc15a-8ac5-4955-9e86-6ff7f26d6564',
    itemName: 'Coffee',
    price: 110,
    type:"beverages"
  },
  {
    restId: '2',
    category: 'Noodle',
    itemId: '305dc15a-8ac5-4955-9e86-6ff7f26d6563',
    itemName: 'Schezwan Noodle',
    price: 110,
    type:"food"
  },
  {
    restId: '2',
    category: 'Noodle',
    itemId: '305dc15a-8ac5-4955-9e86-6ff7f26d665',
    itemName: 'Veg Noodle',
    price: 110,
    type:"food"
  },
  {
    restId: '2',
    category: 'Momo',
    itemId: '305dc15a-8ac5-4955-9e86-6ff726d6564',
    itemName: 'Veg Momos',
    price: 110,
    type:"food"
  },
  {
    restId: '2',
    category: 'Cake',
    itemId: '305dc15a-8ac5-4955-9e86-6f7f26d6563',
    itemName: 'Chocolate Cake',
    price: 110,
    type:"dessert"
  },
  {
    restId: '2',
    category: 'Cake',
    itemId: '305dc15a-8ac5-455-9e86-6f7f26d6563',
    itemName: 'Pine apple Cake',
    price: 110,
    type:"dessert"
  }
]
let foodMapBeverage = {};
let foodMapFood = {};
let foodMapDessert = {};
for(let x of menuItem){
  if(x.type === "food"){
  if(x.category in foodMapFood){
    foodMapFood[x.category].push(x);
  }
  else{
    foodMapFood[x.category] = [x];
  }
}
else if(x.type==="beverages"){
  if(x.category in foodMapBeverage){
    foodMapBeverage[x.category].push(x);
  }
  else{
    foodMapBeverage[x.category] = [x];
  }
}
else if(x.type === "dessert"){
  if(x.category in foodMapDessert){
    foodMapDessert[x.category].push(x);
  }
  else{
    foodMapDessert[x.category] = [x];
  }
}
}
return {foodMapFood, foodMapBeverage, foodMapDessert, token, restName};
}

