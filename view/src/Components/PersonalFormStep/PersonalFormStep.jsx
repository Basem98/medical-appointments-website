import { Grid } from '@mui/material';
import InputField from "../InputField/InputField";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { useState } from 'react';

const PersonalFormStep = () => {
  const [passwordVisibility, togglePasswordVisibility] = useState(false);

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
        <InputField placeholder="P@ssw0rd" label="Password" name="password" type={passwordVisibility ? "text" : "password"}>
          <VpnKeyRoundedIcon />
          {
            passwordVisibility ?
              <VisibilityOffRoundedIcon cursor='pointer' onClick={() => togglePasswordVisibility(!passwordVisibility)} />
              : <VisibilityRoundedIcon cursor='pointer' onClick={() => togglePasswordVisibility(!passwordVisibility)} />
          }
        </InputField>
      </Grid>
      <Grid item xs={10} marginTop='25px'>
        <InputField placeholder="P@ssw0rd" label="Confirm Password" name="passwordConfirmation" type={passwordVisibility ? "text" : "password"}>
          <VpnKeyRoundedIcon />
          {
            passwordVisibility ?
              <VisibilityOffRoundedIcon cursor='pointer' onClick={() => togglePasswordVisibility(!passwordVisibility)} />
              : <VisibilityRoundedIcon cursor='pointer' onClick={() => togglePasswordVisibility(!passwordVisibility)} />
          }
        </InputField>
      </Grid>
    </Grid>
  );
}

export default PersonalFormStep;