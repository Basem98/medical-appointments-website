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
  clinicsFormStepValidation,
  imagesFormStepValidation,
  validateCertifications
} from '../../Helper/ValidationSchema';
import submitDoctorApplication from "../../Network/Doctors/register";
import { useState } from "react";
import handleFormDataBeforeSub from "../../Helper/DoctorAppSubmission";



const DoctorSignUpForm = () => {
  const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
  const handleFormSubmit = (values) => {
    const doctorApplicationData = handleFormDataBeforeSub(values);
    /* Make the axios calls to submit the doctor's application to the backend */
    submitDoctorApplication(doctorApplicationData)
      .then(response => {
        if (response?.status >= 200 && response?.status < 300)
          setServerResponse({ success: true, msg: 'Congratulations, your application has been submitted! One of our professionals will review your application and verify your data asap.' });
        else
          throw new Error('Something went wrong! Please try again, or contact us to help you solve the problem.')
      })
      .catch(err => {
        setServerResponse({ success: false, msg: 'Something went wrong! Please try again, or contact us to help you solve the problem.' });
      });
  }

  return (
    <>
      <MultiStepForm
        initialValues={initialDoctorFormValues} onSubmit={handleFormSubmit}
        serverResponse={serverResponse} setServerResponse={(newResponse) => setServerResponse(newResponse)}>
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
          validate={validateCertifications}
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
    </>
  );
}

export default DoctorSignUpForm;