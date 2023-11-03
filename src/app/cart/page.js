"use client"
import React, {useState, useEffect} from 'react'
import ItemContainer from '../../../components/itemContainer'
import style from './style.module.css'
import Header from '../../../components/header'
import axios from "axios";
function Cart() {
  const [cartData, setCartData] = useState([])
  const [bill, setBill] = useState(0);
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
  
  const handlePlaceOrder=(event)=>{
    event.preventDefault();
    const fcmServerKey = 'AAAAiZkwSEk:APA91bGbT2wtxei4zl8UsxYbJEVXFY7H0sgj8dEBzDED5JU-R5QZirYv-e4rj2cJkQXTwpHrRmdSr_gMWEVs10C4E4hZo5TaoPHG-Efn_79d8B3FVy9QLOoGZceNlaBUjCveZl90SQBl';

      // FCM endpoint for sending notifications
      const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';

      const fname = event.target.fname.value;
      const mobile = event.target.mobile.value;

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
    <form  onSubmit={handlePlaceOrder}>
      <label>Name: &nbsp;&nbsp;</label>
    <input type="text" name="fname" style={{color:'black'}}  required/>
    <br/>
    <br/>
    <label>Mobile: &nbsp;</label>
    <input type="text"  name="mobile" style={{color:'black'}}  required pattern="[0-9]{10}" title="Please enter valid mobile number"/>
    <div className={style.footer} >
      <div>
        Total bill {bill}
      </div>
      <div className={style.button69}>
        <button className={style.buttonText} type="submit">Place order</button>
      </div>
    </div>
    </form>

    

    </>
  )

}

export default Cart