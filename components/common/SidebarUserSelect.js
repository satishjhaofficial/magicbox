import { useState } from "react";
import { Box, Button, TextField, FormControl, IconButton } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";

const Div = styled.div`
  width: 100%;
  padding-bottom: 16px;
  .sidebar-select {
    background: #fff;
    label {
      transform: translate(14px, 8px);
      &.MuiInputLabel-shrink {
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
  .sidebar-search-box {
    border: 1px solid #6a6a6a;
    height: 40px;
    input {
      font-size: 14px;
      color: #18181a;
      outline: none;
    }
    fieldset {
      border: 0;
      outline: none;
    }
  }
`;

const SidebarUserSelect = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [userSelect, setUserSelect] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setUserSelect(event.target.value);
  };
  return (
    <Div>
      <Box
        display={searchOpen ? "flex" : "none"}
        bgcolor="#fff"
        className="sidebar-search-box"
      >
        <TextField
          type="text"
          value={searchValue}
          size="small"
          border="0"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="Search AI Workflows"
        />
        <IconButton
          onClick={() => {
            setSearchOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton>
          <SearchSharpIcon />
        </IconButton>
      </Box>
      <Box sx={{ minWidth: 120 }} display={searchOpen ? "none" : "flex"}>
        <FormControl fullWidth className="sidebar-select">
          <TextField
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userSelect}
            label="Select User"
            select
            size="small"
            onChange={handleChange}
          >
            <MenuItem value="all_users">All Users</MenuItem>
            <MenuItem value={20}>Teacher</MenuItem>
            <MenuItem value={30}>Student / Learner</MenuItem>
            <MenuItem value={30}>Content Development</MenuItem>
          </TextField>
        </FormControl>
        <Button
          variant="outlined"
          className="sidebar-search-open"
          onClick={() => {
            setSearchOpen(true);
          }}
        >
          <SearchSharpIcon />
        </Button>
      </Box>
    </Div>
  );
};

export default SidebarUserSelect;
