import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import TroubleshootingSvg from '../../Assets/Images/error.svg';
import resendVerification from '../../Network/Base/resendVerification';
import verifyToken from '../../Network/Base/verifyToken';
import CustomAlert from '../CustomAlert/CustomAlert';
import CustomFormButton from '../CustomFormButton/CustomFormButton';




const Feedback = ({ msg, isConfirmed, children }) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { token, userId, role} = useParams();
  const [showMsg, setShowMsg] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [serverResponse, setServerResponse] = useState({ success: false, msg: '' });
  const [isResendClicked, setIsResendClicked] = useState(false);
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
          setErrMsg("Your email couldn't be verified. Please click here to recieve another mail.");
        })
    } else {
      setErrMsg('');
      setShowMsg(true);
    }
  };
  useEffect(isConfirmation, []);

  const resendVerificationEmail = () => {
    setIsResendClicked(true);
    resendVerification(userId, role)
      .then(res => {
        if (res.status === 200) {
          setIsResendClicked(false);
          setServerResponse({ success: true, msg: 'An email has been sent to your email to verify it.' });
        }
      })
      .catch(err => {
        setIsResendClicked(false);
        setServerResponse({ success: false, msg: 'Could not send a verification email. Please, try again later, or contact us if the problem persists.' });;
      })
  }

  return (
    <Grid container justifyContent='space-evenly' alignItems='center' paddingBottom='100px' marginTop="50px" minHeight='100vh' sx={{ background: theme.palette.linearHeroBg.main }} >
      {
        showMsg ?
          <>
            <Grid item xs={10} sm={8} md={6} lg={4}>
              <img alt="Page not found" src={errMsg ? TroubleshootingSvg : children.type} style={{ width: '100%' }} />
            </Grid>
            <Grid container item xs={10} md={7} lg={5} justifyContent={{ xs: 'center', lg: 'flex-start' }}>
              <Grid item xs={12}>
                {
                  !isResendClicked && serverResponse.success ?
                    <CustomAlert severity='success' onClose={() => setServerResponse({ success: false, msg: '' })}>{serverResponse.msg}</CustomAlert>
                    : serverResponse.msg && <CustomAlert severity='error' onClose={() => setServerResponse({ success: false, msg: '' })}>{serverResponse.msg}</CustomAlert>
                }
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h2' sx={{ color: theme.palette.text.primary, textAlign: { xs: 'center', lg: 'left' } }}>
                  {
                    errMsg ? errMsg : msg
                  }
                </Typography>
              </Grid>
              {
                errMsg &&
                <Grid container item xs={12} justifyContent={{ xs: 'center', lg: 'space-between' }}>
                  <Grid item xs={3} marginTop='25px'>
                    <CustomFormButton variant='contained' fullWidth onClick={resendVerificationEmail}>Resend Mail</CustomFormButton>
                  </Grid>
                  {
                    isResendClicked &&
                    <Grid marginLeft='5px' display='flex' alignItems='flex-end'>
                      <CircularProgress color='highlight' />
                    </Grid>
                  }
                </Grid>
              }
            </Grid>
          </>
          : <CircularProgress color='highlight' />
      }
    </Grid>
  );
}


export default Feedback;