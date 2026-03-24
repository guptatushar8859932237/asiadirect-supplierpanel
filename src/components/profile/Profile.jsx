import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext1 } from "../../Context/MyContext";
import CloseIcon from "@mui/icons-material/Close";
export default function Profile() {
  const [data, setData] = useState({});
  const { text, setText } = useContext(MyContext1);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countruies, setCountruies] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const datauserId = JSON.parse(localStorage.getItem("data123"));
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}GetSupplierProfile`,
        {
          supplier_id: datauserId.id,
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error(error.response?.data);
      toast.error("Failed to fetch profile data");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  // const handlePostData = async () => {
  //   try {
  //     setLoading(true);
  //     const formData = new FormData();
  //     formData.append("profile", profileImage);
  //     formData.append("name", data.name);
  //     formData.append("email", data.email);
  //     formData.append("id", datauserId.id);
  //     await axios
  //       .post(`${process.env.REACT_APP_BASE_URL}UpdateSupplierProfile`, formData)
  //       .then((response) => {
  //         setText(response.data.data[0].profile)
  //       })
  //     toast.success("Profile updated successfully")
  //     fetchData()
  //   } catch (error) {
  //     console.error(error.response?.data)
  //     toast.error("Failed to update profile")
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const handlePostData = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      // append only if image selected
      if (profileImage) {
        formData.append("profile", profileImage);
      }

      formData.append("supplier_id", datauserId.id);
      formData.append("name", data.name || "");
      formData.append("email", data.email || "");
      formData.append("phone_no", data.phone_no || "");
      formData.append("country", data.country || "");

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}UpdateSupplierProfile`,
        formData
      );

      // update profile image in context
      if (response?.data?.data?.[0]?.profile) {
        setText(response.data.data[0].profile);
      }

      toast.success("Profile updated successfully");
      fetchData();
    } catch (error) {
      console.error(error.response?.data);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    setProfileImage(file)
  }

  useEffect(() => {
    getcountry();
    // getstaff();
  }, []);
  const getcountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        setCountruies(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">

          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="">
                  <h4 className="freight_hd">Profile </h4>
                </div>

              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Update Profile
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row mb-0">
                    <div className="profileImgAdmin mb-5 text-center">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL_image}${data?.profile}`}
                        name="profile"
                        style={{
                          width: "130px",
                          height: "130px",
                          borderRadius: "50%",
                        }}
                        alt="Profile"
                      />
                    </div>
                    <div className="profileContent">
                      <div className="row">
                        <div className="col-12">
                          <input
                            type="file"
                            name="profile"
                            onChange={handleChangeFile}
                            className="w-100 mb-3 px-2 py-2 rounded border"
                          />
                        </div>
                        <div className="col-12">
                          <input
                            value={data?.name || ""}
                            name="name"
                            onChange={handleChange}
                            className="w-100 mb-3 px-2 py-2 rounded border"
                          />
                        </div>
                        <div className="col-12">
                          <input
                            value={data?.email || ""}
                            name="email"
                            onChange={handleChange}
                            className="w-100 mb-3 px-2 py-2 rounded border"
                          />
                        </div>
                        <div className="col-12">
                          <input
                            value={data?.phone_no || ""}
                            name="phone_no"
                            onChange={handleChange}
                            className="w-100 mb-3 px-2 py-2 rounded border"
                          />
                        </div>
                        <div className="col-12">
                          {/* <input
                                value={data?.phone || ""}
                                name="phone"
                                onChange={handleChange}
                                className="w-100 mb-3 px-2 py-2 rounded border"
                              /> */}
                          {/* <select  value={data?.country || ""}
                                name="country"
                                onChange={handleChange}
                                className="w-100 mb-3 px-2 py-2 rounded border">
                                <option>Select...</option>
                                  {
                                    countruies && countruies.length>0 && countruies.map((item,index)=>{
                                      return (
                                        <>
                                         <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                        </>
                                      )
                                    })
                                   
                                  }
                              </select> */}
                          <select
                            value={data?.country || ""}
                            name="country"
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Select...</option>
                            {countruies.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="redBtn"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="blueBtn"
                      onClick={handlePostData}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 g-3">
            <div className="col-lg-3 col-md-4">
              <div className="pro_box1 h-100">
                <div className="img_profile">
                  {/* <img
                        src={`${process.env.REACT_APP_BASE_URL_image}${text}`}
                        className="pro_img"
                        alt="Profile"
                      /> */}
                  <img
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : `${process.env.REACT_APP_BASE_URL_image}${data?.profile}`
                    }
                    style={{ width: "130px", height: "130px", borderRadius: "50%" }}
                    alt="Profile"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="blueBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="pro_box h-100">
                <div className="profileContent">
                  <h4>Basic Information</h4>
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <p>
                        <strong>Email:</strong> <span>{data?.email}</span>
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <p>
                        <strong>Full Name:</strong>{" "}
                        <span>{data?.name}</span>
                      </p>
                    </div>


                    <div className="col-lg-6">
                      <p>
                        <strong>Phone No:</strong> <span>{data?.phone_no}</span>
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <p>
                        <strong>Country:</strong> <span>{data?.country_name}</span>
                      </p>
                    </div>
                  </div>
                  <div className="row">

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
