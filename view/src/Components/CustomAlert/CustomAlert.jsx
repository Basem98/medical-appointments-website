const { styled, Alert } = require("@mui/material");

const CustomAlert = styled(Alert)(({theme}) => ({
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 10,
    '&.MuiAlert-standardError': {
        boxShadow: '0px 0px 10px 0px rgba(255,0,0,0.3)',
    }
    
}));

export default CustomAlert;