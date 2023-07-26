import { Alert, Layout, Button, Row, Col } from 'antd';
import React from 'react';
import { useNavigate } from "react-router-dom";

const Error = ({error}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }

  return (
    <Layout style={{height:"100vh", flexDirection:"row", alignItems:"center"}}>
      <Layout >
        <Row>
          <Col span={12} offset={6}>
            <Alert
              showIcon
              type="error"
              message={error.code }
              description={error.message}
            />    
            <Button
              type="primary"
              onClick={handleClick}
            >
              Перезагрузить
            </Button>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default Error;
