import {
  TextField,
} from "@mui/material";

interface Props{
    value:string;
    onChange:(value:string)=>void;
}

export default function AccountSearch({
    value,
    onChange
}:Props){

    return(

<TextField
fullWidth
placeholder="Search account number..."
value={value}
onChange={(e)=>onChange(e.target.value)}
/>

    )

}