import { Typography, Grid, useTheme, Container } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import DropdownField from "../../Components/DropdownField/DropdownField";
import InputField from "../../Components/InputField/InputField";
import DoctorCard from "../../Components/DoctorCard/DoctorCard";
import specialistsPageBg from "../../Assets/Images/specialistsPageBg.png";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";

import specialties from "../../Helper/SpecialtiesOptions";
import governorates from "../../Helper/GovernoratesOptions";
import { months, getDays } from "../../Helper/DateOptions";

function Specialists({ handleNavbarStyle }) {
  const theme = useTheme();
  useEffect(() => {
    handleNavbarStyle({
      backgroundColor: theme.palette.highlight.main,
      position: "static",
      color: "white",
    });
  }, []);
  const [specializationList, setSpecializationList] = useState(specialties);
  const [governorateList, setGovernorate] = useState(governorates);
  const [monthList, setMonthList] = useState(months);
  const [dayList, setDayList] = useState(getDays());

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
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: "10px 10px 0 0",
                  py: 4,
                }}
              >
                <Typography variant="h3">Filters</Typography>
                <Typography variant="h6">Clear filters</Typography>
              </Grid>
              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    specialization: "",
                    location: "",
                    gender: "",
                    dateFrom: "",
                    dateTo: "",
                    priceFrom: "",
                    priceTo: "",
                  }}
                >
                  <Form style={{ width: "100%", marginTop: "50px" }}>
                    <Grid container justifyContent="center">
                      <Grid item xs={9} sx={{ mb: 5 }}>
                        <DropdownField
                          label="Specialisation"
                          options={specializationList}
                          value={specializationList[0]}
                          name="specialisation"
                          sx={{ height: "56px" }}
                          style={{
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                          }}
                        />
                      </Grid>
                      <Grid item xs={9} sx={{ mb: 5 }}>
                        <DropdownField
                          label="Governorate"
                          options={governorateList}
                          value={governorateList[0]}
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
                              options={monthList}
                              value={monthList[0].value}
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
                              options={dayList}
                              value={dayList[0]}
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
                              options={monthList}
                              value={monthList[0].value}
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
                              options={dayList}
                              value={dayList[0]}
                              name="dateFromDay"
                              sx={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                                p: 0,
                              }}
                            />
                          </Grid>
                        </Grid>
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
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <InputField
                              label="Up To"
                              name="priceTo"
                              placeholder="2000EGP"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={9}
                        sx={{
                          mb: 5,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CustomFormButton
                          variant="contained"
                          sx={{
                            fontSize: theme.typography.body1.fontSize,
                          }}
                        >
                          Search
                        </CustomFormButton>
                      </Grid>
                    </Grid>
                  </Form>
                </Formik>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} md={7} sm={5} xs={12} container rowSpacing={5}>
            <Grid item md={12} container justifyContent="space-between">
              <Grid item lg={3} md={5}>
                <DoctorCard />
              </Grid>
              <Grid item lg={3} md={5}>
                <DoctorCard />
              </Grid>
              <Grid item lg={3} md={5}>
                <DoctorCard />
              </Grid>
            </Grid>
            <Grid item md={12} container justifyContent="space-between">
              <Grid item lg={3} md={5}>
                <DoctorCard />
              </Grid>
              <Grid item lg={3} md={5}>
                <DoctorCard />
              </Grid>
              <Grid item lg={3} md={5}>
                <DoctorCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Specialists;
