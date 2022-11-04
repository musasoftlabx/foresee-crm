import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { JSXElementConstructor, ReactElement } from "react";

const CustomTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    ":before": {
      borderBottom: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      //boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      //border: `2px dotted ${theme.palette.primary.main}`,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    "&.Mui-error": {
      backgroundColor: "#fff8f8",
      borderBottom: `1px solid ${theme.palette.error.main}`,
    },
  },
  ".MuiFormHelperText-root": {
    textAlign: "right",
    fontWeight: 500,
    lineHeight: 0.5,
    marginRight: 5,
    marginTop: 7,
    opacity: 0.7,
  },
  ".MuiInputBase-adornedStart": {
    ":before": {
      content: "unset",
    },
    ":after": {
      content: "unset",
    },
  },
}));

export const TextFieldX = (props: {
  children: ReactElement<JSXElementConstructor<any>>;
}) => (
  <Grid xs={12} sm={6} md={4} lg={3} sx={{ px: 1, mt: 1 }}>
    <CustomTextField {...props} variant="filled" fullWidth size="small">
      {props.children}
    </CustomTextField>
  </Grid>
);

/* const CustomFormControl = styled((props: FormControlProps) => (
    <FormControl
      InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiFilledInput-root": {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: 6,
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      ":before": {
        borderBottom: 0,
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
        //boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        //border: `2px dotted ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
      },
      "&.Mui-error": {
        backgroundColor: "#fff8f8",
        borderBottom: `1px solid ${theme.palette.error.main}`,
      },
    },
    ".MuiFormHelperText-root": {
      textAlign: "right",
      fontWeight: 500,
      lineHeight: 0.5,
      marginRight: 5,
      marginTop: 7,
      opacity: 0.7,
    },
    ".MuiFilledInput-root": {
      ":before": {
        content: "unset",
      },
      ":after": {
        content: "unset",
      },
    },
  })); */
