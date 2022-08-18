import * as Yup from 'yup';


export const personalFormStepValidation = Yup.object({
  firstName: Yup.string().required('This field is required').matches(/[a-z]{2,50}/g, { message: 'Your first name must be between 2 and 50 alphabet letters' }),
  lastName: Yup.string().required('This field is required').matches(/[a-z]{2,50}/g, { message: 'Your last name must be between 2 and 50 alphabet letters' }),
  phoneNumber: Yup.string().required("This field is required").matches(/^01[0125][0-9]{8}$/g, { message: 'You must type a valid Egyptian number' }),
  email: Yup.string().email('You must provide a valid email (example@organization.domain)').required('This field is required'),
  password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, { message: 'Your password should be at least 8 characters long and it should consist of at least one uppercase letter, one lowercase letter, one number, and one symbol' }).required('This field is required'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Your passwords must match').required('This field is required')
});

export const educationFormStepValidation = Yup.object({
  specialization: Yup.string().required('This field is required'),
  education: Yup.array().of(Yup.object({
    degree: Yup.string().required('This field is required'),
    granter: Yup.string().required('This field is required'),
    issueDate: Yup.object({
      month: Yup.string().required('This field is required'),
      year: Yup.string().required('This field is required')
    })
  }))
});

const isCertificationValid = (certifications) => {
  let isValid = true;
  let someFieldIsFilled = false;
  certifications.forEach(({ title, granter, issueDate }) => {
    if (title || granter || issueDate.month || issueDate.year) someFieldIsFilled = true;
    if (someFieldIsFilled) {
      isValid = title && title.length > 0 && granter && granter.length > 0 && issueDate.month && issueDate.year;
    }
  });
  return isValid;
}

export const validateCertifications = (values) => {
  const errors = {};
  if (isCertificationValid(values['certifications'])) return errors;
  errors.certifications = [];
  const errMsg = 'This field is required, if you want to add a certificate';
  values['certifications'].forEach((cert, index) => {
    if (!isCertificationValid([cert])) {
      const newCertObj = { title: '', granter: '', issueDate: { month: '', year: '' } };
      newCertObj.title = cert.title ? null : errMsg;
      newCertObj.granter = cert.granter ? null : errMsg;
      newCertObj.issueDate.month = cert.issueDate.month ? null : errMsg;
      newCertObj.issueDate.year = cert.issueDate.year ? null : errMsg;
      errors.certifications[index] = newCertObj;
    }
  });
  if (errors.certifications.length < 1) return {};
  return errors;
}

export const experienceFormStepValidation = Yup.object({
  experiences: Yup.array().of(
    Yup.object({
      title: Yup.string().required('This field is required'),
      workplace: Yup.string().required('This field is required'),
      location: Yup.object({
        city: Yup.string().required('This field is required'),
        country: Yup.string().required('This field is required')
      }),
      startDate: Yup.object({
        month: Yup.string().required('This field is required'),
        year: Yup.string().required('This field is required')
      }),
      isCurrentlyWorking: Yup.boolean(),
      endDate: Yup.object({
        month: Yup.string(),
        year: Yup.string()
      }).when('isCurrentlyWorking', {
        is: false,
        then: Yup.object({
          month: Yup.string().required('This field is required'),
          year: Yup.string().required('This field is required')
        }).required('You must enter the end date or check the \'I am currently working theme\' checkbox')
      })
    })
  )
});

export const clinicsFormStepValidation = Yup.object({
  clinics: Yup.array().of(
    Yup.object({
      name: Yup.string().required('This field is required').matches(/[a-z0-9]{2,50}/g, { message: 'Your clinic\'s name must be between 2 and 50 characters and it can only consist of letters and numbers' }),
      fees: Yup.number().min(1, `Your clinic's fees should be more than a 0, obviously.`).required('This field is required'),
      phone: Yup.object({
        mobile: Yup.string().required('This field is required').matches(/^01[0125][0-9]{8}$/g, { message: 'You must type a valid Egyptian number' }),
        landline: Yup.string().matches(/^0[1-9][0-9]{7,8}$/, { message: 'You must type a valid Egyptian landline number with the governorate code' })
      }),
      address: Yup.object({
        city: Yup.string().required('This field is required').matches(/[a-z]{2,100}/g, { message: 'You must enter a valid city/locality name' }),
        country: Yup.string(),
        governorate: Yup.string().required('This field is required').matches(/[a-z]{2,100}/g, { message: 'You must enter a valid governorate name' }),
        buildingNo: Yup.string().required('This field is required').matches(/^[0-9]{1,9}$/, { message: 'You must enter your clinic\'s valid building number' }),
        streetName: Yup.string().required('This field is required'),
        postalCode: Yup.string()
      })
    })
  )
});

export const imagesFormStepValidation = Yup.object({
  profilePicture: Yup.string().required('This field is required'),
  professionalLicense: Yup.string().required('This field is required')
})

export const prescriptionAndDiagnosisValidation = Yup.object({
  diagnosis: Yup.string().required('This field is required'),
  prescription: Yup.array().of(
    Yup.object({
      drugName: Yup.string().required('This field is required'),
      dosage: Yup.string().required('This field is required')
    })
  )
});