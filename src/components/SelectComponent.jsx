import React, {useState, useEffect} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {collection,query, orderBy, updateDoc, doc} from "firebase/firestore";
import {firestore} from "../firebase.js";
import {Select} from "antd";

// имя свойства - тип коллекции, значение - путь к коллекции в firebase
const collectionPath = {
  "operators": "operators",
  "countries": "countries", 
}
// ----Матрица поиска свойств из загруженных данных для операторов----
// 1) имя свойства - соответствует такому же свойству в объекте массива options. 
// 2) Значение - свойство хранящее нужную нам информацию в объекте скаченных данных.  
let operatorsMatrix = {
  optionLabel: "operatorName",
  id: "id",
}

// ----Заготовка. Матрица поиска свойств из загруженных данных для стран----
let countryMatrix = {
  optionLabel: "name",
  id: "id"
}

const SelectComponent = ({operator, collectionType, id}) => {
  const [selectedOperator, setSelectedOperator] = useState(null)
  // нельзя сразу вернуть operator, т.к. хук не должен попадать в условия. 
  // По этому передадим в хук null, если он не нужен.
  const q = query(collection(firestore, collectionPath[collectionType]), orderBy(operatorsMatrix.optionLabel))

  const [collSnapshot, loading, error] = useCollection(q);
  
  useEffect(() => {
    if(selectedOperator){
      updateField(id, "viser", selectedOperator)
      setSelectedOperator(null)
    }
  }, [selectedOperator])

  const updateField = async (docId, fileName, value) => {
    const result = await updateDoc(doc(firestore, `applications/${docId}`), {[fileName]: value})
  }

  const handleSelect = (value, option) => {
    setSelectedOperator(option.label)
  }

  const array = [];

  if(!loading) {
    collSnapshot.forEach(docSnapshot => {
      const data = docSnapshot.data();
      // Скорее всего у двух и более разных селектов будут разные данные на отрисовку. Пока одинаковые.
      if(collectionType === "operators"){
        array.push(
          {
            label: data[operatorsMatrix.optionLabel],
            value: data[operatorsMatrix.id],
          }
        )
      }

      if(collectionType === "countries") {
        array.push(
          {
            label: data[countryMatrix.optionLabel],
            value: data[operatorsMatrix.id],
          }
        )
      }
    })
  }
  
  return (
    <div>
      <Select 
        bordered = {false}
        value={operator}
        placeholder="Выбрать визовика"
        options={array} 
        style={{
          maxWidth: 160,
        }}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default SelectComponent;