import React, { useContext } from 'react';
import { ProgramContext } from '../../../models/context';
import { Card, theme } from 'antd';
import '../../../assets/profile/profile.scss';
import ProfileForm from './ProfileForm';
import ProfileAvatar from './ProfileAvatar';
const { useToken } = theme;
const { Meta } = Card;


const Profile = () => {
  const { authorizedUser, admins } = useContext(ProgramContext)
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
            avatar={ <ProfileAvatar />}
            title={`ID: ${authorizedUser.id}`}
            description={<ProfileForm />}
          />
        </Card>
      </div>
    </div>
  );
};

export default Profile;
