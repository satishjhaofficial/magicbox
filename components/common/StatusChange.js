import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ChangeStatusGlobaly } from "@/app/api";
import axios from "axios";

const Div = styled.div``;

function StatusChange({ mg_code, setLoading, setRes }) {
  const [value, setValue] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleStatusChange = async (event) => {
    setValue(event.target.value);
    axios
      .post("http://13.232.253.226:3001/change/status", {
        mgcode: mg_code,
        status: event.target.value,
      })
      .then((response) => {
        setRes(true);
        console.log(response);
      })
      .catch(function (error) {
        console.log("something went wrong", error);
        setRes(false);
      });
    setRes(false);
  };

  return (
    <Div>
      <FormControl sx={{ width: " 150px" }}>
        <InputLabel sx={{ top: "-7px" }} id="demo-status-select-label">
          Change Status
        </InputLabel>
        <Select
          labelId="demo-status-select-label"
          id="demo-status-select"
          value={value}
          label="Change Status"
          size="small"
          onChange={handleStatusChange}
        >
          <MenuItem value="sold">Sold</MenuItem>
          <MenuItem value="sales">Sales</MenuItem>
          <MenuItem value="accounts">Accounts</MenuItem>
          <MenuItem value="trc">TRC</MenuItem>
        </Select>
      </FormControl>
    </Div>
  );
}

export default StatusChange;
