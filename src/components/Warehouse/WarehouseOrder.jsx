import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Button, Select } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
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
export default function WarehouseOrder() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [prodata, setProdata] = useState("");
  const [lcientlist, setLcientlist] = useState([]);
  const [productData, setProductData] = useState("");
  const [editDtaawarehouse, setEditDtaawarehouse] = useState("");
  const [dataProduct, setDataProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showhazardous, setShowhazardous] = useState(false);
  const [editmodalopen, setEditmodalopen] = useState(false);
  const [modalproduct, setModalproduct] = useState(false);
  const [refane, setRefane] = useState({});
  const [reemail, setReemail] = useState({});
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productModalOpen1, setProductModalOpen1] = useState(false);
  const [orderID122, setOrderId122] = useState(false);
  const [warehouseID, setWarehouseID] = useState(null); //
  const [loader, setLoader] = useState(false);
  const [isModalOpenWarehouse, setIsModalOpenWarehouse] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [updatedata, setUpdatedata] = useState(false);
  const userId = JSON.parse(localStorage.getItem("data123"))?.id;
  const [show1, setShow1] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleClose = () => setShow1(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setReemail(selectedOption);
    setRefane(selectedOption);
  };
  const handleOpenModal3 = () => setIsModalOpen3(true);
  useEffect(() => {
    getData();
  }, []);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setShowhazardous(data.hazardous);
  };
  const getData = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}GetSupplierCreatedWarehouseOrders?supplier_id=${userId}`,
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
  const sdsdsd = (id) => {
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

  const handleProduct = (item) => {
    console.log(item);
    setDataProduct(item);
    setProductModalOpen(true);
  };
  const handleProductview = (item) => {
    setSelectedDocs(item.products);
    setModalproduct(true);
    // navigate(`/warehouse-product-view/${item.warehouse_id}`);
  };
  const setModalproduct33 = () => {
    setModalproduct(false);
  };
  const closesetProductModalOpen = () => {
    setProductModalOpen(false);
  };
  const handlechangegetdatainput = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleClickAssdsdsdsignId = async () => {
    const tracking_id = `OR000${dataProduct.order_id}`;
    const payload = {
      user_id: datauserId.id,
      order_id: dataProduct.order_id,
      added_by: "4",
      warehouse_order_id: dataProduct.warehouse_id,
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
      tracking_number: tracking_id,
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
  };

  const editmodalopen1 = (item) => {
    console.log(item);
    setEditmodalopen(true);
    setEditDtaawarehouse(item);
    // setEditDtaawarehouse
  };

  const editmodalclose1 = () => {
    setEditmodalopen(false);
  };

  const editwarehouse = async () => {
    console.log(editDtaawarehouse);
    try {
      const payload = {
        order_id: editDtaawarehouse.order_id,
        goods_description: editDtaawarehouse.goods_description,
        ware_receipt_no: editDtaawarehouse.ware_receipt_no,
        total_dimension: editDtaawarehouse.total_dimension,
        total_weight: editDtaawarehouse.total_weight,
        cartons: editDtaawarehouse.cartons,
        express_no: editDtaawarehouse.express_no,
        supplier_contact_no: editDtaawarehouse.supplier_contact_no,
        CBM: editDtaawarehouse.CBM,
        warehousing_date: editDtaawarehouse.warehousing_date,
        collection_from: editDtaawarehouse.collection_from,
        delivery_to: editDtaawarehouse.delivery_to,
        client_name: editDtaawarehouse.client_name,
        supplier_id: editDtaawarehouse.supplier_id,
        freight: editDtaawarehouse.freight_type,
        supplier_id: userId,
        user_type: 2,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}update-Order-And-Warehouse`,
        payload,
      );
      if (response.data.success) {
        toast.success("Warehouse Updated Successfully");
        editmodalclose1();
        getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating warehouse");
    }
  };

  const handlechnageeditwarehouse = (e) => {
    const { name, value } = e.target;
    setEditDtaawarehouse({ ...editDtaawarehouse, [name]: value });
  };

  const editmodalopen1product = (item) => {
    setProductData(item);
    setProductModalOpen1(true);
  };

  const closeeditprocutmodal = () => {
    setProductModalOpen1(false);
  };
  const editproduct123 = async () => {
    console.log(productData);
    try {
      const payload = {
        warehouse_products_id: productData.id,
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
        tracking_number: productData.tracking_number,
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
        `${process.env.REACT_APP_BASE_URL}updateWareHouseProductBySupplier`,
        payload,
      );
      if (response.data.success === true) {
        toast.success(response.data.message);
        getData();
        closeeditprocutmodal();
        setModalproduct33();
        editmodalclose1();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  useEffect(() => {
    getClient();
  }, []);
  const getClient = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}client-list`)
      .then((response) => {
        console.log(response.data.data);
        setLcientlist(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const options = lcientlist.map((item) => ({
    value: item.id,
    clientemail: item.email,
    label: item.full_name,
    clientrefval: item.client_ref,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      textAlign: "center",
      height: "40px",
      padding: "",
      minHeight: "40px",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "center",
      overflow: "visible",
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: "center",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
  };
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
                    {/* <div className="ms-1">
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOpenModal2();
                        }}
                      >
                        Filter
                      </Button>
                    </div> */}
                    <div className="ms-1">
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOpenModalWarehouse();
                        }}
                      >
                        Add Warehouse
                      </Button>
                    </div>
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
                                                item.warehousing_date,
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
                                                {item.goods_description}
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
                                                <Button
                                                  variant="contained"
                                                  onClick={() => {
                                                    handleProduct(item);
                                                  }}
                                                >
                                                  Add Product
                                                </Button>
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-md-2 d-flex">
                                            <div className="text-center">
                                              <p className="origin">
                                                <VisibilityIcon
                                                  onClick={() => {
                                                    handleProductview(item);
                                                  }}
                                                  style={{ cursor: "pointer" }}
                                                />
                                              </p>
                                            </div>
                                            <div className="text-center">
                                              <p className="origin">
                                                <div>
                                                  <i
                                                    className="fi fi-rr-edit edit_icon mx-2"
                                                    onClick={() =>
                                                      editmodalopen1(item)
                                                    }
                                                  ></i>
                                                </div>
                                              </p>
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
                        open={modalproduct}
                        onClose={setModalproduct33}
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
                              Warehouse Products View
                            </h2>
                            <button
                              className="btn btn-close"
                              onClick={setModalproduct33}
                            >
                              <CloseIcon />
                            </button>
                          </div>
                          <div className="newModalGap noFormaControl">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>Product Description</th>
                                  <th>Hazardous</th>
                                  <th>Date</th>
                                  <th>Dimension</th>
                                  <th>Freight</th>
                                  <th>Groupage Batch</th>
                                  <th>Package Type</th>
                                  <th>Packages</th>
                                  <th>Tracking Nn</th>
                                  <th>Warehouse Rec No</th>
                                  <th>Warehouse Ref</th>
                                  <th>Weight</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedDocs && selectedDocs.length > 0 ? (
                                  selectedDocs.map((doc, index) => (
                                    <tr key={index}>
                                      <td>{doc?.product_description}</td>
                                      <td>{doc?.Hazardous}</td>
                                      <td>
                                        {new Date(
                                          doc?.date_received,
                                        ).toLocaleDateString("en-GB")}
                                      </td>
                                      <td>{doc?.dimension}</td>
                                      <td>{doc?.freight}</td>
                                      <td>{doc?.groupage_batch_ref}</td>
                                      <td>{doc?.package_type}</td>
                                      <td>{doc?.packages}</td>
                                      <td>{doc?.tracking_number}</td>
                                      <td>{doc?.warehouse_receipt_number}</td>
                                      <td>{doc?.warehouse_ref}</td>
                                      <td>{doc?.weight}</td>
                                      <td>
                                        <button
                                          className="btn btn-sm btn-primary"
                                          onClick={() => {
                                            // setEditDtaawProduct(doc);
                                            editmodalopen1product(doc);
                                          }}
                                        >
                                          Edit
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="2">No documents available.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </Box>
                      </Modal>
                      <Modal
                        open={editmodalopen}
                        onClose={editmodalclose1}
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
                            <h2 id="modal-modal-title">Edit Warehouse</h2>
                            <button
                              className="btn btn-close"
                              onClick={editmodalclose1}
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
                                  value={editDtaawarehouse.goods_description}
                                  name="goods_description"
                                  onChange={handlechnageeditwarehouse}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Warehouse Receipt Number</label>
                                <input
                                  className="form-control"
                                  name="ware_receipt_no"
                                  value={editDtaawarehouse.ware_receipt_no}
                                  onChange={handlechnageeditwarehouse}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Freight</label>
                                <select
                                  className="form-control"
                                  name="freight_type"
                                  value={editDtaawarehouse.freight_type}
                                  onChange={handlechnageeditwarehouse}
                                >
                                  <option>select</option>
                                  <option value="Sea">Sea</option>
                                  <option value="Air">Air</option>
                                  <option value="Road">Road</option>
                                </select>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Country of Origin</label>
                                <select
                                  name="collection_from"
                                  value={editDtaawarehouse.collection_from}
                                  onChange={handlechnageeditwarehouse}
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
                                  value={editDtaawarehouse.delivery_to}
                                  onChange={handlechnageeditwarehouse}
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
                                  value={editDtaawarehouse.total_dimension}
                                  onChange={handlechnageeditwarehouse}
                                  onKeyPress={handlekey}
                                  placeholder="00*00*00"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Total Weight</label>
                                <input
                                  className="form-control"
                                  name="total_weight"
                                  value={editDtaawarehouse.total_weight}
                                  onChange={handlechnageeditwarehouse}
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
                                  value={editDtaawarehouse.cartons}
                                  onChange={handlechnageeditwarehouse}
                                  placeholder="000"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Express Number</label>
                                <input
                                  className="form-control"
                                  value={editDtaawarehouse.express_no}
                                  name="express_no"
                                  onChange={handlechnageeditwarehouse}
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
                                  value={editDtaawarehouse.supplier_contact_no}
                                  onChange={handlechnageeditwarehouse}
                                  placeholder="000"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>CBM</label>
                                <input
                                  className="form-control"
                                  value={editDtaawarehouse.CBM}
                                  name="CBM"
                                  onChange={handlechnageeditwarehouse}
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
                                  value={
                                    editDtaawarehouse?.warehousing_date
                                      ? editDtaawarehouse.warehousing_date.split(
                                          "T",
                                        )[0]
                                      : ""
                                  }
                                  onChange={handlechnageeditwarehouse}
                                />
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Client Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="client_name"
                                  value={editDtaawarehouse.client_name}
                                  onChange={handlechnageeditwarehouse}
                                  placeholder="000"
                                ></input>
                              </div>
                            </div>
                            <Button
                              variant="contained"
                              onClick={() => editwarehouse(editDtaawarehouse)}
                            >
                              Update
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
                                <label>Client</label> <br />
                                <Select
                                  className="w-100"
                                  value={selectedOption}
                                  onChange={handlechangewarehouse}
                                  options={options}
                                  placeholder="Select..."
                                  styles={customStyles}
                                  isSearchable
                                />
                              </div>
                              <div className="col-6">
                                <label>Customer ref</label>
                                <input
                                  className="form-control"
                                  value={prodata.customer_ref}
                                  name="customer_ref"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer ref"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Create new Freight Order</label>
                                <select
                                  className="form-control"
                                  name="create_freight_order"
                                  value={prodata.create_freight_order}
                                  onChange={handlechangewarehouse}
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-6">
                                <label>Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={prodata.date}
                                  name="date"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                            </div>
                            <h5>Package Information</h5>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Customer Name</label>
                                <input
                                  className="form-control"
                                  value={prodata.customer_Name}
                                  name="customer_Name"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Customer ref</label>
                                <input
                                  className="form-control"
                                  value={prodata.customer_ref}
                                  name="customer_ref"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Box Marking</label>
                                <input
                                  className="form-control"
                                  name="box_marking"
                                  value={prodata.box_marking}
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Good Description</label>
                                <input
                                  type="Good Description"
                                  className="form-control"
                                  value={prodata.good_description}
                                  name="good_description"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Good Description</label>
                                <select
                                  type="text"
                                  className="form-control"
                                  value={prodata.good_description}
                                  name="good_description"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                >
                                  <option value="">Select</option>
                                  <option value="carte">carte</option>
                                  <option value="pallet">pallet</option>
                                  <option value="Box">Box</option>
                                  <option value="Bag">Bag</option>
                                </select>
                              </div>
                              <div className="col-6">
                                <label>Hazardous</label>
                                <select
                                  type="type"
                                  className="form-control"
                                  value={prodata.hazardous}
                                  name="hazardous"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
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
                      <Modal
                        open={productModalOpen1}
                        onClose={closeeditprocutmodal}
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
                              Edit Warehouse Product
                            </h2>
                            <button
                              className="btn btn-close"
                              onClick={closeeditprocutmodal}
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
                                  value={productData.product_description}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Hazardous</label>
                                <input
                                  className="form-control"
                                  name="Hazardous"
                                  onChange={handlechangegetdatainput}
                                  value={productData.Hazardous}
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
                                  value={productData.date_received}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Package Type</label>
                                <input
                                  className="form-control"
                                  name="package_type"
                                  value={productData.package_type}
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
                                  value={productData.packages}
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Dimension</label>
                                <input
                                  className="form-control"
                                  name="dimension"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                  value={productData.dimension}
                                ></input>
                              </div>
                            </div>
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Weight</label>
                                <input
                                  className="form-control"
                                  name="weight"
                                  value={productData.weight}
                                  onChange={handlechangegetdatainput}
                                  placeholder="0.00"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Warehouse Ref</label>
                                <input
                                  className="form-control"
                                  name="warehouse_ref"
                                  value={productData.warehouse_ref}
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
                                  value={productData.freight}
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
                                  value={productData.groupage_batch_ref}
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
                                  value={productData.warehouse_receipt_number}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Date Dispatched</label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="date_dspatched"
                                  value={productData.date_dspatched}
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
                                  value={productData.supplier_address}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Warehouse Collect</label>
                                <input
                                  className="form-control"
                                  name="warehouse_collect"
                                  value={productData.warehouse_collect}
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
                                  value={productData.costs_to_collect}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Port Of Loading</label>
                                <input
                                  className="form-control"
                                  name="port_of_loading"
                                  value={productData.port_of_loading}
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
                                  value={productData.warehouse_dispatch}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Warehouse Cost</label>
                                <input
                                  className="form-control"
                                  name="warehouse_cost"
                                  value={productData.warehouse_cost}
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
                                  value={productData.cost_to_dispatch}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Waybill Ref</label>
                                <input
                                  className="form-control"
                                  name="waybill_ref"
                                  value={productData.waybill_ref}
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
                                  value={productData.supplier_Email}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-6">
                                <label>Supplier Contact</label>
                                <input
                                  className="form-control"
                                  name="Supplier_Contact"
                                  value={productData.Supplier_Contact}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <Button
                              variant="contained"
                              onClick={() => {
                                editproduct123();
                              }}
                            >
                              Edit Product
                            </Button>
                          </div>
                        </Box>
                      </Modal>
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
