import React from 'react';
import Chat from './Chat';
import { Drawer } from "antd";


const Dialog = ({users, dialogWindowOpen, setDialogWindowOpen, selectedDialogApplicantId}) => {

  if(selectedDialogApplicantId === null) {
    return 
  }

  const handleDialogClose = () => {
    setDialogWindowOpen(false)
  }

  const user = users.find(user => {
    return user.UID === selectedDialogApplicantId;
  })

  const userName = user.name 
  ? user.name 
  : (
      user.passports[0]?.first_name 
        ? `${user.passports[0].first_name} ${user.passports[0].last_name}`
        : user.UID
    )

  console.log(user)
  return (
    <Drawer
      bodyStyle={{paddingTop:"0"}}
      width={"500"}
      rootClassName="dialog"
      placement="left"
      title="Чат"
      mask={false}
      open={dialogWindowOpen}
      onClose={handleDialogClose}
      getContainer={false}
      zIndex="91"
    >
      <Chat applicantName={userName} applicantId={selectedDialogApplicantId}/>
    </Drawer>
  );
};

export default Dialog;