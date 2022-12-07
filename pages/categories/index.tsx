import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import LoadingButton from "@mui/lab/LoadingButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { RiDeleteBinLine, RiDeleteBin4Fill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FcAddRow, FcFolder, FcTimeline } from "react-icons/fc";

import AppDrawer from "../../components/AppDrawer";
import { TextFieldX } from "../../components/InputFields/TextFieldX";

import { queryClient } from "../_app";

interface CategoryProps {
  _id: string;
  category: string;
  subcategory: string;
  subcategories: string[];
}

export default function Categories() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  // * Get categories
  useQuery(["Categories"], ({ queryKey }) => axios.get(queryKey[0]), {
    select: (data) => data.data,
    onSuccess: (data) => setCategories(data.rows),
  });

  const { mutate: addCategory } = useMutation((body) =>
    axios.post("Categories", body)
  );

  const { mutate: addSubCategory } = useMutation(
    (body) => axios.post("Categories/Subcategory", body),
    {
      onSuccess: (data) =>
        setCategories((prev) => [
          ...prev.map((category: CategoryProps) => {
            if (category._id === data.data._id) {
              category.subcategories = data.data.subcategories;
              category.subcategory = "";
            }
            return category;
          }),
        ]),
    }
  );

  const { mutate: deleteCategory } = useMutation((_id) =>
    axios.delete(`Categories/${_id}`)
  );

  const { mutate: deleteSubCategory } = useMutation((param) =>
    axios.delete(`Categories/${param._id}/${param.subcategory}`)
  );

  return (
    <AppDrawer>
      <Container maxWidth="xs">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            addCategory(JSON.stringify({ category }), {
              onSuccess: (data) => {
                setCategories((prev) => [data.data, ...prev]);
                setCategory("");
              },
              /* queryClient.setQueryData(["Categories"], (prev: any) => ({
                ...prev,
                data: {
                  ...prev.data,
                  rows: [data.data, ...prev.data.rows],
                },
              })), */
            });
          }}
        >
          <Grid container>
            <Grid display="flex" justifyContent="center" xs={12}>
              <TextFieldX
                label="Add a new category"
                placeholder="Enter username"
                prefixcon={<FcAddRow size={24} />}
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
            borderRadius: 5,
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
            border: "1px solid #e0e0e0",
          }}
        >
          {categories &&
            categories.map((item, i: number) => (
              <>
                {i > 0 && <Divider sx={{ mb: 1 }} />}

                <ListItem
                  key={i}
                  secondaryAction={
                    <Tooltip title="Delete category">
                      <ListItemAvatar>
                        <IconButton
                          onClick={() =>
                            //@ts-ignore
                            deleteCategory(item._id, {
                              onSuccess: () => {
                                setCategories((prev) => [
                                  ...prev.filter(
                                    (category: CategoryProps) =>
                                      category._id !== item._id
                                  ),
                                ]);
                                /* queryClient.setQueryData(
                                ["Categories"],
                                (prev: any) => ({
                                  ...prev,
                                  data: {
                                    ...prev.data,
                                    rows: [
                                      ...prev.data.rows.filter(
                                        (row: { _id: string }) =>
                                          row._id !== _id
                                      ),
                                    ],
                                  },
                                })
                              ); */
                              },
                              onError: (error: any) => {
                                showAlert({
                                  status: error.response.data.status,
                                  subject: error.response.data.subject,
                                  body: error.response.data.body,
                                });
                              },
                            })
                          }
                          color="error"
                          sx={{
                            ml: 3,
                            "&:hover": {
                              background: "#fbdbdb",
                            },
                          }}
                        >
                          <RiDeleteBin4Fill />
                        </IconButton>
                      </ListItemAvatar>
                    </Tooltip>
                  }
                >
                  <ListItemAvatar>
                    <IconButton>
                      <FcFolder size={28} />
                    </IconButton>
                  </ListItemAvatar>

                  <ListItemText primary={item.category} />
                </ListItem>

                <List dense sx={{ pb: 3 }}>
                  <Box sx={{ px: 5 }}>
                    <TextField
                      label="Add a sub category"
                      variant="standard"
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
                      sx={{ mb: 3 }}
                    />
                  </Box>
                  {item.subcategories &&
                    item.subcategories.map((subcategory: string, j: number) => (
                      <ListItem key={j} sx={{ pl: 4 }}>
                        <IconButton sx={{ mt: -0.5, mr: 1 }}>
                          <FcTimeline size={20} />
                        </IconButton>

                        <ListItemText primary={subcategory} />

                        <ListItemAvatar>
                          <Tooltip
                            title="Delete sub category"
                            placement="left-start"
                          >
                            <IconButton
                              onClick={() =>
                                deleteSubCategory(
                                  //@ts-ignore
                                  { _id: item._id, subcategory },
                                  {
                                    onSuccess: () => {
                                      setCategories((prev) => [
                                        ...prev.map(
                                          (category: CategoryProps) => {
                                            if (category._id === item._id) {
                                              category.subcategories.splice(
                                                category.subcategories.indexOf(
                                                  subcategory
                                                ),
                                                1
                                              );
                                            }
                                            return category;
                                          }
                                        ),
                                      ]);
                                    },
                                    onError: (error: any) => {
                                      showAlert({
                                        status: error.response.data.status,
                                        subject: error.response.data.subject,
                                        body: error.response.data.body,
                                      });
                                    },
                                  }
                                )
                              }
                              color="error"
                              sx={{
                                mt: -0.5,
                                "&:hover": {
                                  background: "#fbdbdb",
                                },
                              }}
                            >
                              <RiDeleteBinLine size={20} />
                            </IconButton>
                          </Tooltip>
                        </ListItemAvatar>
                      </ListItem>
                    ))}
                </List>
              </>
            ))}
        </List>
      </Container>
    </AppDrawer>
  );
}
