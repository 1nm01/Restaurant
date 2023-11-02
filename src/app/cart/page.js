"use client"
import React, {useState, useEffect} from 'react'
import ItemContainer from '../../../components/itemContainer'
import style from './style.module.css'
import Header from '../../../components/header'
import axios from "axios";
function Cart() {
  // await temp();
  // console.log(props);
  const [cartData, setCartData] = useState([])
  const [bill, setBill] = useState(0);
  const [fname, setFname] = useState();
  const [mobile, setMobile] = useState();
  useEffect(()=>{
   let data = []
    for(let key of Object.keys(window.sessionStorage)){
      if(key.startsWith("Order^")){
        data.push(JSON.parse(window.sessionStorage.getItem(key)));
      }
    }
    // To do check if key contains Order^
   
    setCartData(data);
    setBill(data.reduce((total, individual) => individual.price*individual.count + total, 0));
  }, [])

  const handleUserData = (event) =>{
    if(event.target.name==="fname"){
      setFname(event.target.value);
    }
    else if(event.target.name==="mobile"){
      setMobile(event.target.value);
    }
  }

  const handleChange =(item, count)=>{
    const index = cartData.findIndex(value => value.itemName === item.itemName);
    if(count === 0){
      cartData.splice(index,1);
      setCartData(cartData);
    }
    else{
      cartData[index] = {
        ...cartData[index],
        count:count
      }
      setCartData(cartData);
    }
    setBill(cartData.reduce((total, individual) => individual.price*individual.count + total, 0));
  }
  
  const handlePlaceOrder=()=>{
    const fcmServerKey = 'AAAAiZkwSEk:APA91bGbT2wtxei4zl8UsxYbJEVXFY7H0sgj8dEBzDED5JU-R5QZirYv-e4rj2cJkQXTwpHrRmdSr_gMWEVs10C4E4hZo5TaoPHG-Efn_79d8B3FVy9QLOoGZceNlaBUjCveZl90SQBl';

      // FCM endpoint for sending notifications
      const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';

      let generateBody = "";
      for(let element of cartData){
        generateBody = generateBody + element.itemName + " "+ element.count +"\n";
      }

      // Notification data (you can customize this as needed)
      const notification = {
        to: window.sessionStorage.getItem("token"),
        notification: {
          title: `${fname};${mobile};${bill}`,
          body: `${generateBody}`,
        },
      };

      // Convert the notification data to a JSON string
      const notificationData = JSON.stringify(notification);

      // Set the request headers, including the FCM server key
      const headers = {
        'Authorization': `key=${fcmServerKey}`,
        'Content-Type': 'application/json',
      };

      // Make the POST request to the FCM endpoint
      axios.post(fcmEndpoint, notificationData, { headers })
        .then((response) => {
          console.log('Notification sent successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error sending notification:', error);
        });
  }
  
  return (
    <>
    <Header></Header>
      {cartData.map((value,index)=>{
                return (
                    <ItemContainer items={value} key={index+value.itemId} handleChange={handleChange}/>
                )
            })
        }
        <br/>
    <form>
      <label>Name: &nbsp;&nbsp;</label>
    <input type="text" name="fname" style={{color:'black'}} onChange={handleUserData} value={fname}/>
    <br/>
    <br/>
    <label>Mobile: &nbsp;</label>
    <input type="number" onChange={handleUserData} name="mobile" style={{color:'black'}} value={mobile}/>
    </form>

    <div className={style.footer} >
      <div>
        Total bill {bill}
      </div>
      <div className={style.button69}>
        <span className={style.buttonText} onClick={handlePlaceOrder}>Place order</span>
      </div>
    </div>

    </>
  )

}

export default Cart