import React from 'react';

const AppsPaginator = ({currentAppsCount, totalAppsCount}) => {

  return (
    <div style={{display:'flex', justifyContent:'center', margin:'1% 0'}}>
      <div style={{padding:'0.5% 2%', borderRadius:'12px', width: '18%'}}>
        <p style={{textAlign:'center', color: 'rgb(0 0 0 / 44%)'}}>{`Загружено ${currentAppsCount} / ${totalAppsCount} заявок`}</p>
      </div>
    </div>
  );
};

export default AppsPaginator;
