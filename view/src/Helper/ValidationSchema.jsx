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
})
