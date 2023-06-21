import React from 'react';
import OperatorsSelect from "./OperatorsSelect.jsx";



// ----Заготовка. Матрица поиска свойств из загруженных данных для стран----


const SelectComponent = ({data, collectionType}) => {
  let select = null;

  if (collectionType === "operators") {
    select = <OperatorsSelect id={data.id} operator={data.viser}/>
  }

  return (
    <div>
      {select}
    </div>
  );
};

export default SelectComponent;