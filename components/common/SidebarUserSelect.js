import { useState } from "react";
import { Box, Button } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import styled from "@emotion/styled";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Div = styled.div`
  width: 100%;
  padding-bottom: 16px;
  .sidebar-select {
    background: #fff;
    label {
      transform: translate(14px, 8px);
      &.Mui-focused {
        transform: translate(14px, -9px) scale(0.75);
      }
    }
  }
  .sidebar-search-open {
    margin-left: 24px;
    background: #fff;
    color: #8f8f8f;
    border-color: #8f8f8f;
    min-width: auto;
    padding: 5px 10px;
  }
`;

const SidebarUserSelect = () => {
  const [userSelect, setUserSelect] = useState("");

  const handleChange = (event) => {
    setUserSelect(event.target.value);
  };
  return (
    <Div>
      <Box sx={{ minWidth: 120 }} display="flex">
        <FormControl fullWidth className="sidebar-select">
          <InputLabel id="demo-simple-select-label">Select User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userSelect}
            label="Select User"
            size="small"
            onChange={handleChange}
          >
            <MenuItem value="all_users">All Users</MenuItem>
            <MenuItem value={20}>Teacher</MenuItem>
            <MenuItem value={30}>Student / Learner</MenuItem>
            <MenuItem value={30}>Content Development</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" className="sidebar-search-open">
          <SearchSharpIcon />
        </Button>
      </Box>
    </Div>
  );
};

export default SidebarUserSelect;
