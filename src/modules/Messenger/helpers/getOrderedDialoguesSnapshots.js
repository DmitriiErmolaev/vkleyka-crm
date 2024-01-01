export const getOrderedDialoguesSnapshots = (chatsCollSnapshot) => {
  return chatsCollSnapshot.docs.sort((a, b) => {
    const firstDialogueLastMessageTime = a.get('messages')[a.get('messages').length - 1]?.time.toMillis();
    const secondDialogueLastMessageTime = b.get('messages')[b.get('messages').length - 1]?.time.toMillis();
    if (firstDialogueLastMessageTime === undefined) return 1;
    if (secondDialogueLastMessageTime === undefined) return -1;
    return secondDialogueLastMessageTime - firstDialogueLastMessageTime;
  })
};
