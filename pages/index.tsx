// * React imports
import React, { useState, useEffect } from "react";

// * NextJS imports
import type { NextPage } from "next";
import Head from "next/head";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import VanillaTilt from "vanilla-tilt";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import AppDrawer from "../components/AppDrawer";
import RaiseTicket from "../components/RaiseTicket";
import ViewQuote from "../components/Modals/ViewQuote";
import { queryClient } from "./_app";

import { useAlertStore, useModalStore } from "../store";

// * React Icons imports
import { FcSearch } from "react-icons/fc";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// * Project Components imports
import { TextFieldX } from "../components/InputFields/TextField";

interface Store {
  name: string;
  country: string;
  client: string;
  code: string;
}

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [tickets, setTickets] = useState<any>(null);
  const [quoteURL, setQuoteURL] = useState("");
  const [viewQuote, setViewQuote] = useState(false);

  // ? Zustand definitions
  const openRaiseTicketForm = useModalStore((state) => state.toggle);

  // ? Get categories
  const { data: categories } = useQuery(
    ["categories"],
    ({ queryKey }) => axios.get(queryKey[0]),
    { select: (data) => data.data.rows }
  );

  // ? Get tickets
  const { isFetched: isTicketsFetched } = useQuery(
    ["tickets"],
    ({ queryKey }) => axios.get(queryKey[0]),
    { select: (data) => data.data, onSuccess: (data) => setTickets(data) }
  );

  // ? Get stores
  const { data: stores, isFetched: isStoreFetched } = useQuery(
    ["stores"],
    ({ queryKey }) => axios.get(queryKey[0]),
    { select: (data) => data.data.rows }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    //@ts-ignore
    VanillaTilt.init(document.querySelectorAll(".tilter"), {
      scale: 1.1,
      perspective: 2000,
      speed: 500,
    });
  }, []);

  return (
    <AppDrawer>
      <Box
        sx={
          {
            /*backgroundColor: "#ececec"*/
          }
        }
      >
        <Head>
          <title>Maintenance System</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <RaiseTicket
          categories={categories}
          store={selectedStore}
          setTickets={setTickets}
        />

        <ViewQuote
          viewQuote={viewQuote}
          setViewQuote={setViewQuote}
          url={quoteURL}
        />

        <Grid container rowSpacing={2}>
          <Grid display="flex" xs={12}>
            <Grid display="flex" xs={12} sm={6} md={4} lg={3}>
              <TextFieldX
                label="Search"
                placeholder="Search for shop"
                prefixcon={<FcSearch size={24} />}
                circularedge={50}
                value={search}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {isStoreFetched &&
            stores.map((store: Store, i: number) => (
              <Grid
                key={i}
                xs={12}
                md={4}
                lg={3}
                xl={2}
                display="flex"
                sx={{ px: 1 }}
              >
                <Paper
                  className="tilter"
                  sx={{
                    borderRadius: 5,
                    width: 300,
                    overflow: "hidden",
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                  }}
                >
                  {/* <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      px: 5,
                      mb: 8,
                    }}
                  >
                    <img
                      src="/images/blob.png"
                      width={150}
                      style={{
                        zIndex: 0,
                        opacity: 0.3,
                        marginTop: 20,
                      }}
                    />
                    <img
                      src="/images/sampleshop.png"
                      height={24}
                      style={{
                        marginTop: -80,
                        zIndex: 333,
                      }}
                    />
                  </Box> */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mx: 2.1,
                      my: 2,
                    }}
                  >
                    <Typography variant="subtitle1" noWrap>
                      {store.name}
                    </Typography>
                    <Typography variant="caption">{store.country}</Typography>
                    <Typography variant="caption">{store.client}</Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => (
                        setSelectedStore(`${store.code} - ${store.name}`),
                        openRaiseTicketForm()
                      )}
                      sx={{
                        borderRadius: 10,
                        marginTop: 1,
                        alignSelf: "flex-end",
                      }}
                    >
                      RAISE TICKET
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}

          <TableContainer
            component={Paper}
            sx={{
              mt: 3,
              borderRadius: 3,
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <Table sx={{ mt: 2, minWidth: 650 }} size="small">
              {isTicketsFetched && (
                <>
                  <TableHead>
                    <TableRow>
                      {tickets &&
                        tickets.columns.map((column: string, i: number) => (
                          <TableCell key={i}>{column}</TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tickets &&
                      tickets.rows.map((ticket, i: number) => (
                        <React.Fragment key={i}>
                          <TableRow>
                            <TableCell>
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() =>
                                  /* queryClient.setQueryData(
                                      ["tickets"],
                                      (prev: any) => ({
                                        ...prev,
                                        data: {
                                          ...prev.data,
                                          rows: [
                                            ...prev.data.rows.map(
                                              (row: {
                                                _id: string;
                                                details: { expanded: boolean };
                                              }) => {
                                                if (row._id === ticket._id) {
                                                  row.details.expanded = !row.details.expanded;
                                                }
                                                return row;
                                              }
                                            ),
                                          ],
                                        },
                                      })
                                    ) */
                                  setTickets((prev: any) => ({
                                    ...prev,
                                    rows: [
                                      ...prev.rows.map(
                                        (row: {
                                          _id: string;
                                          details: { expanded: boolean };
                                        }) => {
                                          if (row._id === ticket._id)
                                            row.details.expanded =
                                              !row.details.expanded;
                                          return row;
                                        }
                                      ),
                                    ],
                                  }))
                                }
                              >
                                {ticket.details.expanded ? (
                                  <MdKeyboardArrowUp />
                                ) : (
                                  <MdKeyboardArrowDown />
                                )}
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={ticket.stage}
                                color={
                                  ticket.stage === "New"
                                    ? "warning"
                                    : ticket.stage === "In Progress"
                                    ? "info"
                                    : ticket.stage === "Blocked"
                                    ? "error"
                                    : "success"
                                }
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>{ticket.category}</TableCell>
                            <TableCell>{ticket.subcategory}</TableCell>
                            <TableCell>{ticket.createdAt}</TableCell>
                            <TableCell>{ticket.raisedBy}</TableCell>
                            <TableCell>{ticket.forStore}</TableCell>
                            <TableCell
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Tooltip title="View Quote">
                                <IconButton
                                  color="info"
                                  sx={{
                                    background: "#e1f5fe",
                                    "&:hover": { background: "#b3e5fc" },
                                  }}
                                >
                                  <BsFileEarmarkPdfFill
                                    size={18}
                                    onClick={() => {
                                      setQuoteURL(
                                        `${process.env.API}public/${ticket.quotation}`
                                      );
                                      setViewQuote(true);
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              style={{ paddingBottom: 0, paddingTop: 0 }}
                              colSpan={6}
                            >
                              <Collapse
                                in={ticket.details.expanded}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box sx={{ margin: 1 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    Details
                                  </Typography>
                                  <Typography variant="caption">
                                    {ticket.details._}
                                  </Typography>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                  </TableBody>
                </>
              )}
            </Table>
          </TableContainer>
        </Grid>
      </Box>
    </AppDrawer>
  );
};

export default Home;
