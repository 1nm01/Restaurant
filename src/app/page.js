import Header from '../../components/header'
import axios from 'axios'
import MainPage from '../../components/Home'
export default async function Home() {
  
  
  const data =await getData();
  return (
      <div>
      <Header></Header>
      <MainPage data={data}/>
      </div>
  )
}

async function getData() {
  const res = await axios('https://mt2hwo1l96.execute-api.ap-south-1.amazonaws.com/test/items?restaurantId=1')
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

