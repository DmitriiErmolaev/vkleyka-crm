
export const testStatuses = {
  '1/3':{
    dbProp:'1/3',
    buttonFilterValue:"Новые", // тест статуса на кнопках сортировки и в тэгах таблицы.
    tagText:"Новые", // тест статуса на кнопках сортировки и в тэгах таблицы.
    tagColor: "blue", // цвета тега статуса
    progressBarColor:"#4DA1FF",
    selectLabel:'Новая',
    progressPercent:20,
  },
  '2/3':{
    dbProp:'2/3',
    buttonFilterValue:"В процессе",
    tagText:"В процессе",
    tagColor:"yellow",
    progressBarColor:"#F2F617",
    selectLabel:'В процессе',
    progressPercent:60,
  },
  '3/3':{
    dbProp:'3/3',
    buttonFilterValue:"Завершенные",
    tagText:"Завершенные",
    tagColor:"green",
    progressBarColor:"#60F982",
    selectLabel:'Завершена',
    progressPercent:100,
  }
}

export const getStatusesSelectOptions = () => {
  return ( 
    [
      {
        label: testStatuses['1/3'].selectLabel,
        value: testStatuses['1/3'].dbProp,
      },
      {
        label: testStatuses['2/3'].selectLabel,
        value: testStatuses['2/3'].dbProp,
      },
      {
        label: testStatuses['3/3'].selectLabel,
        value: testStatuses['3/3'].dbProp,
      },
    ]
  )
}


// export const allStatuses = [
//   {
//    dbProp:"1/3", // отображение статуса в БД
//    buttonFilterValue:"Новые", // тест статуса на кнопках сортировки и в тэгах таблицы.
//    tagColor: "blue", // цвета тега статуса
//    progressBarColor:"#4DA1FF",
//    selectLabel:'Новая',
//    progressPercent:20,
//  },
//  {
//    dbProp:"2/3",
//    buttonFilterValue:"В процессе",
//    tagColor: "yellow",
//    progressBarColor:"#F2F617",
//    selectLabel:'В процессе',
//    progressPercent:60,
//  },
//  {
//    dbProp:"3/3",
//    buttonFilterValue:"Завершенные",
//    tagColor: "green",
//    progressBarColor:"#60F982",
//    selectLabel:'Завершена',
//    progressPercent:100,
//  }, 
//  {
//    dbProp:"4/3",
//    buttonFilterValue:"Отмененные",
//    tagColor: "red",
//    progressBarColor:"red",
//    selectLabel:'Отменена',
//    progressPercent:100,
//  }, 
// ]