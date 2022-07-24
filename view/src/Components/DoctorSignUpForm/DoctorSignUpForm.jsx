import MultiStepForm from "../MultiStepForm/MultiStepForm";
import PersonalFormStep from "../PersonalFormStep/PersonalFormStep";
import EducationFormStep from "../EducationFormStep/EducationFormStep";
import ExperienceFormStep from "../ExperienceFormStep/ExperienceFormStep";
import CertificationsFormStep from "../CertificationsFormStep/CertificationsFormStep";
import ClinicsFormStep from "../ClinicsFormStep/ClinicsFormStep";
import UploadFormStep from "../UploadFormStep/UploadFormStep";
import initialDoctorFormValues from "../../Helper/InitialDocFormValues";
import {
  personalFormStepValidation,
  educationFormStepValidation,
  experienceFormStepValidation,
  certificationsFormStepValidation,
  clinicsFormStepValidation,
  imagesFormStepValidation
} from '../../Helper/ValidationSchema';
import submitDoctorApplication from "../../Network/Doctors/register";



const DoctorSignUpForm = () => {
  const handleFormSubmit = (values) => {
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
      doctorApplicationData.certifications.map(certObj => {
        let newCertObj = certObj;
        newCertObj.issueDate = new Date(newCertObj.issueDate.year, newCertObj.issueDate.month);
        return newCertObj;
      }) : null;
    /* Make sure the certifications field is deleted if it's empty to pass the backend validation layer */
    if (!doctorApplicationData.certifications) delete doctorApplicationData.certifications;
    /* Make the axios calls to submit the doctor's application to the backend */
    submitDoctorApplication(doctorApplicationData);
  }


  return (
    <MultiStepForm initialValues={initialDoctorFormValues} onSubmit={handleFormSubmit}>
      <PersonalFormStep
        stepName="Personal"
        validationSchema={personalFormStepValidation}
      />
      <EducationFormStep
        stepName="Qualifications"
        validationSchema={educationFormStepValidation}
      />
      <CertificationsFormStep
        stepName={`Certifications\n(optional)`}
        validationSchema={certificationsFormStepValidation}
      />
      <ExperienceFormStep
        stepName="Experience"
        validationSchema={experienceFormStepValidation}
      />
      <ClinicsFormStep
        stepName="Clinics"
        validationSchema={clinicsFormStepValidation}
      />
      <UploadFormStep
        stepName="File Upload"
        validationSchema={imagesFormStepValidation}
      />
    </MultiStepForm >
  );
}

export default DoctorSignUpForm;