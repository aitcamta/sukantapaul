"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import CustomButton from "../../components/ui/CustomButton";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/moving-border";
createTheme(
  "solarized",
  {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
    },
    background: {
      default: "#002b36",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);
export default function RegUsers() {
  const router = useRouter();
  const { USER } = useGlobalContext();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      sortable: true,
      center: +true,
    },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
      center: +true,
    },
    {
      name: "GP",
      selector: (row) => row.gp,
      sortable: true,
      wrap: true,
      center: +true,
    },
    {
      name: "UserType",
      selector: (row) => (row.isAdmin ? "Admin" : "User"),
      wrap: true,
      center: +true,
    },
    {
      name: "Make / Remove Admin",
      cell: (row) => (
        <Button onClick={() => changeAccess(row.id, row.isAdmin)}>
          {row.isAdmin ? "Remove Admin" : "Make Admin"}
        </Button>
      ),
      wrap: true,
    },
  ];
  const getUsers = async () => {
    const res = await axios.post("/api/getUsers");
    setData(res.data.data);
    setUserData(res.data.data);
    console.log(res.data.data);
  };
  const changeAccess = async (id, isAdmin) => {
    const res = await axios.post("/api/changeAccess", {
      id,
      isAdmin: !isAdmin,
    });
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error("Something went wrong");
    }
    getUsers();
  };
  useEffect(() => {
    USER.isAdmin === false && router.push("/");
    data.length === 0 && getUsers();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-col items-center  w-full py-2 my-20">
      <hr />
      <h3 className="h3 ">Registered Users</h3>
      <div className="my-3 w-full p-10">
        <DataTable
          theme="solarized"
          columns={columns}
          data={userData}
          pagination
          highlightOnHover
          fixedHeader
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search"
              className="w-25 form-control rounded"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                const filteredData = data.filter((item) =>
                  item.name.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setUserData(filteredData);
              }}
            />
          }
          subHeaderAlign="right"
          className="bg-black text-white rounded-lg "
        />
      </div>
    </div>
  );
}
