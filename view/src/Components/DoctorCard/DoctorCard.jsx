import {
  Typography,
  Rating,
  useTheme,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomFormButton from "../CustomFormButton/CustomFormButton";

const DoctorCard = ({ cardData }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Container
      disableGutters
      sx={{
        backgroundColor: "white",
        // maxWidth: "300px",
        padding: "30px 20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, .25)",
      }}
    >
      {cardData ? (
        <>
          <img
            src={cardData.profilePicture}
            alt="doctorImage"
            style={{ borderRadius: "50%", maxWidth: "80%" }}
          />
          <Container
            disableGutters
            sx={{
              my: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Rating defaultValue={cardData.rating} precision={.5} size="large" readOnly />
          </Container>
          <Typography variant="h4" align="center">
            Dr. {cardData.firstName + ' ' + cardData.lastName}
          </Typography>
          <Typography variant="h6" align="center" sx={{ my: 2, p: 0 }}>
            Specialized in {cardData.specialization}
          </Typography>
          <Link
            to={'/specialists/details'}
            state={{ doctorData: cardData }}
          >
            <CustomFormButton
              variant="contained"
              sx={{
                padding: "10px 30px",
                fontSize: theme.typography.body1.fontSize,
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
