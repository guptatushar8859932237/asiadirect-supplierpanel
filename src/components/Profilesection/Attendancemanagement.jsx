import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Box, Button, Modal } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
const pageSize = 10;
export default function Attendancemanagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [pagenationData, setPagenationData] = useState(1);

  const [input, setInput] = useState({
    leave_from: "",
    leave_to:"" ,
    reason: ""
  });

  const [inputdata, setInputdata] = useState({
   leave_from: "",
    leave_to:"" ,
    reason: ""
  });

  // ---------------- FETCH DATA ----------------
  const getdata = async (page = 1, search = "") => {
    try {
      setLoader(true);

      const payload = {
        page: page,
        limit: pageSize,
        search: search,
        supplier_id:supplier_id.id
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}getMySupplierLeaves`,
        payload
      );
      console.log(response.data.data)
      setData(response.data.data);
      setPagenationData(response.data);
    } catch (error) {
      toast.error("Error fetching suppliers");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getdata(currentPage, searchQuery);
  }, []);

  const totalPages = Math.ceil(pagenationData.total / pagenationData.limit);

  // ---------------- HANDLE INPUT (ADD) ----------------
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
const supplier_id = JSON.parse(localStorage.getItem("data123"))
  // ---------------- ADD SUPPLIER ----------------
  const handleAddSupplier = () => {
    const data = {
      supplier_id:supplier_id.id ,
    leave_from:input.leave_from ,
    leave_to: input.leave_to,
    reason: input.reason
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}applySupplierLeave`, data)
      .then((res) => {
        toast.success(res.data.message || "Apply Supplier Leave successfully!");
        setIsModalOpen(false);
        getdata();
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data?.message || "Invalid input!");
        } else if (error.request) {
          toast.error("Network error! Server not responding.");
        } else {
          toast.error("Unexpected error: " + error.message);
        }
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
          .post(`${process.env.REACT_APP_BASE_URL}deleteFreightForwarder`, {
            id: id,
          })
          .then((res) => {
            toast.success(res.data.message);
            getdata();
          })
          .catch((err) => {
            toast.error(err.response?.data?.message || "Delete failed!");
          });
      }
    });
  };

const openModal2 = (id) => {
  const usr = data.find((p) => p.id === id);

  if (usr) {
    setInputdata({
      id: usr.id,
      leave_from: usr.leave_from
        ? usr.leave_from.split("T")[0]
        : "",
      leave_to: usr.leave_to
        ? usr.leave_to.split("T")[0]
        : "",
      reason: usr.reason || "",
    });
  }

  setIsModalOpen2(true);
};


  // ---------------- HANDLE UPDATE INPUT ----------------
  const handleupdateapi = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile") {
      setInputdata((prev) => ({ ...prev, profile: files[0] }));
    } else {
      setInputdata((prev) => ({ ...prev, [name]: value }));
    }
  };

const postData1234 = () => {
  const payload = {
    id: inputdata.id,

    leave_from: inputdata.leave_from
      ? new Date(inputdata.leave_from).toISOString()
      : null,

    leave_to: inputdata.leave_to
      ? new Date(inputdata.leave_to).toISOString()
      : null,

    reason: inputdata.reason,
  };

  axios
    .post(`${process.env.REACT_APP_BASE_URL}updateSupplierLeave`, payload)
    .then((res) => {
      toast.success(res.data.message);
      setIsModalOpen2(false);
      getdata();
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || "Update failed!");
    });
};


  // ---------------- GET COUNTRIES ----------------

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);
    getdata(1, value); 
  };
  return (
    <>
      <>
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="d-flex justify-content-between my-3">
              <h4>Leave Management</h4>
              <div className="d-flex">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-2 py-1"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => setIsModalOpen(true)}
                >
                 Add Leave
                </button>
              </div>
            </div>
            {/* ---------------- TABLE ---------------- */}
            {loader ? (
              <div className="loader-container">
                <div className="loader"></div>
                <p>Loading...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Leave From</th>
                      <th>Leave To</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Admin Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(item.leave_from).toLocaleDateString("en-GB")}</td>
                        <td>{new Date(item.leave_to).toLocaleDateString("en-GB")}</td>
                        <td>{item.reason}</td>
                        <td>{item?.status===1?"Approve":item?.status===2?"Reject":"Pending"}</td>
                        <td>{item?.admin_remark}</td>
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* PAGINATION */}
                <div className="d-flex justify-content-end align-items-end my-3">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      getdata(currentPage - 1, searchQuery);
                    }}
                  >
                    ◀
                  </button>

                  <span className="mx-2">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      getdata(currentPage + 1, searchQuery);
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ---------------- ADD SUPPLIER MODAL ---------------- */}
        {isModalOpen && (
          <div className="custom-modal">
            <div className="custom-modal-content">
              <div className="custom-modal-header">
                <h5>Apply Leave</h5>
                <button
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="custom-modal-body">
                <label>Leave From</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  name="leave_from"
                  placeholder="test@example.com"
                  onChange={handlechange}
                />
                <label>Leave To</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  name="leave_to"
                  placeholder="Name"
                  onChange={handlechange}
                />
                <label>Add Reason</label>
                <textarea
                  className="form-control mb-2"
                  name="reason"
                  placeholder="Explain Your Reason"
                  onChange={handlechange}
                />
              
              </div>
              <div className="custom-modal-footer">
                <button className="btn btn-primary" onClick={handleAddSupplier}>
                  Add Leave
                </button>
              </div>
            </div>
          </div>
        )}
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
              width: "30%",
            }}
          >
            <div className="modal-header">
              <h4>Edit Leave Application</h4>
              <button
                className="btn-close"
                onClick={() => setIsModalOpen2(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <label>From Date</label>
            <input
              type="date"
              className="form-control mb-2"
              name="leave_from"
              value={inputdata.leave_from}
              onChange={handleupdateapi}
            />
            <label>leave_from</label>
            <input
              type="date"
              className="form-control mb-2"
              name="leave_to"
              value={inputdata.leave_to}
              onChange={handleupdateapi}
            />
            <label>Reason</label>
            <input
              type="text"
              className="form-control mb-2"
              name="reason"
              value={inputdata.reason}
              onChange={handleupdateapi}
            />
            <Button variant="contained" fullWidth onClick={postData1234}>
              Update Leave
            </Button>
          </Box>
        </Modal>
        <ToastContainer />
      </>
    </>
  );
}
