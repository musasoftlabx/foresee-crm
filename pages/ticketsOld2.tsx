import { useEffect, useState } from "react";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { styled, alpha } from "@mui/material/styles";
import { Formik, Form, FieldArray } from "formik";

import dynamic from "next/dynamic";

import {
  RiDeleteBin5Fill as DeleteIcon,
  RiAddFill as AddIcon,
} from "react-icons/ri";

import { FcParallelTasks } from "react-icons/fc";

const { Sortable } = require("sortablejs");

import styles from "../styles/Tickets.module.css";

import AppDrawer from "../components/AppDrawer";

import { SiHomebridge, SiMicrosoftexcel, SiMarketo } from "react-icons/si";

const DynamicComponentWithNoSSR = dynamic(() => import("../components/test"), {
  ssr: false,
});

const Tickets = (props: { tickets: [] }) => {
  /* useEffect(() => {
    resetServerContext();
  }, []); */

  return (
    <AppDrawer>
      <DynamicComponentWithNoSSR />
    </AppDrawer>
  );
};

export default Tickets;
