import React, { useContext, useState } from 'react';
import ApplicantPassportTitle from './ApplicantPassportTitle';
import ApplicantPassportFields from './ApplicantPassportFields';
import { Form } from 'antd';
import { ApplicantPassportContext, PassportInfoContext } from '../../../../models/context';
import ApplyOrCancel from '../../../../components/new/ApplyOrCancel';
import updateDocField  from '../../../../firebase/updateDocField';

const PassportInfoCollapseItemChildren = ({passports}) => {
  const { isEdit, setIsEdit, appRef } = useContext(PassportInfoContext);
  const [ form ] = Form.useForm();
  const [ dataUpdating, setDataUpdating ] = useState(false)

  const cancelChanges = () => {
    setIsEdit(false);
    form.resetFields()
    //TODO: сбросить редактируемые данные.
  }

  const applyChanges = () => {
    form.submit();
  }

  const updatePassportInfo = async (values) => {
    const passports = Object.values(values)

    try {
      setDataUpdating(true)
      await updateDocField(appRef, 'passports', passports)
      // RELOAD()
      setIsEdit(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
    } finally {
      setDataUpdating(false)
    }
  }

  const applicantPassports = passports.map((passport, passportIndex) => { // массив заявителей.
    //TODO если сработает прокинуть паспортиндекс в тайтл через контекст
    return (
      <ApplicantPassportContext.Provider key={`applicant-${passportIndex}-passport`} value={{passportIndex}}>
        <div className="applicant-passport">
          <ApplicantPassportTitle passport={passport} />
          <ApplicantPassportFields passport={passport} />
        </div>
      </ApplicantPassportContext.Provider>
    )
  })

  return (
    <>
      <Form
        name='passports'
        layout='vertical'
        form={form}
        preserve={false}
        onFinish={updatePassportInfo}
      >
        {applicantPassports}
      </Form>
      <ApplyOrCancel isEdit={isEdit} applyChanges={applyChanges} cancelChanges={cancelChanges} loading={dataUpdating}/>
    </>
  );
};

export default PassportInfoCollapseItemChildren;
