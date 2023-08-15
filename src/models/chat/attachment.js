import Attachment from "../../components/chat/message/Attachment"

export const getAttachments = (attachments, attachmentsIsLoading) => {
  return attachments.map((attachment, index) => {
    return (
      <Attachment 
        key={`${attachment.name}-${index}`}
        attachment={attachment}
        isLoading={attachmentsIsLoading}
      />
    )
  })
}

export const prepareAttachmentsInfo = (fileList) => {
  // NOTE: сюда можно добавить прогресс и статус. Перезапись во время загрузки надо подумать. Может этот объект переполучать этим методом, или напрямую перезаписывать внутри самой функции загрузки как я ссылку перезаписываю
  // TODO: когда тут будут статус загрузки и прогресс - эти данные так же и пойдут в БД. Надо это разделить. КАК?
  return fileList.map(file => {
    return {
      link: "",
      name: file.name,
      weight: file.size,
    }
  })
}

export const addPathToDownload = (index, path, attachments) => {
  attachments[index].link = path
  return attachments;
}