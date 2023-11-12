import { Button, Form, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { ProfileContext, ProgramContext } from '../../models/context';
import { getProfileFormFields, updateOperatorProfile } from '../../models/profile/profile';
import { openNotification } from '../../models/notification/notification';
import { EmailAuthProvider, reauthenticateWithCredential, signOut, updateEmail } from 'firebase/auth';
import { auth } from '../../models/firebase';
import RegularDataForm from './RegularDataForm';
import EmailForm from './EmailForm';
import '../../assets/profile/profile-form.scss';
import Auth from '../auth/Auth';

const ProfileForm = () => {
  const [regularDataIsEdit, setRegularDataIsEdit] = useState(false)
  const [emailIsEdit, setEmailIsEdit] = useState(false)
  const {user, authorizedUser, notificationApi, admins} = useContext(ProgramContext)
  const fields = getProfileFormFields(authorizedUser);
  const [ loading, setLoading ] = useState(false);
  const [ curEditingForm, setCurEditingForm ] = useState('')
  const [ authModalOpened, setAuthModalOpened ] = useState(false);
  const [emailState, setEmailState] = useState(fields) // вынесли стейт имейла , т.к. нельзя получить стейт из formProvider из-за асинхронности.

  const handleModalClose = () => {
    setAuthModalOpened(false)
  }

  const reauthenticate = async (email, password) => {
    try { 
      const credential = EmailAuthProvider.credential(email, password); // связываем email и пароль с текущим firebase acc и получаем credential.
      await reauthenticateWithCredential(user, credential) // реавторизация
      await updateEmail(user, fields.email[0].value); // изменяем firebase acc
      await updateOperatorProfile(user, authorizedUser, admins, {[emailState[0].name]: emailState[0].value}) // изменяем firestore запись
      openNotification(notificationApi, 'success', 'updateAdmin')
      setAuthModalOpened(false)
    } catch (e) {
      console.log(e)
      throw e;
    }
  }
  // const modalConfig = {
  //   closeIcon: 	<CloseOutlined />,
  //   icon: null,
  //   footer:null,
  //   centered: true,
  //   width: '30%',
  //   content: <Auth onFinish={reauthenticate}/>,  TODO: УДАЛИТЬ если не поднадобится
  //   onClose: (cancel) => () => false
  // }

  const handleFormProvider = async (formName, { values, forms }) => {
    try {
      setLoading(true)
      if (formName === 'regularDataForm') {
        await updateOperatorProfile(user, authorizedUser, admins, values)
        openNotification(notificationApi, 'success', 'updateAdmin')
      }
      if(formName === 'emailForm') {
        setAuthModalOpened(true)
        // const confirmed = await modal.confirm(modalConfig);  TODO: УДАЛИТЬ если не поднадобится
      }
    } catch (e) {
      console.log(e)
      openNotification(notificationApi, 'error', 'updateAdmin')
    } finally {
      setCurEditingForm('')
      setLoading(false)
    }
  }

  return (
    <ProfileContext.Provider value={{loading, setLoading, curEditingForm, setCurEditingForm}}>
      <div className='profile__update-form' style={{marginTop:'5%'}}>
        <Form.Provider
          onFormFinish={handleFormProvider}
        >
          <RegularDataForm name='regularDataForm' regularDataIsEdit={regularDataIsEdit} setRegularDataIsEdit={setRegularDataIsEdit}/>
          <EmailForm name='emailForm' emailIsEdit={emailIsEdit} setEmailIsEdit={setEmailIsEdit} emailState={emailState} setEmailState={setEmailState} />
          {/* <PasswordForm applyChanges={applyChanges} /> */}
          <Button danger onClick={() => signOut(auth)}>Выйти из аккаунта</Button>
        </Form.Provider>
      </div>
      {/* {contextHolder} TODO: УДАЛИТЬ если не поднадобится*/ }
      <Modal
        open={authModalOpened}
        classNames={{
          body: 'modal-body'
        }}
        onCancel={handleModalClose}
        footer={null}
        // maskStyle={{backgroundColor:"#0000009C"}}
        width="30%"
        wrapClassName='modal-wrapper'
        centered
        destroyOnClose
      >
        <Auth onFinish={reauthenticate} />
      </Modal>
    </ProfileContext.Provider>
  )
};

export default ProfileForm;
