import { Button, Typography, useTheme } from "@mui/material";
import { FC } from "react";

const ConnectWalletButton: FC = () => {
  const theme = useTheme();
  return (
    <Button 
      variant="contained"
      sx={{
        p: 5,
        bgcolor: "background.default",
        color: "text.accent",
        borderRadius: 25,
        border: `1px solid ${theme.palette.text.accent}`,
        boxShadow: "none"
      }}
    >
      <Typography 
        variant="body-14-medium"
        textTransform="capitalize"
      >
        Connect your wallet to earn now!
      </Typography>
    </Button>
  );
}

export default ConnectWalletButton;