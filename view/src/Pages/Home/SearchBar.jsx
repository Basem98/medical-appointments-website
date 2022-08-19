import React from "react";
import DropdownField from "./../../Components/DropdownField/DropdownField";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from "formik";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import { Grid, useTheme } from "@mui/material";
import specialties from '../../Helper/SpecialtiesOptions';
import governorates from "../../Helper/GovernoratesOptions";
import { months, getDays } from './../../Helper/DateOptions';

const SearchBar = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  const routeToSpecialistsPage = (values) => {
    navigate("/specialists", {
      state: { ...values }
    })
  }
  const validateForm = (values) => {
    const errors = {};
    if (values.dateFromDay && values.dateFromMonth === '') {
      console.log(values.dateFromMonth)
      errors.dateFromMonth = "Required";
    }
    if (!values.dateFromDay && values.dateFromMonth) {
      errors.dateFromDay = "Required";
    }

    return errors;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "50px"
        }}
      >
        <Formik
          initialValues={{
            specialization: "",
            governorate: "",
            dateFromMonth: "",
            dateFromDay: "",
          }}
          onSubmit={routeToSpecialistsPage}
          validate={validateForm}
          align="center"
        >
          <Form
            style={{
              width: "100%",
              background: "white",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: theme.shadows[3]
            }}
            align="center"
          >
            <Grid
              container
              columnSpacing={{ xs: 2 }}
              rowSpacing={{ xs: 4 }}
              justifyContent="center"
            >
              <Grid item md={3} xs={10}>
                <DropdownField
                  label={"Specialization"}
                  options={specialties}
                  name="specialization"
                  sx={{
                    height: "56px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                    padding: 0,
                  }}
                />
              </Grid>
              <Grid item md={3} xs={10}>
                <DropdownField
                  label="Governorate"
                  options={governorates}
                  name="governorate"
                  sx={{
                    height: "56px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                    padding: 0,
                  }}
                />
              </Grid>

              <Grid item md={4} xs={10} container justifyContent="space-between">
                <Grid item md={7} xs={7}>
                  <DropdownField
                    label="Month"
                    options={months}
                    name="dateFromMonth"
                    sx={{
                      height: "56px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                      padding: 0,
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={4}>
                  <DropdownField
                    label="Day"
                    options={getDays()}
                    name="dateFromDay"
                    sx={{
                      height: "56px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                      padding: 0,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item md={2} xs={10}>
                <CustomFormButton
                  variant="contained"
                  type="submit"
                  sx={{ height: "56px", fontSize: "20px", fontWeight: "bold" }}
                  fullWidth
                  style={{
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                  }}
                >
                  Search
                </CustomFormButton>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default SearchBar;
