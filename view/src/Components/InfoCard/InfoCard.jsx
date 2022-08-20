import { Card } from "@mui/material";
import React from "react";

const InfoCard = (props) => {
    return (
        <>
            <Card
                sx={{
                    background: 'linear-gradient(180deg, #21D0C3 0%, rgba(166, 224, 214, 0.25) 22.4%)',
                    padding: '20px',
                    marginTop: '10px'
                }}
            >
                {props.children}
            </Card>
        </>
    );
}

export default InfoCard;