import './App.css';
import { Grid } from '@mui/material';
import DoctorSignUpForm from './Components/DoctorSignUpForm/DoctorSignUpForm';


function App() {
  return (
    <Grid container height='100vh' justifyContent='center' alignItems='center' sx={{backgroundColor: 'rgba(249, 249, 249, 0.5)', marginY: -1}}>
      <Grid container item height='fit-content' xl={4} lg={6} md={6} sm={8} xs={12}>
        <DoctorSignUpForm />
      </Grid>
    </Grid>
  );
}

export default App;
