import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Countryoforigin from "./pages/Countryoforigin";
import UserFreight from "./pages/UserFreight";
import MAnageFreightDetails from "./MAnageFreightDetails";
import Listshippingestimate from "./pages/Listshippingestimate";
import Downloadurl from "./pages/Downloadurl";
import OrderDetails from "./pages/OrderDetails";
import AddressUpdate from "./pages/AddressUpdate";
import Updateaddress from "./pages/Updateaddress";
import UpdateDelivery from "./pages/UpdateDelivery";
import Trackorder from "./pages/Trackorder";
import CustomebyUserap from "./pages/CustomebyUser";
import CustomCalculate from "./pages/CustomCalculate";
import ClearenceDtails from "./pages/ClearenceDtails";
import MAnagecustomerDetails from "./pages/MAnagecustomerDetails";
import Chat from "./pages/Chat";
import Clearencedetails from "./pages/Clearencedetails";
import CMS from "./pages/CMS";
import Forgottenpassword from "./components/forgotpassword/Forgottenpassword";
import Conformpass from "./components/forgotpassword/Conformpass";
import CalculationPages from "./pages/CalculationPages";
import Shippingestimmateclearnece from "./pages/Shippingestimmateclearnece";
import Warehosue from "./components/Warehouse/Warehosue";
import ShippingaddfreightEstimate from "./components/shipping estimate/ShippingEstimate";
import ShippingCalcclient from "./components/shipping estimate/ShippingCalcclient";
import Batches from "./pages/Batches";
import BatchesOrder from "./pages/BatchesOrder";
import CustomCalculationpage from "./pages/CustomCalculationpage";
import Claeanepdf from "./pages/Claeanepdf";
import ClearanceOrder from "./pages/ClearanceOrder";
import Waybill from "./bill/Waybill";
import OrderDetailspage from "./pages/OrderDetailspage";
import Letterofauthority from "./pages/Letterofauthority";
import Billofladding from "./pages/Billofladding";
import WarehouseOrder from "./components/Warehouse/WarehouseOrder";
import Batchdetails from "./pages/Batchdetails";
import { MyContext1 } from "./Context/MyContext";
import Freightbyuserdetail from "./pages/Freightbyuserdetail";
import OrderDetailspagemain from "./pages/OrderDetailspagemain";
import WarehouseDetails from "./pages/WarehouseDetails";
import BatchorderDetails from "./pages/BatchorderDetails";
import Excel from "./components/Excel";
import Testingwork from "./components/Testuing/Testingwork";
import Query from "./pages/Query";
import Customeclearingbill from "./bill/Customeclearingbill";
import MAnageshipments from "./components/shipment/MAnageshipments";
import Addshipment from "./components/shipment/Addshipment";
import Billing from "./components/Billing/Billing";
import Billpdf from "./components/Billing/Billpdf";
import Cashbook from "./components/Billing/Cashbook";
import Sageinvoices from "./components/Billing/Sageinvoices";
import Shipmentdeailspage from "./components/shipment/Shipmentdeailspage";
import "./App.css";
import TrackBatch from "./pages/TrackBatch";
import ReleasedDashboadrs from "./components/Billing/ReleasedDashboadrs";
import Downloadprdf from "./pages/Downloadprdf";
import AddBatch from "./pages/AddBatch";
import BookingInstruction from "./pages/BookingInstruction";
import Notificatonandstorage from "./components/notificationAndStorage/Notificatonandstorage";
import Viewdocument from "./pages/Viewdocument";
import ManageRoles from "./components/ManageRoles";
import Userpermission from "./pages/Userpermission";
import { MyContext2 } from "./Context/Permissioncontext";
import StaffDetails from "./pages/StaffDetails";
import Googledrive from "./components/Sidebar/Googledrive";
import Uploadimgae from "./components/Sidebar/Uploadimgae";
import Clearancedetails from "./pages/Clearancedetails";
import Editpdfclearance from "./pages/Editpdfclearance";
import ViewDetails from "./pages/ViewDetails";
import Editclearenceuser from "./pages/Editclearenceuser";
import BookingInsForm from "./pages/BookingInsForm";
import Clearenceorderdetailspage from "./pages/Clearenceorderdetailspage";
import Contactus from "./components/Warehouse/Contactus";
import Admin from "./Admin";
import Taskmanager from "./components/managetask/Taskmanager";
import WarehouseAdd from "./components/Warehouse/WarehouseAdd";
import Profilemain from "./components/Profilesection/Profilemain";
import Attendancemanagement from "./components/Profilesection/Attendancemanagement";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));
const Messages = lazy(() => import("./pages/Messages"));
const FileManager = lazy(() => import("./pages/FileManager"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Order = lazy(() => import("./pages/Order"));
const Saved = lazy(() => import("./pages/Saved"));
const Setting = lazy(() => import("./pages/Setting"));
const ManageCustomer = lazy(() => import("./pages/ManageCustomer"));
const ManageStaff = lazy(() => import("./pages/ManageStaff"));
const ManageSupplier = lazy(() => import("./pages/ManageSupplier"));
const Notification = lazy(() => import("./pages/Notification"));
const CustomClearaceOrder = lazy(() => import("./pages/CustomClearaceOrder"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermConditions = lazy(() => import("./pages/TermConditions"));
const Login = lazy(() => import("./components/Login/Login"));
const supplier = lazy(() => import("./Admin"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Managefreight = lazy(() => import("./Managefreight"));
const Changepassword = lazy(() => import("./pages/Changepassword"));
const Uniovwersalpage = lazy(() => import("./components/Uniovwersalpage"));
export default function App() {
  const [text, setText] = useState("");
  const [permission, setPermission] = useState("");
  console.log("21-1");
  return (
    <MyContext1.Provider value={{ text, setText }}>
      <MyContext2.Provider value={{ permission, setPermission }}>
        <Router basename="supplier">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/forgoten-password"
                element={<Forgottenpassword />}
              />
              <Route path="/conform-passs" element={<Conformpass />} />
              <Route path="supplier" element={<Admin />}>
                <Route index path="/supplier/dashboard" element={<Dashboard />} />
                <Route index path="/supplier/supplier/users" element={<Users />} />
                <Route index path="/supplier/supplier/messages" element={<Messages />} />
                <Route
                  index
                  path="/supplier/supplier/file-manager"
                  element={<FileManager />}
                />
                <Route index path="/supplier/supplier/analytics" element={<Analytics />} />
                <Route
                  index
                  path="/supplier/supplier/OrderDetails"
                  element={<OrderDetailspage />}
                />
                <Route index path="/supplier/supplier/waybill" element={<Waybill />} />
                <Route index path="/supplier/supplier/billing" element={<Billing />} />
                <Route
                  index
                  path="/supplier/supplier/sageinvoice"
                  element={<Sageinvoices />}
                />
                <Route index path="/supplier/supplier/cashbook" element={<Cashbook />} />
                <Route
                  index
                  path="/supplier/supplier/billofladding"
                  element={<Billofladding />}
                />
                <Route index path="/supplier/supplier/messages" element={<Messages />} />
                <Route index path="/supplier/supplier/analytics" element={<Analytics />} />
                <Route 
                  index
                  path="/supplier/supplier/file-manager"
                  element={<FileManager />}
                />
                <Route index path="/supplier/supplier/oploadfile" element={<Excel />} />
                <Route index path="/supplier/supplier/order" element={<Order />} />
                <Route
                  index
                  path="/supplier/supplier/downlaodpdf"
                  element={<Downloadprdf />}
                />
                <Route index path="/supplier/supplier/saved" element={<Saved />} />
                <Route index path="/supplier/Warehouse" element={<Warehosue />} />
                <Route
                  index
                  path="/supplier/supplier/customesClearings"
                  element={<Customeclearingbill />}
                />
                <Route
                  index
                  path="/supplier/WarehouseOrder"
                  element={<WarehouseOrder />}
                />
                <Route
                  index
                  path="/supplier/AddWarehouse"
                  element={<WarehouseAdd />}
                />
                <Route
                  index
                  path="/supplier/supplier/supplierclearenceDetails"
                  element={<Clearenceorderdetailspage />}
                />
                <Route
                  index
                  path="/supplier/supplier/google_drive"
                  element={<Googledrive />}
                />
                <Route index path="/supplier/supplier/settings" element={<Setting />} />
                <Route
                  index
                  path="/supplier/supplier/Notificaionstorage"
                  element={<Notificatonandstorage />}
                />
                <Route
                  index
                  path="/supplier/supplier/manage-customer"
                  element={<ManageCustomer />}
                />
                <Route
                  index
                  path="/supplier/supplier/manage-staff"
                  element={<ManageStaff />}
                />
                <Route
                  index
                  path="/supplier/supplier/staff-details"
                  element={<StaffDetails />}
                />
                <Route
                  index
                  path="/supplier/supplier/manage-roles"
                  element={<ManageRoles />}
                />
                <Route
                  index
                  path="/supplier/supplier/viewdocument/:id"
                  element={<Viewdocument />}
                />
                <Route index path="/supplier/supplier/query" element={<Query />} />
                <Route
                  index
                  path="/supplier/manage-supplier"
                  element={<ManageSupplier />}
                />
                <Route
                  index
                  path="/supplier/supplier/releasedDashboard"
                  element={<ReleasedDashboadrs />}
                />
                <Route
                  index
                  path="/supplier/notifications"
                  element={<Notification />}
                />
                <Route
                  index
                  path="/supplier/supplier/custom-clearance-order"
                  element={<CustomClearaceOrder />}
                />
                <Route
                  index
                  path="/supplier/supplier/term-conditions"
                  element={<TermConditions />}
                />
                <Route
                  index
                  path="/supplier/supplier/privacy-policy"
                  element={<PrivacyPolicy />}
                />
                <Route
                  index
                  path="/supplier/supplier/contactus"
                  element={<Contactus />}
                />
               
                <Route
                  index
                  path="/supplier/supplier/warehousedetails"
                  element={<WarehouseDetails />}
                />
                <Route index path="/supplier/supplier/freight" element={<UserFreight />} />
                <Route
                  index
                  path="/supplier/supplier/Uploadimgae"
                  element={<Uploadimgae />}
                />
                <Route
                  index
                  path="/supplier/supplier/manage-roles-permission"
                  element={<Userpermission />}
                />
                <Route
                  index
                  path="/supplier/supplier/BatchesOrder"
                  element={<BatchesOrder />}
                />
                <Route index path="/supplier/profile" element={<Profile />} />
                <Route
                  index
                  path="/supplier/supplier/Clearancedetails"
                  element={<Clearancedetails />}
                />
                <Route
                  index
                  path="/supplier/managefreight"
                  element={<Managefreight />}
                />
                <Route
                  index
                  path="/supplier/manageTasks"
                  element={<Taskmanager />}
                />
                <Route
                  index
                  path="/supplier/supplier/manage-shipment"
                  element={<MAnageshipments />}
                />
                <Route index path="/supplier/supplier/billpdf" element={<Billpdf />} />
                <Route
                  index
                  path="/supplier/supplier/shipmentdetail"
                  element={<Shipmentdeailspage />}
                />
                <Route
                  index
                  path="/supplier/changepassword"
                  element={<Changepassword />}
                />
                <Route
                  index
                  path="/supplier/supplier/countryoforigin"
                  element={<Countryoforigin />}
                />
                <Route
                  index
                  path="/supplier/supplier/testingwork"
                  element={<Testingwork />}
                />
                <Route
                  index
                  path="/supplier/supplier/Trackbatch"
                  element={<TrackBatch />}
                />
                <Route index path="/supplier/supplier/Batches" element={<Batches />} />
                <Route
                  index
                  path="/supplier/shipping-estimate"
                  element={<ShippingaddfreightEstimate />}
                />
                <Route
                  index
                  path="/supplier/ProfileSection"
                  element={<Profilemain />}
                />
                <Route
                  index
                  path="/supplier/Attendancemanagement"
                  element={<Attendancemanagement />}
                />
                <Route
                  index
                  path="/supplier/supplier/bookinginstruction"
                  element={<BookingInstruction />}
                />
                <Route
                  index
                  path="/supplier/supplier/booking_instruction_form"
                  element={<BookingInsForm />}
                />
                <Route
                  index
                  path="/supplier/supplier/addshipment"
                  element={<Addshipment />}
                />
                <Route
                  index
                  path="/supplier/supplier/shipping-estimate-client"
                  element={<ShippingCalcclient />}
                />
                <Route
                  index
                  path="/supplier/supplier/shipping-estimate-clearence"
                  element={<Shippingestimmateclearnece />}
                />
                <Route
                  index
                  path="/supplier/supplier/shipping-estimate-list"
                  element={<Listshippingestimate />}
                />
                <Route
                  index
                  path="/supplier/MAnageFreightDetails"
                  element={<MAnageFreightDetails />}
                />
                <Route
                  index
                  path="/supplier/supplier/orderDetails123"
                  element={<OrderDetails />}
                />
                <Route
                  index
                  path="/supplier/supplier/addressupdate"
                  element={<AddressUpdate />}
                />
                <Route
                  index
                  path="/supplier/supplier/Batchdetails123"
                  element={<Batchdetails />}
                />
                <Route
                  index
                  path="/supplier/supplier/updateaddress"
                  element={<Updateaddress />}
                />
                <Route
                  index
                  path="/supplier/supplier/updatedelivery"
                  element={<UpdateDelivery />}
                />
                <Route
                  index
                  path="/supplier/supplier/Updatedetails"
                  element={<Freightbyuserdetail />}
                />
                <Route
                  index
                  path="/supplier/supplier/trackorder"
                  element={<Trackorder />}
                />
                <Route
                  index
                  path="/supplier/supplier/Custom-clearence-byuser"
                  element={<CustomebyUserap />}
                />
                <Route
                  index
                  path="/supplier/supplier/custom-calcualate"
                  element={<CustomCalculate />}
                />
                <Route
                  index
                  path="/supplier/supplier/clearence-Dteails"
                  element={<ClearenceDtails />}
                />
                <Route
                  index
                  path="/supplier/supplier/customer-details"
                  element={<MAnagecustomerDetails />}
                />
                <Route
                  index
                  path="/supplier/supplier/Custom-details"
                  element={<Clearencedetails />}
                />
                <Route
                  index
                  path="/supplier/supplier/Editpdfclearence"
                  element={<Editpdfclearance />}
                />
                <Route index path="/supplier/supplier/Chat" element={<Chat />} />
                <Route index path="/supplier/supplier/AddBatch" element={<AddBatch />} />
                <Route index path="/supplier/supplier/link" element={<CMS />} />
                <Route
                  index
                  path="/supplier/supplier/download_url"
                  element={<Downloadurl />}
                />
                <Route
                  index
                  path="/supplier/supplier/calculation-clearence"
                  element={<CalculationPages />}
                />
                <Route
                  index
                  path="/supplier/supplier/clearencePage"
                  element={<CustomCalculationpage />}
                />
                <Route
                  index
                  path="/supplier/supplier/clearencePDF"
                  element={<Claeanepdf />}
                />
                <Route
                  index
                  path="/supplier/supplier/calculation-order"
                  element={<ClearanceOrder />}
                />
                <Route
                  index
                  path="/supplier/supplier/letterofauhtority"
                  element={<Letterofauthority />}
                />
                <Route
                  index
                  path="/supplier/supplier/clearenceeditview"
                  element={<ViewDetails />}
                />
                <Route
                  index
                  path="/supplier/supplier/Editclearence"
                  element={<Editclearenceuser />}
                />
                <Route
                  index
                  path="/supplier/supplier/BatchDetails"
                  element={<BatchorderDetails />}
                />
                <Route
                  index
                  path="/supplier/supplier/OrderDetail"
                  element={<OrderDetailspagemain />}
                />
                <Route path="*" element={<Uniovwersalpage />} />
                <Route path="*" element={<Uniovwersalpage />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </MyContext2.Provider>
    </MyContext1.Provider>
  );
}