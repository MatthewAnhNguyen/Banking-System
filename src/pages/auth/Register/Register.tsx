import { useState } from "react";
import type { FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { register } from "../../../services/auth.service";
import type { RegisterRequest } from "../../../types/auth";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (form.password.length < 8 || form.password.length > 72) {
      setError("Mật khẩu phải dài từ 8 đến 72 ký tự.");
      return;
    }

    setLoading(true);

    try {
      await register(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message ?? "Đăng ký thất bại."
          : "Không thể kết nối máy chủ."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        p: 2,
      }}
    >
      <Paper sx={{ width: "min(100%, 440px)", p: 3 }}>
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={700}>
              Tạo tài khoản
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Tên người dùng"
              required
              inputProps={{ minLength: 3, maxLength: 80 }}
              value={form.username}
              onChange={(event) =>
                setForm({ ...form, username: event.target.value })
              }
            />

            <TextField
              label="Email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />

            <TextField
              label="Mật khẩu"
              type="password"
              required
              autoComplete="new-password"
              value={form.password}
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
            />

            <TextField
              label="Xác nhận mật khẩu"
              type="password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Đang tạo..." : "Đăng ký"}
            </Button>

            <Typography variant="body2">
              Đã có tài khoản? <Link to="/">Đăng nhập</Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}