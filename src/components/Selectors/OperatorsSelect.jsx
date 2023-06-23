import React, {useState, useEffect} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {collection,query, orderBy, updateDoc, doc} from "firebase/firestore";
import {firestore} from "../../firebase.js";
import {Select} from "antd";

// имя свойства - тип коллекции, значение - путь к коллекции в firebase
const collectionPath = {
  operators: "operators",
}
// ----Матрица поиска свойств из загруженных данных для операторов----
// 1) имя свойства - соответствует такому же свойству в объекте массива options. 
// 2) Значение - свойство хранящее нужную нам информацию в объекте скаченных данных.  
let operatorsMatrix = {
  optionLabel: "operatorName",
  id: "id",
}

const OperatorsSelect = ({id, operator}) => {
  const [selectedOperator, setSelectedOperator] = useState(null);

  const q = query(collection(firestore, collectionPath.operators), orderBy(operatorsMatrix.optionLabel))
  const [collSnapshot, loading, error] = useCollection(q);
  
  useEffect(() => {
    if(selectedOperator) {
      updateField(id, "viser", selectedOperator)
      setSelectedOperator(null)
    }
  }, [selectedOperator])

  const updateField = async (docId, fileName, value) => {
    await updateDoc(doc(firestore, `applications/${docId}`), {[fileName]: value})
  }

  const handleSelect = (value, option) => {
    setSelectedOperator(option.label)
  }

  let options = [];

  if(!loading) {
    collSnapshot.forEach(docSnapshot => {
      const data = docSnapshot.data();
      // Скорее всего у двух и более разных селектов будут разные данные на отрисовку. Пока одинаковые.
      options.push(
        {
          label: data[operatorsMatrix.optionLabel],
          value: data[operatorsMatrix.id],
        }
      )
    })
  }

  return (
    <div>
      <Select 
        bordered = {false}
        value={operator || null}
        placeholder="Назначить визовика"
        options={options} 
        style={{
          maxWidth: 160,
        }}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default OperatorsSelect;
