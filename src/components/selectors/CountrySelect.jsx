import React from 'react';
import { CloseCircleOutlined } from "@ant-design/icons";
import {Select} from "antd";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, query, orderBy} from "firebase/firestore";
import {firestore} from "../../firebase";

const collectionPath = {
  countries: "countries",
}

const COUNTRIES_REF = collection(firestore, collectionPath.countries)

let countryMatrix = {
  optionLabel: "name",
  id: "id",
}

const CountrySelect = ({setSelectedCountry, selectedCountry}) => {
  const q = query(COUNTRIES_REF, orderBy("name"));
  const [countriesCollSnapshot, countriesLoading, countriesError] = useCollection(q);

  let options = [];

  const handleSelect = (value, option) => {
    if(option === undefined) {
      // срабатывает, когда нажимаем на иконку сброса select'а. 
      // В таком случае обработчик селекта возвращает undefined
      setSelectedCountry(null)
      return
    }
    setSelectedCountry(option.label)
  }

  if(!countriesLoading){
    countriesCollSnapshot.forEach(countrySnapshot => {
      const data = countrySnapshot.data()
      options.push(
        {
          value: data[countryMatrix.id],
          label: data[countryMatrix.optionLabel],
        }
      )
    })
  }

  return (
    <div>
      <Select 
        showSearch
        allowClear="true"
        placeholder="Выберите страну"
        clearIcon={<CloseCircleOutlined style={{color:"red"}}/>}
        onChange={handleSelect}
        value={selectedCountry}
        options={options}
        style={{
          marginLeft:"30px",
          width: 180,
        }}
        size="large"
      />
    </div>
  );
};

export default CountrySelect;
