import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

import { changePassword } from "../../services/settingsService";

export default function Settings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await changePassword(form);

      setSuccess(true);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: unknown) {
      setError(
        (axios.isAxiosError<{ message?: string }>(err)
          ? err.response?.data?.message
          : undefined) ||
          "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
          >
            Security Settings
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Current Password"
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              fullWidth
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Change Password"}
            </Button>

            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          severity="success"
          onClose={() => setSuccess(false)}
        >
          Password changed successfully
        </Alert>
      </Snackbar>
    </>
  );
}
