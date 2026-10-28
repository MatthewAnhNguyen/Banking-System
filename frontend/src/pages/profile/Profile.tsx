import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

import type { Profile } from "../../types/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleEdit = () => {
    if (!profile) return;

    setFormData({
      phone: profile.phone,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      pincode: profile.pincode,
    });

    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const updatedProfile = await updateProfile(formData);

      setProfile(updatedProfile);

      setOpen(false);

      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Typography>
        No profile found.
      </Typography>
    );
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 900,
          mx: "auto",
          mt: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5">
              My Profile
            </Typography>

            <Button
              variant="contained"
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                <b>Customer Number:</b>{" "}
                {profile.customerNumber}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                <b>First Name:</b>{" "}
                {profile.firstName}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                <b>Last Name:</b>{" "}
                {profile.lastName}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                <b>Email:</b>{" "}
                {profile.email}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                <b>Phone:</b>{" "}
                {profile.phone}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography>
                <b>Address:</b>{" "}
                {profile.address}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography>
                <b>City:</b>{" "}
                {profile.city}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography>
                <b>State:</b>{" "}
                {profile.state}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography>
                <b>Pincode:</b>{" "}
                {profile.pincode}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography>
                <b>KYC Status:</b>{" "}
                {profile.kycVerified
                  ? "✅ Verified"
                  : "❌ Pending"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Edit Profile
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="State"
            value={formData.state}
            onChange={(e) =>
              setFormData({
                ...formData,
                state: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Pincode"
            value={formData.pincode}
            onChange={(e) =>
              setFormData({
                ...formData,
                pincode: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          severity="success"
          onClose={() => setSuccess(false)}
        >
          Profile Updated Successfully
        </Alert>
      </Snackbar>
    </>
  );
}