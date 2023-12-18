import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { storageAdminsAvatarsPath, updateOperatorProfile } from '../../models/profile/profile';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFileRef } from '../../models/firebase';
import { ProgramContext } from '../../models/context';


const ProfileAvatar = () => {
  const { authorizedUser, admins } = useContext(ProgramContext)
  const [ url, setUrl ] = useState();
  
  useEffect(() => {
    if(authorizedUser.avatar) {
      const func = async () => {
        const url = await getDownloadURL(getFileRef(authorizedUser.avatar));
        setUrl(url)
      }
      func()
    }
  }, [authorizedUser])

  const handleBeforeUpload = () => {
    return false;
  }

  const handleChange = async ({file, fileList, event}) => {
    console.log(file)
    console.log(fileList)
    console.log(event)
    const uploadResult = await uploadBytes(getFileRef(`${storageAdminsAvatarsPath.path}/admin-${authorizedUser.id}/avatar-${Date.now()}.jpg`), file);
    await updateOperatorProfile(authorizedUser, admins, {avatar: uploadResult.metadata.fullPath})
 
  }

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <Avatar
        shape="circle"
        icon={<UserOutlined />}
        alt="avatar"
        size={50}
        src={url}
      />
      {/* <Upload
        maxCount={1}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        showUploadList={false}
      >
        <Button type='link'>добавить</Button>
      </Upload> */}
    </div>
  );
};

export default ProfileAvatar;