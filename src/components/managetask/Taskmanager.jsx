import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const pageSize = 10;
export default function Taskmanager() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
 const filterdata = data?.filter((item) => {
  if (!searchQuery) return true;
  return (
    item?.freight_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item?.freight?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item?.priority?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item?.supplier_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item?.supplier_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item?.phone_no?.toLowerCase().includes(searchQuery.toLowerCase())
  );
});
  const totalPages = Math.ceil(filterdata.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filterdata.slice(startIndex, endIndex);
  const getdata = () => {
    setLoader(true);
    const supplierId = JSON.parse(localStorage.getItem("data123"));
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getFreightsBySupplier`, {
        supplier_id: supplierId.id,
      })
      .then((response) => {
        setLoader(false);
        console.log(response.data.data)
        setData(response.data.data);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error.response);
      });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    getdata();
  }, []);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      {loader ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">Updating... This may take some time</p>
        </div>
      ) : (
        <>
          <div className="wpWrapper">
            <div className="container-fluid">
              <div>
                <div>
                  <div className="row manageFreight">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="">
                          <h4 className="freight_hd">Assign Task's</h4>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                          <div className="">
                            <input
                              className="px-2 py-1 rounded "
                              type="text"
                              placeholder="Search"
                              value={searchQuery}
                              onChange={handleSearch}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive mt-3">
                    <table className="table table-striped tableICon">
                      <thead>
                        <tr>
                          <th scope="col">Sr.No.</th>
                          <th scope="col">Freight Number</th>
                          <th scope="col">Freight</th>
                          <th scope="col">Priority</th>
                          <th scope="col">Supplier Name</th>
                          <th scope="col">Supplier Contact</th>
                          <th scope="col">Supplier Email</th>
                        </tr>
                      </thead>
                      <tbody style={{ border: "none" }}>
                        {currentData &&
                          currentData.length > 0 &&
                          currentData.map((item, index) => {
                            return (
                              <tr className="border-bottom" key={index}>
                                <th>{startIndex + index + 1}</th>
                                <td>{item.freight_number}</td>
                                <td>{item?.freight}</td>
                                <td>{item?.priority}</td>
                                <td>{item.supplier_name}</td>
                                <td>{item?.phone_no}</td>
                                <td>{item?.supplier_email}</td>
                              </tr>
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
                        {" "}
                        <i className="fi fi-rr-angle-small-left page_icon"></i>
                      </button>
                      <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                      <button
                        disabled={currentPage === totalPages}
                        className="bg_page"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <i className="fi fi-rr-angle-small-right page_icon"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
}
