import React from 'react';
import { CloseCircleOutlined } from "@ant-design/icons";
import {Select} from "antd";
import { getCountriesOptions } from '../../models/countries/countries';
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, query, orderBy} from "firebase/firestore";
import {firestore} from "../../models/firebase";


const CountrySelect = ({setSelectedCountry, selectedCountry, countries}) => {
  const filterOption = (inputValue, option) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase())
  }

  const handleSelect = (value, option) => {
    if(option === undefined) {
      // NOTICE: срабатывает, когда нажимаем на иконку сброса select'а. 
      // В таком случае обработчик селекта возвращает undefined
      setSelectedCountry({value:null, label:null})
      return
    }
    setSelectedCountry(option)
  }

  const options = getCountriesOptions(countries);

  return (
    <Select 
      showSearch
      filterOption = {filterOption}
      allowClear="true"
      placeholder="Выберите страну"
      clearIcon={<CloseCircleOutlined style={{color:"red"}}/>}
      onChange={handleSelect}
      value={selectedCountry.label}
      options={options}
      style={{
        width: 180,
      }}
      size="large"
    />
  );
};

export default CountrySelect;
