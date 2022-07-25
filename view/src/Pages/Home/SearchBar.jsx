import React from "react";
import DropdownField from "./../../Components/DropdownField/DropdownField";
import { useState } from "react";
import { Form, Formik } from "formik";
import CustomFormButton from "../../Components/CustomFormButton/CustomFormButton";
import { Grid } from "@mui/material";

const SearchBar = () => {
  const [specializations, setSpecializations] = useState([
    "Spec 1",
    "Spec 2",
    "Spec 3",
  ]);

  const [locations, setLocations] = useState(["Dahab", "Cario", "Qaluobya"]);

  const [dates, setDates] = useState(["1", "2", "3"]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "50px",
        }}
      >
        <Formik
          initialValues={{
            dropDown: "",
            location: "",
            date: "",
          }}
          onSubmit={() => console.log("Submitted")}
          align="center"
        >
          <Form
            style={{
              width: "60%",
              background: "white",
              padding: "30px",
              borderRadius: "16px",
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
                  options={specializations}
                  name="dropDown"
                  sx={{ height: "56px" }}
                  style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)" }}
                />
              </Grid>
              <Grid item md={3} xs={10}>
                <DropdownField
                  label="Location"
                  options={locations}
                  name="location"
                  sx={{ height: "56px" }}
                  style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)" }}
                />
              </Grid>

              <Grid item md={3} xs={10}>
                <DropdownField
                  label="Date"
                  options={dates}
                  name="date"
                  sx={{ height: "56px" }}
                  style={{
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
                  }}
                />
              </Grid>

              <Grid item md={3} xs={10}>
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
