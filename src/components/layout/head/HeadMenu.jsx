import { ConfigProvider, Menu, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { checkLocationIsFromTopMenu, topMenuItems } from '../../../models/head-menu/head-menu';
const { useToken } = theme;


const HeadMenu = () => {
  const [ selectedMenuItem, setSelectedMenuItem ] = useState([]);
  const location = useLocation();
  const {token} = useToken();


  useEffect(() => {
    // подсвечивает выбранный пункт меню, либо нет, если location не из меню шапки.
    checkLocationIsFromTopMenu(location.pathname) ? setSelectedMenuItem([location.pathname]) : setSelectedMenuItem([]);
  }, [location])

  return (
    <div className='menu__container'>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: token.colorBgLayout,
            }
          }
        }}
      >
        <Menu
          // theme="light"
          className='menu'
          style={{
            justifyContent: "center",
            marginLeft: "auto"
          }}
          items={topMenuItems}
          mode="horizontal"
          selectedKeys={selectedMenuItem}
        />
      </ConfigProvider>
    </div>
  );
};

export default HeadMenu;
