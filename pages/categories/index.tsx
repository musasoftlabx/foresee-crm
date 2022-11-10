import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineAdd } from "react-icons/md";

import { queryClient } from "../_app";
import { TextFieldX } from "../../components/InputFields/TextField";

interface CategoryProps {
  _id: string;
  category: string;
  subcategory: string;
}

export default function Categories() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  // * Get categories
  useQuery(["Categories"], ({ queryKey }) => axios.get(queryKey[0]), {
    select: (data) => data.data,
    onSuccess: (data) => setCategories(data.rows),
  });

  const { mutate } = useMutation((body) => axios.post("Categories", body));
  const { mutate: addSubCategory } = useMutation((body) =>
    axios.post("Categories/Subcategory", body)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(JSON.stringify({ category }), {
      onSuccess: (data) =>
        queryClient.setQueryData(["Categories"], (prev: any) => ({
          ...prev,
          data: {
            ...prev.data,
            rows: [data.data, ...prev.data.rows],
          },
        })),
    });
  };

  const { mutate: remove } = useMutation((_id) =>
    axios.delete(`Categories/${_id}`)
  );

  const handleDelete = (_id: string) =>
    //@ts-ignore
    remove(_id, {
      onSuccess: () => {
        queryClient.setQueryData(["Categories"], (prev: any) => ({
          ...prev,
          data: {
            ...prev.data,
            rows: [
              ...prev.data.rows.filter(
                (row: { _id: string }) => row._id !== _id
              ),
            ],
          },
        }));
      },
      onError: (error: any) => {
        showAlert({
          status: error.response.data.status,
          subject: error.response.data.subject,
          body: error.response.data.body,
        });
      },
    });

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid display="flex" justifyContent="center" xs={12}>
            <TextField
              label="Add a new category"
              variant="outlined"
              fullWidth
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              sx={{ borderRadius: 10, mb: 3, textAlign: "center" }}
            />
          </Grid>
          <Grid display="flex" justifyContent="center" xs={12}>
            <LoadingButton
              type="submit"
              disabled={!category}
              //loading={isSubmitting}
              loadingIndicator={
                <Stack spacing={1} direction="row">
                  <Typography variant="subtitle2">ADDING</Typography>
                  <CircularProgress size={20} />
                </Stack>
              }
              variant="outlined"
              sx={{
                borderRadius: 4,
                borderStyle: "double",
                borderWidth: 4,
                "&:hover": {
                  borderStyle: "double",
                  borderWidth: 4,
                  boxShadow: "rgba(52, 117, 210, 0.5) 0px 30px 90px",
                },
              }}
            >
              ADD CATEGORY
            </LoadingButton>
          </Grid>
        </Grid>
      </form>

      <List
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: 360,
          mt: 5,
          bgcolor: "background.paper",
          borderRadius: 3,
        }}
      >
        {categories &&
          categories.map((item, i: number) => (
            <ListItem
              key={i}
              secondaryAction={
                <Tooltip title="Add sub category">
                  <IconButton edge="end" aria-label="comments">
                    <MdOutlineAdd />
                  </IconButton>
                </Tooltip>
              }
            >
              <Tooltip title="Delete category">
                <ListItemAvatar>
                  <IconButton
                    onClick={() => handleDelete(item._id)}
                    color="error"
                    sx={{
                      background: "#ffeeee",
                      "&:hover": {
                        background: "#fbdbdb",
                      },
                    }}
                  >
                    <RiDeleteBin5Fill />
                  </IconButton>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText
                primary={item.category}
                secondary={
                  <TextField
                    label="Add a new category"
                    variant="filled"
                    fullWidth
                    size="small"
                    onChange={(e) =>
                      setCategories((prev) => [
                        ...prev.map((category) => {
                          if (category._id === item._id) {
                            category.subcategory = e.target.value;
                          }
                          return category;
                        }),
                      ])
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      addSubCategory(
                        JSON.stringify({
                          _id: item._id,
                          subcategory: item.subcategory,
                        })
                      )
                    }
                    value={item.subcategory}
                    sx={{ borderRadius: 10, mb: 3, textAlign: "center" }}
                  />
                }
              />
            </ListItem>
          ))}
      </List>
    </Container>
  );
}
