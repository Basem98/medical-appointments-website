export const handleCollapse = (index, expandedStateList, expandedStateListSetter) => {
  let newExpandedList = [...expandedStateList];
  newExpandedList[index] = !newExpandedList[index];
  expandedStateListSetter([...newExpandedList]);
}