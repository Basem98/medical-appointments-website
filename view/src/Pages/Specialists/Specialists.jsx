import { Typography, Grid, useTheme, FormHelperText, Pagination } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import specialties from "../../Helper/SpecialtiesOptions";
import governorates from "../../Helper/GovernoratesOptions";
import { months, getDays } from "../../Helper/DateOptions";
import getAllDoctorsData from "../../Network/Doctors/getAllDoctors"
import { setSpecialists } from "../../Store/Features/Specialists/specialistsSlice";

import DropdownField from "../../Components/DropdownField/DropdownField";
import InputField from "../../Components/InputField/InputField";
import DoctorCard from "../../Components/DoctorCard/DoctorCard";
import specialistsPageBg from "../../Assets/Images/specialistsPageBg.png";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import PageNotFoundSvg from '../../Assets/Images/pagenotfound1.svg';

function Specialists() {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const filterInitialValues = {
    specialization: "",
    governorate: "",
    dateFromMonth: "",
    dateFromDay: "",
    dateToMonth: "",
    dateToDay: "",
    feesFrom: "",
    feesTo: "",
  };
  const [formInitialValues, setFormInitialValues] = useState({
    specialization: "",
    governorate: "",
    dateFromMonth: "",
    dateFromDay: "",
    dateToMonth: "",
    dateToDay: "",
    feesFrom: "",
    feesTo: "",
  })

  const [specialistsData, setSpecialistsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });

  useEffect(() => {
    if (location.state) {
      getAllSpecialists(location.state);
      setFormInitialValues({ ...formInitialValues, ...location.state })
    }
    else {
      getAllSpecialists();
    }
  }, []);

  useEffect(() => {
    if (location.state) {
      getAllSpecialists(location.state);
      setFormInitialValues({ ...formInitialValues, ...location.state })
    } else {
      getAllSpecialists();
    }
  }, [location.state])


  const getAllSpecialists = (values, newPageNumber = 0) => {
    let filteredValues = { ...values }
    for (let prop in filteredValues) {
      if (filteredValues[prop] === "") delete filteredValues[prop]
    }
    getAllDoctorsData({ ...filteredValues, pageNum: newPageNumber })
      .then((res) => {
        setServerResponse({ ...serverResponse, success: true });
        setSpecialistsData(res.data.doctors);
        setCurrentPage(newPageNumber);
        if(res.data.doctors.length === 6) {
          setTotalPages(totalPages + 1);
        }
        dispatch(setSpecialists({
          specialists: res.data.doctors
        }))

      })
      .catch((err) => {
        if (err.response.status === 404) {
          setServerResponse({ success: false, msg: err.response.data.error });
        }
      })
  }

  const validateForm = (values) => {
    const errors = {};
    if (values.dateFromDay && !values.dateFromMonth) {
      errors.dateFromMonth = "Required";
    }
    if (!values.dateFromDay && values.dateFromMonth) {
      errors.dateFromDay = "Required";
    }
    if (values.dateToDay && !values.dateToMonth) {
      errors.dateToMonth = "Required";
    }
    if (!values.dateToDay && values.dateToMonth) {
      errors.dateToDay = "Required";
    }
    if (values.dateFromMonth && values.dateToMonth) {
      if (values.dateFromMonth > values.dateToMonth) { errors.dateFromToMonth = "Dates should be chronological"; }
    }
    if (values.dateFromMonth && values.dateToMonth && values.dateFromDay && values.dateToDay) {
      if (values.dateFromMonth === values.dateToMonth && values.dateFromDay > values.dateToDay) {
        errors.dateFromToMonth = "Dates should be chronological";
      }
    }
    if (isNaN(values.feesFrom) || parseInt(values.feesFrom) < 0 || isNaN(values.feesTo) || parseInt(values.feesTo) < 0) {
      errors.feesFromTo = "ُEnter valid numbers";
    }
    if (parseInt(values.feesFrom) > 0 && parseInt(values.feesTo) > 0) {
      if (parseInt(values.feesFrom) >= parseInt(values.feesTo)) {
        errors.feesFromTo = "Enter a valid range";
      }
    }

    return errors;
  }
  return (
    <>
      <div
        style={{
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primaryBg.main,
          padding: "0px 70px",
        }}
      >
        <Grid
          container
          justifyContent="space-around"
          sx={{ mb: 3, pt: 2 }}
          style={{
            backgroundColor: "white",
            borderRadius: "0 0 10px 10px",
          }}
        >
          <Grid
            item
            xs={8}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.h2.fontSize,
                textTransform: "capitalize",
              }}
            >
              Choose from a wide selection of the finest doctors and specialists
            </Typography>
          </Grid>
          <Grid item xs={8} md={2}>
            <img
              src={specialistsPageBg}
              alt="drImage"
              style={{ height: "283px" }}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={{ xs: 'center', md: "space-between" }} sx={{ py: 11 }}>
          {/* filter */}
          <Grid
            item
            lg={3}
            md={5}
            sm={9}
            xs={12}
          // container
          >
            <Grid
              container
              style={{
                display: "felx",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <Grid
                xs={12}
                item
                sx={{
                  backgroundColor: theme.palette.secondaryBg.main,
                  height: "fit-content",
                  borderRadius: "10px 10px 0 0",
                  py: 2,
                }}
              >
                <Typography variant="h3" align="center">Filters</Typography>
              </Grid>
              <Grid item xs={12}>
                <Formik
                  initialValues={formInitialValues}
                  validate={validateForm}
                  onSubmit={getAllSpecialists}
                  onReset={getAllSpecialists}
                  enableReinitialize
                >
                  {(formik) =>
                  (<Form style={{ width: "100%", marginTop: "50px" }}>
                    <Grid container justifyContent="center">
                      <Grid item xs={9} sx={{ mb: 5 }}>
                        <DropdownField
                          label="Specialization"
                          options={specialties}
                          name="specialization"
                          sx={{ height: "56px" }}
                          style={{
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                          }}
                        />
                      </Grid>
                      <Grid item xs={9} sx={{ mb: 5 }}>
                        <DropdownField
                          label="Governorate"
                          options={governorates}
                          name="governorate"
                          sx={{ height: "56px" }}
                          style={{
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={9}
                        sx={{
                          backgroundColor: theme.palette.primaryBg.main,
                          borderRadius: "10px",
                          mb: 3,
                          p: 2,
                        }}
                        container
                      >
                        <Grid item xs={12} sx={{ mb: 1 }}>
                          <Typography variant="h6" sx={{ p: 0 }}>
                            Choose your date
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ mb: 1 }}
                          container
                          justifyContent="space-between"
                        >
                          <Grid item xs={12} marginBottom='15px'>
                            <Typography variant="h6">From</Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <DropdownField
                              label="Month"
                              options={months}
                              name="dateFromMonth"
                              sx={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                                padding: 0,
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <DropdownField
                              label="Day"
                              options={getDays()}
                              name="dateFromDay"
                              sx={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                                p: 0,
                              }}
                            />
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sx={{ mb: 1 }}
                          container
                          justifyContent="space-between"
                        >
                          <Grid item xs={12} marginBottom='15px'>
                            <Typography variant="h6">To</Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <DropdownField
                              label="Month"
                              options={months}
                              name="dateToMonth"
                              sx={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                                padding: 0,
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <DropdownField
                              label="Day"
                              options={getDays()}
                              name="dateToDay"
                              sx={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                                p: 0,
                              }}
                            />
                          </Grid>
                        </Grid>
                        {formik.errors.dateFromToMonth &&
                          <Grid item xs={12} sx={{ mb: 1 }}>
                            <FormHelperText sx={{ color: "red" }}>
                              {formik.errors.dateFromToMonth}
                            </FormHelperText>
                          </Grid>
                        }
                      </Grid>
                      <Grid
                        item
                        xs={9}
                        sx={{
                          backgroundColor: theme.palette.primaryBg.main,
                          borderRadius: "10px",
                          // mt: 3,
                          mb: 5,
                          p: 2,
                        }}
                        container
                      >
                        <Grid item xs={12} sx={{ mb: 5 }}>
                          <Typography variant="h6" sx={{ p: 0 }}>
                            Fees Range
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          container
                          justifyContent="space-between"
                        >
                          <Grid item xs={5}>
                            {/* <Typography variant="h6">From</Typography> */}
                            <InputField
                              label="From"
                              name="feesFrom"
                              placeholder="0EGP"
                              sx={{ padding: 0 }}
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <InputField
                              label="Up To"
                              name="feesTo"
                              placeholder="2000EGP"
                              sx={{ padding: 0 }}
                            />
                          </Grid>
                        </Grid>
                        {formik.errors.feesFromTo &&
                          <Grid xs={12}>
                            <FormHelperText sx={{ color: "red" }}>
                              {formik.errors.feesFromTo}
                            </FormHelperText>
                          </Grid>
                        }
                      </Grid>
                      <Grid
                        item
                        xs={9}
                        sx={{
                          mb: 5,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <CustomFormButton
                          variant="outlind"
                          sx={{
                            fontSize: theme.typography.body1.fontSize,
                          }}
                          onClick={() => { formik.resetForm({ values: filterInitialValues }); setFormInitialValues({...filterInitialValues}) }}
                        >
                          Clear
                        </CustomFormButton>
                        <CustomFormButton
                          variant="contained"
                          sx={{
                            fontSize: theme.typography.body1.fontSize,
                          }}
                          type={'submit'}
                        >
                          Search
                        </CustomFormButton>
                      </Grid>
                    </Grid>
                  </Form>)}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} md={6} sm={5} xs={12} container >
            {!specialistsData.length ?
              (<>
                <Grid item md={12} container>
                  <Grid item lg={4} md={5}>
                    <DoctorCard cardData={specialistsData[0]} />
                  </Grid>
                  <Grid item lg={4} md={5}>
                    <DoctorCard cardData={specialistsData[1]} />
                  </Grid>
                  <Grid item lg={4} md={5}>
                    <DoctorCard cardData={specialistsData[2]} />
                  </Grid>
                  {/* </Grid>
                <Grid item md={12} container justifyContent="space-between"> */}
                  <Grid item lg={4} md={5}>
                    <DoctorCard cardData={specialistsData[3]} />
                  </Grid>
                  <Grid item lg={4} md={5}>
                    <DoctorCard cardData={specialistsData[4]} />
                  </Grid>
                  <Grid item lg={4} md={5}>
                    <DoctorCard cardData={specialistsData[5]} />
                  </Grid>
                </Grid>
              </>) :
              (
                <>
                  <Grid item xs={12} container justifyContent='center' marginTop={{ xs: '50px', md: '0' }}>
                    {!serverResponse.success && serverResponse.msg ?
                      <Grid container item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                        <CustomAlert severity='error' sx={{ alignSelf: 'flex-start' }} onClose={() => {
                          setServerResponse({ success: false, msg: '' });
                        }}>
                          No doctors available for the selected filters, select different options and try again...
                        </CustomAlert>
                        <Grid container item xs={12} md={10} lg={7}>
                          <img alt='Page not found' src={PageNotFoundSvg} />
                        </Grid>
                      </Grid>
                      : <Grid container item justifyContent={{ xs: 'center', md: 'space-between' }}>
                        {
                          specialistsData.map((cardData) => (
                            <Grid item key={cardData._id} marginBottom='50px' marginRight={{ xs: '0', md: '10px' }}>
                              <DoctorCard cardData={cardData} />
                            </Grid>
                          ))
                        }
                      </Grid>
                    }
                    <Pagination sx={{ alignSelf: 'center' }} color="highlight" count={totalPages} onChange={(event, pageNumber) => { getAllSpecialists(formInitialValues, pageNumber - 1) }} />
                  </Grid>

                </>
              )
            }
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Specialists;
