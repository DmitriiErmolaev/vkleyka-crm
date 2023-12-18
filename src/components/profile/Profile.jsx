import React, { useContext } from 'react';
import { ProgramContext } from '../../models/context';
import { Avatar, Button, Card, Upload, theme } from 'antd';
import '../../assets/profile/profile.scss'
import ProfileForm from './ProfileForm';
import { uploadBytes } from 'firebase/storage';
import { getFileRef } from '../../models/firebase';
import { storageAdminsAvatarsPath, updateOperatorProfile } from '../../models/profile/profile';
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
            avatar={
              // <Upload
              //   listType="picture-circle"
              //   fileList={fileList}
              //   // onPreview={handlePreview}
              //   // onChange={handleChange}
              // >
              //   {fileList.length >= 8 ? null : uploadButton}
              // </Upload>
              <ProfileAvatar />
              
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
