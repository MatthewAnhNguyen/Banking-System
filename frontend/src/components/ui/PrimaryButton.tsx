import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";

export default function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        mt: 3,
        height: 50,
        borderRadius: 3,
        fontWeight: 600,
        fontSize: 16,
      }}
      {...props}
    />
  );
}