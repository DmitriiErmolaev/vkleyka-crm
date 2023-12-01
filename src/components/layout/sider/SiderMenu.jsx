import { Menu } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ProgramContext, WorkPageContext } from '../../../models/context';
import { checkLocationIsFromSiderMenu, getItems } from '../../../models/sider-menu/sider-menu';
import { useLocation } from 'react-router-dom';

const SiderMenu = ({handleMenuSelect, chatListOpen}) => {
  const {role} = useContext(ProgramContext);
  const location = useLocation();
  const [ selectedMenuItem, setSelectedMenuItem ] = useState([]);
  const { dialogueForApplication, setSelectedDialogue } = useContext(WorkPageContext);


  useEffect(() => {
    // подсвечивает выбранный пункт меню, либо нет, если location не из меню Sider.
    checkLocationIsFromSiderMenu(role, location.pathname) ? setSelectedMenuItem([location.pathname]) : setSelectedMenuItem([]);
  }, [location, role])

  useEffect(() => {
    // подсвечивает поле "Чат" в меню Sider, если открыт GlobalChat
    const index = selectedMenuItem.findIndex(key => {
      return key === '/chat';
    })

    if (chatListOpen && index === -1) {
      setSelectedMenuItem((prev) => [...prev, '/chat'])
    }

    if (!chatListOpen && index !== -1) {
      setSelectedMenuItem((prev) => [...prev.slice(0, index), ...prev.slice(index+1)])
    }
  }, [chatListOpen, selectedMenuItem])

  return (
    <div>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={selectedMenuItem}
        items={getItems(role, dialogueForApplication, setSelectedDialogue)}
        style={{backgroundColor:"transparent", color:"white", marginTop:"50px"}}
        onSelect={handleMenuSelect}
      />
    </div>
  );
};

export default SiderMenu;
