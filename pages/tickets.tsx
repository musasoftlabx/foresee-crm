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

import {
  RiDeleteBin5Fill as DeleteIcon,
  RiAddFill as AddIcon,
} from "react-icons/ri";

import { FcParallelTasks } from "react-icons/fc";

const { Sortable } = require("sortablejs");

import styles from "../styles/Tickets.module.css";

import { SiHomebridge, SiMicrosoftexcel, SiMarketo } from "react-icons/si";

const Tickets = (props: { tickets: [] }) => {
  const { tickets } = props;

  useEffect(() => {
    var el = document.getElementById("new");
    var el2 = document.getElementById("progress");
    var el3 = document.getElementById("done");

    new Sortable(el, {
      group: "shared",
      animation: 150,
      ghostClass: "sortableg",
      onAdd: (evt) => console.log(evt),
    });

    new Sortable(el2, {
      group: "shared",
      animation: 150,
      ghostClass: "sortableg",
    });

    new Sortable(el3, {
      group: "shared",
      animation: 150,
      ghostClass: "sortableg",
    });
  }, []);

  const states = [
    {
      title: "New",
      alias: "new",
      caption: `${
        tickets.filter((ticket) => ticket.status === "New").length
      } new tickets raised.`,
      tickets: tickets.filter((ticket) => ticket.status === "New"),
      backgroundImage: "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)",
    },
    {
      title: "In Progress",
      alias: "progress",
      caption: `${
        tickets.filter((ticket) => ticket.status === "In Progress").length
      } new tickets raised.`,
      tickets: tickets.filter((ticket) => ticket.status === "In Progress"),
      backgroundImage: "linear-gradient(to top, #e6b980 0%, #eacda3 100%)",
    },
    {
      title: "Rejected",
      alias: "rejected",
      caption: `${
        tickets.filter((ticket) => ticket.status === "Done").length
      } new tickets raised.`,
      tickets: tickets.filter((ticket) => ticket.status === "Done"),
      backgroundImage: "linear-gradient(to top, #f77062 0%, #fe5196 100%)",
    },
    {
      title: "Done",
      alias: "done",
      caption: `${
        tickets.filter((ticket) => ticket.status === "Done").length
      } new tickets raised.`,
      tickets: tickets.filter((ticket) => ticket.status === "Done"),
      backgroundImage: "linear-gradient(to top, #9be15d 0%, #00e3ae 100%)",
    },
  ];

  return (
    <>
      <Grid container>
        {states.map((state) => (
          <Grid key={`${state.alias}`} xs={12} md={6} lg={3}>
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(to bottom, #dfe9f3 0%, white 100%)",
                borderRadius: 3,
                px: 4,
                py: 3,
                mx: 1,
              }}
            >
              <Typography variant="h6">{state.title}</Typography>
              <Typography variant="caption">{state.caption}</Typography>
              <Stack
                id={`${state.alias}`}
                spacing={2}
                sx={{ mt: 2 }}
                className="sortable-ghost"
              >
                {state.tickets.map((ticket) => (
                  <Paper
                    key={ticket.id}
                    elevation={2}
                    sx={{
                      backgroundImage: state.backgroundImage,
                      borderRadius: 2,
                      cursor: "grabbing",
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Stack direction="row" display="flex" alignItems="center">
                      <FcParallelTasks
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 10,
                          opacity: 0.5,
                        }}
                      />
                      <Stack>
                        <Typography variant="subtitle1" sx={{ mb: -0.4 }}>
                          {ticket.category}
                        </Typography>
                        <Typography variant="caption">
                          {ticket.dateSubmitted}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Tickets;

export async function getStaticProps() {
  return {
    props: {
      tickets: [
        {
          id: 1,
          category: "Electrical",
          subCategory: "Lightning",
          dateSubmitted: "Fri, 12.09.2022 at 6:07 pm",
          status: "New",
        },
        {
          id: 2,
          category: "Mechanical",
          subCategory: "Fire",
          dateSubmitted: "Fri, 12.09.2022 at 6:07 pm",
          status: "New",
        },
        {
          id: 3,
          category: "Construction",
          subCategory: "Fire",
          dateSubmitted: "Fri, 12.09.2022 at 6:07 pm",
          status: "New",
        },
        {
          id: 4,
          category: "Extra",
          subCategory: "Fire",
          dateSubmitted: "Fri, 12.09.2022 at 6:07 pm",
          status: "In Progress",
        },
        {
          id: 5,
          category: "Extra",
          subCategory: "Fire",
          dateSubmitted: "Fri, 12.09.2022 at 6:07 pm",
          status: "Done",
        },
      ],
    },
  };
}
