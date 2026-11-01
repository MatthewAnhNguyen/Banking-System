import {
    TextField,
} from "@mui/material";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function AccountSearch({
    value,
    onChange
}: Props) {

    return (

        <TextField
            fullWidth
            placeholder="Tìm kiếm số tài khoản..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />

    )

}