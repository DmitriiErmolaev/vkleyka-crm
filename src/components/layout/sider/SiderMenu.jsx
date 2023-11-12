import { Menu } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ProgramContext } from '../../../models/context';
import { checkLocationIsFromSiderMenu, getItems } from '../../../models/sider-menu/sider-menu';
import { useLocation } from 'react-router-dom';

const SiderMenu = ({handleMenuSelect, drawerOpen}) => {
  const {role} = useContext(ProgramContext);
  const location = useLocation();
  const [ selectedMenuItem, setSelectedMenuItem ] = useState([]);

  useEffect(() => {
    // подсвечивает выбранный пункт меню, либо нет, если location не из меню Sider.
    checkLocationIsFromSiderMenu(role, location.pathname) ? setSelectedMenuItem([location.pathname]) : setSelectedMenuItem([]);
  }, [location, role])

  useEffect(() => {
    // подсвечивает поле "Чат" в меню Sider, если открыт GlobalChat
    const index = selectedMenuItem.findIndex(key => {
      return key === '/chat';
    })

    if (drawerOpen && index === -1) {
      setSelectedMenuItem((prev) => [...prev, '/chat'])
    }

    if (!drawerOpen && index !== -1) {
      setSelectedMenuItem((prev) => [...prev.slice(0, index), ...prev.slice(index+1)])
    }
  }, [drawerOpen, selectedMenuItem])

  return (
    <div>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={selectedMenuItem}
        items={getItems(role)}
        style={{backgroundColor:"transparent", color:"white", marginTop:"50px"}}
        onSelect={handleMenuSelect}
      />
    </div>
  );
};

export default SiderMenu;
