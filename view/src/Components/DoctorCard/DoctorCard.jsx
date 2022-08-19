import {
  Typography,
  Rating,
  useTheme,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import CustomFormButton from "../CustomFormButton/CustomFormButton";

const DoctorCard = ({ cardData }) => {
  const theme = useTheme();

  return (
    <Container
      disableGutters
      sx={{
        backgroundColor: "white",
        width: "350px",
        height:"650px",
        padding: "30px 20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
        position: 'relative'
      }}
    >
      {cardData ? (
        <>
          <img
            src={cardData.profilePicture}
            alt="doctorImage"
            style={{ borderRadius: "50%", width: '250px', height: '250px', objectFit: 'cover', boxShadow: theme.shadows[5]}}
          />
          <Container
            disableGutters
            sx={{
              my: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Rating value={parseFloat(cardData.rating)} precision={.5} size="large" readOnly />
          </Container>
          <Typography variant="h4" align="center">
            Dr. {cardData.firstName + ' ' + cardData.lastName}
          </Typography>
          <Typography variant="h6" align="center" sx={{ my: 2, p: 0 }}>
            Specialized in {cardData.specialization}
          </Typography>
          <Typography variant="body2" align="center" sx={{ my: 2, p: 0 }}>
            Appointment Fees: {cardData.clinics[0].fees}
          </Typography>
          <Link
            to={`/specialists/details/${cardData._id}`}
            style={{
              textDecoration: 'none'
            }}
          >
            <CustomFormButton
              variant="contained"
              sx={{
                padding: "10px 30px",
                fontSize: theme.typography.body1.fontSize,
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              More Info
            </CustomFormButton>
          </Link>
        </>
      ) : (
        <CircularProgress
          sx={{
            color: theme.palette.highlight.main,
            padding: "150px 0",
            size: 40,
          }}
        />
      )
      }
    </Container >
  );
};

export default DoctorCard;
