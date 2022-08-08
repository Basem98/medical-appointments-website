import { Typography, Grid, useTheme, FormHelperText } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DropdownField from "../../Components/DropdownField/DropdownField";
import InputField from "../../Components/InputField/InputField";
import DoctorCard from "../../Components/DoctorCard/DoctorCard";
import specialistsPageBg from "../../Assets/Images/specialistsPageBg.png";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";

import specialties from "../../Helper/SpecialtiesOptions";
import governorates from "../../Helper/GovernoratesOptions";
import { months, getDays } from "../../Helper/DateOptions";
import getAllDoctorsData from "../../Network/Doctors/getAllDoctors"

function Specialists({ handleNavbarStyle }) {
  const theme = useTheme();
  const location = useLocation();
  const [formInitialValues, setFormInitialValues] = useState({
    specialization: "",
    governorate: "",
    dateFromMonth: "",
    dateFromDay: "",
    dateToMonth: "",
    dateToDay: "",
    priceFrom: "",
    priceTo: "",
  })
  useEffect(() => {
    handleNavbarStyle({
      backgroundColor: theme.palette.highlight.main,
      position: "static",
      color: "white",
    });
    if (location.state) {
      console.log("locaition: ", location);
      getAllSpecialists(location.state);
      setFormInitialValues({ ...formInitialValues, ...location.state })
    }
    else {
      getAllSpecialists()
    }
  }, []);
  const [specialistsData, setSpecialistsData] = useState([]);

  const getAllSpecialists = (values) => {
    console.log('here in getAllSpecialists')
    let filteredValues = { ...values }
    for (let prop in filteredValues) {
      if (filteredValues[prop] === "") delete filteredValues[prop]
    }
    getAllDoctorsData(filteredValues)
      .then((res) => {
        setSpecialistsData(res.data.doctors);
      })
      .catch((err) => { console.log(err) })
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
    if (isNaN(values.priceFrom) || parseInt(values.priceFrom) < 0 || isNaN(values.priceTo) || parseInt(values.priceTo) < 0) {
      errors.priceFromTo = "ُEnter valid numbers";
    }
    if (parseInt(values.priceFrom) > 0 && parseInt(values.priceTo) > 0) {
      if (parseInt(values.priceFrom) >= parseInt(values.priceTo)) {
        errors.priceFromTo = "Enter a valid range";
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
        <Grid container justifyContent="space-between" sx={{ py: 11 }}>
          {/* filter */}
          <Grid
            item
            lg={3}
            md={4}
            sm={5}
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
                  // alignItems: "center",
                  borderRadius: "10px 10px 0 0",
                  py: 4,
                }}
              >
                <Typography variant="h3" align="center">Filters</Typography>
              </Grid>
              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    ...formInitialValues
                  }}
                  validate={validateForm}
                  onSubmit={getAllSpecialists}
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
                      // rowSpacing={4}
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
                          rowSpacing={2}
                        >
                          <Grid item xs={12}>
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
                          rowSpacing={2}
                        >
                          <Grid item xs={12}>
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
                      // rowSpacing={4}
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
                              name="priceFrom"
                              placeholder="0EGP"
                              sx={{ padding: 0 }}
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <InputField
                              label="Up To"
                              name="priceTo"
                              placeholder="2000EGP"
                              sx={{ padding: 0 }}
                            />
                          </Grid>
                        </Grid>
                        {formik.errors.priceFromTo &&
                          <Grid xs={12}>
                            <FormHelperText sx={{ color: "red" }}>
                              {formik.errors.priceFromTo}
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
                          onClick={() => { formik.resetForm() }}
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
          <Grid item lg={8} md={7} sm={5} xs={12} container rowSpacing={5} >
            {!specialistsData.length ?
              (<>
                <Grid item md={12} container rowSpaceing={3} columnSpacing={{ xs: 7 }} >
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
                <Grid item md={12} container rowSpacing={3} columnSpacing={{ xs: 7 }}>
                  {specialistsData.map((cardData) => (
                    <Grid item lg={4} md={5} key={cardData._id}>
                      <DoctorCard cardData={cardData} />
                    </Grid>
                  ))}
                </Grid>
              )
            }

          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Specialists;
