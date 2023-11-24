import React, { useContext } from 'react';
import { CloseCircleOutlined } from "@ant-design/icons";
import {Select} from "antd";
import { getCountriesOptions } from '../../models/countries/countries';
import { WorkPageContext } from '../../models/context';
import { resetBeforeDownloadFilteredData } from '../../models/applications/table-data-processing';

const CountrySelect = ({setSelectedCountry, selectedCountry, countries}) => {
  const {appsSearch, setAppsSearch, tableData, setTableData, lastDoc, setLastDoc} = useContext(WorkPageContext);

  const filterOption = (inputValue, option) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase())
  }

  const handleSelect = (_value, option) => {
    resetBeforeDownloadFilteredData(lastDoc, setLastDoc, setTableData)
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
      loading={countries.length === 0}
    />
  );
};

export default CountrySelect;
