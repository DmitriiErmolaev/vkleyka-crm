import {query} from "firebase/firestore";
import { GLOBAL_ROLES } from "./role-based-rules";
import { operatorOptionMatrix } from "./operator/operators";

// ===== получают данные из снапшотов ===== 
export const getFieldFromDocSnapshot = (docSnapshot, fieldName) => {
  const filedValue = docSnapshot.get(fieldName);
  return filedValue;
}

export const getDataFromCollSnapshot = (CollSnap) => {
  let users = []
  CollSnap.forEach(DocSnap => {
    const data = DocSnap.data();
    users.push(data);
  })
  return users;
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