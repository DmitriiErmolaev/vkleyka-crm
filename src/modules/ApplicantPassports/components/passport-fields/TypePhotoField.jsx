import React, { useContext, useEffect, useState } from 'react';
import { ApplicantPassportContext, PassportInfoContext } from '../../../../models/context';
import { Form, Image, Input } from 'antd';
import { getDownloadURL } from 'firebase/storage';
import { getFileRef } from '../../../../firebase/firebase';

const TypePhotoField = ({fieldName, dbValue}) => {
  const { passportIndex } = useContext(ApplicantPassportContext);
  const [ url, setUrl ] = useState();
  
  useEffect(() => {
    if(dbValue) {
      const func = async () => {
        const url = await getDownloadURL(getFileRef(dbValue));
        setUrl(url)
      }
      func()
    }
  }, [dbValue])

  return (
    <Form.Item
      name={[String(passportIndex), fieldName ]}
      initialValue={dbValue}
    >
      <Image
        width={100}
        src={url}
      />
    </Form.Item>
  );
};

export default TypePhotoField;
