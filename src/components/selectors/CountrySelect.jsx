import React from 'react';
import { CloseCircleOutlined } from "@ant-design/icons";
import {Select} from "antd";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, query, orderBy} from "firebase/firestore";
import {firestore} from "../../models/firebase";

let countryMatrix = {
  optionLabel: "name_ru",
  optionValue: "country_code",
}

const CountrySelect = ({setSelectedCountry, selectedCountry, countries}) => {
  let options = [];
  console.log(selectedCountry)

  const filterOption = (inputValue, option) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase())
  }

  const handleSelect = (value, option) => {
    if(option === undefined) {
      // срабатывает, когда нажимаем на иконку сброса select'а. 
      // В таком случае обработчик селекта возвращает undefined
      setSelectedCountry({value:null, label:null})
      return
    }
    setSelectedCountry(option)
  }

  options = countries.map((country) => {
    return {
      value: country[countryMatrix.optionValue], 
      label: country[countryMatrix.optionLabel],
    }
  })
  console.log(options)
  // countriesCollSnapshot.forEach(countrySnapshot => {
  //   const data = countrySnapshot.data()
  //   options.push(
  //     {
  //       value: data[countryMatrix.id],
  //       label: data[countryMatrix.optionLabel],
  //     }
  //   )
  // })
  

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
