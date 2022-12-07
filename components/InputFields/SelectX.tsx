import { forwardRef } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type TExtendedProps = TextFieldProps & {
  children?: React.ReactNode;
  ref?: any;
  label: string;
  select?: boolean;
  error?: boolean;
  multiple?: boolean;
  rows?: number;
  helperText?: string | boolean;
  prefixcon?: React.ReactNode;
  suffixcon?: React.ReactNode;
  type?: string;
  columnspan?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  placeholder?: string;
  circularedge?: number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

import {
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
} from "@mui/material";
import { MdCategory, MdExpandMore } from "react-icons/md";

export const SelectX = styled(
  forwardRef((props: TExtendedProps, ref) => (
    <Grid
      display="flex"
      xs={props?.columnspan?.xs || 12}
      sm={props?.columnspan?.sm}
      md={props?.columnspan?.md}
      lg={props?.columnspan?.lg}
      xl={props?.columnspan?.xl}
      sx={{ p: 1 }}
    >
      <FormControl variant="filled" size="small" fullWidth {...props}>
        <InputLabel>{props.label}</InputLabel>
        {/* <>{console.log(props)}</> */}
        <Select
          id="demo-simple-select-filled"
          multiple={props.multiple}
          //IconComponent={(s) => console.log(s)}
          /* IconComponent={(s) => (
            <MdExpandMore
              className={s}
              style={{
                right: 12,
                position: "absolute",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          )} */
          input={
            <FilledInput
              inputRef={ref}
              startAdornment={
                <InputAdornment
                  position="start"
                  sx={{
                    marginTop: props.value
                      ? "18px !important"
                      : "0px !important",
                    color: props.error ? "#d3302f" : "",
                    //position: "absolute",
                  }}
                >
                  {props.prefixcon}
                </InputAdornment>
              }
              {...props}
            />
          }
          //value={props.value}
          //onChange={props.onChange}
          /*  */
          //multiple
          //
          MenuProps={{
            sx: {
              borderRadius: 50,
              //left: -40,
              ".MuiMenu-paper": {
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              },
              ".MuiMenu-list": {},
            },
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
        >
          {props.children}
        </Select>
        {/* <FormHelperText>{props.helperText}</FormHelperText> */}
        <FormHelperText>helper text</FormHelperText>
      </FormControl>
    </Grid>
  ))
)((props) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e2", //#bdbdbd
    overflow: "hidden",
    borderRadius: props.circularedge || 6,
    backgroundColor:
      props.theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.06)" //"rgba(232,240,254,0.95)"
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
          ? "rgba(252, 252, 0, 0.1)"
          : "rgba(0, 0, 0, 0.8)",
      //: "rgba(43,43,43,0.4)",
    },
    "&.Mui-focused": {
      backgroundColor:
        props.theme.palette.mode === "light"
          ? "rgba(231,234,246,0.9)"
          : "rgba(0,0,0,0.8)",
      borderBottom: `1px solid ${props.theme.palette.primary.main}`,
    },
    "&.Mui-error": {
      backgroundColor:
        props.theme.palette.mode === "light"
          ? "rgba(255,248,248,0.9)"
          : "rgba(43,43,43,0.4)",
      outline: `2px dotted ${props.theme.palette.error.main}`,
      border: "1px solid transparent",
    },
  },
  ".MuiFormLabel-root": {
    fontSize: 14,
    top: 2,
    transform: `translate(43px, 12px) scale(1.05)`,
    "&.Mui-focused": {
      fontSize: 14,
      opacity: 1,
    },
  },
  ".MuiFormLabel-root.MuiFormLabel-filled": {
    fontSize: 16,
    opacity: 1,
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
    ":before": { content: "unset" },
    ":after": { content: "unset" },
  },
  "&.MuiFormControl-root": {
    label: { cursor: "pointer", zIndex: 1 },
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

{
  /* <SelectX
  id="category"
  label="Category *"
  columnspan={{ xs: 12 }}
  multiple={false}
  prefixcon={<MdCategory size={24} />}
  {...getFieldProps("category")}
>
  {categories &&
    categories.map(
      (category: { category: string }, i: number) => (
        <MenuItem key={i} value={category.category}>
          <ListItemIcon sx={{ minWidth: 25 }}>
            <MdCategory size={20} />
          </ListItemIcon>
          {category.category}
        </MenuItem>
      )
    )}
</SelectX> */
}
