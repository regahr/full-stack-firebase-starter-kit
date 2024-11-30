import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function UpdateButton() {
  const { submitting, error } = useSelector((state: RootState) => state);

  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={submitting}
      >
        {submitting ? "Updating..." : "Update"}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </>
  );
}
