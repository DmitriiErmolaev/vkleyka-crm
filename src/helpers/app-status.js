export const testStatuses = {
  0:{
    // TODO: поменять имена переменных
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