import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import InputField from "../InputField/InputField";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const PersonalFormStep = ({ getStepKeys }) => {
  const [passwordVisibility, togglePasswordVisibility] = useState('password');
  const [confirmPasswordVisibility, toggleConfirmPasswordVisibility] = useState('password');
  useEffect(() => {
    getStepKeys(['firstName', 'lastName', 'phoneNumber', 'email', 'password', 'passwordConfirmation']);
  });

  return (
    <Grid container item justifyContent='center'>
      <Grid item md={5} xs={10} marginTop='25px'>
        <InputField placeholder="Mohamed" label="First Name" name="firstName" type="text"><PersonRoundedIcon /></InputField>
      </Grid>
      <Grid item md={5} xs={10} marginTop='25px' marginLeft='1px'>
        <InputField placeholder="Ahmed" label="Last Name" name="lastName" type="text"><PersonRoundedIcon /></InputField>
      </Grid>
      <Grid item xs={10} marginTop='25px'>
        <InputField placeholder="010xxxxxxxx" label="Phone Number" name="phoneNumber" type="text"><PhoneRoundedIcon /></InputField>
      </Grid>
      <Grid item xs={10} marginTop='25px'>
        <InputField placeholder="example@organization.domain" label="Email Address" name="email" type="text"><EmailRoundedIcon /></InputField>
      </Grid>
      <Grid item xs={10} marginTop='25px'>
        <InputField placeholder="P@ssw0rd" label="Password" name="password" type={passwordVisibility}>
          <VpnKeyRoundedIcon />
          {
            passwordVisibility === 'password' ?
              <VisibilityRoundedIcon cursor='pointer' onClick={() => togglePasswordVisibility('text')} />
              : <VisibilityOffRoundedIcon cursor='pointer' onClick={() => togglePasswordVisibility('password')} />
          }
        </InputField>
      </Grid>
      <Grid item xs={10} marginTop='25px'>
        <InputField placeholder="P@ssw0rd" label="Confirm Password" name="passwordConfirmation" type={confirmPasswordVisibility}>
          <VpnKeyRoundedIcon />
          {
            confirmPasswordVisibility === 'password' ?
              <VisibilityRoundedIcon cursor='pointer' onClick={() => toggleConfirmPasswordVisibility('text')} />
              : <VisibilityOffRoundedIcon cursor='pointer' onClick={() => toggleConfirmPasswordVisibility('password')} />
          }
        </InputField>
      </Grid>
    </Grid>
  );
}

export default PersonalFormStep;