import React, {useState} from "react";
import {collection} from "firebase/firestore"
import {uploadBytes, ref} from "firebase/storage"
import {useCollection} from "react-firebase-hooks/firestore"
import {useParams} from "react-router-dom";
import  {firestore, storage} from "../firebase"
import { UploadOutlined } from '@ant-design/icons';
import {Layout, Button,Divider,  Upload, Typography, Descriptions, Row,Col, Space, Spin} from "antd";


const { Title } = Typography;

const DESCRIPTION_FIELDS_VAR_1 = ['ID заявителя', 'Login', 'Password', 'E-mail', 'Tel', ]
const DESCRIPTION_FIELDS_VAR_2 = ['Name','Surname','ИНН', 'Gender', "Datebirth",]
const DESCRIPTION_FIELDS_VAR_3 = [ 'паспорт', 'дата выдачи', 'окончание действия', 'кем выдан', " факт. домашний адрес", 'юр. домашний адрес', 'семейный статус', 'страна гражданства', 'страна рождения', 'город рождения', ]

const makeDescriptionList = (obj, descriptionFields) => {
  //Данную проверку удалить перед релизом.
  if (obj === undefined) {
    return descriptionFields.map(key => {
      return <Descriptions.Item label={key}>-</Descriptions.Item>
    })
  }
  
  return descriptionFields.map(key => {
    return <Descriptions.Item label={key}>{obj[key]}</Descriptions.Item>
  })
}

const Application = () => {
  const {id} = useParams();
  const [collectionSnapshot, loading, error] = useCollection(collection(firestore, `applications/${id}/application`,));
  const [docsFile, setDocsFile] = useState(null);
  const [applicationFile, setApplicationFile] = useState(null);
 
  if ( loading ) {
    return (
      <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Spin size="large"/>
      </div>
    )
  }

  const formRef = ref(storage, "form/images.jpg")
  const docsRef = ref(storage, "docs/docs.pdf")
  const array = []
 
  collectionSnapshot.forEach(docSnapshot => {
   array.push(docSnapshot.data());
  })  

  const [docVar1, docVar2, docVar3] = array
  
  return (
    <Layout style={{padding:"10px"}}>
      <Typography >
        <Title level={2} style={{textAlign:"center"}}>
          Заявка {id}
        </Title>
      </Typography>
      <Row gutter={20} style={{height:"100%"}}>
        <Col span={16} >
          <Descriptions labelStyle={{width:"150px", textAlign:"center", fontWeight:"700", padding:"5px", }} size="small" bordered column={2} title="Personal info" >
            {makeDescriptionList(docVar1, DESCRIPTION_FIELDS_VAR_1)}
            {/* <Descriptions.Item label="ID заявителя" labelStyle={{fontSize:"18px", color:"red" }} span={2}>236</Descriptions.Item>
            <Descriptions.Item label="Login">"barabas"</Descriptions.Item>
            <Descriptions.Item label="Password">*******</Descriptions.Item>
            <Descriptions.Item label="E-mail">barabas@mail.ru</Descriptions.Item>
            <Descriptions.Item label="Tel">+7-705-123-15-15</Descriptions.Item> */}
          </Descriptions> 
          <Divider></Divider>
          <Descriptions contentStyle={{alignItems:"center"}}  labelStyle={{width:"100px", textAlign:"center", padding:"5px"}} size="middle" title="Person" column={1} >
            {makeDescriptionList(docVar2, DESCRIPTION_FIELDS_VAR_2)}
            {/* <Descriptions.Item label="Name">Pyotr</Descriptions.Item>
            <Descriptions.Item label="Surname">Ivanov</Descriptions.Item>
            <Descriptions.Item label="ИНН">850505300300</Descriptions.Item>
            <Descriptions.Item label="Gender">male</Descriptions.Item>
            <Descriptions.Item label="Datebirth">30.06.1994</Descriptions.Item> */}
          </Descriptions>
          <Divider></Divider>
          <Descriptions column={1}  labelStyle={{width:"150px", padding:"5px", textAlign:"center"}} title="Passport & Adress" bordered>
            {makeDescriptionList(docVar3, DESCRIPTION_FIELDS_VAR_3)}
            {/* <Descriptions.Item label="паспорт">2742 912742</Descriptions.Item>
            <Descriptions.Item label="дата выдачи">28.05.2023</Descriptions.Item>
            <Descriptions.Item label="окончание действия"span={2}>28.05.2023</Descriptions.Item>
            <Descriptions.Item label="кем выдан" span={2}>много много текста текста текста много много текста текста и даже если перейдет на вторую строку</Descriptions.Item>
            <Descriptions.Item label="факт. домашний адрес" span={2}>-</Descriptions.Item>
            <Descriptions.Item label="юр. домашний адрес" span={2}>-</Descriptions.Item>
            <Descriptions.Item label="семейный статус">-</Descriptions.Item>
            <Descriptions.Item label="страна гражданства">-</Descriptions.Item>
            <Descriptions.Item label="страна рождения">-</Descriptions.Item>
            <Descriptions.Item label="город рождения">-</Descriptions.Item> */}
          </Descriptions>
          <Divider></Divider>
        </Col>
        <Col justify="center" align="middle" span={8} style={{borderLeft:"1px solid #0000002c"}}>
          <Typography >
            <Title level={3} style={{textAlign:"center"}}>Файлы</Title>
          </Typography> 
          <Space style={{flexDirection:"column"}}>
            <Upload multiiple="false" onChange={(info) => {
              const formdata = new FormData(info.file)
              
              uploadBytes(formRef, formdata)
            }}>
              <Button icon={<UploadOutlined/>} >Прикрепить анкету</Button>
            </Upload> 
            <Upload>
              <Button icon={<UploadOutlined/>}>Прикрепить документы</Button>
            </Upload>    
          </Space> 
        </Col>
      </Row>
    </Layout>  
  )
}

export default Application;