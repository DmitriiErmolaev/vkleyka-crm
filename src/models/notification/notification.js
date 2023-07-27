const notifications = {
  opeartorDelete:{
    success: {
      title: "Операция выполнена успешно!",
      description: "Запись о визовике успешно удалена!",
    }, 
    error: {
      title: 'Произошла ошибка!',
      description: 'Произошла ошибка при удалении записи о визовике',
    },
    warning: {
      title: "Внимание!",
      description: "Требуется удалить аккаунт визовика через консоль firebase в ручную. Обратитесь к старшему разработчику!",
    },
  },
  createNewOperator:{
    success: {
      title: "Операция выполнена успешно!",
      description: "Аккаунт визовика успешно создан!",
    }, 
    error: {
      title: 'Произошла ошибка!',
      description: 'Произошла ошибка при создании нового аккаунта!',
    },
  },
  uploadFile:{
    success: {
      title: "Операция выполнена успешно!",
      description: 'Файл успешно загружен',
    }, 
    error: {
      title: 'Произошла ошибка!',
      description: 'Неверный формат файла. Допустима загрузка файлов только в формате ".pdf" '
    },
  },
  questionnaireUpdated: {
    success: {
      title: 'Операция выполнена успешно!',
      description: 'Данные успешно обновлены!',
    }, 
    error: {
      title: 'Произошла ошибка!',
      description: 'При обновлении данных произошла ошибка!'
    },
  },
  operatorChanged: {
    success: {
      title: 'Операция выполнена успешно!',
      description: 'Визовик успешно изменен!',
    }, 
    error: {
      title: 'Произошла ошибка!',
      description: 'Произошла ошибка при обновлении визовика!'
    },
   
  },
  statusChanged: {
    success: {
      title: 'Операция выполнена успешно!',
      description: 'Статус заявки успешно обновлен!',
    },
    error: {
      title: 'Произошла ошибка!',
      description: 'Произошла ошибка при обновлении статуса заявки! '
    },
  },
}

export const openNotification = (api, messageType, operationType) => {
  const duration = messageType === "warning" ? 7 : 4.5
  api[messageType]({
    placement: "topRight",
    message: notifications[operationType][messageType].title,   
    description:notifications[operationType][messageType].description,
    duration: duration,
  })
}