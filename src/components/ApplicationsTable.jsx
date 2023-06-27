import React, {useState, useEffect, useContext} from "react";
import {Layout, Select, Row, Col, Space, Button, Menu,  Radio} from "antd";
import {useCollection,useDocument} from "react-firebase-hooks/firestore";
import {collection, query, where, orderBy, addDoc, setDoc, doc, limit, getCountFromServer} from "firebase/firestore";
import {firestore} from "../firebase";
import TableComponent from "./TableComponent";
import {appStatus} from "../table-columns-config";
import SelectComponent from "./selectors/SelectComponent";
import {UserContext} from "../context.js";
// Получают данные по заявителям
              const getUsers = (usersColl) => {
                let users = []
                usersColl.forEach(userDocSnap => {
                  const data = userDocSnap.data();
                  users.push(data);
                })
                return users;
              }

              const findUserName = (users, uid) => {
                const findedUser = users.find(user => {
                  return user.UID === uid
                })
                return findedUser.name
              }
              
// Получают данные по странам: Пригодятся еще для селектора стран
              const getCountries = (countriesDoc) => {
                const {countries} = countriesDoc.data();
                return countries;
              }

              const getFullCountryName = (countries, countryCode) => {
                const findedCountry = countries.find(country => {
                  return countryCode === country.country_code;
                })
                return findedCountry.name_ru
              }

// Получают данные для отображерния даты в таблице: 
              const getCorrectMonth = (month) => {
                if(month < 10) {
                  return `0${month + 1}`
                }
                return month + 1;
              }

              const getShortYear = (year) => {
                return +String(year).slice(2)
              }

              const getApplicationCreationDate = (createdAt) => {
                // TODO: проверить какую дату получают пользователи из других временных зон
                const ms = createdAt.seconds * 1000;
                let fullDate = new Date(ms);
                const date = fullDate.getDate();
                const correctMonth = getCorrectMonth(fullDate.getMonth());
                const shortYear = getShortYear(fullDate.getFullYear());
                return `${date}/${correctMonth}/${shortYear}`
                
              }

// Получают данные для отображения ID в таблице:
              const getApplicationId = (docId) => {
                let id = docId.slice(0,4).toUpperCase();
                return id
              }

             

const roleBasedContent = {
  admin: {
    collectionConstraints: "all-applications",
  },
  operator: {
    collectionConstraint: "assigned-only",
    initialQuery: where("viser", "==", "Евгений Захаров"),
  }
}

const APPS_REF = collection(firestore, "applications");
const USERS_REF = collection(firestore, "users");
const ALL_COUNTRIES_REF = doc(firestore, "countries-mini/all-countries");

const USERS_QUERY = query(USERS_REF);

const TABLE_PAGE_ITEMS_NUMBER = 10;

const ApplicationsTable = ({}) => {
  const [countriesDocSnapshot, countriesLoading, countriesError] = useDocument(ALL_COUNTRIES_REF);
  const [usersCollSnapshot, usersLoading, usersError] = useCollection(USERS_QUERY);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [columnSorting, setColumnSorting] = useState(null);
  const [status, setStatus] = useState(null);
  const [curTablePage, setCurTablePage] = useState();
  const [firstApplicationRef, setFirstApplicationRef] = useState();
  const [lastApplicationRef, setLastApplicationRef] = useState();
  const {role} = useContext(UserContext);

  // const roleBasedQueryConstraints = roleBasedContent[role].collectionConstraint;
  // if (roleBasedQueryConstraints === "assigned-only") {
  //   filters.push(where())
  // }

  let filters = [];
  // filters.push(roleBasedContent[role].initialQuery)

  // if(columnSorting && columnSorting.order) {
  //   filters.push(orderBy(columnSorting.column, columnSorting.order))
  // } else {
  //   filters.push(orderBy("date", "desc"))
  // }
  // if(selectedCountry) {
  //   filters.push(where("country", "==", selectedCountry));
  // }
  // if(status && status !== "all") {
  //   filters.push(where("status", "==", status))
  // }
  const queryForAppsWithoutLimit = query(APPS_REF, ...filters);

  /* TODO: для пагинации: запрос на 10 документов коллекции
  * const queryForAppsWithLimit = query(APPS_REF, ...filters, limit(10)); 
  */

  const [appsCollSnapshot, tableLoading, tableError] = useCollection(queryForAppsWithoutLimit);
  const [tableDataBeforeChanging, setTableDataBeforeChanging] = useState(null);

  useEffect(()=> {
    if(array.length !== 0 ){
      setTableDataBeforeChanging(array)
    }
  }, [appsCollSnapshot])

  let array = [];
  let refArray = []
  
  // TODO: Убрать. Временная проверка на ошибки при запросе данных таблицы
  if(!tableLoading && !countriesLoading && !usersLoading) {
    if(tableError) {
      console.log(tableError)
    } else {
      const countries = getCountries(countriesDocSnapshot); // массив объектов-стран

      appsCollSnapshot.forEach(docSnapshot => {
        const data = docSnapshot.data()
        array.push(
          {
            id: getApplicationId(data.documentID),
            date: getApplicationCreationDate(data.createdAt),
            applicant: findUserName(getUsers(usersCollSnapshot), data.UID), 
            status: data.preparedInformation.preparationStatus,
            country: getFullCountryName(countries, data.country_code) ,
            viser: data.preparedInformation.assignedTo,
          }
        )
        refArray.push(docSnapshot.ref)
      })
    }
  }
  /* TODO: для пагинации: запоминание ссылки на 1 и 10 документы
  * let firstDocRef = refArray[0];
  * let lastDocRef = refArray[TABLE_PAGE_ITEMS_NUMBER - 1];
  */

  function radioChange(e) {
    setStatus(e.target.value)
  }

  return (
    <Layout style={{height:"calc(100vh - 101px)"}}>
      <Space direction="vertical" size="large">
        <Radio.Group 
          optionType="button" 
          value={status} 
          onChange={radioChange} 
          size="large"
          style={{marginLeft:"30px"}}
        >
          <Radio value="all">Все</Radio>
          <Radio value={appStatus.new}>Новые</Radio>
          <Radio value={appStatus.inWork}>В работе</Radio>
          <Radio value={appStatus.finished}>Завершенные</Radio>
        </Radio.Group>
        <SelectComponent 
          collectionType={"countries"} 
          data={{"setSelectedCountry": setSelectedCountry, "selectedCountry": selectedCountry}}
        />
      </Space>
      <TableComponent 
        role = {role}
        // TODO: для пагинации.
        // firstDocRef = {firstDocRef}
        // lastDocRef = {lastDocRef}
        // setFirstApplicationRef = {setFirstApplicationRef}
        // setLastApplicationRef = {setLastApplicationRef}
        setCurTablePage = {setCurTablePage}
        queryForAppsWithoutLimit = {queryForAppsWithoutLimit}
        tableDataBeforeChanging={tableDataBeforeChanging} 
        appsCollSnapshot={appsCollSnapshot} 
        array={array} 
        setColumnSorting={setColumnSorting} 
        tableLoading={tableLoading}
      />
    </Layout>
  )
}

export default ApplicationsTable;
