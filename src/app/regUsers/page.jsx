"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import Loader from "../../components/design/Loader";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/moving-border";
import Modal from "../../components/design/Modal";
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
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockData, setBlockData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    gp: "",
    isAdmin: false,
    isActive: true,
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminData, setAdminData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    gp: "",
    isAdmin: false,
    isActive: true,
  });
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [delData, setDelData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    gp: "",
    isAdmin: false,
    isActive: true,
  });
  const columns = [
    // {
    //   name: "Sl",
    //   selector: (row, index) => index + 1,
    //   sortable: true,
    //   center: +true,
    // },

    // {
    //   name: "Name",
    //   selector: (row) => row.name,
    //   sortable: true,
    //   wrap: true,
    //   center: +true,
    // },
    // {
    //   name: "Email",
    //   selector: (row) => row.email,
    //   wrap: true,
    //   center: +true,
    // },
    // {
    //   name: "Phone",
    //   selector: (row) => row.phone,
    //   wrap: true,
    //   center: +true,
    // },
    // {
    //   name: "GP",
    //   selector: (row) => row.gp,
    //   sortable: true,
    //   wrap: true,
    //   center: +true,
    // },
    // {
    //   name: "Access",
    //   selector: (row) => (row.isAdmin ? "Admin" : "User"),
    //   wrap: true,
    //   center: +true,
    // },
    // {
    //   name: "🔧 Admin",
    //   cell: (row) => (
    //     <Button
    //       onClick={() => {
    //         setAdminData(row);
    //         setIsAdminModalOpen(true);
    //       }}
    //     >
    //       {row.isAdmin ? "Remove Admin" : "Make Admin"}
    //     </Button>
    //   ),
    //   wrap: true,
    //   center: +true,
    // },
    // {
    //   name: "Block / Unblock",
    //   cell: (row) => (
    //     <Button
    //       className={row.isActive ? "bg-red-500" : "bg-green-500"}
    //       onClick={() => {
    //         setBlockData(row);
    //         setIsBlockModalOpen(true);
    //       }}
    //     >
    //       {row.isActive ? "Block" : "UnBlock"}
    //     </Button>
    //   ),
    //   wrap: true,
    //   center: +true,
    // },
    // {
    //   name: "Delete",
    //   cell: (row) => (
    //     <Button
    //       className={"bg-red-500"}
    //       onClick={() => {
    //         setDelData(row);
    //         setIsDelModalOpen(true);
    //       }}
    //     >
    //       Delete
    //     </Button>
    //   ),
    //   wrap: true,
    //   center: +true,
    // },
    {
      name: "User Data",
      cell: (row, index) => (
        <div className="flex flex-col space-y-2 justify-center items-center my-1">
          <p className="text-sm text-gray-500">Sl: {index + 1} </p>
          <p className="text-sm text-gray-500">Name: {row.name}</p>
          <p className="text-sm text-gray-500">Email: {row.email}</p>
          <p className="text-sm text-gray-500">Phone: {row.phone}</p>
          <p className="text-sm text-gray-500">GP: {row.gp}</p>
          <p className="text-sm text-gray-500">
            Access: {row.isAdmin ? "Admin" : "User"}
          </p>
          <p className="text-sm text-gray-500">
           User Status: {row.isActive ? "Active" : "Blocked"}
          </p>
          <p className="text-sm text-gray-500">
           Verification Status: {row.isVerified ? "Verified" : "Not Verified"}
          </p>
          <p className="text-sm text-gray-500">
            Created At: {new Date(row.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Updated At: {new Date(row.updatedAt).toLocaleString()}
          </p>
          <div className="flex justify-center items-center">
            <button
              borderRadius="1.75rem"
              className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 m-1 "
              onClick={() => {
                setAdminData(row);
                setIsAdminModalOpen(true);
              }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center  ${
                  row.isAdmin ? "bg-red-500" : "bg-green-500"
                } text-sm font-medium text-white backdrop-blur-3xl p-2`}
              >
                {row.isAdmin ? "Remove Admin" : "Make Admin"}
              </span>
            </button>
            <button
              borderRadius="1.75rem"
              className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 m-1 "
              onClick={() => {
                setBlockData(row);
                setIsBlockModalOpen(true);
              }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center  ${
                  row.isActive ? "bg-red-500" : "bg-green-500"
                } text-sm font-medium text-white backdrop-blur-3xl p-2`}
              >
                {row.isActive ? "Block" : "UnBlock"}
              </span>
            </button>
            <button
              borderRadius="1.75rem"
              className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 m-1 "
              onClick={() => {
                setDelData(row);
                setIsDelModalOpen(true);
              }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center bg-red-500 text-sm font-medium text-white backdrop-blur-3xl p-2`}
              >
                Delete
              </span>
            </button>
          </div>
        </div>
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
    setIsAdminModalOpen(false);
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
    setIsBlockModalOpen(false);
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
    setIsDelModalOpen(false);
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
          {!isBlockModalOpen && !isAdminModalOpen && !isDelModalOpen && (
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
                  className="w-25 form-control rounded p-2 text-white  border-gray-600 focus:border-gray-500 focus:ring focus:ring-gray-500"
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
          )}
          <Modal
            isOpen={isBlockModalOpen}
            onClose={() => setIsBlockModalOpen(false)}
            isStatic
          >
            <div className="space-y-4">
              <h5 className="h5 font-bold text-gray-800 text-center">
                Block / Unblock User
              </h5>
              <div className="mx-auto">
                <div className="flex flex-col space-y-2 justify-center items-center">
                  <h5 className="h5 font-bold text-gray-800 text-center">
                    Are you sure you want to{" "}
                    {blockData.isActive ? "Block" : "UnBlock"} user{" "}
                    {blockData.name} ?
                  </h5>
                  <Button
                    className={`${
                      blockData.isActive ? "bg-red-500" : "bg-green-500"
                    }`}
                    onClick={() => blockUser(blockData.id, blockData.isActive)}
                  >
                    {blockData.isActive ? "Block" : "UnBlock"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <Button onClick={() => setIsBlockModalOpen(false)}>Close</Button>
            </div>
          </Modal>
          <Modal
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            isStatic
          >
            <div className="space-y-4">
              <h5 className="h5 font-bold text-gray-800 text-center">
                Make Admin / Remove Admin
              </h5>
              <div className="mx-auto">
                <div className="flex flex-col space-y-2 justify-center items-center">
                  <h5 className="h5 font-bold text-gray-800 text-center">
                    Are you sure you want to{" "}
                    {adminData.isAdmin
                      ? `Remove ${adminData.name} from Admin`
                      : `Make ${adminData.name} Admin`}{" "}
                    ?
                  </h5>
                  <Button
                    className={`${
                      adminData.isAdmin ? "bg-red-500" : "bg-green-500"
                    }`}
                    onClick={() =>
                      changeAccess(adminData.id, adminData.isAdmin)
                    }
                  >
                    {adminData.isAdmin ? "Remove Admin" : "Make Admin"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <Button onClick={() => setIsAdminModalOpen(false)}>Close</Button>
            </div>
          </Modal>
          <Modal
            isOpen={isDelModalOpen}
            onClose={() => setIsDelModalOpen(false)}
            isStatic
          >
            <div className="space-y-4">
              <h5 className="h5 font-bold text-gray-800 text-center">
                Delete User
              </h5>
              <div className="mx-auto">
                <div className="flex flex-col space-y-2 justify-center items-center">
                  <h5 className="h5 font-bold text-gray-800 text-center">
                    Are you sure you want to delete user {delData.name} ?
                  </h5>
                  <Button
                    className={`bg-red-500`}
                    onClick={() => delUser(delData.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <Button onClick={() => setIsDelModalOpen(false)}>Close</Button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
