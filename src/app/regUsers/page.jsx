"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import Loader from "../../components/design/Loader";
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
  const { USER, userState, setUserState } = useGlobalContext();
  const [loader, setLoader] = useState(false);
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
      name: "Phone",
      selector: (row) => row.phone,
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
      name: "Access",
      selector: (row) => (row.isAdmin ? "Admin" : "User"),
      wrap: true,
      center: +true,
    },
    {
      name: "🔧 Admin",
      cell: (row) => (
        <Button onClick={() => changeAccess(row.id, row.isAdmin)}>
          {row.isAdmin ? "Remove Admin" : "Make Admin"}
        </Button>
      ),
      wrap: true,
      center: +true,
    },
    {
      name: "Block / Unblock",
      cell: (row) => (
        <Button
          className={row.isActive ? "bg-red-500" : "bg-green-500"}
          onClick={() => blockUser(row.id, row.isActive)}
        >
          {row.isActive ? "Block" : "UnBlock"}
        </Button>
      ),
      wrap: true,
      center: +true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <Button className={"bg-red-500"} onClick={() => delUser(row.id)}>
          Delete
        </Button>
      ),
      wrap: true,
      center: +true,
    },
  ];
  const getUsers = async () => {
    try {
      setLoader(true);
      const res = await axios.post("/api/getUsers");
      if (res.data.success) {
        setData(res.data.data);
        setUserData(res.data.data);
        setUserState(res.data.data);
        setLoader(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
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
    const modifiedData = data.map((item) => {
      if (item.id === id) {
        item.isAdmin = !isAdmin;
      }
      return item;
    });
    setData(modifiedData);
    setUserData(modifiedData);
    setUserState(modifiedData);
  };
  const blockUser = async (id, isActive) => {
    const res = await axios.post("/api/blockUser", {
      id,
      isActive: !isActive,
    });
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error("Something went wrong");
    }
    const modifiedData = data.map((item) => {
      if (item.id === id) {
        item.isActive = !isActive;
      }
      return item;
    });
    setData(modifiedData);
    setUserData(modifiedData);
    setUserState(modifiedData);
  };
  const delUser = async (id) => {
    const res = await axios.post("/api/delUser", {
      id,
    });
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error("Something went wrong");
    }
    const modifiedData = data.filter((item) => item.id !== id);
    setData(modifiedData);
    setUserData(modifiedData);
    setUserState(modifiedData);
  };
  useEffect(() => {
    USER.isAdmin === false && router.push("/");
    if (userState.length === 0) {
      getUsers();
    } else {
      setUserData(userState);
      setData(userState);
    }

    //eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-col items-center  w-full py-2 my-28">
      <hr />
      <h3 className="h3 ">Registered Users</h3>
      {loader ? (
        <Loader />
      ) : (
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
                    item.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                  setUserData(filteredData);
                }}
              />
            }
            subHeaderAlign="right"
            className="bg-black text-white rounded-lg "
          />
        </div>
      )}
    </div>
  );
}
