import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import TroubleshootingSvg from '../../Assets/Images/error.svg';
import verifyToken from '../../Network/Base/verifyToken';
import CustomFormButton from '../CustomFormButton/CustomFormButton';




const Feedback = ({ msg, isConfirmed, children }) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { token } = useParams();
  const [showMsg, setShowMsg] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  // Add a function that calls the /verify-old endpoint to regenerate a token and bind it to the button's onClick listener
  const isConfirmation = () => {
    if (/^\/verification\//.test(pathname)) {
      verifyToken(token)
        .then(res => {
          if (res.status === 200) {
            setShowMsg(true);
            setErrMsg('');
          }
        })
        .catch(err => {
          setShowMsg(true);
          setErrMsg("You email couldn't be verified. Please click here to recieve another mail.");
        })
    } else {
      setErrMsg('');
      setShowMsg(true);
    }
  };
  useEffect(isConfirmation, []);

  return (
    <Grid container justifyContent='space-evenly' alignItems='center' marginTop="50px" minHeight='100vh' sx={{ background: theme.palette.linearHeroBg.main }} >
      {
        showMsg ?
          <>
            <Grid item xs={10} sm={8} md={6} lg={4}>
              <img alt="Page not found" src={errMsg ? TroubleshootingSvg : children.type} style={{ width: '100%' }} />
            </Grid>
            <Grid container item xs={10} md={7} lg={5} justifyContent={{ md: 'center', lg: 'flex-start' }}>
              <Grid item xs={12}>
                <Typography variant='h2' sx={{ color: theme.palette.text.primary, textAlign: { xs: 'center', lg: 'left' } }}>
                  {
                    errMsg ? errMsg : msg
                  }
                </Typography>
              </Grid>
              {
                errMsg &&
                <Grid item xs={3} marginTop='25px'>
                  <CustomFormButton variant='contained' fullWidth onClick={isConfirmation}>Resend Mail</CustomFormButton>
                </Grid>
              }
            </Grid>
          </>
          : <CircularProgress />
      }
    </Grid>
  );
}


export default Feedback;