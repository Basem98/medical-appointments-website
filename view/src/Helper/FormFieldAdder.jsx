/**
 * @description A helper function that removes the last element of an array field in a form
 * @param {*} formValues The values state object of the form you are working on
 * @param {*} formValuesSetter The React state setter for this form's values
 * @param {*} expandedStateList The array of boolean values that represent the collapse/expand state of your collapse component
 * @param {*} expandedStateListSetter The React state setter for the expandedStateList field
 * @param {*} arrayFieldSetter The React state setter for the array field you're targetting in the form
 */
export const RemoveLastEntry = (formValues, formValuesSetter, expandedStateList, expandedStateListSetter, arrayFieldSetter) => {
  let newSnapshot = formValues;
  newSnapshot.education.pop();
  let newExpandedList = [...expandedStateList];
  newExpandedList.pop();
  expandedStateListSetter([...newExpandedList]);
  arrayFieldSetter([...newSnapshot.education]);
  formValuesSetter(newSnapshot);
};

/**
 * @description A helper function that adds an object field to the end of an array field in a form
 * @param {*} formValues The values state object of the form you are working on
 * @param {*} formValuesSetter The React state setter for this form's values
 * @param {*} expandedStateList The array of boolean values that represent the collapse/expand state of your collapse component
 * @param {*} expandedStateListSetter The React state setter for the expandedStateList field
 * @param {*} arrayFieldSetter The React state setter for the array field you're targetting in the form
 * @param {*} fieldToAdd The object field you want to add to the array in your form
 */
export const AddAnotherEntry = (formValues, formValuesSetter, expandedStateList, expandedStateListSetter, arrayFieldSetter, fieldToAdd) => {
  let newSnapshot = formValues;
  newSnapshot.education.push(fieldToAdd);
  let newExpandedList = [...expandedStateList];
  newExpandedList[newExpandedList.length - 1] = false;
  newExpandedList.push(true);
  expandedStateListSetter([...newExpandedList]);
  arrayFieldSetter([...newSnapshot.education]);
  formValuesSetter(newSnapshot);
};