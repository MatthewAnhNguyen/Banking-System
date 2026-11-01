import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function AccountFilter({
  value,
  onChange,
}: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel>Trạng thái</InputLabel>

      <Select
        value={value}
        label="Trạng thái"
        onChange={(e) =>
          onChange(e.target.value)
        }
      >
        <MenuItem value="ALL">Tất cả</MenuItem>
        <MenuItem value="ACTIVE">Hoạt động</MenuItem>
        <MenuItem value="BLOCKED">Đã khóa</MenuItem>
      </Select>
    </FormControl>
  );
}