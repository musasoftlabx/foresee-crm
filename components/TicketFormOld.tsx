import { useState, forwardRef } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

interface TicketTypes {
  ticketType: String;
}
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const TicketForm = () => {
  const [open, setOpen] = useState(true);

  /* const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  }; */

  const commonIssues = ["Broken Pipe", "Electrical Issues", "Wiring"];

  return (
    <Dialog
      open={open}
      TransitionComponent={Slide}
      keepMounted
      onClose={() => setOpen(false)}
    >
      <Formik
        initialValues={{
          ticketTypes: ["Standard", "Urgent"],
          ticketType: "Standard",
          selectedIssues: [],
          issue: "",
          extraDetails: "",
        }}
        /* validationSchema={Yup.object({
          issue: Yup.string()
            .max(50, "Cannot exceed 50 characters")
            .required("Required"),
          extraDeails: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        })} */
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          actions.resetForm({
            values: {
              ticketTypes: ["Standard", "Urgent"],
              ticketType: "Standard",
              selectedIssues: [],
              issue: "",
              extraDetails: "",
            },
          });
        }}
      >
        {({ values, errors, touched, isSubmitting, getFieldProps }) => (
          <Form>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Typography variant="h6">Raise a ticket</Typography>
              <RadioGroup
                row
                defaultValue={values.ticketTypes[0]}
                {...getFieldProps("ticketType")}
              >
                {values.ticketTypes.map((type: String, idx: any) => (
                  <FormControlLabel
                    key={idx}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                ))}
              </RadioGroup>
              <FormControl>
                <InputLabel id="demo-multiple-chip-label">
                  Common Issues
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  multiple
                  {...getFieldProps("selectedIssues")}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected: []) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value: String, i: any) => (
                        <Chip key={i} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {commonIssues.map((name, i) => (
                    <MenuItem
                      key={i}
                      value={name}
                      //style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                label="Issue at hand"
                {...getFieldProps("issue")}
                error={touched.issue && Boolean(errors.issue)}
                helperText={touched.issue && errors.issue}
              />
              <TextField
                variant="outlined"
                label="Extra Details (Optional)"
                multiline
                rows={7}
                {...getFieldProps("extraDetails")}
              />
              <Button type="submit" variant="outlined">
                SUBMIT
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default TicketForm;
