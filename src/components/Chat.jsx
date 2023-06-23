import React, {useState, useEffect, useRef} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {firestore} from "../firebase.js";
import {collection, query, orderBy, addDoc, serverTimestamp} from "firebase/firestore"
import {Spin, Input, Button, Space } from "antd";
import {SendOutlined} from "@ant-design/icons"
import "../assets/chat.scss";

const Chat = ({appId, user}) => {
  const collectionRef = collection(firestore, `/applications/${appId}/application/1/operator-chat`);

  const [mesColSnapshot, loading, error] = useCollection(query(collectionRef, orderBy("createdAt")));
  const [mesInputValue, setMesInputValue] = useState("")
  const allMessages = useRef(null);

  useEffect(()=> {
    if(!loading){
      // console.log(allMessages.current.scrollTop )
      allMessages.current.scrollTop = 9999;
    }
  })

  if(loading){
    return (
      <div style={{backgroundColor:"white", width:"100%", height:"400px", marginTop:"30px", boxShadow:"2px 2px 10px rgba(0, 0, 0, 0.10)"}}>
        <ul>
          <Spin size="large"/>  
        </ul>
      </div>
    )
  }
  let result = [<li className="invisible-container"><div className="invisible-message"></div></li>];

  const handleChange = (e)=> {
    setMesInputValue(e.currentTarget.value);
  }

  const handleSendMessage = (e) => {
    if(!mesInputValue) {
      return
    }
    addDoc(collectionRef, {
      uid: user.uid,
      name: user.displayName || "operator",
      surname: user.displayName || "operator",
      email: user.email,
      role:"operator",
      message: mesInputValue,
      createdAt: serverTimestamp(),
    })


    setMesInputValue("")
  }

  mesColSnapshot.forEach(mesDocSnapshot => {
    const mesData = mesDocSnapshot.data();
    let styleClass = "message__text operator";
    if (mesData.role === "applicant") {
      styleClass = "message__text applicant";
    }
    
    result.push(<li className="message__container"><div className={styleClass}>{mesData.message}</div></li>)
  })


  return (
    <div className="chat-container" >
      <ul className="messages" ref={allMessages}>
        {result}
      </ul>
      <div className="input-panel" >
        <Space.Compact size="large" style={{width:"100%"}}>
          <Input value={mesInputValue} onChange={handleChange} onPressEnter={handleSendMessage}/>
          <Button  
            icon={<SendOutlined style={{fontSize:"24px", color:"#4DA1FF"}}/>}
            onClick={handleSendMessage}
          />
        </Space.Compact>
      </div>
    </div>
  );
};

export default Chat;
