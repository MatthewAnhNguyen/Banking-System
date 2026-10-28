import { useState } from "react";
import type { FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../../services/auth.service";
import { saveAuth } from "../../../utils/token";
import type { LoginRequest } from "../../../types/auth";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(form);
      saveAuth(result.accessToken, result.role);
      navigate(result.role === "ADMIN" ? "/admin" : "/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message ?? "Đăng nhập thất bại."
          : "Không thể kết nối máy chủ."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box component="form" onSubmit={submit}>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight={700}>
          Đăng nhập
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(event) =>
            setForm({ ...form, email: event.target.value })
          }
        />

        <TextField
          label="Mật khẩu"
          type="password"
          autoComplete="current-password"
          required
          value={form.password}
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>

        <Typography variant="body2">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </Typography>
      </Stack>
    </Box>
  );
}