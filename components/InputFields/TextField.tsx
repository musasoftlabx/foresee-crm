import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type ExtendedProps = {
  prefixcon?: React.ReactNode;
  suffixcon?: React.ReactNode;
  circularedge?: number;
};
type AdditionalTextFieldProps = TextFieldProps & ExtendedProps;

const CustomTextField = styled((props: AdditionalTextFieldProps) => (
  <TextField
    InputProps={
      {
        disableUnderline: true,
        startAdornment: props.prefixcon && (
          <InputAdornment
            position="start"
            sx={{
              marginTop: props.value ? "18px !important" : "0px !important",
              color: props.error ? "#d3302f" : "",
            }}
          >
            {props.prefixcon}
          </InputAdornment>
        ),
        endAdornment: props.suffixcon && (
          <InputAdornment position="end">{props.suffixcon}</InputAdornment>
        ),
      } as Partial<OutlinedInputProps>
    }
    {...props}
  />
))((props) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #bdbdbd",
    overflow: "hidden",
    borderRadius: props.circularedge || 10,
    backgroundColor:
      props.theme.palette.mode === "light"
        ? "rgba(252,252,252,0.95)" //"rgba(232,240,254,0.95)"
        : "rgba(43,43,43,0.95)",
    transition: props.theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    ":before": {
      borderBottom: 0,
    },
    "&:hover": {
      backgroundColor:
        props.theme.palette.mode === "light"
          ? "rgba(252,252,252,0.9)"
          : "rgba(43,43,43,0.4)",
    },
    "&.Mui-focused": {
      backgroundColor:
        props.theme.palette.mode === "light"
          ? "rgba(231,234,246,0.9)"
          : "rgba(43,43,43,0.4)",
      borderBottom: `1px solid ${props.theme.palette.primary.main}`,
    },
    "&.Mui-error": {
      backgroundColor:
        props.theme.palette.mode === "light"
          ? "rgba(255,248,248,0.9)"
          : "rgba(43,43,43,0.4)",
      border: `2px dotted ${props.theme.palette.error.main}`,
    },
  },
  ".MuiFormLabel-root": {
    fontSize: 14,
    top: 2,
    transform: `translate(${props.prefixcon ? 42 : 13}px, 14px) scale(1.05)`,
    "&.Mui-focused": {
      fontSize: 16,
      transform: "translate(13px, 4px) scale(0)",
    },
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
        marginTop: -10,
        marginBottom: 8,
      },
      ":-internal-autofill": {
        backgroundColor: "#e8f0fe !important",
      },
      "::placeholder": {
        fontSize: 15,
      },
      ":not(focus)": {
        "::placeholder": {
          visibility: "hidden",
        },
      },
      ":focus": {
        "::placeholder": {
          visibility: "visible",
        },
      },
    },
  },
}));

type TextFieldXProps = {
  children?: React.ReactNode;
  label: string;
  select?: boolean;
  error?: boolean;
  multiline?: boolean;
  rows?: number;
  helperText?: string | boolean;
  prefixcon?: React.ReactNode;
  suffixcon?: React.ReactNode;
  type?: string;
  columnspan?: number;
  placeholder?: string;
};

export const TextFieldX = (props: TextFieldXProps) => (
  //<Grid  sm={6} md={4} lg={3} sx={{ px: 1, mt: 1 }}>

  <Grid display="flex" xs={props.columnspan || 12} sx={{ px: 1 }}>
    <CustomTextField
      variant="filled"
      fullWidth
      size="small"
      placeholder={props.placeholder || props.label}
      {...props}
    >
      {props.children}
    </CustomTextField>
  </Grid>
);
