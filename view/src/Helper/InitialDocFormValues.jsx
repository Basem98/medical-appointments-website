const initialDoctorFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  phoneNumber: '',
  specialization: '',
  experiences: [{
    title: '',
    workplace: '',
    location: {
      city: '',
      country: ''
    },
    /* Transfer this into a Date object */
    startDate: {
      month: '',
      year: ''
    },
    /* Transfer this into a Date object */
    endDate: {
      month: '',
      year: ''
    },
    isCurrentlyWorking: true
  }],
  education: [{
    degree: '',
    granter: '',
    /* Transfer this into a Date object */
    issueDate: {
      month: '',
      year: ''
    }
  }],
  certifications: [{
    title: '',
    granter: '',
    /* Transfer this into a Date object */
    issueDate: {
      month: '',
      year: ''
    }
  }],
  clinics: [{
    name: '',
    fees: '',
    address: {
      city: '',
      country: 'Egypt',
      governorate: '',
      buildingNo: '',
      streetName: '',
      postalCode: ''
    },
    geoLocation: {
      longitude: '',
      latitude: ''
    },
    phone: {
      mobile: '',
      landline: ''
    }
  }],
  profilePicture: '',
  professionalLicense: ''
};

export default initialDoctorFormValues;
