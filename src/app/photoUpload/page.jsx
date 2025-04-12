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
import { v4 as uuid } from "uuid";
import { ImageFolders } from "../../constants";
import Modal from "../../components/design/Modal";
import NextImage from "next/image";
import { compareObjects } from "../../helpers/calculatefunctions.js";
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

export default function PhotoUpload() {
  const router = useRouter();
  const { USER, setUSER, userLogged, slideState, setSlideState } =
    useGlobalContext();
  const docId = uuid().split("-")[0];
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [editFileName, setEditFileName] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputField, setInputField] = useState({
    id: docId,
    description: "",
    uploadedBy: USER.name,
    date: Date.now(),
  });
  const [errInputField, setErrInputField] = useState({
    errDescription: "",
  });
  const [editField, setEditField] = useState({
    original: "",
    description: "",
    id: "",
    fileName: "",
    date: Date.now(),
  });
  const [orgEditField, setorgEditField] = useState({
    original: "",
    description: "",
    id: "",
    fileName: "",
    date: Date.now(),
  });
  const [errEditField, setErrEditField] = useState({
    errDescription: "",
    errFile: "",
  });
  const [data, setData] = useState(false);
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [folder, setFolder] = useState("homeSliderImages");

  const columns = [
    {
      name: "Sl",
      selector: (row, index) => index + 1,
      sortable: true,
      center: +true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      wrap: true,
      center: +true,
    },
    {
      name: "Thumbnail",
      cell: (row) => (
        <img src={row.original} alt="thumbnail" style={{ width: "50px" }} />
      ),
      wrap: true,
      center: +true,
    },
    {
      name: "Download",
      cell: (row) => (
        <a
          href={row.original}
          borderRadius="1.75rem"
          className=" dark:bg-black p-4 text-white dark:text-white border-gray-200 dark:border-slate-800 mx-auto rounded-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      ),
      wrap: true,
      center: +true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Button
          borderRadius="1.75rem"
          className=" dark:bg-yellow-700  text-white dark:text-white border-gray-200 dark:border-slate-800 mx-auto"
          onClick={() => {
            setEditField(row);
            setorgEditField(row);
            setIsModalOpen(true);
          }}
        >
          Edit
        </Button>
      ),
      wrap: true,
      center: +true,
    },

    {
      name: "Delete",
      cell: (row) => (
        <Button
          borderRadius="1.75rem"
          className=" dark:bg-red-800  text-white dark:text-white border-gray-200 dark:border-slate-800 mx-auto"
          onClick={() => {
            deleteFile(row.fileName, row.id);
          }}
        >
          Delete
        </Button>
      ),
      wrap: true,
      center: +true,
    },
  ];

  const getData = async () => {
    setLoader(true);
    setData(true);
    const q = query(collection(firestore, folder));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setDatas(data);
    setFilteredData(data);
    setLoader(false);
  };
  const validForm = () => {
    setErrInputField({
      errDescription: "",
    });
    let isvalid = true;

    if (inputField.description === "") {
      setErrInputField({
        ...errInputField,
        errDescription: "Please Enter Valid Description",
      });
      isvalid = false;
    }
    return isvalid;
  };

  const validEditForm = () => {
    setErrEditField({
      errDescription: "",
      errFile: "",
    });
    let isvalid = true;

    if (editField.description === "") {
      setErrEditField({
        ...errEditField,
        errDescription: "Please Enter Valid Description",
      });
      isvalid = false;
    }

    if (compareObjects(editField, orgEditField)) {
      if (editFile !== null) {
        isvalid = true;
      } else if (
        editField.description !== orgEditField.description &&
        editFile === null
      ) {
        isvalid = true;
      } else {
        isvalid = false;

        setErrEditField({
          ...errEditField,
          errFile: "Please Select a File",
        });
      }
    }
    return isvalid;
  };

  const uploadFiles = () => {
    if (validForm()) {
      if (file == null) {
        toast.error("Upload File First!");
        return;
      } else {
        setLoader(true);
        const filestorageRef = ref(storage, `/${folder}/${docId}-${fileName}`);
        const uploadTask = uploadBytesResumable(filestorageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // // update progress
            setProgress(percent);
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
              // console.log(url);
              try {
                await setDoc(doc(firestore, folder, docId), {
                  description: inputField.description,
                  original: url,
                  id: docId,
                  fileName: `${docId}-${fileName}`,
                  date: Date.now(),
                  uploadedBy: USER.name,
                });
                if (folder === "homeSliderImages") {
                  setSlideState([
                    ...slideState,
                    {
                      description: inputField.description,
                      original: url,
                      id: docId,
                      fileName: `${docId}-${fileName}`,
                      date: Date.now(),
                      uploadedBy: USER.name,
                    },
                  ]);
                }
                toast.success("Congrats! Image Uploaded Successfully!");

                setLoader(false);

                setInputField({
                  id: docId,
                  description: "",
                  uploadedBy: USER.name,
                  date: Date.now(),
                });
                setFileName("");
                setProgress(0);
                setData(false);
                setFile(null);
                getData();
                if (typeof window !== "undefined") {
                  // browser code
                  document.getElementById("file-upload").value = "";
                  document.getElementById("progress-bar").style.width = 0;
                }
              } catch (e) {
                toast.success("Image Upload Failed!");
                setLoader(false);
              }
            });
          }
        );
      }
    }
  };

  const deleteFile = (name, id) => {
    setLoader(true);
    const desertRef = ref(storage, `${folder}/${name}`);
    deleteObject(desertRef)
      .then(async () => {
        await deleteDoc(doc(firestore, folder, id));

        if (folder === "homeSliderImages") {
          setSlideState(slideState.filter((item) => item.id !== id));
        }

        // File deleted successfully
        toast.success("Congrats! File Deleted Successfully!");
        setLoader(false);
        getData();
      })
      .catch((error) => {
        setLoader(false);
        // Uh-oh, an error occurred!
        toast.error("Something Went Wrong!");
      });
  };

  const updateSlide = async () => {
    if (validEditForm()) {
      setLoader(true);
      if (editFile) {
        try {
          const desertRef = ref(storage, `${folder}/${editField.fileName}`);
          await deleteObject(desertRef);
          const filestorageRef = ref(
            storage,
            `/${folder}/${docId}-${editFileName}`
          );
          const uploadTask = uploadBytesResumable(filestorageRef, editFile);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              // // update progress
              setProgress(percent);
            },
            (err) => console.log(err),
            () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                // console.log(url);

                try {
                  await updateDoc(doc(firestore, folder, editField.id), {
                    description: editField.description,
                    original: url,
                    fileName: `${docId}-${editFileName}`,
                  });
                  if (folder === "homeSliderImages") {
                    let x = slideState.filter(
                      (el) => el.id === editField.id
                    )[0];
                    x.description = editField.description;
                    x.original = url;
                    x.fileName = `${docId}-${editFileName}`;
                    let y = slideState.filter((el) => el.id !== editField.id);
                    y = [...y, x];
                    setSlideState(y);

                    toast.success(
                      "Congrats! Slide Image added Successfully to MongoDB!"
                    );
                  }
                  toast.success("Congrats! Image Uploaded Successfully!");

                  setLoader(false);

                  setData(false);
                  setFile(null);
                  setIsModalOpen(false);
                  getData();
                  if (typeof window !== "undefined") {
                    // browser code
                    document.getElementById("file-upload").value = "";
                    document.getElementById("progress-bar").style.width = 0;
                  }
                } catch (e) {
                  console.log(e);
                  toast.success("Image Upload Failed!");
                  setLoader(false);
                }
              });
            }
          );
        } catch (error) {
          console.log(error);
          setLoader(false);
          toast.error("Failed to Update Slide Image!");
          setEditField({
            description: "",
            original: "",
            id: "",
            fileName: "",
          });

          if (typeof window !== "undefined") {
            // browser code
            document.getElementById("file-upload").value = "";
          }
        }
      } else {
        try {
          await updateDoc(doc(firestore, folder, editField.id), {
            description: editField.description,
          });
          if (folder === "homeSliderImages") {
            let x = slideState.filter((el) => el.id === editField.id)[0];
            x.description = editField.description;
            let y = slideState.filter((el) => el.id !== editField.id);
            y = [...y, x];
            setSlideState(y);
          }
          toast.success("Congrats! Image Uploaded Successfully!");

          setLoader(false);

          setInputField({
            title: "",
            description: "",
            url: "",
          });

          setData(false);
          setFile(null);
          getData();
          if (typeof window !== "undefined") {
            // browser code
            document.getElementById("file-upload").value = "";
            document.getElementById("progress-bar").style.width = 0;
          }
        } catch (e) {
          console.log(e);
          toast.success("Image Upload Failed!");
          setLoader(false);
        }
      }
    } else {
      toast.error("Please Fill All Fields or No Changes Detected!");
      setLoader(false);
    }
  };
  const resizeImage = (image) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set target dimensions
      const maxWidth = 1000;
      const maxHeight = 600;

      // Calculate new dimensions maintaining aspect ratio
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw resized image
      ctx.drawImage(image, 0, 0, width, height);

      // Convert to blob with compression
      canvas.toBlob(
        (blob) => resolve(blob),
        "image/jpeg",
        0.7 // 70% quality
      );
    });
  };
  useEffect(() => {
    USER.isAdmin === false && router.push("/");
    document.title = "MLA Sukanta Kumar Paul: Admin Upload Image";
    //eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 mt-44 lg:mt-28 md:mt-28 mx-auto">
      {loader ? <Loader /> : null}
      <h1 className="text-3xl mb-4 text-center">Upload Images to Server</h1>
      <hr />
      <div className="flex flex-col items-center justify-center mx-auto">
        <h5 className="text-center text-primary mb-3">Select Folder Name</h5>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3"
          defaultValue={folder}
          onChange={(e) => {
            setFolder(e.target.value);
          }}
          aria-label="Default select example"
        >
          {/* <option value="">Select Folder Name</option>
              <option value="galaryimages">Galary Images</option>
              <option value="homeSliderImages">Homepage Slides</option>
              <option value="images">Images</option>
              <option value="otherimages">Other Images</option> */}
          {ImageFolders.map((item) => {
            return (
              <option key={item.id} value={item.folderName}>
                {item.title}
              </option>
            );
          })}
        </select>

        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3"
          placeholder="Enter Description"
          value={inputField.description}
          onChange={(e) =>
            setInputField({
              ...inputField,
              description: e.target.value,
            })
          }
          rows={5}
          cols={5}
        />
        {errInputField.errDescription.length > 0 && (
          <span className="error">{errInputField.errDescription}</span>
        )}
        <h5 className="text-center text-primary">Select Image</h5>
        <input
          type="file"
          id="file-upload"
          className="block w-full cursor-pointer border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400 my-3"
          placeholder="Upload Document"
          onChange={async (e) => {
            const uploadedfile = e.target.files[0];
            if (uploadedfile && uploadedfile.type.startsWith("image/")) {
              const img = new Image();
              img.src = URL.createObjectURL(uploadedfile);
              setFileName(uploadedfile.name);
              img.onload = async () => {
                const resizedBlob = await resizeImage(img);
                setFile(resizedBlob);
              };
            } else {
              toast.error("Please select a valid image file.");
              setFile(null);
              if (typeof window !== "undefined") {
                // browser code
                document.getElementById("file-upload").value = "";
              }
            }
          }}
          accept="image/*"
        />
        {file && (
          <div className="my-3">
            <div style={{ position: "relative", display: "inline-block" }}>
              <NextImage
                src={file ? URL.createObjectURL(file) : ""}
                alt="img"
                width={100}
                height={100}
                style={{ width: "40vw", height: "auto" }}
              />
              <button
                onClick={() => {
                  setFile(null);
                  setProgress(0);
                  setInputField({
                    title: "",
                    description: "",
                    url: "",
                  });
                  if (typeof window !== "undefined") {
                    // browser code
                    document.getElementById("file-upload").value = "";
                    document.getElementById("progress-bar").style.width = 0;
                  }
                  setErrInputField({
                    errTitle: "",
                    errDescription: "",
                  });
                }}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
        <div
          className="progress-bar my-3"
          id="progress-bar"
          style={{
            width: progress + "%",
            height: "15px",
            backgroundColor: "purple",
            borderRadius: "10px",
            transformOrigin: "start",
          }}
        ></div>
        <div className="my-3">
          <Button
            borderRadius="1.75rem"
            className=" dark:bg-black text-white dark:text-white border-gray-200 dark:border-slate-800"
            onClick={() => {
              uploadFiles();
            }}
          >
            Upload Image
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mx-auto">
        {!data ? (
          <Button
            borderRadius="1.75rem"
            className=" dark:bg-black p-2 text-white dark:text-white border-gray-200 dark:border-slate-800"
            onClick={() => {
              getData();
            }}
          >
            Get Uploaded Images
          </Button>
        ) : (
          <Button
            borderRadius="1.75rem"
            className=" dark:bg-black p-2 text-white dark:text-white border-gray-200 dark:border-slate-800"
            onClick={() => setData(false)}
          >
            Hide Uploaded Files
          </Button>
        )}
      </div>
      {data && datas.length > 0 && (
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
                  const serarchedData = datas.filter((item) =>
                    item.description
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                  setFilteredData(serarchedData);
                }}
              />
            }
            subHeaderAlign="right"
            className="bg-black text-white rounded-lg "
          />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isStatic
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Slide Photos
          </h2>
          <p className="text-gray-600">
            This is a sleek modal component with Tailwind styling. You can add
            any content here!
          </p>
          <div className="mx-auto">
            <div className="mb-3">
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3"
                placeholder="Enter Description"
                value={editField.description}
                onChange={(e) =>
                  setEditField({ ...editField, description: e.target.value })
                }
                cols="30"
                rows="5"
              ></textarea>
            </div>
            {errEditField.errDescription.length > 0 && (
              <span className="error">{errEditField.errDescription}</span>
            )}
            <div className="mb-3">
              <input
                type="file"
                className="block w-full cursor-pointer border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400 my-3"
                placeholder="Upload Document"
                id="edit_file_upload"
                onChange={async (e) => {
                  const uploadedfile = e.target.files[0];
                  if (uploadedfile && uploadedfile.type.startsWith("image/")) {
                    const img = new Image();
                    img.src = URL.createObjectURL(uploadedfile);
                    setEditFileName(uploadedfile.name);
                    img.onload = async () => {
                      const resizedBlob = await resizeImage(img);
                      setEditFile(resizedBlob);
                    };
                  } else {
                    toast.error("Please select a valid image file.");
                    setEditFile(null);
                    if (typeof window !== "undefined") {
                      // browser code
                      document.getElementById("edit_file_upload").value = "";
                    }
                  }
                }}
              />
              <div className="m-2 mx-auto">
                {editFile && (
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <NextImage
                      src={editFile ? URL.createObjectURL(editFile) : ""}
                      alt="img"
                      width={100}
                      height={100}
                      style={{ width: "200px", height: "auto" }}
                    />
                    <button
                      onClick={() => {
                        setEditFile(null);
                        setEditFileName("");
                        setProgress(0);
                        if (document.getElementById("edit_file_upload")) {
                          document.getElementById("edit_file_upload").value =
                            "";
                        }
                      }}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
                {!editFile && (
                  <img
                    src={orgEditField.original}
                    alt="thumbnail"
                    style={{ width: "200px" }}
                    className="my-4 mx-auto"
                  />
                )}
              </div>
            </div>
            {errEditField.errFile.length > 0 && (
              <span className="error">{errEditField.errFile}</span>
            )}
            <div
              className="progress-bar mb-3"
              style={{
                width: progress + "%",
                height: "15px",
                backgroundColor: "purple",
                borderRadius: "10px",
                transformOrigin: "start",
              }}
            ></div>
          </div>
          <div className="flex justify-end space-x-3">
            <div className="mb-3">
              <Button
                borderRadius="1.75rem"
                className=" dark:bg-black p-2 text-white dark:text-white border-gray-200 dark:border-slate-800"
                onClick={updateSlide}
              >
                Update Image
              </Button>
              <Button
                borderRadius="1.75rem"
                className=" dark:bg-black p-2 text-white dark:text-white border-gray-200 dark:border-slate-800"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditField({
                    original: "",
                    description: "",
                    id: "",
                    fileName: "",
                  });
                  setorgEditField({
                    original: "",
                    description: "",
                    id: "",
                    fileName: "",
                  });
                  setEditFile(null);
                  setEditFileName("");
                  setProgress(0);
                  if (document.getElementById("edit_file_upload")) {
                    document.getElementById("edit_file_upload").value = "";
                  }
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
