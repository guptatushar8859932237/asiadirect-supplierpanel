
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { AiFillDelete } from "react-icons/ai";
// import { toast, ToastContainer } from "react-toastify";
// import Swal from "sweetalert2";
// import { Box, Button, Modal } from "@mui/material";
// import { FaEdit } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import CloseIcon from "@mui/icons-material/Close";
// const pageSize = 10;

// export default function ManageSupplier() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [inputdata, setInputdata] = useState([]);
//   const [error, setError] = useState({});
//   const [loader, setLoader] = useState(false);
//   const [selectedRoles, setSelectedRoles] = useState([]);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [input, setInput] = useState({
//     supplier_email: "",
//     supplier_name: "",
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = React.useState([]);
//   const navigate = useNavigate();
//   const filterdata = data?.filter((item) => {
//     return (
//       item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
//       item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) 
//     );
//   });
//   const totalPages = Math.ceil(filterdata.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentData = filterdata.slice(startIndex, endIndex);
//   const getdata = () => {
//     setLoader(true);
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
//       .then((response) => {
//         setLoader(false);
//         setData(response.data.data);
//       })
//       .catch((error) => {
//         setLoader(false);
//         console.log(error.response);
//       });
//   };
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   useEffect(() => {
//     getdata();
//   }, []);
//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const handlevalidate = (value) => {
//     let error = {};
//     if (!value.supplier_email) {
//       error.supplier_email = "Email is required";
//     }
//     if (!value.supplier_name) {
//       error.supplier_name = "Name is required";
//     }
//     setError(error);
//     if (Object.keys(error).length === 0) {
//       handleapi();
//     }
//   };
//   const handleapi = () => {
//     const apivali = {
//       supplier_email: input.supplier_email,
//       supplier_name: input.supplier_name,
//     };
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}add-supplier`, apivali)
//       .then((response) => {
//         toast.success(response.data.message);
//         getdata();
//         setIsModalOpen(false);
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };
//   const handleclick = () => {
//     handlevalidate(input);
//   };
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };
//   const handledelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .post(`${process.env.REACT_APP_BASE_URL}delete-supplier`, {
//             staff_id: id,
//           })
//           .then((response) => {
//             toast.success(response.data.message);
//             getdata();
//           })
//           .catch((error) => {
//             toast.error(error.response.data.message);
//           });
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success",
//         });
//       }
//     });
//   };
//   const openModal = () => {
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   const handleupdateapi = (e) => {
//     const { name, value } = e.target;
//     setInputdata({ ...inputdata, [name]: value });
//   };
//   const openModal2 = (id) => {
//     const userlog = data.find((item) => item.id === id);
//     console.log(userlog)
//     if (userlog) {
//       setInputdata({
//         supplier_id: id,
//         supplier_email: userlog.email,
//         supplier_name: userlog.name,
//       });
//     }
//     setIsModalOpen2(true);
//   };
//   const postData1234 = () => {
//     console.log(inputdata);
//     const apivali = {
//       supplier_id: inputdata.supplier_id,
//       supplier_email: inputdata.supplier_email,
//       supplier_name: inputdata.supplier_name,
//     };
//     console.group(apivali)
//       axios
//         .post(`${process.env.REACT_APP_BASE_URL}update-supplier`, apivali)
//         .then((response) => {
//           toast.success(response.data.message);
//           closeModal2();
//           getdata();
//           setIsModalOpen(false);
//         })
//         .catch((error) => {
//           toast.error(error.response.data.message);
//         });
//   };
//   const closeModal2 = () => {
//     setIsModalOpen2(false);
//   };
//   return (
//     <>
//       {loader ? (
//         <div class="loader-container">
//           <div class="loader"></div>
//           <p class="loader-text">Updating... This may take some time</p>
//         </div>
//       ) : (
//         <>
//           <div className="wpWrapper">
//             <div className="container-fluid">
//               <div>
//                 <div>
//                   <div className="row manageFreight">
//                     <div className="col-12">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div className="">
//                           <h4 className="freight_hd">Add Supplier</h4>
//                         </div>
//                         <div className="d-flex justify-content-end align-items-center">
//                           <div className="">
//                             <input
//                               className="px-2 py-1 rounded "
//                               type="text"
//                               placeholder="Search"
//                               value={searchQuery}
//                               onChange={handleSearch}
//                             ></input>
//                           </div>
//                           <div className="ms-2">
//                             <button type="button" onClick={openModal}>
//                               Add
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {isModalOpen && (
//                     <div className="custom-modal">
//                       <div className="custom-modal-content">
//                         <div className="custom-modal-header">
//                           <h5 className="custom-modal-title">Add Staff</h5>
//                           <button
//                             type="button"
//                             className="btn-close"
//                             onClick={closeModal}
//                           >
//                             <CloseIcon />
//                           </button>
//                         </div>
//                         <div className="custom-modal-body">
//                           <div className="mb-3">
//                             <label
//                               htmlFor="exampleFormControlInput1"
//                               className="form-label mb-2 md_staff"
//                             >
//                               Email address
//                             </label>
//                             <input
//                               type="email"
//                               className="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="name@example.com"
//                               onChange={handlechange}
//                               name="supplier_email"
//                             />
//                             <p className="text-danger">{error.supplier_email}</p>
//                           </div>
//                           <div className="mb-3">
//                             <label
//                               htmlFor="inputText"
//                               className="form-label mb-2 md_staff"
//                             >
//                               Full Name
//                             </label>
//                             <div className="col-sm-12">
//                               <input
//                                 type="text"
//                                 onChange={handlechange}
//                                 name="supplier_name"
//                                 className="form-control"
//                                 id="inputText"
//                                 placeholder="Enter your Name"
//                               />
//                               <p className="text-danger">{error.supplier_name}</p>
//                             </div>
//                           </div>
                         
//                         </div>
//                         <div className="custom-modal-footer">
//                           <button
//                             type="button"
//                             className="btn text-white"
//                             onClick={handleclick}
//                             style={{ backgroundColor: "#1b2245" }}
//                           >
//                             Add Member
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   <div className="table-responsive mt-3">
//                     <table className="table table-striped tableICon">
//                       <thead>
//                         <tr>
//                           <th scope="col">Sr.No.</th>
//                           <th scope="col">Full Name</th>
//                           <th scope="col">Email</th>
//                           <th scope="col">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody style={{ border: "none" }}>
//                         {currentData &&
//                           currentData.length > 0 &&
//                           currentData.map((item, index) => {
//                             console.log(item)
//                             return (
//                               <tr className="border-bottom" key={index}>
//                                 <th>{startIndex + index + 1}</th>
//                                 <td>{item.name}</td>
//                                 <td>{item.email}</td>
                               
//                                 <td>
//                                   <div className="action_btn1 d-flex align-items-center">
//                                     <FaEdit
//                                       onClick={() => {
//                                         openModal2(item.id);
//                                       }}
//                                       style={{
//                                         color: "rgb(27 34 69)",
//                                         marginRight: "10px",
//                                         width: "20px",
//                                         height: "15px",
//                                         cursor: "pointer",
//                                       }}
//                                     />
//                                     <AiFillDelete
//                                       className="text-danger"
//                                       style={{ cursor: "pointer" }}
//                                       onClick={() => {
//                                         handledelete(item.id);
//                                       }}
//                                     />
//                                   </div>
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                       </tbody>
//                     </table>
//                     <div className="text-center d-flex justify-content-end align-items-center">
//                       <button
//                         disabled={currentPage === 1}
//                         className="bg_page"
//                         onClick={() => handlePageChange(currentPage - 1)}
//                       >
//                         {" "}
//                         <i class="fi fi-rr-angle-small-left page_icon"></i>
//                       </button>
//                       <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
//                       <button
//                         disabled={currentPage === totalPages}
//                         className="bg_page"
//                         onClick={() => handlePageChange(currentPage + 1)}
//                       >
//                         <i class="fi fi-rr-angle-small-right page_icon"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <Modal
//                   open={isModalOpen2}
//                   onClose={closeModal2}
//                   aria-labelledby="modal-modal-title"
//                   aria-describedby="modal-modal-description"
//                 >
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: "translate(-50%, -50%)",
//                     }}
//                   >
//                     <div className="modal-header">
//                       <h2 id="modal-modal-title">Edit Staff</h2>
//                       <button className="btn btn-close" onClick={closeModal2}>
//                         <CloseIcon />
//                       </button>
//                     </div>
//                     <div className="newModalGap">
//                       <div className="row">
//                         <div className="col-12">
//                           <label
//                             htmlFor="exampleFormControlInput1"
//                             className="ware_label"
//                           >
//                             Email address
//                           </label>
//                           <input
//                             type="email"
//                             className="form-control mb-3"
//                             value={inputdata?.supplier_email}
//                             id="exampleFormControlInput1"
//                             placeholder="name@example.com"
//                             onChange={handleupdateapi}
//                             name="supplier_email"
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-12">
//                           <label htmlFor="inputText" className="ware_label">
//                             Full Name
//                           </label>
//                           <input
//                             type="text"
//                             onChange={handleupdateapi}
//                             name="supplier_name"
//                             value={inputdata?.supplier_name}
//                             className="form-control mb-3"
//                             id="inputText"
//                             placeholder="Enter your Name"
//                           />
//                         </div>
//                       </div>
                    
//                       <div className="text-center mt-2 unsetLt">
//                         <Button
//                           variant="contained"
//                           className="submit_btn"
//                           onClick={postData1234}
//                         >
//                           Submit
//                         </Button>
//                       </div>
//                     </div>
//                   </Box>
//                 </Modal>
//               </div>
//             </div>
//           </div>
//           <ToastContainer />
//         </>
//       )}
//     </>
//   );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Box, Button, Modal } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
const pageSize = 10;
export default function ManageSupplier() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [input, setInput] = useState({
    supplier_email: "",
    supplier_name: "",
    supplier_phone: "",
    supplier_country: "",
    supplier_profile: null,
  });
  const [inputdata, setInputdata] = useState({
    supplier_id: "",
    supplier_email: "",
    supplier_name: "",
    supplier_phone: "",
    supplier_country: "",
    supplier_profile: null,
  });
  // ---------------- FETCH DATA ----------------
  const getdata = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
      .then((response) => {
        setLoader(false);
        setData(response.data.data);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };
  useEffect(() => {
    getdata();
  }, []);
  // ---------------- SEARCH + PAGINATION ----------------
  const filterdata = data?.filter((item) => {
    return (
      item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  });
  const totalPages = Math.ceil(filterdata.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filterdata.slice(startIndex, startIndex + pageSize);
  // ---------------- HANDLE INPUT (ADD) ----------------
  const handlechange = (e) => {
    const { name, value, files } = e.target;
    if (name === "supplier_profile") {
      setInput((prev) => ({ ...prev, supplier_profile: files[0] }));
    } else {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };
  // ---------------- ADD SUPPLIER ----------------
  const handleAddSupplier = () => {
    const formData = new FormData();
    formData.append("supplier_email", input.supplier_email);
    formData.append("supplier_name", input.supplier_name);
    formData.append("supplier_phone", input.supplier_phone);
    formData.append("supplier_country", input.supplier_country);
    formData.append("supplier_profile", input.supplier_profile);
    formData.append("user_type", "1");
    axios
      .post(`${process.env.REACT_APP_BASE_URL}add-supplier`, formData)
      .then((res) => {
        toast.success(res.data.message);
        setIsModalOpen(false);
        getdata();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  // ---------------- DELETE SUPPLIER ----------------
  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}delete-supplier`, {
            staff_id: id,
          })
          .then((res) => {
            toast.success(res.data.message);
            getdata();
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    });
  };
  // ---------------- OPEN EDIT MODAL ----------------
  const openModal2 = (id) => {
    const usr = data.find((p) => p.id === id);
    if (usr) {
      setInputdata({
        supplier_id: usr.id,
        supplier_email: usr.email,
        supplier_name: usr.name,
        supplier_phone: usr.phone,
        supplier_country: usr.country,
        supplier_profile: null,
      });
    }
    setIsModalOpen2(true);
  };
  // ---------------- HANDLE UPDATE INPUT ----------------
  const handleupdateapi = (e) => {
    const { name, value, files } = e.target;
    if (name === "supplier_profile") {
      setInputdata({ ...inputdata, supplier_profile: files[0] });
    } else {
      setInputdata({ ...inputdata, [name]: value });
    }
  };
  // ---------------- UPDATE API ----------------
  const postData1234 = () => {
    const formData = new FormData();
    formData.append("supplier_id", inputdata.supplier_id);
    formData.append("supplier_email", inputdata.supplier_email);
    formData.append("supplier_name", inputdata.supplier_name);
    formData.append("supplier_phone", inputdata.supplier_phone);
    formData.append("supplier_country", inputdata.supplier_country);
    if (inputdata.supplier_profile) {
      formData.append("supplier_profile", inputdata.supplier_profile);
    }
    axios
      .post(`${process.env.REACT_APP_BASE_URL}update-supplier`, formData)
      .then((res) => {
        toast.success(res.data.message);
        setIsModalOpen2(false);
        getdata();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      {loader ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="wpWrapper">
            <div className="container-fluid">
              <div className="d-flex justify-content-between my-3">
                <h4>Manage Supplier</h4>

                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="Search"
                    className="px-2 py-1"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <button className="btn btn-primary ms-2" onClick={() => setIsModalOpen(true)}>
                    Add Supplier
                  </button>
                </div>
              </div>
              {/* ---------------- TABLE ---------------- */}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Country</th>
                      <th>Profile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((item, index) => (
                      <tr key={index}>
                        <td>{startIndex + index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.country}</td>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_IMG_URL}${item.profile}`}
                            style={{
                              width: "45px",
                              height: "45px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            alt="profile"
                          />
                        </td>
                        <td>
                          <FaEdit
                            onClick={() => openModal2(item.id)}
                            style={{
                              color: "#1b2245",
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                          />
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => handledelete(item.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* PAGINATION */}
                <div className="d-flex justify-content-end align-items-center my-3">
                  <button
                    disabled={currentPage === 1}
                    className="bg_page"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    ◀
                  </button>
                  <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                  <button
                    disabled={currentPage === totalPages}
                    className="bg_page"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------- ADD SUPPLIER MODAL ---------------- */}
          {isModalOpen && (
            <div className="custom-modal">
              <div className="custom-modal-content">
                <div className="custom-modal-header">
                  <h5>Add Supplier</h5>
                  <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                    <CloseIcon />
                  </button>
                </div>
                <div className="custom-modal-body">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control mb-2"
                    name="supplier_email"
                    onChange={handlechange}
                  />
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="supplier_name"
                    onChange={handlechange}
                  />
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="supplier_phone"
                    onChange={handlechange}
                  />
                  <label>Country</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="supplier_country"
                    onChange={handlechange}
                  />
                  <label>Profile Image</label>
                  <input
                    type="file"
                    className="form-control mb-2"
                    name="supplier_profile"
                    onChange={handlechange}
                  />
                </div>
                <div className="custom-modal-footer">
                  <button className="btn btn-primary" onClick={handleAddSupplier}>
                    Add Supplier
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* ---------------- EDIT SUPPLIER MODAL ---------------- */}
          <Modal open={isModalOpen2} onClose={() => setIsModalOpen2(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "white",
                p: 3,
                borderRadius: 2,
                width:"30%",
              }}
            >
              <div className="modal-header">
                <h4>Edit Supplier</h4>
                <button className="btn-close" onClick={() => setIsModalOpen2(false)}>
                  <CloseIcon />
                </button>
              </div>
              <label>Email</label>
              <input
                type="email"
                className="form-control mb-2"
                name="supplier_email"
                value={inputdata.supplier_email}
                onChange={handleupdateapi}
              />
              <label>Name</label>
              <input
                type="text"
                className="form-control mb-2"
                name="supplier_name"
                value={inputdata.supplier_name}
                onChange={handleupdateapi}
              />
              <label>Phone</label>
              <input
                type="text"
                className="form-control mb-2"
                name="supplier_phone"
                value={inputdata.supplier_phone}
                onChange={handleupdateapi}
              />
              <label>Country</label>
              <input
                type="text"
                className="form-control mb-2"
                name="supplier_country"
                value={inputdata.supplier_country}
                onChange={handleupdateapi}
              />
              <label>Profile Image</label>
              <input
                type="file"
                className="form-control mb-3"
                name="supplier_profile"
                onChange={handleupdateapi}
              />
              <Button variant="contained" fullWidth onClick={postData1234}>
                Update Supplier
              </Button>
            </Box>
          </Modal>
          <ToastContainer />
        </>
      )}
    </>
  );
}
