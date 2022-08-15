import {
  Grid, Typography, useMediaQuery,
  List, ListItemIcon, ListItemText,
  MenuItem, IconButton, FormHelperText, Menu, MenuList
} from '@mui/material';
import { useTheme } from '@mui/material';
import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import CustomCalender from '../CustomCalendar/CustomCalender';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CustomFormButton from '../CustomFormButton/CustomFormButton';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import * as Yup from 'yup';
import { borderRadius } from '@mui/system';


function BookingForm() {
  const theme = useTheme()
  const [doctor, setDoctor] = useState("Hanafy")
  // const [payRadio, setPayRadio] = useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const [time, setTime] = useState(["6 P.M", "6:15 P.M", "6:30 P.M", "6:45 P.M", "7:00 P.M", "7:15 P.M", "7:15 P.M", "7:15 P.M", "7:15 P.M", "7:15 P.M", "7:15 P.M", "7:15 P.M"])
  const initialValues = {
    date: "",
    selctedTime: "",
    payWithCash: true
  }
  const validationSchema = Yup.object({
    date: Yup.string().required("To book, you must choose a date"),
    payWithCash: Yup.boolean().required("Please choose payment method"),
    selctedTime: Yup.string().required("Please select booking time")
  })

  const onSubmit = (values) => {
    console.log(values);
  }
  return (
    <>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {formik => (
          <Form>
            <Grid
              container
              justifyContent='center'
              display='flex'
              flexDirection={'row'}>
              <Grid item textAlign={'center'} xs={12}>
                <Typography
                  style={{
                    color: theme.palette.text.primary,
                    textAlign: 'center'
                    , ...theme.typography.modalLargeText
                  }}
                >
                  Booking with Dr.{doctor}
                </Typography>
              </Grid>
              <Grid container item textAlgin={'center'} xs={12} md={6} marginY={'25px'}>
                <Grid item textAlgin={'center'} xs={12} marginY={'25px'}>
                  <Typography
                    style={{
                      color: theme.palette.text.primary,
                      textAlign: 'center'
                      , ...theme.typography.modalSmallText
                    }}
                  >
                    Available dates
                  </Typography>
                </Grid>
                <Grid container item textAlgin={'center'} xs={12} marginY={'25px'}
                  disply={'flex'}
                  justifyContent={'center'}>
                  <CustomCalender name={'date'} setCalVal={(val) => { formik.setFieldValue("date", val) }} />
                </Grid>
                <Grid container item textAlgin={'center'} xs={12} marginY={'25px'}
                  disply={'flex'}
                  justifyContent={'center'}>
                  {formik.errors['date'] && <FormHelperText error>{formik.errors['date']}</FormHelperText>}
                </Grid>
              </Grid>
              <Grid container item textAlgin={'center'} xs={12} md={6} marginY={'25px'}>
                <Grid item textAlgin={'center'} xs={12} marginY={'25px'}>
                  <Typography
                    style={{
                      color: theme.palette.text.primary,
                      textAlign: 'center'
                      , ...theme.typography.modalSmallText
                    }}
                  >
                    Available time
                  </Typography>
                </Grid>
                <Grid container item textAlgin={'center'} xs={12} marginY={'25px'}
                  disply={'flex'}
                  justifyContent={'center'}>
                  <Grid item sx={{
                    width: 200, maxWidth: '100%', height: "100%",
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                  }}>

                    <MenuList open={true} sx={{
                      maxHeight: 350, overflow: 'auto',
                      paddingY: 0,
                      "&& .Mui-selected": {
                        backgroundColor: theme.palette.highlight.main,
                        color: "white",
                        borderRadius: 5,
                        ":hover": {
                          backgroundColor: theme.palette.highlight.main,
                          color: "white",
                          borderRadius: 5
                        }
                      },
                      "&& :hover": {
                        backgroundColor: theme.palette.highlight.main,
                        color: "white",
                        borderRadius: 5
                      }
                      
                    }}>
                      {
                        time.map((tim, index) => (
                          <MenuItem name={'selctedTime'}
                            onClick={() => {
                              formik.setFieldValue('selctedTime', tim);
                              setSelectedIndex(index)
                            }}
                            selected={index === selectedIndex}

                          >
                            <ListItemIcon>
                              <AccessTimeIcon sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText>{tim}</ListItemText>
                          </MenuItem>))
                      }
                    </MenuList>

                  </Grid>

                  {/* {formik.errors["selctedTime"] && <FormHelperText>{formik.errors["selctedTime"]}</FormHelperText>} */}
                </Grid>
                <Grid container item textAlgin={'center'} xs={12} marginY={'25px'}
                  disply={'flex'}
                  justifyContent={'center'}>
                  {formik.errors['date'] && <FormHelperText error>{formik.errors['date']}</FormHelperText>}
                </Grid>
              </Grid>
              <Grid container item textAlgin={'center'} marginY={'25px'}
                disply={'flex'}
                justifyContent={'space-between'}>
                <Grid container item textAlgin={'center'} xs={6} marginY={'25px'}
                  alignContent={'center'}
                  justifyContent={'center'}>
                  <Typography
                    style={{
                      color: theme.palette.text.primary,
                      textAlign: 'center'
                      , ...theme.typography.modalSmallText
                    }}
                  >
                    Payment method
                  </Typography>
                </Grid>
                <Grid container item textAlgin={'center'} xs={6} marginY={'25px'} justifyContent={'center'}>
                  <Grid item textAlgin={'center'} xs={12} justifyContent={'center'} marginX={'30px'}>
                    <IconButton onClick={() => formik.setFieldValue('payWithCash', true)}>
                      {!formik.values['payWithCash'] && <RadioButtonUncheckedIcon style={{ color: theme.palette.highlight.main }} />}
                      {formik.values['payWithCash'] && <RadioButtonCheckedIcon style={{ color: theme.palette.highlight.main }} />}

                      <Grid item textAlgin={'center'} xs={12} justifyContent={'center'} marginX={'10px'}>
                        <Typography
                          style={{
                            color: theme.palette.text.primary,
                            textAlign: 'center'
                            , ...theme.typography.body1,
                          }}
                        >
                          Cash
                        </Typography>
                      </Grid>
                    </IconButton>
                  </Grid>
                  <Grid item textAlgin={'center'} xs={12} justifyContent={'center'} marginX={'30px'}>
                    <IconButton onClick={() => formik.setFieldValue('payWithCash', false)} >
                      {formik.values['payWithCash'] && <RadioButtonUncheckedIcon style={{ color: theme.palette.highlight.main }} />}
                      {!formik.values['payWithCash'] && <RadioButtonCheckedIcon style={{ color: theme.palette.highlight.main }} />}
                      <Grid item textAlgin={'center'} xs={12} justifyContent={'center'} marginX={'10px'}>
                        <Typography
                          style={{
                            color: theme.palette.text.primary,
                            textAlign: 'center'
                            , ...theme.typography.body1,

                          }}
                        >
                          Fawry
                        </Typography>
                      </Grid>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <CustomFormButton
                variant='contained' style={{ ...theme.typography.largerButtonText }}
                type='submit'
                disabled={!formik.isValid}
              >
                Book now
              </CustomFormButton>
            </Grid>
          </Form>
        )}
      </Formik>



    </>
  )
}

export default BookingForm