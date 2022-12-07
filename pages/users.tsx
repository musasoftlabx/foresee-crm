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

import AppDrawer from "../components/AppDrawer";
import AddUser from "../components/Modals/AddUser";

const Users = () => {
  const handleOpen = useModalStore((state) => state.toggle);

  const { data: domains } = useQuery(
    ["domains"],
    ({ queryKey }) => axios.get(queryKey[0]),
    { refetchOnWindowFocus: false }
  );

  const { data: users } = useQuery(
    ["Users"],
    ({ queryKey }) => axios.get(queryKey[0]),
    { select: (data) => data.data }
  );

  const { mutate } = useMutation((_id) => axios.delete(`Users/${_id}`));

  const handleDelete = (_id: string) =>
    //@ts-ignore
    mutate(_id, {
      onSuccess: () => {
        queryClient.setQueryData(["Users"], (prev: any) => ({
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
      <AddUser domains={domains} />

      <Button variant="outlined" onClick={handleOpen}>
        ADD A NEW USER
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
              {users &&
                users.columns.map((column: string, i: number) => (
                  <TableCell key={i}>{column}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.rows.map((user, i: number) => (
                <TableRow key={i}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.emailAddress}</TableCell>
                  <TableCell>{user.domain}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
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
                        <DeleteIcon onClick={() => handleDelete(user._id)} />
                      </IconButton>
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AppDrawer>
  );
};

export default Users;
