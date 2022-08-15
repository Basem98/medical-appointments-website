import {
  Typography,
  Grid,
  useTheme,
  Container,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import drImage from "../../Assets/Images/pic-black-white.jpg";
import CustomFormButton from "../CustomFormButton/CustomFormButton";

const DoctorCard = ({ cardData }) => {
  console.log(cardData)
  const theme = useTheme();
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
              justifyContent: "space-between",
            }}
          >
            <StarIcon sx={{ color: theme.palette.ratingGold.main }} />
            <StarIcon sx={{ color: theme.palette.ratingGold.main }} />
            <StarIcon sx={{ color: theme.palette.ratingGold.main }} />
            <StarIcon sx={{ color: theme.palette.ratingGold.main }} />
            <StarHalfIcon sx={{ color: theme.palette.ratingGold.main }} />
          </Container>
          <Typography variant="h4" align="center">
            Dr. {cardData.firstName + ' ' + cardData.lastName}
          </Typography>
          <Typography variant="h6" align="center" sx={{ my: 2, p: 0 }}>
            Specialized in {cardData.specialization}
          </Typography>
          <CustomFormButton
            variant="contained"
            sx={{
              padding: "10px 30px",
              fontSize: theme.typography.body1.fontSize,
            }}
            onClick={() => { }}
          >
            More Info
          </CustomFormButton>
        </>
      ) : (
        <CircularProgress
          sx={{
            color: theme.palette.highlight.main,
            padding: "150px 0",
            size: 40,
          }}
        />
      )}
    </Container>
  );
};

export default DoctorCard;
