// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Box, Button, Modal } from "@mui/material";
// import { FaEdit } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
// import CloseIcon from "@mui/icons-material/Close";
// const pageSize = 10;
// export default function Contactus() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [file, setFile] = useState(null);
//   const [countries, setcountries] = useState([]);
//   const [inputdata, setInputdata] = useState([]);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen1, setIsModalOpen1] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };
//   const totalPage = Math.ceil(data.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentdata = data.slice(startIndex, endIndex);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const openModal1 = () => {
//     setIsModalOpen1(true);
//   };
//   const closeModal1 = () => {
//     setIsModalOpen1(false);
//   };
 
//   useEffect(() => {
//     getcountry();
//   }, []);
//   const getcountry = () => {
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
//       .then((response) => {
//         setcountries(response.data.data);
//       })
//       .catch((error) => {
//         console.log(error.response.data.data);
//       });
//   };
//   useEffect(() => {
//     getwarehouse();
//   }, []);
//   const getwarehouse = () => {
//     setLoader(true);
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}getContactUs`)
//       .then((response) => {
//         console.log(response.data);
//         setLoader(false);
//         setData(response.data.data);
//       })
//       .catch((error) => {
//         setLoader(false);
//         console.log(error.response.data.message);
//       });
//   };
//   const postData = () => {
//     if (file) {
//       const formdata = new FormData();
//       formdata.append("file", file);
//       console.log("asdfhdfh");
//       axios
//         .post(`${process.env.REACT_APP_BASE_URL}UploadExcelWarehouse`, formdata)
//         .then((response) => {
//           if (response.data.success === true) {
//             toast.success(response.data.message);
//             closeModal1();
//           }
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     } else {
//       console.log("No file selected");
//     }
//   };
//   const openModal2 = (id) => {
//     const getuser = data.filter((item) => {
//       return item.id === id;
//     });
//     console.log(getuser);
//     const getsingleuser = getuser[0];
//     setInputdata({
//       id: getsingleuser.id,
//       contact: getsingleuser.contact,
//       contact_person: getsingleuser.contact_person,
//       country: getsingleuser.country,
//       email: getsingleuser.email,
//       mobile_number: getsingleuser.mobile_number,
//       town: getsingleuser.town,
//       warehouse_address: getsingleuser.warehouse_address,
//       warehouse_name: getsingleuser.warehouse_name,
//       warehouse_number: getsingleuser.warehouse_numbere,
//     });
//     setIsModalOpen2(true);
//   };
//   const closeModal2 = () => {
//     setIsModalOpen2(false);
//   };
 
  
//   const deletewarehouse = (id) => {
//     const datadelete = {
//       warehouse_id: id,
//     };
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}DeleteWarehouse`, datadelete)
//       .then((response) => {
//         toast.success(response.data.message);
//         getwarehouse();
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   };
//   return (
//     <>
//       {loader ? (
//         <div class="loader-container">
//           <div class="loader"></div>
//           <p class="loader-text">Updating... This may take some time</p>
//         </div>
//       ) : (
//         <div className="wpWrapper">
//           <div className="container-fluid">
//             <div>
//               <div>
//                 <div className="row  manageFreight">
//                   <div className="col-12">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h4 className="freight_hd">Warehouse List</h4>
//                       </div>
//                       <div className="d-flex justify-content-end align-items-center">
//                         <div className="mx-2">
//                           <button onClick={openModal1}>Add Warehouse</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="table-responsive mt-3">
//                   <table className="table table-striped tableICon">
//                     <thead>
//                       <tr>
//                         <th>Sr.No.</th>
//                         <th>Name</th>
//                         <th>Country</th>
//                         <th>Email</th>
//                         <th>Message</th>
//                         <th>Nature of Enq</th>
// ​
//                         <th>phone_no</th>
//                         <th>subject</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentdata &&
//                         currentdata.length > 0 &&
//                         currentdata.map((item, index) => {
//                             console.log(item);
//                             return(
//  <tr key={item.id}>
//                             <td>{startIndex + index + 1}</td>
//                             <td>{item.name}</td>
//                             <td>{item.country}</td>
//                             <td>{item.email}</td>
//                             <td>{item.nature_of_enq}</td>
//                             <td>{item.phone_no}</td>
//                             <td>{item.subject}</td>
//                             <td>{item.message}</td>
//                             <td>
//                               <FaEdit
//                                 onClick={() => {
//                                   openModal2(item.id);
//                                 }}
//                                 style={{
//                                   color: "rgb(27 34 69)",
//                                   marginRight: "10px",
//                                   width: "20px",
//                                   height: "15px",
//                                   cursor: "pointer",
//                                 }}
//                               />
//                               <AiFillDelete
//                                 onClick={() => {
//                                   deletewarehouse(item.id);
//                                 }}
//                                 style={{
//                                   color: "rgb(27 34 69)",
//                                   marginRight: "10px",
//                                   width: "20px",
//                                   height: "15px",
//                                   cursor: "pointer",
//                                 }}
//                               />
//                             </td>
//                           </tr>
//                             )
//                         }
                         
//                         )}
//                     </tbody>
//                   </table>
//                   <div className="text-center d-flex justify-content-end align-items-center">
//                     <button
//                       disabled={currentPage === 1}
//                       className="bg_page"
//                       onClick={() => handlePageChange(currentPage - 1)}
//                     >
//                       <i class="fi fi-rr-angle-small-left page_icon"></i>
//                     </button>
//                     <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
//                     <button
//                       disabled={currentPage === totalPage}
//                       className="bg_page"
//                       onClick={() => handlePageChange(currentPage + 1)}
//                     >
//                       <i class="fi fi-rr-angle-small-right page_icon"></i>
//                     </button>
//                   </div>
//                   <ToastContainer />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
const pageSize = 10;
export default function Contactus() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const totalPage = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = data.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    getContactList();
  }, []);
  const getContactList = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getContactUs`)
      .then((response) => {
        setLoader(false);
        setData(response.data.data || []);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error.response?.data?.message || error.message);
        toast.error("Failed to fetch contact data.");
      });
  };
  // ✅ Delete a contact record
  const deleteContact = (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    axios
      .post(`${process.env.REACT_APP_BASE_URL}DeleteContactUs`, { id })
      .then((response) => {
        toast.success(response.data.message);
        getContactList();
      })
      .catch((error) => {
        console.log(error.response?.data);
        toast.error("Failed to delete record");
      });
  };
  return (
    <>
      {loader ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">Loading... Please wait</p>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="row manageFreight">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="freight_hd">Contact Us Enquiries</h4>
                </div>
              </div>
            </div>
            <div className="table-responsive mt-3">
              <table className="table table-striped tableICon">
                <thead>
                  <tr>
                    <th>Sr.No.</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Subject</th>
                    <th>Nature of Enquiry</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentdata && currentdata.length > 0 ? (
                    currentdata.map((item, index) => (
                      <tr key={item.id}>
                        <td>{startIndex + index + 1}</td>
                        <td>{item.name || "-"}</td>
                        <td>{item.country || "-"}</td>
                        <td>{item.email || "-"}</td>
                        <td>{item.phone_no || "-"}</td>
                        <td>{item.subject || "-"}</td>
                        <td>{item.nature_of_enq || "-"}</td>
                        <td>{item.message || "-"}</td>
                        <td>
                          <FaEdit
                            title="Edit (future)"
                            style={{
                              color: "#1b2245",
                              marginRight: "10px",
                              width: "20px",
                              height: "15px",
                              cursor: "pointer",
                              opacity: 0.5,
                            }}
                          />
                          <AiFillDelete
                            title="Delete"
                            onClick={() => deleteContact(item.id)}
                            style={{
                              color: "red",
                              width: "20px",
                              height: "18px",
                              cursor: "pointer",
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPage > 1 && (
                <div className="text-center d-flex justify-content-end align-items-center">
                  <button
                    disabled={currentPage === 1}
                    className="bg_page"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <i className="fi fi-rr-angle-small-left page_icon"></i>
                  </button>
                  <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
                  <button
                    disabled={currentPage === totalPage}
                    className="bg_page"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <i className="fi fi-rr-angle-small-right page_icon"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
