import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Button, Select } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
const pageSize = 10;
export default function WarehouseOrder() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [warehoyseid, setWarehoyseid] = useState("");
  const [prodata, setProdata] = useState("");
  const [lcientlist, setLcientlist] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState("");
  const [productData, setProductData] = useState("");
  const [editDtaawarehouse, setEditDtaawarehouse] = useState("");
  const [dataProduct, setDataProduct] = useState(null);
  const [warehouseOrerID, setWarehouseOrerID] = useState(null);
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
  const [orderDatap, setOrderDatap] = useState([]);
  const [countries, setCountries] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
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
    getcountry();
  }, []);
  const getcountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        setCountries(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };
  useEffect(() => {
    getData();
    allOrder()
  }, []);

  const allOrder=async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}AllOrderNumbers`)
      if(response.data.success){
        setOrderDatap(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
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
  const filteredClients = lcientlist.filter((item) =>
    (item.full_name || item.email || "")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const handleSelect = (item) => {
    setSelected(item.full_name || item.email);
    setShowDropdown(false);
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
      destination_country: "",
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
    const { name, value, files, type } = e.target;

    setProdata((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const datauserId = JSON.parse(localStorage.getItem("data123"));
  console.log("User ID from localStorage:", datauserId);
  const postDataWarehouse = async () => {
    try {
//  warehouse_id, 
      const formData = new FormData();
      formData.append("courier_waybill_ref", prodata.courier_waybill_ref || "");
      formData.append("warehouse_order_id", prodata.warehouse_order_id || "");
      formData.append("warehouse_id", prodata.warehouse_id || "");
      formData.append("date_entry_created", prodata.date_entry_created || "");
      formData.append("dispatch_date", prodata.dispatch_date || "");
      formData.append("date_received", prodata.date_received || "");
      formData.append("supplier_id", datauserId.id || "");
      formData.append("collection_from", prodata.collection_from || "");
      formData.append("destination_country", prodata.destination_country || "");
      formData.append("package_comment", prodata.package_comment || "");
      formData.append("customer_ref", prodata.customer_ref || "");
      formData.append("customer_name", prodata.customer_name || "");
      formData.append("box_marking", prodata.box_marking || "");
      formData.append("total_cbm", prodata.total_cbm || "");
      formData.append("package_type", prodata.package_type || "");
      formData.append("hazardous", prodata.hazardous || "");
      formData.append("added_by", 2);
      formData.append("total_packages", prodata.total_packages || "");
      formData.append("hazard_description", prodata.hazard_description || "");
      formData.append("goods_description", prodata.goods_description || "");
      formData.append("damaged_goods", prodata.damaged_goods || "");
      formData.append("damaged_pkg_qty", prodata.damaged_pkg_qty || "");
      formData.append("damage_comment", prodata.damage_comment || "");
      formData.append("supplier_company", prodata.supplier_company || "");
      formData.append("supplier_contact", prodata.supplier_contact || "");
      formData.append("supplier_person", prodata.supplier_person || "");
      formData.append("supplier_address", prodata.supplier_address || "");
      formData.append("warehouse_collect", prodata.warehouse_collect || "");
      formData.append("costs_to_collect", prodata.costs_to_collect || "");
      formData.append("warehouse_storage", prodata.warehouse_storage || "");
      formData.append("warehouse_cost", prodata.warehouse_cost || "");
      formData.append("handling_required", prodata.handling_required || "");
      formData.append("handling_cost", prodata.handling_cost || "");
      formData.append("warehouse_dispatch", prodata.warehouse_dispatch || "");
      formData.append("cost_to_dispatch", prodata.cost_to_dispatch || "");
      formData.append("warehouse_comment", prodata.warehouse_comment || "");
      if (prodata.attach_other) {
        formData.append("damage_images", prodata.attach_other);
      }
      if (prodata.Attach_product_image) {
        formData.append("product_images", prodata.Attach_product_image);
      }
      if (prodata.attach_file) {
        formData.append("documents", prodata.attach_file);
      }
      console.log("FormData Data:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}createOrderAndWarehouse`,
        formData);
      if (response.data.success === true) {
        toast.success(response.data.message);
        handleCloseModalWarehouse();
        getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong");
    }
  };
  const editpostData = async () => {
    try {
      const formData = new FormData();
      formData.append("courier_waybill_ref", prodata.courier_waybill_ref || "");
      formData.append("date_received", prodata.date_received || "");
      formData.append("warehouse_order_id", prodata.warehouse_order_id || "");
      formData.append("id", warehouseOrerID || "");
      formData.append("dispatch_date", prodata.dispatch_date || "");
      formData.append("days_in_warehouse", prodata.days_in_warehouse || "");
      formData.append("supplier_id", datauserId.id || "");
      formData.append("collection_from", prodata.collection_from || "");
       formData.append("total_packages", prodata.total_packages || "");
      formData.append("destination_country", prodata.destination_country || "");
      formData.append("customer_name", prodata.customer_name || "");
      formData.append("added_by", 2);
      formData.append("package_comment", prodata.package_comment || "");
      formData.append("customer_ref", prodata.customer_ref || "");
      formData.append("box_marking", prodata.box_marking || "");
      formData.append("package_type", prodata.package_type || "");
      formData.append("hazardous", prodata.hazardous || "");
      formData.append("hazard_description", prodata.hazard_description || "");
      formData.append("total_cbm", prodata.total_cbm || "");
      formData.append("goods_description", prodata.goods_description || "");
      formData.append("damaged_goods", prodata.damaged_goods || "");
      formData.append("damaged_pkg_qty", prodata.damaged_pkg_qty || "");
      formData.append("damage_comment", prodata.damage_comment || "");
      formData.append("supplier_company", prodata.supplier_company || "");
      formData.append("supplier_person", prodata.supplier_person || "");
      formData.append("supplier_address", prodata.supplier_address || "");
      formData.append("warehouse_collect", prodata.warehouse_collect || "");
      formData.append("costs_to_collect", prodata.costs_to_collect || "");
      formData.append("warehouse_storage", prodata.warehouse_storage || "");
      formData.append("warehouse_cost", prodata.warehouse_cost || "");
      formData.append("handling_required", prodata.handling_required || "");
      formData.append("handling_cost", prodata.handling_cost || "");
      formData.append("warehouse_dispatch", prodata.warehouse_dispatch || "");
      formData.append("cost_to_dispatch", prodata.cost_to_dispatch || "");
      formData.append("warehouse_comment", prodata.warehouse_comment || "");
      formData.append("order_id", prodata.order_id || "");
      if (prodata.attach_other) {
        formData.append("damage_images", prodata.attach_other);
      }
      if (prodata.Attach_product_image) {
        formData.append("product_images", prodata.Attach_product_image);
      }
      if (prodata.attach_file) {
        formData.append("documents", prodata.attach_file);
      }
      console.log("FormData Data:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}update-Order-And-Warehouse`,{
        params: {
          supplier_id: datauserId.id, // ✅ query param
        },
      },
        formData);
      if (response.data.success === true) {
        setEditmodalopen(false);
        editmodalclose1()
        toast.success(response.data.message);
        getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong");
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
    setWarehoyseid(item.id)
    setDataProduct(item);
    setProductModalOpen(true);
  };
  const handleProductview =async (item) => {
    console.log(item)
try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}getSupplierWarehouseProducts?supplier_warehouse_id=${item.id}`)
    if(response.data.success){
      console.log(response.data.data)
       setSelectedDocs(response.data.data);
    setModalproduct(true);
    }
  } catch (error) {
  console.log(error)
}
  
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
      supplier_warehouse_id:warehoyseid,
      warehouse_order_id: dataProduct.warehouse_id,
      product_description: productData.product_description,
      hazardous: productData.hazardous,
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
      date_dispatched: productData.date_dispatched,
      supplier_address: productData.supplier_address,
      warehouse_collect: productData.warehouse_collect,
      costs_to_collect: productData.costs_to_collect,
      port_of_loading: productData.port_of_loading,
      warehouse_dispatch: productData.warehouse_dispatch,
      warehouse_cost: productData.warehouse_cost,
      cost_to_dispatch: productData.cost_to_dispatch,
      waybill_ref: productData.waybill_ref,
      supplier_email: productData.supplier_email,
      supplier_contact: productData.supplier_contact,
    };
    console.log(payload)
    // const response = await axios.post(
    //   `${process.env.REACT_APP_BASE_URL}addSupplierWarehouseProduct`,
    //   payload,
    // );
    // if (response.data.success === true) {
    //   toast.success(response.data.message);
    //   closesetProductModalOpen();
    //   getData();
    // } else {
    //   toast.error(response.data.message);
    // }
  };
  const editmodalopen1 = (item) => {
    console.log(item);
    setWarehouseOrerID(item.id)
    setEditmodalopen(true);
    setEditDtaawarehouse(item);
    setProdata(item)
  };
  const editmodalclose1 = () => {
    setEditmodalopen(false);
  };

  const handlechnageeditwarehouse = (e) => {
    const { name, value } = e.target;
    setEditDtaawarehouse({ ...editDtaawarehouse, [name]: value });
  };
  const editmodalopen1product = (item) => {
    console.log(item);
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
  
        id:productData.id,
        warehouse_products_id: productData.id,
        product_description: productData.product_description,
        hazardous: productData.hazardous,
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
        date_dispatched: productData.date_dispatched,
        supplier_address: productData.supplier_address,
        warehouse_collect: productData.warehouse_collect,
        costs_to_collect: productData.costs_to_collect,
        port_of_loading: productData.port_of_loading,
        warehouse_dispatch: productData.warehouse_dispatch,
        warehouse_cost: productData.warehouse_cost,
        cost_to_dispatch: productData.cost_to_dispatch,
        waybill_ref: productData.waybill_ref,
        supplier_email: productData.supplier_email,
        supplier_contact: productData.supplier_contact,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}updateSupplierWarehouseProduct`,
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

  useEffect(()=>{
    GetSupplierCreatedWarehouseOrders1()
  },[])

 const GetSupplierCreatedWarehouseOrders1 = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getSupplierWarehouses`,
      {
        params: {
          supplier_id: datauserId.id, // ✅ query param
        },
      }
    );

    setSupplierData(response.data.data);
  } catch (error) {
    console.log(error);
  }
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
                <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                  <div>
                    <h4 className="freight_hd">Warehouse Order List</h4>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    <div>
                      <input
                        className="px-2 py-1 rounded h-100"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                      ></input>
                    </div>
                    <div>
                      <button
                        className="blueBtn"
                        variant="contained"
                        onClick={() => {
                          handleOpenModalWarehouse();
                        }}
                      >
                        Add Warehouse Order
                      </button>
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
                                              {item.warehouse_number} 
                                              {/* {item.order_id} */}
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
                                                item.created_at,
                                              ).toLocaleDateString("en-GB")}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="row align-items-center g-1">
                                          <div className="col-lg-3 col-md-12 col-12">
                                            <div className="">
                                              <p
                                                className="origin"
                                                style={{ fontSize: "13px" }}
                                              >
                                                {item.goods_description}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-lg-5 col-md-12 col-12">
                                            <div className="d-flex align-items-center justify-content-center">
                                              <p className="origin">
                                                {item.collection_from_name}
                                              </p>
                                              <div className="arrow">
                                                <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                              </div>
                                              <p className="origin">
                                                {item.destination_country_name}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-lg-2 col-md-6 col-6">
                                            <div className="origin">
                                              <button
                                                className="tableBorderBtn"
                                                variant="contained"
                                                onClick={() => {
                                                  handleProduct(item);
                                                }}
                                              >
                                                Add Product
                                              </button>
                                            </div>

                                          </div>
                                          <div className="col-lg-2 col-md-6 col-6 d-flex justify-content-end gap-2 tableIcon">

                                            <div className="origin">
                                              {/* <VisibilityIcon
                                                onClick={() => {
                                                  handleProductview(item);
                                                }}
                                                style={{ cursor: "pointer" }}
                                              /> */}
                                              <i class="fa fa-eye" aria-hidden="true" onClick={() => {
                                                handleProductview(item);
                                              }}
                                              ></i>
                                            </div>


                                            <div className="origin">
                                              <div>
                                                <i className="fa fa-pencil-square-o edit_icon"
                                                  onClick={() =>
                                                    editmodalopen1(item)
                                                  }
                                                ></i>
                                              </div>
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
                                              {/* {item.assign_to_batch === 0 ? (
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
                                              )} */}
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
                            width: {
                              xs: "95%",   // mobile
                              sm: "90%",   // tablet
                              md: "90%",   // small laptop
                              lg: "90%",   // desktop
                            },
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
                          <div className="newModalGap noFormaControl table-responsive">
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
                                      <td>{doc?.hazardous}</td>
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
                                      <td className="tableICon">
                                        <i onClick={() => {
                                          // setEditDtaawProduct(doc);
                                          editmodalopen1product(doc);
                                        }} className="fa fa-pencil-square-o edit_icon"></i>

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
                            width: {
                              xs: "95%",   // mobile
                              sm: "80%",   // tablet
                              md: "70%",   // small laptop
                              lg: "60%",   // desktop
                            },
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
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Date</label>
                                <input
  type="date"
  className="form-control"
  value={
    prodata.date_received
      ? prodata.date_received.split("T")[0]
      : ""
  }
  name="date_received"
  onChange={handlechangewarehouse}
/>
                              </div>

                              <div className="col-md-6">
                                <label>Warehouse Order Id</label>
                                <input
                                  type="type"
                                  className="form-control"
                                  value={prodata.warehouse_order_id}
                                  name="warehouse_order_id"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Courier waybill_ref</label>
                                <input
                                  type="type"
                                  className="form-control"
                                  value={prodata.courier_waybill_ref}
                                  name="courier_waybill_ref"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Dispatch Date</label>
                                {/* <input
                                  type="date"
                                  className="form-control"
                                  name="dispatched_date"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input> */}
                                                                <input
  type="date"
  className="form-control"
  value={
    prodata.dispatch_date
      ? prodata.dispatch_date.split("T")[0]
      : ""
  }
  name="dispatch_date"
  onChange={handlechangewarehouse}
/>
                              </div>
                            </div>
                            <h5 className="mt-3 mb-2">Package Information</h5>
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Customer Name</label>
                                <input
                                  className="form-control"
                                  value={prodata.customer_name}
                                  name="customer_name"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Customer ref</label>
                                <input
                                  className="form-control"
                                  value={prodata.customer_ref}
                                  name="customer_ref"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer name"
                                ></input>
                              </div>


                              <div className="col-md-6">
                                <label>Country of Origin</label>
                                <select
                                  name="collection_from"
                                  value={prodata.collection_from}
                                  onChange={handlechangewarehouse}
                                  className="form-select"
                                >
                                  <option>Select</option>
                                  {countries &&
                                    countries.length > 0 &&
                                    countries.map((item, index) => {
                                      return (
                                        <>
                                          <option
                                            key={index}
                                            value={item.id}
                                          >
                                            {item.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label> Destination Country</label>
                                <select
                                  name="destination_country"
                                  value={prodata.destination_country}
                                  onChange={handlechangewarehouse}
                                  className="form-select"
                                >
                                  <option>Select</option>
                                  {countries &&
                                    countries.length > 0 &&
                                    countries.map((item, index) => {
                                      return (
                                        <>
                                          <option
                                            key={index}
                                            value={item.id}
                                          >
                                            {item.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>


                              <div className="col-md-6">
                                <label>Box Marking</label>
                                <input
                                  className="form-control"
                                  name="box_marking"
                                  value={prodata.box_marking}
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Good Description</label>
                                <input
                                  type="Good Description"
                                  className="form-control"
                                  value={prodata.goods_description}
                                  name="goods_description"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Packing Type</label>
                                <select
                                  className="form-select"
                                  value={prodata.package_type}
                                  name="package_type"
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
                              <div className="col-md-6">
                                <label>Hazardous </label>
                                <select
                                  className="form-select"
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
                              {
                                prodata.hazardous==="Yes"?
                                 <div className="col-md-6">
                                <label>Description of Hazardous </label>
                                <input
                                  type="type"
                                  className="form-control"
                                  value={prodata.hazard_description}
                                  name="hazard_description"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>:""
                              }
                             
                              <div className="col-md-6">
                                <label>Total cbm</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.total_cbm}
                                  name="total_cbm"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Total Package</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.total_packages}
                                  name="total_packages"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Total Dimension </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.total_cbm}
                                  name="total_cbm"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-lg-12">
                                <label>Comment on Packages</label>
                                <textarea
                                  className="w-100 form-control"
                                  name="package_comment"
                                  value={prodata.package_comment}
                                  placeholder="Other Information"
                                ></textarea>

                              </div>
                            </div>
                            <h5 className="mt-3 mb-2">Damaged Goods</h5>
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Damaged Goods</label>
                                <select
                                  type="text"
                                  className="form-select"
                                  value={prodata.damaged_goods}
                                  name="damaged_goods"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Damaged Packed (qty)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.damaged_pkg_qty}
                                  name="damaged_pkg_qty"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-12">
                                <label>Attach File</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="attach_file"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>

                              <div className="col-md-12">
                                <label>Comment on Damaged</label>

                                <textarea className="w-100 form-control" name="damage_comment" onChange={handlechangewarehouse} value={prodata.damage_comment}></textarea>
                              </div>
                            </div>
                            <h5 className="mt-3 mb-2">Supplier Information</h5>
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Supplier Name (Company)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.supplier_company}
                                  name="supplier_company"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Supplier Name (Person)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.supplier_person}
                                  name="supplier_person"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Supplier Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.supplier_address}
                                  name="supplier_address"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Supplier Contact</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.supplier_contact}
                                  name="supplier_contact"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                            </div>
                            <h5 className="mt-3 mb-2">Cargo Handeling</h5>
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Warehouse Collect</label>
                                <select
                                  className="form-select"
                                  value={prodata.warehouse_collect}
                                  name="warehouse_collect"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer name"
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Cost To Collect</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.costs_to_collect}
                                  name="costs_to_collect"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Storage</label>
                                <select
                                  className="form-select"
                                  value={prodata.warehouse_storage}
                                  name="warehouse_storage"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer name"
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Cost</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.warehouse_cost}
                                  name="warehouse_cost"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Handeling Required</label>
                                <select
                                  type="text"
                                  className="form-select"
                                  value={prodata.handling_required}
                                  name="handling_required"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Handeling cost</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.handling_cost}
                                  name="handling_cost"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Dispatch</label>
                                <select
                                  className="form-select"
                                  value={prodata.warehouse_dispatch}
                                  name="warehouse_dispatch"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>cost to dispatch</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.cost_to_dispatch}
                                  name="cost_to_dispatch"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-12">
                                <label>Attach Product Image</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="Attach_Product_Image"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-12">
                                <label>Attach Other</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="attach_other"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-12">
                                <label>Warehouse Comment</label>
                                <textarea
                                  className="form-control"
                                  value={prodata.warehouse_comment}
                                  name="warehouse_comment"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></textarea>
                              </div>
                            </div>
                            <button
                              className="blueBtn mt-3"
                              variant="contained"
                              onClick={
                                editpostData
                              }
                            >
                              Edit
                            </button>
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
                            width: {
                              xs: "95%",   // mobile
                              sm: "80%",   // tablet
                              md: "70%",   // small laptop
                              lg: "60%",   // desktop
                            },
                          }}
                        >
                          <div className="modal-header">
                            <h2 id="modal-modal-title">
                              Add Warehouse  Order
                            </h2>
                            <button
                              className="btn btn-close"
                              onClick={handleCloseModalWarehouse}
                            >
                              <CloseIcon />
                            </button>
                          </div>
                          <div className="newModalGap noFormaControl">
                            <div className="row g-2">

                              <div className="col-md-6">
                                <label>Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={prodata.date_received}
                                  name="date_received"
                                  onChange={handlechangewarehouse}
                                  placeholder="Date"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Warehouse Order Id</label>
                                <input
                                  type="type"
                                  className="form-control"
                                  value={prodata.warehouse_order_id}
                                  name="warehouse_order_id"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Courier waybill_ref</label>
                                <input
                                  type="type"
                                  className="form-control"
                                  value={prodata.courier_waybill_ref}
                                  name="courier_waybill_ref"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Dispatch Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="dispatch_date"
                                  value={prodata.dispatch_date}
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>

                            </div>
                            <h5 className="mb-2 mt-3">Package Information</h5>
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Customer Name</label>
                                <input
                                  className="form-control"
                                  value={prodata.customer_name}
                                  name="customer_name"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Customer ref</label>
                                <input
                                  className="form-control"
                                  value={prodata.customer_ref}
                                  name="customer_ref"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Country of Origin</label>
                                <select
                                  name="collection_from"
                                  value={prodata.collection_from}
                                  onChange={handlechangewarehouse}
                                  className="form-select"
                                >
                                  <option>Select</option>
                                  {countries &&
                                    countries.length > 0 &&
                                    countries.map((item, index) => {
                                      return (
                                        <>
                                          <option
                                            key={index}
                                            value={item.id}
                                          >
                                            {item.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label> Destination Country</label>
                                <select
                                  name="destination_country"
                                  value={prodata.destination_country}
                                  onChange={handlechangewarehouse}
                                  className="form-select"
                                >
                                  <option>Select</option>
                                  {countries &&
                                    countries.length > 0 &&
                                    countries.map((item, index) => {
                                      return (
                                        <>
                                          <option
                                            key={index}
                                            value={item.id}
                                          >
                                            {item.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Box Marking</label>
                                <input
                                  className="form-control"
                                  name="box_marking"
                                  value={prodata.box_marking}
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Good Description</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.goods_description}
                                  name="goods_description"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Packing Type</label>
                                <select
                                  className="form-select"
                                  value={prodata.package_type}
                                  name="package_type"
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

                              <div className="col-md-6">
                                <label>Hazardous </label>
                                <select
                                  className="form-select"
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
                               {
                                prodata.hazardous==="Yes"?
                              <div className="col-md-6">
                                <label>Description of Hazardous </label>
                                <input
                                  type="type"
                                  className="form-control"
                                  value={prodata.hazard_description}
                                  name="hazard_description"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>:""}
                              <div className="col-md-6">
                                <label>Total Package</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.total_packages}
                                  name="total_packages"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Total Dimension </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.total_cbm}
                                  name="total_cbm"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Total Weight </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.total_weight}
                                  name="total_weight"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-12">
                                <label>Comment on Packages</label>
                                <textarea
                                  className="w-100 form-control"
                                  name="package_comment"
                                  onChange={handlechangewarehouse}
                                  value={prodata.package_comment}
                                  placeholder="Other Information"
                                ></textarea>

                              </div>
                            </div>
                            <h5 className="mb-2 mt-3">Damaged Goods</h5>
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Damaged Goods</label>
                                <select
                                  type="text"
                                  className="form-select"
                                  value={prodata.damaged_goods}
                                  name="damaged_goods"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Damaged Packed (qty)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.damaged_pkg_qty}
                                  name="damaged_pkg_qty"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-12">
                                <label>Attach File</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="attach_file"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>

                              <div className="col-md-12">
                                <label>Comment on Damaged</label>

                                <textarea className="w-100 form-control" name="damage_comment" onChange={handlechangewarehouse} value={prodata.damage_comment}></textarea>
                              </div>
                            </div>
                            <h5 className="mb-2 mt-3">Supplier Information</h5>
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Supplier Name (Company)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.supplier_company}
                                  name="supplier_company"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Supplier Name (Person)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.supplier_person}
                                  name="supplier_person"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                               <div className="col-md-6">
                                <label>Select Warehouse</label>
                                <select value={prodata.warehouse_id}
                                  name="warehouse_id"
                                  onChange={handlechangewarehouse}
                                  className="form-select"

                                >
                                  <option value="">Select</option>
                                  {
                                    supplierData.map((item)=>{
                                      return(
                                        <>
                                        <option value={item.id} >{item.warehouse_name} {item.country_name}</option>
                                        </>
                                      )
                                    })
}
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Supplier Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.supplier_address}
                                  name="supplier_address"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Supplier Contact</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.supplier_contact}
                                  name="supplier_contact"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                            </div>
                            <h5 className="mb-2 mt-3">Cargo Handeling</h5>
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Warehouse Collect</label>
                                <select value={prodata.warehouse_collect}
                                  name="warehouse_collect"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer name"
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Cost To Collect</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.costs_to_collect}
                                  name="costs_to_collect"
                                  onChange={handlechangewarehouse}
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Storage</label>
                                <select
                                  className="form-select"
                                  value={prodata.warehouse_storage}
                                  name="warehouse_storage"
                                  onChange={handlechangewarehouse}
                                  placeholder="customer name"
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Cost</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.warehouse_cost}
                                  name="warehouse_cost"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Handeling Required</label>
                                <select
                                  type="text" value={prodata.handling_required}
                                  name="handling_required"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Handeling cost</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.handling_cost}
                                  name="handling_cost"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Dispatch</label>
                                <select value={prodata.warehouse_dispatch}
                                  name="warehouse_dispatch"
                                  onChange={handlechangewarehouse}
                                  className="form-select"

                                >
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>cost to dispatch</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prodata.cost_to_dispatch}
                                  name="cost_to_dispatch"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Attach Product Image</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="Attach_Product_Image"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Attach Other</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="attach_other"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></input>
                              </div>
                              <div className="col-md-12">
                                <label>Warehouse Comment</label>
                                <textarea
                                  className="form-control"
                                  value={prodata.warehouse_comment}
                                  name="warehouse_comment"
                                  onChange={handlechangewarehouse}
                                  placeholder=""
                                ></textarea>
                              </div>
                            </div>
                            <button
                              variant="contained"
                              onClick={
                                postDataWarehouse
                              }
                              className="blueBtn mt-3"
                            >
                              Save
                            </button>
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
                            width: {
                              xs: "95%",   // mobile
                              sm: "80%",   // tablet
                              md: "70%",   // small laptop
                              lg: "60%",   // desktop
                            },
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
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Goods Description</label>
                                <input
                                  className="form-control"
                                  name="product_description"
                                  onChange={handlechangegetdatainput}
                                  value={productData.product_description}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Hazardous</label>
                                <input
                                  className="form-control"
                                  name="hazardous"
                                  onChange={handlechangegetdatainput}
                                  value={productData.hazardous}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Date Received</label>
                                <input
  type="date"
  className="form-control"
  name="date_received"
  value={
    productData.date_received
      ? productData.date_received.split("T")[0]
      : ""
  }
  onChange={handlechangegetdatainput}
  placeholder="warehouse name"
/>
                              </div>
                              <div className="col-md-6">
                                <label>Package Type</label>
                                <input
                                  className="form-control"
                                  name="package_type"
                                  value={productData.package_type}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Packages</label>
                                <input
                                  className="form-control"
                                  name="packages"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                  value={productData.packages}
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Dimension</label>
                                <input
                                  className="form-control"
                                  name="dimension"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                  value={productData.dimension}
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Weight</label>
                                <input
                                  className="form-control"
                                  name="weight"
                                  value={productData.weight}
                                  onChange={handlechangegetdatainput}
                                  placeholder="0.00"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Ref</label>
                                <input
                                  className="form-control"
                                  name="warehouse_ref"
                                  value={productData.warehouse_ref}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Freight</label>
                                {/* <input
                                  className="form-control"
                                  name="freight"
                                  value={productData.freight}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input> */}
                                <select  className="form-control"
                                  name="freight"
                                  value={productData.freight}
                                  onChange={handlechangegetdatainput}>
                                  <option>select</option>
                                  <option value="Sea">Sea</option>
                                  <option value="Air">Air</option>
                                  <option value="Road">Road</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Groupage Batch Ref</label>
                                <input
                                  className="form-control"
                                  name="groupage_batch_ref"
                                  onChange={handlechangegetdatainput}
                                  value={productData.groupage_batch_ref}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Warehouse Receipt Number</label>
                                <input
                                  className="form-control"
                                  name="warehouse_receipt_number"
                                  value={productData.warehouse_receipt_number}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Date Dispatched</label>
                                {/* <input
                                  className="form-control"
                                  type="date"
                                  name="date_dspatched"
                                  value={productData.date_dspatched}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input> */}
                               <input
  type="date"
  className="form-control"
  name="date_dispatched"
  value={
    productData.date_dispatched
      ? productData.date_dispatched.split("T")[0]
      : ""
  }
  onChange={handlechangegetdatainput}
  placeholder="warehouse name"
/>
                              </div>

                              <div className="col-md-6">
                                <label>Supplier Address</label>
                                <input
                                  className="form-control"
                                  name="supplier_address"
                                  value={productData.supplier_address}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Collect</label>
                                <input
                                  className="form-control"
                                  name="warehouse_collect"
                                  value={productData.warehouse_collect}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Costs To Collect</label>
                                <input
                                  className="form-control"
                                  name="costs_to_collect"
                                  value={productData.costs_to_collect}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Port Of Loading</label>
                                <input
                                  className="form-control"
                                  name="port_of_loading"
                                  value={productData.port_of_loading}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Warehouse Dispatch</label>
                                <input
                                  className="form-control"
                                  name="warehouse_dispatch"
                                  value={productData.warehouse_dispatch}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Cost</label>
                                <input
                                  className="form-control"
                                  name="warehouse_cost"
                                  value={productData.warehouse_cost}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Cost To Dispatch</label>
                                <input
                                  className="form-control"
                                  name="cost_to_dispatch"
                                  value={productData.cost_to_dispatch}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Waybill Ref</label>
                                <input
                                  className="form-control"
                                  name="waybill_ref"
                                  value={productData.waybill_ref}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>


                              <div className="col-md-6">
                                <label>Supplier Email</label>
                                <input
                                  className="form-control"
                                  name="supplier_email"
                                  value={productData.supplier_email}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Supplier Contact</label>
                                <input
                                  className="form-control"
                                  name="supplier_contact"
                                  value={productData.supplier_contact}
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <button
                              className="blueBtn mt-3"
                              variant="contained"
                              onClick={() => {
                                editproduct123();
                              }}
                            >
                              Edit Product
                            </button>
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
                            width: {
                              xs: "95%",   // mobile
                              sm: "80%",   // tablet
                              md: "70%",   // small laptop
                              lg: "60%",   // desktop
                            },
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
                            <div className="row g-2">
                              <div className="col-md-6">
                                <label>Goods Description</label>
                                <input
                                  className="form-control"
                                  name="product_description"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Hazardous</label>
                                <input
                                  className="form-control"
                                  name="hazardous"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>


                              <div className="col-md-6">
                                <label>Date Received</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="date_received"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Package Type</label>
                                <input
                                  className="form-control"
                                  name="package_type"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Packages</label>
                                <input
                                  className="form-control"
                                  name="packages"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Dimension</label>
                                <input
                                  className="form-control"
                                  name="dimension"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Weight</label>
                                <input
                                  className="form-control"
                                  name="weight"
                                  onChange={handlechangegetdatainput}
                                  placeholder="0.00"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Ref</label>
                                <input
                                  className="form-control"
                                  name="warehouse_ref"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Freight</label>
                                {/* <input
                                  className="form-control"
                                  name="freight"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input> */}
                                <select  className="form-control"
                                  name="freight"
                                  onChange={handlechangegetdatainput}>
                                    <option>select</option>
                                    <option value="Sea">Sea</option>
                                    <option value="Air">Air</option>
                                    <option value="Road">Road</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label>Groupage Batch Ref</label>
                                <input
                                  className="form-control"
                                  name="groupage_batch_ref"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Warehouse Receipt Number</label>
                                <input
                                  className="form-control"
                                  name="warehouse_receipt_number"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Date Dispatched</label>
                                <input
                                type="date"
                                  className="form-control"
                                  name="date_dispatched"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Supplier Address</label>
                                <input
                                  className="form-control"
                                  name="supplier_address"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Collect</label>
                                <input
                                  className="form-control"
                                  name="warehouse_collect"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>

                              </div>

                              <div className="col-md-6">
                                <label>Costs To Collect</label>
                                <input
                                  className="form-control"
                                  name="costs_to_collect"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Port Of Loading</label>
                                <input
                                  className="form-control"
                                  name="port_of_loading"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>


                              <div className="col-md-6">
                                <label>Warehouse Dispatch</label>
                                <input
                                  className="form-control"
                                  name="warehouse_dispatch"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Warehouse Cost</label>
                                <input
                                  className="form-control"
                                  name="warehouse_cost"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>


                              <div className="col-md-6">
                                <label>Cost To Dispatch</label>
                                <input
                                  className="form-control"
                                  name="cost_to_dispatch"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Waybill Ref</label>
                                <input
                                  className="form-control"
                                  name="waybill_ref"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>

                              <div className="col-md-6">
                                <label>Supplier Email</label>
                                <input
                                  className="form-control"
                                  name="supplier_email"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                              <div className="col-md-6">
                                <label>Supplier Contact</label>
                                <input
                                  className="form-control"
                                  name="supplier_contact"
                                  onChange={handlechangegetdatainput}
                                  placeholder="warehouse name"
                                ></input>
                              </div>
                            </div>
                            <button
                              className="blueBtn mt-3"
                              variant="contained"
                              onClick={() => {
                                handleClickAssdsdsdsignId();
                              }}
                            >
                              Add Product
                            </button>
                          </div>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      )
      }
    </>
  );
}
