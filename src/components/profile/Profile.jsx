import React, { useContext } from 'react';
import { ProgramContext } from '../../models/context';
import { Avatar, Card, ConfigProvider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../../assets/profile/profile.scss'
import ProfileForm from './ProfileForm';
const { Meta } = Card;


const Profile = () => {
  const { authorizedUser } = useContext(ProgramContext)

  return (
    <div className='profile'>
      <div className='profile__container'>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#f8f8f8',
            },
          }}
        >
          <Card 
            bodyStyle={{padding:'0', boxShadow:'none'}}
            bordered={false}
            style={{boxShadow:'none'}}
          >
            <Meta 
              avatar={
                <Avatar 
                  shape="circle" 
                  icon={<UserOutlined />} 
                  alt="avatar" 
                  size={50}
                />
              }
              title={`ID пользователя: ${authorizedUser.id}`}
              description={<ProfileForm />}
            />
          </Card>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Profile;
