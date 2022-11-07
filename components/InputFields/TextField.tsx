import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type PrefixIcon = { prefixIcon?: React.ReactNode };
type AdditionalTextFieldProps = TextFieldProps & PrefixIcon;

const CustomTextField = styled((props: AdditionalTextFieldProps) => (
  <TextField
    InputProps={
      {
        disableUnderline: true,
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              marginTop: props.value ? "18px !important" : "0px !important",
              borderBottom: 0,
              color: props.error ? "#d3302f" : "",
            }}
          >
            {props.prefixIcon}
          </InputAdornment>
        ),
      } as Partial<OutlinedInputProps>
    }
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #bdbdbd",
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(252,252,252,0.95)" //"rgba(232,240,254,0.95)"
        : "rgba(43,43,43,0.95)",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    ":before": {
      borderBottom: 0,
    },
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "light"
          ? "rgba(252,252,252,0.9)"
          : "rgba(43,43,43,0.4)",
    },
    "&.Mui-focused": {
      backgroundColor:
        theme.palette.mode === "light"
          ? "rgba(231,234,246,0.9)"
          : "rgba(43,43,43,0.4)",
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    "&.Mui-error": {
      backgroundColor:
        theme.palette.mode === "light"
          ? "rgba(255,248,248,0.9)"
          : "rgba(43,43,43,0.4)",
      border: `2px dotted ${theme.palette.error.main}`,
    },
  },
  ".MuiFormLabel-root": {
    fontSize: 14,
    top: 2,
    transform: "translate(50px, 14px) scale(1.05)",
  },
  ".MuiFormLabel-root.MuiFormLabel-filled": {
    fontSize: 16,
    transform: "translate(13px, 4px) scale(0.75)",
  },
  ".MuiFormHelperText-root": {
    textAlign: "right",
    fontWeight: 500,
    lineHeight: 0.5,
    marginBottom: -7,
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
  "&.MuiFormControl-root": {
    label: {
      cursor: "text",
    },
    input: {
      "&[value='']": {
        caretColor: "transparent",
      },
      ":-internal-autofill": {
        backgroundColor: "#e8f0fe !important",
      },
    },
  },
}));

type TextFieldXProps = {
  children?: React.ReactNode;
  label: string;
  select?: boolean;
  error?: boolean;
  helperText?: string | boolean;
  prefixIcon?: React.ReactNode;
};

export const TextFieldX = (props: TextFieldXProps) => (
  //<Grid xs={12} sm={6} md={4} lg={3} sx={{ px: 1, mt: 1 }}>
  <Grid sx={{ px: 1, mt: 1 }}>
    <CustomTextField variant="filled" fullWidth size="small" {...props}>
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
