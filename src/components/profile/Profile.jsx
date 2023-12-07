import React, { useContext } from 'react';
import { ProgramContext } from '../../models/context';
import { Avatar, Card, theme } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../../assets/profile/profile.scss'
import ProfileForm from './ProfileForm';
const { useToken } = theme;
const { Meta } = Card;


const Profile = () => {
  const { authorizedUser } = useContext(ProgramContext)
  const { token } = useToken();

  return (
    <div className='profile'>
      <div className='profile__container'>
        <Card
          bodyStyle={{
            padding:'0',
            backgroundColor: token.colorBgLayout,
          }}
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
      </div>
    </div>
  );
};

export default Profile;
