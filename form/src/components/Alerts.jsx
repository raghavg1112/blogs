import React from "react";
import { Alert, AlertTitle } from "@mui/material";
export default function Alerts({ val, message }) {
  return (
    <>
      {val == "1" ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <strong> {message}</strong>
        </Alert>
      ) : (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong> {message}</strong>
        </Alert>
      )}
    </>
  );
}
