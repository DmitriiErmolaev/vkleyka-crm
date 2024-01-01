import { formatBytes } from "../../../utils/formatBytes"

export const prepareAttachmentsInfo = (fileList) => {
  // NOTE: сюда можно добавить прогресс и статус. Перезапись во время загрузки надо подумать. Может этот объект переполучать этим методом, или напрямую перезаписывать внутри самой функции загрузки как я ссылку перезаписываю
  // TODO: когда тут будут статус загрузки и прогресс - эти данные так же и пойдут в БД. Надо это разделить. КАК?
  return fileList.map(file => {
    console.log(file)
    return {
      link: "",
      name: file.name,
      weight: formatBytes(file.size),
    }
  })
}
