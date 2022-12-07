import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { RiDeleteBin5Fill as DeleteIcon } from "react-icons/ri";

import { useModalStore } from "../store";
import { queryClient } from "./_app";

import AddUser from "../components/Modals/AddUser";
import AddStore from "../components/Modals/AddStore";

import AppDrawer from "../components/AppDrawer";

const Stores = () => {
  const handleOpen = useModalStore((state) => state.toggle);

  const { data: stores } = useQuery(
    ["stores"],
    ({ queryKey }) => axios.get(queryKey[0]),
    { select: (data) => data.data }
  );

  const { data: domains } = useQuery(
    ["domains"],
    ({ queryKey }) => axios.get(queryKey[0]),
    { select: (data) => data.data, refetchOnWindowFocus: false }
  );

  const { mutate } = useMutation((_id) => axios.delete(`Stores/${_id}`));

  const handleDelete = (_id: string) =>
    //@ts-ignore
    mutate(_id, {
      onSuccess: () => {
        queryClient.setQueryData(["Stores"], (prev: any) => ({
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
    <AppDrawer>
      <AddStore domains={domains} />

      <Button variant="outlined" onClick={handleOpen}>
        ADD A NEW STORE
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <Table sx={{ mt: 3, minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              {stores &&
                stores.columns.map((column: string, i: number) => (
                  <TableCell key={i}>{column}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stores &&
              stores.rows.map(
                (
                  store: {
                    _id: string;
                    code: string;
                    name: string;
                    country: string;
                    client: string;
                  },
                  key: number
                ) => (
                  <TableRow key={key}>
                    <TableCell>{store.code}</TableCell>
                    <TableCell>{store.name}</TableCell>
                    <TableCell>{store.country}</TableCell>
                    <TableCell>{store.client}</TableCell>
                    <TableCell>
                      {
                        <IconButton
                          color="error"
                          sx={{
                            background: "#ffeeee",
                            "&:hover": {
                              background: "#fbdbdb",
                            },
                          }}
                        >
                          <DeleteIcon onClick={() => handleDelete(store._id)} />
                        </IconButton>
                      }
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </AppDrawer>
  );
};

export default Stores;
