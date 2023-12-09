import { Button, Form, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { ProfileContext, ProgramContext } from '../../models/context';
import { getProfileFormFields, updateOperatorProfile } from '../../models/profile/profile';
import { openNotification } from '../../models/notification/notification';
import { EmailAuthProvider, reauthenticateWithCredential, signOut, updateEmail, updatePassword } from 'firebase/auth';
import { auth } from '../../models/firebase';
import RegularDataForm from './RegularDataForm';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import '../../assets/profile/profile-form.scss';
import Auth from '../auth/Auth';
import ReAuthModalTitle from './ReAuthModalTitle';

const ProfileForm = () => {
  const {user, authorizedUser, notificationApi, admins} = useContext(ProgramContext)
  // const fields = getProfileFormFields(authorizedUser);
  const [ profileUpdating, setProfileUpdating ] = useState(false);
  const [ curEditingForm, setCurEditingForm ] = useState('')
  const [ authModalOpened, setAuthModalOpened ] = useState(false);
  const [emailState, setEmailState] = useState() // вынесли стейт имейла , т.к. нельзя получить стейт из formProvider функции handleFormProvider, т.к. не реализован вызов модалки асинхронно из фукнции. 
  const [passwordState, setPasswordState] = useState([{name: 'pass', value: ''}, {name: 'confirm', value: ''}]) // вынесли стейт имейла , т.к. нельзя получить стейт из formProvider функции handleFormProvider, т.к. не реализован вызов модалки асинхронно из фукнции. 

  const handleModalClose = () => {
    setAuthModalOpened(false)
  }

  const reauthenticate = async (email, password) => {
    // TODO: спустить в функцию handleFormProvider, если сделаю асинхронный вызов модалки.
    try {
      const credential = EmailAuthProvider.credential(email, password); // связываем email и пароль с текущим firebase acc и получаем credential.
      const userCredential = await reauthenticateWithCredential(user, credential); // реавторизация
      if (curEditingForm === 'emailForm') {
        await updateEmail(userCredential.user, emailState[0].value); // изменяем firebase acc
        await updateOperatorProfile(authorizedUser, admins, {[emailState[0].name]: emailState[0].value});// изменяем firestore запись.
      }
      if (curEditingForm === 'passwordForm') {
        await updatePassword(userCredential.user, passwordState[0].value); // изменяем firebase acc
      }
      
      openNotification(notificationApi, 'success', 'updateAdmin');
      setAuthModalOpened(false);
      setCurEditingForm('');
      setProfileUpdating(false);
    } catch (e) {
      console.log(e);
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
    // TODO: придумать асинзронный вызов модалки с формой
    try {
      setProfileUpdating(true)
      if (formName === 'regularDataForm') {
        await updateOperatorProfile(authorizedUser, admins, values)
        openNotification(notificationApi, 'success', 'updateAdmin')
      }
      if(formName === 'emailForm' || formName === 'passwordForm') {
        setAuthModalOpened(true)
        // const confirmed = await modal.confirm(modalConfig);  TODO: УДАЛИТЬ если не поднадобится
      }
    } catch (e) {
      // INFO: придумать асинхронный вызов модалки с формой. Сейчас ловятся ошибки только для "regularDataForm".
      console.log(e)
      openNotification(notificationApi, 'error', 'updateAdmin')
    }
  }

  return (
    <ProfileContext.Provider value={{profileUpdating, setProfileUpdating, curEditingForm, setCurEditingForm}}>
      <div className='profile__update-form' style={{marginTop:'5%'}}>
        <Form.Provider
          onFormFinish={handleFormProvider}
        >
          <RegularDataForm name='regularDataForm' />
          <EmailForm name='emailForm'  emailState={emailState} setEmailState={setEmailState} />
          {authorizedUser.role === 'admin' ? <PasswordForm name='passwordForm' passwordState={passwordState} setPasswordState={setPasswordState}/> : null }
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
        width="30%"
        wrapClassName='modal-wrapper'
        centered
        destroyOnClose
        title={<ReAuthModalTitle />}
      >
        <Auth onFinish={reauthenticate} />
      </Modal>
    </ProfileContext.Provider>
  )
};

export default ProfileForm;
