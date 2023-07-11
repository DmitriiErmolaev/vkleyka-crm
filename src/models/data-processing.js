import {query} from "firebase/firestore";
import { GLOBAL_ROLES } from "./role-based-rules";
import { operatorOptionMatrix } from "./operator/operators";
import { updateDoc } from "firebase/firestore";
// ===== получают данные из снапшотов ===== 
export const getSingleFieldFromDocSnapshot = (docSnapshot, fieldName) => {
  return docSnapshot.get(fieldName);
}

export const getAllFieldsFromDocSnapshot = (docSnapshot) => {
  return docSnapshot.data();
}

export const getDataFromCollSnapshot = (collSnap) => {
  if (!collSnap) {
    return
  }
  console.log(collSnap)
  let collData = []
  collSnap.forEach(docSnap => {
    console.log(docSnap)
    const docData = docSnap.data();
    console.log(docSnap.data())
    collData.push(docData);
  })
  console.log(collData)
  return collData;
}


export const getQueryWithConstraints = (ref,constraints) => {
  return query(ref, ...constraints)
}

export const getDocsRefs = (collSnap) => {
  let refs = [];
  collSnap.forEach(docSnap => {
    refs.push(docSnap.ref);
  })
}

export const getSelectOptions = (data, selectType) => {
  if(selectType === "operatorsSelect") {
    return data.reduce((accum, admin) => {
    
      if(admin.role !== GLOBAL_ROLES.operator) {
        return accum;
      }
      accum.push(
        {
          label: admin[operatorOptionMatrix.optionLabel],
          value: admin[operatorOptionMatrix.id],
        }
      )
      return accum
    },[])
  }
  if(selectType === "countriesSelect") {

  }
}

export const updateDocField = async (ref, path, data) => {
  await updateDoc(ref, {[path]: data})
  console.log("загрузка завершена")
}

export const getPercent = (cur, total) => {
  return Math.trunc(cur/total * 100);
}