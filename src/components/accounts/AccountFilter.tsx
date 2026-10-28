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
      <InputLabel>Status</InputLabel>

      <Select
        value={value}
        label="Status"
        onChange={(e) =>
          onChange(e.target.value)
        }
      >
        <MenuItem value="ALL">All</MenuItem>
        <MenuItem value="ACTIVE">Active</MenuItem>
        <MenuItem value="BLOCKED">Blocked</MenuItem>
        <MenuItem value="CLOSED">Closed</MenuItem>
      </Select>
    </FormControl>
  );
}