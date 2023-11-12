import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { AuthErrorCodes } from 'firebase/auth';

const Auth = ({onFinish}) => {
  const [signInLoading, setSignInLoading] = useState(false)
  const [authError, setAuthError] = useState(null)

  const onFinishInternal = async ({email, pass:password}) => {
    try {
      setSignInLoading(true)
      await onFinish(email, password);
    } catch (e) {
      console.log(e)
      if(e.code === AuthErrorCodes.INVALID_EMAIL || e.code === AuthErrorCodes.INVALID_PASSWORD || e.code === AuthErrorCodes.USER_MISMATCH) {
        setAuthError("Введен неверный email или пароль");
        return
      }
      if(e.code === AuthErrorCodes.USER_DELETED) {
        setAuthError("Данный аккаунт не зарегистрирован");
        return
      }
      if(e.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
        setAuthError("Доступ к аккаунту временно прекращен. Попробуйте снова через несколько минут");
        return
      }
      if(e.code === AuthErrorCodes.NETWORK_REQUEST_FAILED) {
        setAuthError("Отсутствует соединение с интернетом");
        return
      }
      setAuthError("Ошибка авторизации");
    } finally {
      setSignInLoading(false);
    }
  };

  return (
    <AuthForm onFinishInternal={onFinishInternal} authError={authError} setAuthError={setAuthError} signInLoading={signInLoading}/>
  );
};

export default Auth;
