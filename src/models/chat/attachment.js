import Attachment from "../../modules/Chat/components/Attachment"
import { formatBytes, getFileWeight } from "../../utils"

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



