import { useState } from "react";

import { useRouter } from "next/router";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import { blue, orange, red, green } from "@mui/material/colors";

import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { BsListTask } from "react-icons/bs";
import { MdHistoryToggleOff, MdTaskAlt } from "react-icons/md";
import { TiWarningOutline } from "react-icons/ti";
import { RiAddFill } from "react-icons/ri";

// * Project Components imports
import { useAlertStore, useThemeStore } from "../store";
import AppDrawer from "../components/AppDrawer";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);
const Droppable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);
const Draggable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

interface IStage {
  stage: string;
}

const Tickets = () => {
  const router = useRouter();

  // ? Client state definitions
  const theme = useThemeStore((state) => state.theme.palette.mode);

  const [columns, setColumns] = useState({
    new: {
      title: "New",
      alias: "new",
      items: [],
      gradient:
        theme === "dark"
          ? "linear-gradient(-225deg, #f177f1 0%, #22a29f 100%)"
          : "linear-gradient(to bottom, #FFFEFF 0%, #D7FFFE 100%)",
      icon: <BsListTask style={{ color: blue[500] }} />,
      color: blue[50],
      caption: "",
    },
    progress: {
      title: "In Progress",
      alias: "progress",
      items: [],
      gradient:
        theme === "dark"
          ? "linear-gradient(-225deg, #dc871b 0%, #d2c000 100%)"
          : "linear-gradient(to top, #ffe8cb 0%, #fff8ed 100%)",
      icon: <MdHistoryToggleOff style={{ color: orange[900] }} />,
      color: orange[50],
      caption: "",
    },
    rejected: {
      title: "Rejected",
      alias: "rejected",
      items: [],
      gradient:
        theme === "dark"
          ? "linear-gradient(-225deg, #f08379 0%, #b63737 100%)"
          : "linear-gradient(to top, #e9beba 0%, #fff2f2 100%)",
      icon: <TiWarningOutline style={{ color: red[500] }} />,
      color: red[50],
      caption: "",
    },
    done: {
      title: "Done",
      alias: "done",
      items: [],
      gradient:
        theme === "dark"
          ? "linear-gradient(-225deg, #7cb84a 0%, #00c297 100%)"
          : "linear-gradient(to top, #dbffbc 0%, #d7fff6 100%)",
      icon: <MdTaskAlt style={{ color: green[500] }} />,
      color: green[50],
      caption: "",
    },
  });

  // ? Get tickets
  const { isFetched: isTicketsFetched } = useQuery(
    ["tickets"],
    ({ queryKey }) => axios.get(`${queryKey[0]}/10`),
    {
      select: (data) => data.data,
      onSuccess: (data) =>
        setColumns((prev) => ({
          ...prev,
          new: {
            ...prev.new,
            items: data.filter((ticket: IStage) => ticket.stage === "New"),
            caption: `${
              data.filter((ticket: IStage) => ticket.stage === "New").length
            } new tickets raised.`,
          },
          progress: {
            ...prev.progress,
            items: data.filter(
              (ticket: IStage) => ticket.stage === "In Progress"
            ),
            caption: `${
              data.filter((ticket: IStage) => ticket.stage === "In Progress")
                .length
            } are in progress.`,
          },
          rejected: {
            ...prev.rejected,
            items: data.filter((ticket: IStage) => ticket.stage === "Rejected"),
            caption: `${
              data.filter((ticket: IStage) => ticket.stage === "Rejected")
                .length
            } rejects.`,
          },
          done: {
            ...prev.done,
            items: data.filter((ticket: IStage) => ticket.stage === "Done"),
            caption: `${
              data.filter((ticket: IStage) => ticket.stage === "Done").length
            } done and closed.`,
          },
        })),
    }
  );

  // ? Server state definitions
  const { mutate } = useMutation((body) => axios.put("tickets", body));

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      mutate({ _id: removed.id, stage: destColumn.title });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
      console.log(copiedItems);
    }
  };

  return (
    <AppDrawer>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Grid container>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <Grid
                    xs={12}
                    md={6}
                    lg={3}
                    sx={{ px: 0.5 }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Box
                      sx={{
                        backgroundImage:
                          theme === "dark"
                            ? "linear-gradient(to bottom, #4b4b4b 0%, #171010 100%)"
                            : "linear-gradient(to bottom, #dfe9f3 0%, #fff 100%)",
                        borderRadius: 3,
                        height: "80vh",
                        p: 3,
                        mx: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "#10957d",
                          background: column.color,
                          padding: "2px 10px",
                          borderRadius: 3,
                          display: "inline-block",
                          ml: -1,
                          mb: 0.5,
                        }}
                      >
                        {column.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ display: "flex", opacity: 0.7 }}
                      >
                        {column.caption}
                      </Typography>
                      {column.items.map(
                        (
                          item: {
                            id: string;
                            category: string;
                            subcategory: string;
                            createdAt: string;
                            details: { _: string; expanded: boolean };
                            raisedBy: string;
                            forStore: string;
                          },
                          index
                        ) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => (
                              <Paper
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                elevation={2}
                                onClick={() =>
                                  setColumns((prev: any) => ({
                                    ...prev,
                                    [column.alias]: {
                                      ...prev[column.alias],
                                      items: [
                                        ...prev[column.alias].items.map(
                                          (entity: {
                                            id: string;
                                            details: { expanded: boolean };
                                          }) => {
                                            if (entity.id === item.id)
                                              entity.details.expanded =
                                                !entity.details.expanded;
                                            return entity;
                                          }
                                        ),
                                      ],
                                    },
                                  }))
                                }
                                sx={{
                                  backgroundImage: column.gradient,
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;",
                                  borderRadius: 5,
                                  px: 1.5,
                                  py: 1,
                                  my: 2,
                                  position: "relative",
                                }}
                              >
                                <Stack direction="row" display="flex">
                                  <Avatar
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      marginRight: 1,
                                      mt: 0.3,
                                      background: column.color,
                                      //opacity: 0.5,
                                    }}
                                  >
                                    {column.icon}
                                  </Avatar>

                                  <Stack>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ mb: 0.05 }}
                                    >
                                      {item.category}
                                    </Typography>
                                    <Typography variant="caption">
                                      {item.subcategory}
                                    </Typography>
                                    <Typography variant="caption">
                                      {item.createdAt}
                                    </Typography>

                                    {column.title === "New" && (
                                      <Tooltip
                                        title="Create Quote"
                                        placement="right"
                                      >
                                        <IconButton
                                          onClick={() =>
                                            router.push(
                                              `/quotation?_=${item.id}`
                                            )
                                          }
                                          sx={{
                                            position: "absolute",
                                            bottom: -2,
                                            right: -2,
                                            border: `5px solid ${
                                              theme === "dark"
                                                ? "#4b4b4b"
                                                : "#d6e1ee"
                                            }`,
                                            width: "35px",
                                            height: "35px",
                                            padding: "3px",
                                            "&:hover": {
                                              border: `3px solid ${
                                                theme === "dark"
                                                  ? "#4b4b4b"
                                                  : "#d6e1ee"
                                              }`,
                                            },
                                          }}
                                        >
                                          <RiAddFill />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                  </Stack>
                                </Stack>
                                <Collapse
                                  in={item.details.expanded}
                                  timeout="auto"
                                  unmountOnExit={false}
                                >
                                  <Stack sx={{ margin: 1 }}>
                                    <Typography variant="caption">
                                      <b>Raised By:</b>
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                      {item.raisedBy}
                                    </Typography>
                                    <Typography variant="caption">
                                      <b>For:</b>
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                      {item.forStore}
                                    </Typography>
                                    <Typography variant="caption">
                                      <b>Details:</b>
                                    </Typography>
                                    <Typography variant="caption">
                                      {item.details._}
                                    </Typography>
                                  </Stack>
                                </Collapse>
                              </Paper>
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                    </Box>
                  </Grid>
                )}
              </Droppable>
            );
          })}
        </Grid>
      </DragDropContext>
    </AppDrawer>
  );
};

export default Tickets;
