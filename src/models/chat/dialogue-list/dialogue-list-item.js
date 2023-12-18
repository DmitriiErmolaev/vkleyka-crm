export const getCardClassName = (isSelected, isDeleted) => {
  let className = 'dialogue-card ';
  if (isSelected) className += 'dialogue-card_selected '
  if (isDeleted) className += 'is-deleted '
  return className;
}
