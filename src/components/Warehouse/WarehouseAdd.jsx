import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Modal, Grid, TextField, Box, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Password } from "@mui/icons-material";

const pageSize = 10;
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
export default function WarehouseAdd() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [prodata, setProdata] = useState("");
  // const [prodata, setProdata] = useState("");
  const [productData, setProductData] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderID122, setOrderId122] = useState(false);
  const [modalid,setModalid] = useState(null);
  const [warehouseID, setWarehouseID] = useState(null); //
  const [loader, setLoader] = useState(false);
  const [isModalOpenWarehouse, setIsModalOpenWarehouse] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [updatedata, setUpdatedata] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [data1, setData1] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    freightType: "",
    freightSpeed: "",
  });
  const userId = JSON.parse(localStorage.getItem("data123"))?.id;
  const [show1, setShow1] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);

  const handleShow = () => setShow1(true);
  const handleClose = () => setShow1(false);
  const handleSelect = (e) => {
    const selected = e.target.value;
    if (selected && !selectedDocs.find((doc) => doc.name === selected)) {
      setSelectedDocs([...selectedDocs, { name: selected, files: [] }]);
    }
  };
  const handleFileChangefil = (e, docName) => {
    const files = Array.from(e.target.files);
    setSelectedDocs((prev) =>
      prev.map((doc) => (doc.name === docName ? { ...doc, files } : doc)),
    );
  };
  const handleSave = () => {
    console.log("Uploaded Documents:", selectedDocs);
    selectedDocs.forEach((doc) => {
      console.log("Doc Type:", doc);
      doc.files.forEach((file) => {
        console.log("File:", file.name, "| Size:", file.size, "bytes");
      });
    });
    handleClose();
  };
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const handleOpenModal = () => setIsModalOpen(true);

  const handleOpenModal3 = () => setIsModalOpen3(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}getAssignedOrdersBySupplier`,
        { supplier_id: userId },
      );
      setLoader(false);
      if (response.data && response.data.data) {
        console.log(response.data.data);
        setData(response.data.data);
      } else {
        toast.error("No warehouse orders found.");
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching warehouse orders:", error);
      if (error.response && error.response.status === 400) {
        toast.error(
          error.response.data.message || "Data not found or permission denied.",
        );
      } else {
        toast.error("Something went wrong while fetching orders.");
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = data.filter((item) => {
    return (
      item?.client_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.product_desc?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.collection_from_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.nature_of_hazard
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.delivery_to_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.Freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.batch_number?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.freight_number?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  });
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedData({ ...selectedData, [name]: value });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  useEffect(() => {
    updatecountry();
  }, []);
  const updatecountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        setUpdatedata(response.data.data);
      })
      .catch((error) => {
        console.group(error.response.data.message);
      });
  };
  const handleOpenModalWarehouse = () => {
    setOrderId122(false);
    setProdata({
      goods_description: "",
      ware_receipt_no: "",
      total_dimension: "",
      total_weight: "",
      cartons: "",
      express_no: "",
      supplier_contact_no: "",
      CBM: "",
      warehousing_date: "",
      freight: "",
      collection_from: "",
      delivery_to: "",
      client_name: "",
      supplier_id: "",
    });
    setIsModalOpenWarehouse(true);
  };
  const handleCloseModalWarehouse = () => {
    setIsModalOpenWarehouse(false);
  };
  const handlekey = (e) => {
    if (e.charCode < 44 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  const handlechangewarehouse = (e) => {
    const { name, value } = e.target;
    setProdata({ ...prodata, [name]: value });
  };
  const datauserId = JSON.parse(localStorage.getItem("data123"));
  const postDataWarehouse = async () => {
    const payload = {
      goods_description: prodata.goods_description,
      ware_receipt_no: prodata.ware_receipt_no,
      total_dimension: prodata.total_dimension,
      total_weight: prodata.total_weight,
      cartons: prodata.cartons,
      freight: prodata.freight,
      express_no: prodata.express_no,
      supplier_contact_no: prodata.supplier_contact_no,
      CBM: prodata.CBM,
      warehousing_date: prodata.warehousing_date,
      collection_from: prodata.collection_from,
      delivery_to: prodata.delivery_to,
      client_name: prodata.client_name,
      supplier_id: datauserId.id,
    };
    const payload1 = {
      goods_description: prodata.goods_description,
      ware_receipt_no: prodata.ware_receipt_no,
      total_dimension: prodata.total_dimension,
      total_weight: prodata.total_weight,
      cartons: prodata.cartons,
      express_no: prodata.carexpress_notons,
      freight: prodata.freight,
      supplier_contact_no: prodata.supplier_contact_no,
      CBM: prodata.CBM,
      warehousing_date: prodata.warehousing_date,
      collection_from: prodata.collection_from,
      delivery_to: prodata.delivery_to,
      client_name: prodata.client_name,
      supplier_id: prodata.supplier_id,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}createOrderAndWarehouse`,
      warehouseID ? payload1 : payload,
    );
    if (response.data.success === true) {
      toast.success(response.data.message);
      handleCloseModalWarehouse();
      getData();
    } else {
      toast.error(response.data.message);
    }
  };
  const handleClickAssignId = (id) => {
    setOrderId122(true);
    setWarehouseID(id.id);
    setProdata(id);
    setIsModalOpenWarehouse(true);
  };
  const deletewarehouse = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        proceedToDelete(id);
      }
    });
  };
  const proceedToDelete = async (id) => {
    const payload = {
      warehouse_id: id,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}deleteWarehouse`,
      payload,
    );
    if (response.data.success === true) {
      toast.success(response.data.message);
      getData();
    } else {
      toast.error(response.data.message);
    }
  };
  const updateWarehouse = async () => {
    const payload = {
      warehouse_id: warehouseID,
      warehouse_name: prodata.warehouse_name,
      warehouse_address: prodata.warehouse_address,
      country: prodata.country,
      town: prodata.town,
      warehouse_number: prodata.warehouse_number,
      mobile_number: prodata.mobile_number,
      email: prodata.email,
      contact_person: prodata.contact_person,
      user_id: userId,
      user_type: 2,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}getAssignedOrdersBySupplier`,
      payload,
    );
    if (response.data.success) {
      toast.success("Warehouse Updated Successfully");
      handleCloseModalWarehouse();
      getData();
    } else {
      toast.error(response.data.message);
    }
  };

  const handeleclickProduct = async (item) => {
    console.log(item);
    setModalid(item.order_id)
    setProductModalOpen(true);
  };
  const closesetProductModalOpen = () => {
    setProductModalOpen(false);
  };

  const handlechangegetdatainput = (e) => {
    const { name, value } = e.target;
    setProdata({ ...prodata, [name]: value });
  };

  const handleClickAssdsdsdsignId =async()=>{
    //  const tracking_id = `OR000${dataProduct.order_id}`;
       const payload = {
        //  user_id: datauserId.id,
        //  order_id: dataProduct.order_id,
        freight_id: productData.freight_ID,
         added_by: "4",
         warehouse_order_id: modalid,
         product_description: productData.product_description,
         Hazardous: productData.Hazardous,
         date_received: productData.date_received,
         package_type: productData.package_type,
         packages: productData.packages,
         dimension: productData.dimension,
         weight: productData.weight,
         warehouse_ref: productData.warehouse_ref,
         freight: productData.freight,
         groupage_batch_ref: productData.groupage_batch_ref,
         supplier: productData.supplier,
         warehouse_receipt_number: productData.warehouse_receipt_number,
        //  tracking_number: tracking_id,
         date_dspatched: productData.date_dspatched,
         supplier_address: productData.supplier_address,
         warehouse_collect: productData.warehouse_collect,
         costs_to_collect: productData.costs_to_collect,
         port_of_loading: productData.port_of_loading,
         warehouse_dispatch: productData.warehouse_dispatch,
         warehouse_cost: productData.warehouse_cost,
         cost_to_dispatch: productData.cost_to_dispatch,
         waybill_ref: productData.waybill_ref,
         supplier_Email: productData.supplier_Email,
         Supplier_Contact: productData.Supplier_Contact,
       };
       const response = await axios.post(
         `${process.env.REACT_APP_BASE_URL}addWarehouseProduct`,
         payload,
       );
       if (response.data.success === true) {
         toast.success(response.data.message);
         closesetProductModalOpen();
         getData();
       } else {
         toast.error(response.data.message);
       }
  }

  return (
    <>
      {loader ? (
        <div class="loader-container">
          <div class="loader"></div>
          <p class="loader-text">Updating... This may take some time</p>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="row manageFreight">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="freight_hd">Warehouse Order List</h4>
                  </div>
                  <div className="d-flex justify-content-end align-items-center">
                    <div className="">
                      <input
                        className="px-2 py-1 rounded "
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                      ></input>
                    </div>
                    <div className="ms-1"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="  mt-3">
                  <div className="">
                    <div className="table-responsive">
                      <table className="table table-striped tableICon">
                        <tbody>
                          {data &&
                            data.length > 0 &&
                            data.map((item) => {
                              return (
                                <>
                                  <tr key={item.id}>
                                    <td className="list_bd">
                                      <div className="container-fluid">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <div className="d-flex align-items-center">
                                            <p
                                              className="client_nm"
                                              style={{ fontSize: "18px" }}
                                            >
                                              {item.client_name} / OR000
                                              {item.order_id}
                                            </p>
                                            <p
                                              className="fright_no mx-2"
                                              style={{ fontSize: "14px" }}
                                            >
                                              {item.batch_number}
                                            </p>
                                          </div>
                                          <div className="">
                                            <p className="port_date">
                                              {new Date(
                                                item.date,
                                              ).toLocaleDateString("en-GB")}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="row align-items-center">
                                          <div className="col-md-3">
                                            <div className="">
                                              <p
                                                className="origin"
                                                style={{ fontSize: "14px" }}
                                              >
                                                {item.product_desc}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-md-5">
                                            <div className="d-flex align-items-center justify-content-center">
                                              <p className="origin">
                                                {item.collection_from_name}
                                              </p>
                                              <div className="arrow">
                                                <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                              </div>
                                              <p className="origin">
                                                {item.delivery_to_name}
                                                <span className="fright_type">
                                                  (
                                                  {item.Freight
                                                    ? item.Freight
                                                    : item.freight_type}
                                                  )
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-md-2">
                                            <div className="text-center">
                                              <p className="origin">
                                                {item.nature_of_hazard}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-md-2">
                                            <div className="text-end">
                                              <button
                                                onClick={() => {
                                                  handeleclickProduct(item);
                                                }}
                                              >
                                                Add Product
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <div className="d-flex align-items-center">
                                              <p
                                                type="radio"
                                                className="input_user mb-0"
                                              />
                                              {item.assign_to_batch === 0 ? (
                                                <div className="d-flex align-items-center">
                                                  <span className="dot bg-danger me-2"></span>
                                                  <p
                                                    className="text-danger mb-0"
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Batch Not Assigned
                                                  </p>
                                                </div>
                                              ) : (
                                                <div className="d-flex align-items-center">
                                                  <span className="dot bg-success me-2"></span>
                                                  <p
                                                    className="text-success mb-0"
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Batch Assigned
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                      <div className="text-center d-flex justify-content-end align-items-center">
                        <button
                          disabled={currentPage === 1}
                          className="bg_page"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          <i class="fi fi-rr-angle-small-left page_icon"></i>
                        </button>
                        <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
                        <button
                          disabled={currentPage === totalPage}
                          className="bg_page"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          <i class="fi fi-rr-angle-small-right page_icon"></i>
                        </button>
                      </div>
                      <ToastContainer />
                      <Modal
                        open={productModalOpen}
                        onClose={closesetProductModalOpen}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <div className="modal-header">
                            <h2 id="modal-modal-title">
                              {orderID122
                                ? "Edit Warehouse"
                                : "Add Warehouse Product"}
                            </h2>
                            <button
                              className="btn btn-close"
                              onClick={closesetProductModalOpen}
                            >
                              <CloseIcon />
                            </button>
                          </div>
                          <div className="newModalGap noFormaControl">
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Goods Description</label>
                                <input
                                  className="form-control"
                                  name="product_description"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Hazardous</label>
                                <input
                                  className="form-control"
                                  name="Hazardous"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Date Received</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="date_received"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Package Type</label>
                                <input
                                  className="form-control"
                                  name="package_type"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Packages</label>
                                <input
                                  className="form-control"
                                  name="packages"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Dimension</label>
                                <input
                                  className="form-control"
                                  name="dimension"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Weight</label>
                                <input
                                  className="form-control"
                                  name="weight"
                                  onChange={handlechangegetdatainput}
                                  placeholder="0.00"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Warehouse Ref</label>
                                <input
                                  className="form-control"
                                  name="warehouse_ref"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Freight</label>
                                <input
                                  className="form-control"
                                  name="freight"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Groupage Batch Ref</label>
                                <input
                                  className="form-control"
                                  name="groupage_batch_ref"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Warehouse Receipt Number</label>
                                <input
                                  className="form-control"
                                  name="warehouse_receipt_number"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Date Dispatched</label>
                                <input
                                  className="form-control"
                                  name="date_dspatched"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Supplier Address</label>
                                <input
                                  className="form-control"
                                  name="supplier_address"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Warehouse Collect</label>
                                <input
                                  className="form-control"
                                  name="warehouse_collect"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Costs To Collect</label>
                                <input
                                  className="form-control"
                                  name="costs_to_collect"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Port Of Loading</label>
                                <input
                                  className="form-control"
                                  name="port_of_loading"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Warehouse Dispatch</label>
                                <input
                                  className="form-control"
                                  name="warehouse_dispatch"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Warehouse Cost</label>
                                <input
                                  className="form-control"
                                  name="warehouse_cost"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Cost To Dispatch</label>
                                <input
                                  className="form-control"
                                  name="cost_to_dispatch"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Waybill Ref</label>
                                <input
                                  className="form-control"
                                  name="waybill_ref"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Supplier Email</label>
                                <input
                                  className="form-control"
                                  name="supplier_Email"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Supplier Contact</label>
                                <input
                                  className="form-control"
                                  name="Supplier_Contact"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <Button
                              variant="contained"
                              onClick={() => {
                                handleClickAssdsdsdsignId();
                              }}
                            >
                              Add Product
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                      <Modal
                        open={isModalOpenWarehouse}
                        onClose={handleCloseModalWarehouse}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <div className="modal-header">
                            <h2 id="modal-modal-title">
                              {orderID122 ? "Edit Warehouse" : "Add Warehouse"}
                            </h2>
                            <button
                              className="btn btn-close"
                              onClick={handleCloseModalWarehouse}
                            >
                              <CloseIcon />
                            </button>
                          </div>
                          <div className="newModalGap noFormaControl">
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Goods Description</label>
                                <input
                                  className="form-control"
                                  value={prodata.goods_description}
                                  name="goods_description"
                                  onChange={handlechangewarehouse}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Warehouse Receipt Number</label>
                                <input
                                  className="form-control"
                                  name="ware_receipt_no"
                                  value={prodata.ware_receipt_no}
                                  onChange={handlechangewarehouse}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Freight</label>
                                <select
                                  className="form-control"
                                  name="freight"
                                  value={prodata.freight}
                                  onChange={handlechangewarehouse}
                                >
                                  <option>select</option>
                                  <option value="Sea">Sea</option>
                                  <option value="Air">Air</option>
                                  <option value="Road">Road</option>
                                </select>
                                {/* <input
                                  className="form-control"
                                  name="freight"
                                  value={prodata.freight}
                                  onChange={handlechangewarehouse}
                                  placeholder="warehouse name"
                                ></input> */}
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Country of Origin</label>
                                <select
                                  name="collection_from"
                                  value={prodata.collection_from}
                                  onChange={handlechangewarehouse}
                                >
                                  <option value="">Select</option>
                                  {updatedata &&
                                    updatedata.length > 0 &&
                                    updatedata.map((item, index) => {
                                      return (
                                        <>
                                          <option value={item.id}>
                                            {item.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                              <div className="col-6">
                                <label>Delivery To</label>
                                <select
                                  name="delivery_to"
                                  value={prodata.delivery_to}
                                  onChange={handlechangewarehouse}
                                >
                                  <option value="">Select</option>
                                  {updatedata &&
                                    updatedata.length > 0 &&
                                    updatedata.map((item, index) => {
                                      return (
                                        <>
                                          <option value={item.id}>
                                            {item.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Total Dimension</label>
                                <input
                                  className="form-control"
                                  name="total_dimension"
                                  value={prodata.total_dimension}
                                  onChange={handlechangewarehouse}
                                  onKeyPress={handlekey}
                                  placeholder="00*00*00"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Total Weight</label>
                                <input
                                  className="form-control"
                                  name="total_weight"
                                  value={prodata.total_weight}
                                  onChange={handlechangewarehouse}
                                  placeholder="Total Weight"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Cartons</label>
                                <input
                                  className="form-control"
                                  name="cartons"
                                  value={prodata.cartons}
                                  onChange={handlechangewarehouse}
                                  placeholder="000"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Express Number</label>
                                <input
                                  className="form-control"
                                  value={prodata.express_no}
                                  name="express_no"
                                  onChange={handlechangewarehouse}
                                  placeholder="express_no"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Supplier Contact Number</label>
                                <input
                                  className="form-control"
                                  name="supplier_contact_no"
                                  value={prodata.supplier_contact_no}
                                  onChange={handlechangewarehouse}
                                  placeholder="000"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>CBM</label>
                                <input
                                  className="form-control"
                                  value={prodata.CBM}
                                  name="CBM"
                                  onChange={handlechangewarehouse}
                                  placeholder="CBM"
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Warehousing Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="warehousing_date"
                                  value={prodata.warehousing_date}
                                  onChange={handlechangewarehouse}
                                  placeholder="000"
                                ></input>
                              </div>
                              {/* <div className="col-6">
                                <label>Express Number</label>
                                <input
                                  className="form-control"
                                  value={prodata.express_no}
                                  name="express_no"
                                  onChange={handlechangewarehouse}
                                  placeholder="express_no"
                                ></input>
                              </div> */}
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Client Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="client_name"
                                  value={prodata.client_name}
                                  onChange={handlechangewarehouse}
                                  placeholder="000"
                                ></input>
                              </div>
                              {/* <div className="col-6">
                                <label>Express Number</label>
                                <input
                                  className="form-control"
                                  value={prodata.express_no}
                                  name="express_no"
                                  onChange={handlechangewarehouse}
                                  placeholder="express_no"
                                ></input>
                              </div> */}
                            </div>
                            <Button
                              variant="contained"
                              onClick={
                                orderID122 ? updateWarehouse : postDataWarehouse
                              }
                            >
                              {orderID122 ? "Update" : "Save"}
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
