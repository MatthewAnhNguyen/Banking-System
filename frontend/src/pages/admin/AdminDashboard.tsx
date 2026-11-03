import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import adminService from "../../services/adminService";
import type {
  AdminAccount,
  AdminCreateAccountRequest,
  AdminCreateUserRequest,
  AdminUpdateAccountRequest,
  AdminUpdateUserRequest,
  AdminUser,
  UserRole,
  UserStatus,
} from "../../types/admin";
import type { AccountStatus, AccountType } from "../../types/account";

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userPage, setUserPage] = useState(0);
  const [userRowsPerPage, setUserRowsPerPage] = useState(10);
  const [userSearch, setUserSearch] = useState("");

  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [accountPage, setAccountPage] = useState(0);
  const [accountRowsPerPage, setAccountRowsPerPage] = useState(10);
  const [accountSearch, setAccountSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [userForm, setUserForm] = useState<{
    username: string;
    email: string;
    password: string;
    role: UserRole;
    status: UserStatus;
  }>({
    username: "",
    email: "",
    password: "",
    role: "USER",
    status: "ACTIVE",
  });

  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AdminAccount | null>(
    null
  );
  const [accountForm, setAccountForm] = useState<{
    userId: number | "";
    accountType: AccountType;
    balance: string;
    status: AccountStatus;
  }>({
    userId: "",
    accountType: "SAVINGS",
    balance: "0",
    status: "ACTIVE",
  });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: "user" | "account";
    id: number;
    label: string;
  }>({
    open: false,
    type: "user",
    id: 0,
    label: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const getErrorMessage = (err: unknown, fallback: string) => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || err.response?.data?.error || fallback;
    }
    return fallback;
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersData, accountsData] = await Promise.all([
        adminService.getUsers(userPage, userRowsPerPage),
        adminService.getAccounts(accountPage, accountRowsPerPage),
      ]);
      setUsers(usersData.content);
      setTotalUsers(usersData.totalElements);
      setAccounts(accountsData.content);
      setTotalAccounts(accountsData.totalElements);
    } catch (loadError) {
      console.error("Failed to load admin dashboard:", loadError);
      setError("Không thể tải dữ liệu bảng điều khiển. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [userPage, userRowsPerPage, accountPage, accountRowsPerPage]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleOpenCreateUser = () => {
    setEditingUser(null);
    setUserForm({
      username: "",
      email: "",
      password: "",
      role: "USER",
      status: "ACTIVE",
    });
    setUserDialogOpen(true);
  };

  const handleOpenEditUser = (user: AdminUser) => {
    setEditingUser(user);
    setUserForm({
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    });
    setUserDialogOpen(true);
  };

  const handleSaveUser = async () => {
    if (!userForm.username.trim() || !userForm.email.trim()) {
      toast.error("Vui lòng nhập đầy đủ tên người dùng và email");
      return;
    }
    if (!editingUser && userForm.password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }
    if (editingUser && userForm.password && userForm.password.length < 8) {
      toast.error("Mật khẩu mới phải có ít nhất 8 ký tự");
      return;
    }

    setSubmitting(true);
    try {
      if (editingUser) {
        const payload: AdminUpdateUserRequest = {
          username: userForm.username.trim(),
          email: userForm.email.trim(),
          role: userForm.role,
          status: userForm.status,
          ...(userForm.password.trim()
            ? { password: userForm.password.trim() }
            : {}),
        };
        await adminService.updateUser(editingUser.id, payload);
        toast.success("Cập nhật người dùng thành công");
      } else {
        const payload: AdminCreateUserRequest = {
          username: userForm.username.trim(),
          email: userForm.email.trim(),
          password: userForm.password,
          role: userForm.role,
          status: userForm.status,
        };
        await adminService.createUser(payload);
        toast.success("Thêm người dùng mới thành công");
      }
      setUserDialogOpen(false);
      await loadData();
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác người dùng thất bại"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleUserStatus = async (user: AdminUser) => {
    const newStatus: UserStatus =
      user.status === "ACTIVE" ? "DISABLED" : "ACTIVE";
    try {
      await adminService.updateUserStatus(user.id, newStatus);
      toast.success(
        `Đã ${newStatus === "ACTIVE" ? "kích hoạt" : "vô hiệu hóa"} người dùng ${user.username}`
      );
      await loadData();
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể đổi trạng thái người dùng"));
    }
  };

  const handleOpenCreateAccount = () => {
    setEditingAccount(null);
    setAccountForm({
      userId: users.length > 0 ? users[0].id : "",
      accountType: "SAVINGS",
      balance: "0",
      status: "ACTIVE",
    });
    setAccountDialogOpen(true);
  };

  const handleOpenEditAccount = (account: AdminAccount) => {
    setEditingAccount(account);
    setAccountForm({
      userId: account.userId,
      accountType: account.accountType,
      balance: String(account.balance),
      status: account.status,
    });
    setAccountDialogOpen(true);
  };

  const handleSaveAccount = async () => {
    const parsedBalance = Number(accountForm.balance);
    if (!Number.isFinite(parsedBalance) || parsedBalance < 0) {
      toast.error("Số dư phải là số không âm");
      return;
    }

    setSubmitting(true);
    try {
      if (editingAccount) {
        const payload: AdminUpdateAccountRequest = {
          accountType: accountForm.accountType,
          balance: parsedBalance,
          status: accountForm.status,
        };
        await adminService.updateAccount(editingAccount.id, payload);
        toast.success("Cập nhật tài khoản thành công");
      } else {
        if (!accountForm.userId) {
          toast.error("Vui lòng chọn chủ tài khoản (User ID)");
          setSubmitting(false);
          return;
        }
        const payload: AdminCreateAccountRequest = {
          userId: Number(accountForm.userId),
          accountType: accountForm.accountType,
          balance: parsedBalance,
          status: accountForm.status,
        };
        await adminService.createAccount(payload);
        toast.success("Tạo tài khoản mới thành công");
      }
      setAccountDialogOpen(false);
      await loadData();
    } catch (err) {
      toast.error(getErrorMessage(err, "Thao tác tài khoản thất bại"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleAccountStatus = async (account: AdminAccount) => {
    const newStatus: AccountStatus =
      account.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    try {
      await adminService.updateAccountStatus(account.id, newStatus);
      toast.success(
        `Đã ${newStatus === "ACTIVE" ? "mở khóa" : "khóa"} tài khoản ${account.accountNumber}`
      );
      await loadData();
    } catch (err) {
      toast.error(getErrorMessage(err, "Không thể đổi trạng thái tài khoản"));
    }
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      if (deleteDialog.type === "user") {
        await adminService.deleteUser(deleteDialog.id);
        toast.success("Đã xóa người dùng");
      } else {
        await adminService.deleteAccount(deleteDialog.id);
        toast.success("Đã xóa tài khoản");
      }
      setDeleteDialog((prev) => ({ ...prev, open: false }));
      await loadData();
    } catch (err) {
      toast.error(getErrorMessage(err, "Xóa thất bại"));
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered lists
  const filteredUsers = users.filter((u) => {
    const q = userSearch.toLowerCase();
    return (
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      String(u.id).includes(q)
    );
  });

  const filteredAccounts = accounts.filter((a) => {
    const q = accountSearch.toLowerCase();
    return (
      a.accountNumber.toLowerCase().includes(q) ||
      a.username.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q)
    );
  });

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mb={3}
        flexWrap="wrap"
      >
        <Typography variant="h4" fontWeight="bold">
          Bảng điều khiển quản trị
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => void loadData()}
          disabled={loading}
        >
          Làm mới
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mb={4}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">Tổng số người dùng</Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalUsers.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">Tổng số tài khoản</Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalAccounts.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
           sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
        >
          <Tab label={`Người dùng (${totalUsers})`} />
          <Tab label={`Tài khoản ngân hàng (${totalAccounts})`} />
        </Tabs>

        <Box p={3}>
          {loading ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress />
            </Box>
          ) : tab === 0 ? (
            <Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={2}
                mb={3}
              >
                <TextField
                  size="small"
                  placeholder="Tìm theo ID, tên đăng nhập hoặc email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  sx={{ minWidth: 300 }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateUser}
                >
                  Thêm người dùng
                </Button>
              </Stack>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Tên đăng nhập</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Vai trò</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Ngày tạo</TableCell>
                      <TableCell align="right">Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          Không có người dùng nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id} hover>
                          <TableCell>{user.id}</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            {user.username}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={user.role}
                              color={
                                user.role === "ADMIN" ? "secondary" : "default"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={
                                user.status === "ACTIVE"
                                  ? "Hoạt động"
                                  : "Vô hiệu hóa"
                              }
                              color={
                                user.status === "ACTIVE" ? "success" : "error"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            {dayjs(user.createdAt).format("DD/MM/YYYY HH:mm")}
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Chỉnh sửa">
                              <IconButton
                                color="primary"
                                onClick={() => handleOpenEditUser(user)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            {user.role !== "ADMIN" && (
                              <>
                                <Tooltip
                                  title={
                                    user.status === "ACTIVE"
                                      ? "Vô hiệu hóa"
                                      : "Kích hoạt"
                                  }
                                >
                                  <IconButton
                                    color={
                                      user.status === "ACTIVE"
                                        ? "warning"
                                        : "success"
                                    }
                                    onClick={() => handleToggleUserStatus(user)}
                                  >
                                    {user.status === "ACTIVE" ? (
                                      <BlockIcon fontSize="small" />
                                    ) : (
                                      <CheckCircleIcon fontSize="small" />
                                    )}
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Xóa người dùng">
                                  <IconButton
                                    color="error"
                                    onClick={() =>
                                      setDeleteDialog({
                                        open: true,
                                        type: "user",
                                        id: user.id,
                                        label: `${user.username} (${user.email})`,
                                      })
                                    }
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={totalUsers}
                page={userPage}
                onPageChange={(_, newPage) => setUserPage(newPage)}
                rowsPerPage={userRowsPerPage}
                onRowsPerPageChange={(e) => {
                  setUserRowsPerPage(parseInt(e.target.value, 10));
                  setUserPage(0);
                }}
              />
            </Box>
          ) : (
            <Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={2}
                mb={3}
              >
                <TextField
                  size="small"
                  placeholder="Tìm theo số tài khoản, chủ sở hữu hoặc email..."
                  value={accountSearch}
                  onChange={(e) => setAccountSearch(e.target.value)}
                  sx={{ minWidth: 320 }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateAccount}
                >
                  Thêm tài khoản
                </Button>
              </Stack>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Số tài khoản</TableCell>
                      <TableCell>Chủ tài khoản</TableCell>
                      <TableCell>Loại</TableCell>
                      <TableCell>Số dư</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Ngày tạo</TableCell>
                      <TableCell align="right">Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAccounts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          Không có tài khoản nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAccounts.map((acc) => (
                        <TableRow key={acc.id} hover>
                          <TableCell>{acc.id}</TableCell>
                          <TableCell
                            sx={{ fontFamily: "monospace", fontWeight: 600 }}
                          >
                            {acc.accountNumber}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {acc.username} (ID: {acc.userId})
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {acc.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={
                                acc.accountType === "SAVINGS"
                                  ? "Tiết kiệm"
                                  : "Thanh toán"
                              }
                              color="primary"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            {acc.balance.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={
                                acc.status === "ACTIVE" ? "Hoạt động" : "Đã khóa"
                              }
                              color={
                                acc.status === "ACTIVE" ? "success" : "error"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            {dayjs(acc.createdAt).format("DD/MM/YYYY HH:mm")}
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Chỉnh sửa tài khoản">
                              <IconButton
                                color="primary"
                                onClick={() => handleOpenEditAccount(acc)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title={
                                acc.status === "ACTIVE"
                                  ? "Khóa tài khoản"
                                  : "Mở khóa tài khoản"
                              }
                            >
                              <IconButton
                                color={
                                  acc.status === "ACTIVE"
                                    ? "warning"
                                    : "success"
                                }
                                onClick={() => handleToggleAccountStatus(acc)}
                              >
                                {acc.status === "ACTIVE" ? (
                                  <BlockIcon fontSize="small" />
                                ) : (
                                  <CheckCircleIcon fontSize="small" />
                                )}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa tài khoản">
                              <IconButton
                                color="error"
                                onClick={() =>
                                  setDeleteDialog({
                                    open: true,
                                    type: "account",
                                    id: acc.id,
                                    label: `Số TK ${acc.accountNumber} (${acc.username})`,
                                  })
                                }
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={totalAccounts}
                page={accountPage}
                onPageChange={(_, newPage) => setAccountPage(newPage)}
                rowsPerPage={accountRowsPerPage}
                onRowsPerPageChange={(e) => {
                  setAccountRowsPerPage(parseInt(e.target.value, 10));
                  setAccountPage(0);
                }}
              />
            </Box>
          )}
        </Box>
      </Paper>

      <Dialog
        open={userDialogOpen}
        onClose={() => setUserDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} mt={1}>
            <TextField
              label="Tên đăng nhập"
              fullWidth
              required
              value={userForm.username}
              onChange={(e) =>
                setUserForm({ ...userForm, username: e.target.value })
              }
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
            />
            <TextField
              label={
                editingUser
                  ? "Mật khẩu mới (Để trống nếu giữ nguyên)"
                  : "Mật khẩu (tối thiểu 8 ký tự)"
              }
              type="password"
              fullWidth
              required={!editingUser}
              value={userForm.password}
              onChange={(e) =>
                setUserForm({ ...userForm, password: e.target.value })
              }
            />
            <TextField
              select
              label="Vai trò"
              fullWidth
              value={userForm.role}
              onChange={(e) =>
                setUserForm({
                  ...userForm,
                  role: e.target.value as UserRole,
                })
              }
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </TextField>
            <TextField
              select
              label="Trạng thái"
              fullWidth
              disabled={editingUser?.role === "ADMIN"}
              value={userForm.status}
              onChange={(e) =>
                setUserForm({
                  ...userForm,
                  status: e.target.value as UserStatus,
                })
              }
            >
              <MenuItem value="ACTIVE">Hoạt động (ACTIVE)</MenuItem>
              <MenuItem value="DISABLED">Vô hiệu hóa (DISABLED)</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setUserDialogOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleSaveUser}
            disabled={submitting}
          >
            {submitting ? "Đang lưu..." : "Lưu lại"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={accountDialogOpen}
        onClose={() => setAccountDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingAccount
            ? `Chỉnh sửa tài khoản ${editingAccount.accountNumber}`
            : "Tạo tài khoản ngân hàng mới"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} mt={1}>
            {!editingAccount && (
              <TextField
                select
                label="Chủ tài khoản (Người dùng)"
                fullWidth
                required
                value={accountForm.userId}
                onChange={(e) =>
                  setAccountForm({
                    ...accountForm,
                    userId: Number(e.target.value),
                  })
                }
              >
                {users.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    ID: {u.id} — {u.username} ({u.email})
                  </MenuItem>
                ))}
              </TextField>
            )}

            <TextField
              select
              label="Loại tài khoản"
              fullWidth
              value={accountForm.accountType}
              onChange={(e) =>
                setAccountForm({
                  ...accountForm,
                  accountType: e.target.value as AccountType,
                })
              }
            >
              <MenuItem value="SAVINGS">Tiết kiệm (SAVINGS)</MenuItem>
              <MenuItem value="CHECKING">Thanh toán (CHECKING)</MenuItem>
            </TextField>

            <TextField
              label="Số dư (VND)"
              type="number"
              fullWidth
              required
              inputProps={{ min: 0, step: 1000 }}
              value={accountForm.balance}
              onChange={(e) =>
                setAccountForm({ ...accountForm, balance: e.target.value })
              }
            />

            <TextField
              select
              label="Trạng thái"
              fullWidth
              value={accountForm.status}
              onChange={(e) =>
                setAccountForm({
                  ...accountForm,
                  status: e.target.value as AccountStatus,
                })
              }
            >
              <MenuItem value="ACTIVE">Hoạt động (ACTIVE)</MenuItem>
              <MenuItem value="BLOCKED">Đã khóa (BLOCKED)</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAccountDialogOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleSaveAccount}
            disabled={submitting}
          >
            {submitting ? "Đang lưu..." : "Lưu lại"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog((prev) => ({ ...prev, open: false }))}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa{" "}
            {deleteDialog.type === "user"
              ? "người dùng (cùng các tài khoản thuộc người dùng này)"
              : "tài khoản"}{" "}
            <b>{deleteDialog.label}</b> không? Hành động này không thể hoàn tác.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() =>
              setDeleteDialog((prev) => ({ ...prev, open: false }))
            }
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={submitting}
          >
            {submitting ? "Đang xóa..." : "Xóa vĩnh viễn"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}