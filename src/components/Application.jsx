import React from "react";
import { UploadOutlined } from '@ant-design/icons';
import {Layout, Button,Divider,  Upload, Typography, Descriptions, Row,Col, Space} from "antd";
import "../assets/ant-styles/web-ant.scss";

const { Title } = Typography;

// const dataSource = [
//   {
//     id:"1",
//     login:"barabas",
//     пароль:"*******", 
//     email:"barabas@mail.ru",
//     tel: "+77051231515", 
//     name: "Pyotr", 
//     surname:"Ivanov", 
//     ИНН:"850505300300",
//     gender: "male", 
//     birthdate:"-",
//     passport:"-",
//     "дата выдачи паспорта":"-",
//     "дата окончания пачпорта": "-",
//     "кем выдан":"-",
//     "факт. домашний адрес":"-",
//     "юр. домоашний адрес":"-",
//     "семейный статус":"-",
//     "страна гражданства":"-",
//     "страна рождения":"-",
//     "город рождения":"-", 
//   }
// ]

const Application = () => {
  return (
    <Layout style={{padding:"10px"}}>
      <Typography >
        <Title level={2} style={{textAlign:"center"}}>
          Заявка 264
        </Title>
      </Typography>
      <Row gutter={20} style={{height:"100%"}}>
        <Col span={16} >
          <Descriptions labelStyle={{width:"150px", textAlign:"center", fontWeight:"700", padding:"5px", }} size="small" bordered column={2} title="Personal info" >
            <Descriptions.Item label="ID заявителя" labelStyle={{fontSize:"18px", color:"red" }} span={2}>236</Descriptions.Item>
            <Descriptions.Item label="Login">"barabas"</Descriptions.Item>
            <Descriptions.Item label="Password">*******</Descriptions.Item>
            <Descriptions.Item label="E-mail">barabas@mail.ru</Descriptions.Item>
            <Descriptions.Item label="Tel">+7-705-123-15-15</Descriptions.Item>
          </Descriptions> 
          <Divider></Divider>
          <Descriptions contentStyle={{alignItems:"center"}}  labelStyle={{width:"100px", textAlign:"center", padding:"5px"}} size="middle" title="Person" column={1} >
            <Descriptions.Item label="Name">Pyotr</Descriptions.Item>
            <Descriptions.Item label="Surname">Ivanov</Descriptions.Item>
            <Descriptions.Item label="ИНН">850505300300</Descriptions.Item>
            <Descriptions.Item label="Gender">male</Descriptions.Item>
            <Descriptions.Item label="Datebirth">30.06.1994</Descriptions.Item>
          </Descriptions>
          <Divider></Divider>
          <Descriptions column={2}  labelStyle={{width:"150px", padding:"5px", textAlign:"center"}} title="Passport & Adress" bordered>
            <Descriptions.Item label="паспорт">2742 912742</Descriptions.Item>
            <Descriptions.Item label="дата выдачи">28.05.2023</Descriptions.Item>
            <Descriptions.Item label="окончание действия"span={2}>28.05.2023</Descriptions.Item>
            <Descriptions.Item label="кем выдан" span={2}>много много текста текста текста много много текста текста и даже если перейдет на вторую строку</Descriptions.Item>
            <Descriptions.Item label="факт. домашний адрес" span={2}>-</Descriptions.Item>
            <Descriptions.Item label="юр. домашний адрес" span={2}>-</Descriptions.Item>
            <Descriptions.Item label="семейный статус">-</Descriptions.Item>
            <Descriptions.Item label="страна гражданства">-</Descriptions.Item>
            <Descriptions.Item label="страна рождения">-</Descriptions.Item>
            <Descriptions.Item label="город рождения">-</Descriptions.Item>
          </Descriptions>
          <Divider></Divider>
        </Col>
        <Col justify="center" align="middle" span={8} style={{borderLeft:"1px solid #0000002c"}}>
          <Typography >
            <Title level={3} style={{textAlign:"center"}}>Файлы</Title>
          </Typography> 
          <Space style={{flexDirection:"column"}}>
            <Upload>
              <Button icon={<UploadOutlined/>}>Прикрепить анкету</Button>
            </Upload> 
            <Upload>
              <Button icon={<UploadOutlined/>}>Прикрепить запись</Button>
            </Upload>    
          </Space> 
        </Col>
      </Row>
    </Layout>  
  )
}

export default Application;