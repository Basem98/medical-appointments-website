import { Grid, InputLabel, IconButton, useTheme } from '@mui/material';
import { AccountCircleRounded, LocalHospitalRounded } from '@mui/icons-material';


const RoleToggler = ({ role, setRole }) => {
  const theme = useTheme();
  return (<>
    <Grid item xs={4} justifyContent='center'>
      <InputLabel
        htmlFor='userRadio'
        sx={{ whiteSpace: 'break-spaces', verticalAlign: 'top', textAlign: 'center', fontSize: '16px', marginY: '10px' }}>
        <p style={{ margin: 0 }}>As</p> a user</InputLabel>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton color="highlight" component='label'
          sx={{ borderBottom: role === 'User' ? `1px solid ${theme.palette.highlight.main}` : 'none' }}
          onClick={() => setRole('User')}>
          <input type="radio" name="role" value="User" id="userRadio" style={{ display: 'none' }} />
          <AccountCircleRounded
            sx={{ fontSize: 70, color: role === 'User' ? theme.palette.highlight.main : theme.palette.text.primary, marginX: 'auto' }} />
        </IconButton>
      </div>
    </Grid>
    <Grid item xs={4} justifyContent='center'>
      <InputLabel
        htmlFor='doctorRadio'
        sx={{ whiteSpace: 'break-spaces', verticalAlign: 'top', textAlign: 'center', fontSize: '16px', marginY: '10px' }}>
        <p style={{ margin: 0 }}>As</p> a doctor</InputLabel>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton color="highlight"
          component='label' sx={{ borderBottom: role === 'Doctor' ? `1px solid ${theme.palette.highlight.main}` : 'none' }}
          onClick={() => setRole('Doctor')}>
          <input type="radio" name="role" value="Doctor" id="doctorRadio" style={{ display: 'none' }} />
          <LocalHospitalRounded
            sx={{ fontSize: 70, color: role === 'Doctor' ? theme.palette.highlight.main : theme.palette.text.primary, marginX: 'auto' }} />
        </IconButton>
      </div>
    </Grid>
  </>);
}

export default RoleToggler;