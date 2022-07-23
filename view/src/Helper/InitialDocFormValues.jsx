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
    startDate: {
      month: '',
      year: ''
    },
    endDate: {
      month: '',
      year: ''
    },
    isCurrentlyWorking: true
  }],
  education: [{
    degree: '',
    granter: '',
    issueDate: {
      month: '',
      year: ''
    }
  }],
  certifications: [{
    title: '',
    granter: '',
    issueDate: {
      month: '',
      year: ''
    }
  }],
  clinics: [{
    name: '',
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
