/**
 * @description A function that takes the form data object and edits it to match a specific backend validation schema
 * @param {Object<any>} values Formik's form values object that has the submitted version of the form inputs
 * @returns The form data after editing all the fields to match the backend's validation schema
 */
const handleFormDataBeforeSub = (values) => {
  /* Create a deep copy of all the reference types inside the values argument to avoid mutations */
  let doctorApplicationData = {
    ...values,
    experiences: values.experiences.map(elm => ({ ...elm })),
    education: values.education.map(elm => ({ ...elm })),
    certifications: values.certifications.map(elm => ({ ...elm })),
    clinics: values.clinics.map(elm => ({ ...elm }))
  };
  /* Make sure the dates in side the experiences field are converted into a JS Date object */
  doctorApplicationData.experiences = doctorApplicationData.experiences.map(exp => {
    let newExpObj = exp;
    newExpObj.startDate = new Date(newExpObj.startDate.year, newExpObj.startDate.month);
    newExpObj.endDate = !newExpObj.isCurrentlyWorking ? new Date(newExpObj.endDate.year, newExpObj.endDate.month) : '';
    return newExpObj;
  });
  /* Make sure the dates in side the education field are converted into a JS Date object */
  doctorApplicationData.education = doctorApplicationData.education.map(eduObj => {
    let newEduObj = eduObj;
    newEduObj.issueDate = new Date(newEduObj.issueDate.year, newEduObj.issueDate.month);
    return newEduObj;
  });
  /* Make sure the dates in side the certifications field are converted into a JS Date object */
  doctorApplicationData.certifications = doctorApplicationData.certifications && doctorApplicationData.certifications[0]?.title ?
    doctorApplicationData.certifications
      .filter(({ title, granter, issueDate }) => title && granter && issueDate?.month && issueDate?.year)
      .map(certObj => {
        let newCertObj = certObj;
        newCertObj.issueDate = new Date(newCertObj.issueDate.year, newCertObj.issueDate.month);
        return newCertObj;
      }) : null;
  /* Make sure the certifications field is deleted if it's empty to pass the backend validation layer */
  if (!doctorApplicationData.certifications) delete doctorApplicationData.certifications;
  return doctorApplicationData;
}

export default handleFormDataBeforeSub;