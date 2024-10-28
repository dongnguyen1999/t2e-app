import { Button, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import BloodBagImage from "./BloodBagImage";
import BloodProgressBar from "./BloodProgressBar";

const BloodCard: FC = () => {
  const theme = useTheme();
  return (
    <Stack
      direction="column"
      p={4}
      gap={5}
      borderRadius={3}
      border={`2px solid ${theme.palette.common.white}`}
      bgcolor="background.paper"
      height="100%"
    >
      <Typography variant="body-14-medium" color="text.primary" textAlign="center">
        Donation just started. Blood is being collected to save a life!</Typography>
      <BloodBagImage />
      <BloodProgressBar />
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="column" gap={1}>
          <Typography variant="caption-12-regular" color="text.secondary" >Bag full, claim your reward</Typography>
          <Stack direction="row" gap={1} alignItems="baseline">
            <Typography variant="subtitle-18-medium" color="text.primary" >2.000</Typography>
            <Typography variant="caption-12-regular" color="text.secondary" >X points</Typography>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 3,
            px: 5,
            py: 2.5,
            background: "var(--Linear-1, linear-gradient(270deg, #FF8227 25.79%, #FF6100 87.37%))"
          }}
        ><Typography variant="body-14-medium" textTransform="capitalize">Claim</Typography></Button>
      </Stack>
    </Stack >);
}

export default BloodCard;