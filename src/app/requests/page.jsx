"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { createTheme } from "react-data-table-component";
import Loader from "../../components/design/Loader";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/Store";
import { Button } from "../../components/ui/moving-border";
import { firestore } from "../../context/FirbaseContext";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  collection,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../context/FirbaseContext";
import { ImageFolders } from "../../constants";
import Modal from "../../components/design/Modal";
import NextImage from "next/image";
import {
  compareObjects,
  DateValueToDate,
  DateValueToSring,
} from "../../helpers/calculatefunctions.js";
import axios from "axios";
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

export default function Requests() {
  const router = useRouter();
  const {
    USER,
    userRequestState,
    setUserRequestState,
    userReqUpdTime,
    setUserReqUpdTime,
    unreadRequests,
    setUnreadRequests,
  } = useGlobalContext();
  const { isAdmin } = USER;
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [requestData, setRequestData] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    message: "",
    imageName: "",
    date: Date.now(),
    reply: "",
    replyDate: Date.now(),
  });
  const [editRequestData, setEditRequestData] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    message: "",
    imageName: "",
    date: Date.now(),
    reply: "",
    replyDate: Date.now(),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [delField, setDelField] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    message: "",
    imageName: "",
    date: Date.now(),
    reply: "",
    replyDate: Date.now(),
  });
  const columns = [
    {
      name: "Details",
      cell: (row, index) => (
        <div className="flex flex-col items-center justify-center m-1">
          <p className="text-sm text-white">Sl: {index + 1} </p>
          {row.url && (
            <button
              className="relative inline-flex w-auto h-32 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 m-2"
              onClick={() => {
                window.open(row.url, "_blank");
              }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center  bg-slate-950 text-sm font-medium text-white backdrop-blur-3xl">
                <NextImage
                  src={row.url}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                  width={50}
                  height={50}
                  unoptimized
                  loading="eager"
                />
              </span>
            </button>
          )}
          <p className="text-sm text-fuchsia-500 text-center">Message:</p>
          <p className="text-sm text-white text-center">{row.message}</p>
          <p className="text-sm text-lime-500 text-center">
            Submitted On:{DateValueToSring(row.date)}
          </p>
          <div className="flex justify-center items-center">
            <button
              className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 m-1 "
              onClick={() => {
                setRequestData(row);
                setEditRequestData(row);
                setIsModalOpen(true);
              }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center bg-yellow-500 text-sm font-medium text-white backdrop-blur-3xl p-2`}
              >
                View
              </span>
            </button>
            <button
              className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 m-1 "
              onClick={() => {
                setIsDelModalOpen(true);
                setDelField(row);
              }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center  bg-red-500 text-sm font-medium text-white backdrop-blur-3xl p-2`}
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

  const getData = async () => {
    setLoader(true);
    const q = query(collection(firestore, "requests"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs
      .map((doc) => ({
        // doc.data() is never undefined for query doc snapshots
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });
    setAllData(data);
    setFilteredData(data);
    setLoader(false);
    setUserRequestState(data);
    setUserReqUpdTime(Date.now());
    let unread = 0;
    if (data.length > 0) {
      data.forEach((item) => {
        if (item.reply === "") {
          unread++;
        }
      });
    }
    setUnreadRequests(unread);
  };
  const submitReply = async () => {
    try {
      const response = await axios.post("/api/sendReplyEmail", {
        reply: editRequestData.reply,
        id: editRequestData.id,
        message: editRequestData.message,
        email: editRequestData.email,
        name: editRequestData.name,
      });
      const record = response.data;
      if (record.success) {
        await updateDoc(doc(firestore, "requests", editRequestData.id), {
          reply: editRequestData.reply,
          replyDate: Date.now(),
        });
        setIsModalOpen(false);
        getData();
        toast.success("Congrats! Your Reply stored Successfully!");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.success("Failed to save Your Reply!");
      setLoader(false);
    }
  };
  const deleteFile = async (name, id) => {
    setLoader(true);
    const desertRef = ref(storage, `requests/${name}`);
    try {
      deleteObject(desertRef)
        .then(async () => {
          toast.success("Congrats! Image Deleted Successfully!");
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
          // Uh-oh, an error occurred!
          toast.error("Something Went Wrong!");
        });
    } catch (error) {
      console.log(error);
    }
    await deleteDoc(doc(firestore, "requests", id));
    // File deleted successfully
    toast.success("Congrats! Entry Deleted Successfully!");
    setLoader(false);
    setIsDelModalOpen(false);
    getData();
  };
  useEffect(() => {
    if (isAdmin) {
      const userTimeDifference = (Date.now() - userReqUpdTime) / 1000 / 60 / 15;
      if (userTimeDifference >= 1 || userRequestState.length === 0) {
        getData();
      }
    } else {
      router.push("/");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 mt-44 lg:mt-28 md:mt-28 mx-auto">
      {loader ? <Loader /> : null}
      <h1 className="text-3xl mb-4 text-center">Request Submitted by Users</h1>
      <button
        type="button"
        className="text-green-400 hover:text-blue-700"
        onClick={getData}
      >
        <i class="bi bi-arrow-clockwise h5"></i>
        <span className="p-1 -mt-4 h5">Reload</span>
      </button>
      <hr />
      {allData.length > 0 ? (
        !isModalOpen &&
        !isDelModalOpen && (
          <div className="my-3 w-full p-10">
            <DataTable
              theme="solarized"
              columns={columns}
              data={filteredData}
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
                    const serarchedData = allData.filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setFilteredData(serarchedData);
                  }}
                />
              }
              subHeaderAlign="right"
              className="bg-black text-white rounded-lg "
              striped
            />
          </div>
        )
      ) : (
        <h5 className="h5">No Requests Found</h5>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isStatic
      >
        <div className="space-y-4">
          <h5 className="h5 font-bold text-gray-800 text-center">
            Request by {requestData.name}
          </h5>
          <div className="mx-auto">
            <div className="flex flex-col space-y-2 justify-center items-center">
              <div className="space-y-2">
                <p className="text-black">
                  <span className="text-gray-400">Token Number:</span>{" "}
                  {requestData.id}
                </p>
                <p className="text-black">
                  <span className="text-gray-400">Name:</span>{" "}
                  {requestData.name}
                </p>
                <p className="text-black">
                  <span className="text-gray-400">Mobile:</span>{" "}
                  {requestData.phone}
                </p>
                <p className="text-black">
                  <span className="text-gray-400">Email:</span>{" "}
                  {requestData.email}
                </p>
                <p className="text-black">
                  <span className="text-gray-400">Message:</span>{" "}
                  {requestData.message}
                </p>
                {requestData.url && (
                  <NextImage
                    src={requestData.url}
                    alt="thumbnail"
                    className="w-full h-full object-cover rounded-md cursor-pointer"
                    width={200}
                    height={200}
                    unoptimized
                    loading="eager"
                    onClick={() => window.open(requestData.url, "_blank")}
                  />
                )}
                <p className="text-black">
                  <span className="text-gray-400">Submitted On:</span>{" "}
                  {DateValueToSring(requestData.date)}
                </p>
                <p className="text-black">
                  <span className="text-gray-400">Status:</span>{" "}
                  {requestData.reply ? requestData.reply : "In Progress"}
                </p>
                {requestData.replyDate && (
                  <p className="text-black">
                    <span className="text-gray-400">Replied On:</span>{" "}
                    {DateValueToSring(requestData.replyDate)}
                  </p>
                )}
                <div className="mb-3 ">
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 text-center"
                    placeholder="Enter Reply"
                    value={editRequestData.reply || ""}
                    onChange={(e) =>
                      setEditRequestData({
                        ...editRequestData,
                        reply: e.target.value,
                      })
                    }
                    cols={30}
                    rows={5}
                  ></textarea>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <Button
                    className={`bg-blue-500 mx-auto`}
                    onClick={() => {
                      if (
                        editRequestData.reply &&
                        editRequestData.reply.length > 0
                      ) {
                        submitReply();
                      } else {
                        toast.error("Please add some message.");
                      }
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    className={`bg-red-500`}
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsDelModalOpen(true);
                      setDelField(requestData);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </div>
      </Modal>
      <Modal
        isOpen={isDelModalOpen}
        onClose={() => setIsDelModalOpen(false)}
        isStatic
      >
        <div className="space-y-4">
          <h5 className="h5 font-bold text-gray-800 text-center">
            Delete Requests
          </h5>
          <div className="mx-auto">
            <div className="flex flex-col space-y-2 justify-center items-center">
              <h5 className="h5 font-bold text-gray-800 text-center">
                Are you sure you want to delete this Requests ?
              </h5>
              <Button
                className={`bg-red-500`}
                onClick={() => deleteFile(delField.imageName, delField.id)}
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
  );
}
