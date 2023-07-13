
export const testStatuses = {
  0:{
    dbProp:0,
    buttonFilterValue:"Новые", // текст статуса на кнопках сортировки и в тэгах таблицы.
    tagText:"Новые", // текст статуса на кнопках сортировки и в тэгах таблицы.
    tagColor: "blue", // цвета тега статуса
    progressBarColor:"#4DA1FF",
    selectLabel:'Новая',
    progressPercent:20,
  },
  1:{
    dbProp:1,
    buttonFilterValue:"В процессе",
    tagText:"В процессе",
    tagColor:"yellow",
    progressBarColor:"#F2F617",
    selectLabel:'В процессе',
    progressPercent:60,
  },
  2:{
    dbProp:2,
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
        label: testStatuses[0].selectLabel,
        value: testStatuses[0].dbProp,
      },
      {
        label: testStatuses[1].selectLabel,
        value: testStatuses[1].dbProp,
      },
      {
        label: testStatuses[2].selectLabel,
        value: testStatuses[2].dbProp,
      },
    ]
  )
}

export const buttonFilterSettings ={
  new:{
    value: testStatuses[0].dbProp,
    text: testStatuses[0].buttonFilterValue,
  },
  inProgress:{
    value: testStatuses[1].dbProp,
    text: testStatuses[1].buttonFilterValue,
  },
  finished:{
    value: testStatuses[2].dbProp,
    text: testStatuses[2].buttonFilterValue,
  },
  // cancelled:{
  //   value: testStatuses[3].dbProp,
  //   text: testStatuses[3].value,
  // },
}
