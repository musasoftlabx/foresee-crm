import { useEffect } from "react";

import { useUserStore } from "../store";
import AddUser from "../components/Modals/AddUser";
import Button from "@mui/material/Button";

//import Fancy from "fancygrid";
import Fancy from "fancygrid/client/fancy.min.js";
//const Fancy = require("fancygrid/client/fancy.min.js");
//import "fancygrid/client/modules/sort.min";
import "fancygrid/client/fancy.min.css";

import axios from "axios";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Users = ({ domains }: { domains: String[] }) => {
  const handleOpen = useUserStore((state: any) => state.toggle);

  const exportToCSV = ({}) => {};

  useEffect(() => {
    Fancy.stylesLoaded = true;
    Fancy.getModulesList();

    var data = [
      {
        name: "Mia",
        surname: "Moore",
        id: 1,
        country: "Netherlands",
        position: "Software Tester",
        email: "mia.moore@fancygrid.com",
      },
      {
        name: "David",
        surname: "Johnson",
        id: 2,
        country: "Belgium",
        position: "Frontend Developer",
        email: "david.johnson@fancygrid.com",
      },
    ];

    const fancyGrid = new Fancy.Grid({
      renderTo: "container",
      height: 500,
      width: "100%",
      tbar: [
        {
          text: "Export to CSV",
          handler: () => {
            exportToCSV({
              fileName: "Products",
              header: true,
            });
          },
        },
        {
          text: "Refresh",
          handler: () => {
            fancyGrid.load();
          },
        },
      ],
      data: data,
      defaults: {
        sortable: true,
        editable: false,
        resizable: true,
        ellipsis: false,
        filter: {
          header: true,
          emptyText: "Search",
        },
      },
      columns: [
        {
          index: "name",
          title: "Name",
        },
        {
          index: "surname",
          title: "SurName",
        },
        {
          index: "country",
          title: "Country",
        },
        {
          index: "position",
          title: "Position",
        },
        {
          index: "email",
          title: "Email",
        },
      ],
    });
  }, []);

  return (
    <>
      <AddUser />
      <Button onClick={handleOpen}>open</Button>
      <div id="container"></div>
    </>
  );
};

export default Users;

export async function getStaticProps() {
  const x = await fetch("http://localhost:3333/GetDomains");
  const y = await x.json();

  return {
    props: {
      domains: y,
    },
  };
}
