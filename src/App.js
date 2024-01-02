import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import AccountTypesList from "./Pages/Backoffice/AccountTypes/AccountTypes.jsx";
import AccountsList from "./Pages/Backoffice/Accounts/AccountsList.jsx";
import ItemTypesList from "./Pages/Backoffice/ItemTypes/ItemTypesList.jsx";
import ItemsList from "./Pages/Backoffice/Items/ItemsList.jsx";
import PaymentMethodsList from "./Pages/Backoffice/PaymentMethods/PaymentMethodsList.jsx";
import PersonRolesList from "./Pages/Backoffice/PersonRoles/PersonRolesList.jsx";
import Home from "./Pages/Home";
import Stepper from "./Pages/OnboardingScreens/Stepper";
import OnBoardHome from './Pages/Auth/OnBoarding/OnBoardHome'
import OnBoardFinish from './Pages/Auth/OnBoarding/OnBoardFinish'

import SchoolClassesList from "./Pages/Backoffice/SchoolClasses/SchoolClassesList.jsx";
import SchoolPaymentConfigsList from "./Pages/Backoffice/SchoolPaymentConfigs/SchoolPaymentConfigsList.jsx";
import SchoolStudentsList from "./Pages/Backoffice/SchoolStudents/SchoolStudentsList.jsx";
import StudentRegistration from "./Pages/Backoffice/StudentRegistration/StudentRegistrationList.jsx";

import Customers from "./Pages/Backoffice/Persons/Customers/CustomersList.jsx";
import Persons from "./Pages/Backoffice/Persons/Persons.jsx";
import Staff from "./Pages/Backoffice/Persons/Staff/StaffList.jsx";
import Students from "./Pages/Backoffice/Persons/Students/StudentsList.jsx";

import CreateReceipt from "./Pages/Backoffice/Receipts/CreateReceipt.jsx";
import OneReceipt from "./Pages/Backoffice/Receipts/OneReceipt.jsx";
import ReceiptsList from "./Pages/Backoffice/Receipts/ReceiptsList.jsx";
// import ReceiptForm from "./Pages/Backoffice/Receipts/ReceiptForm.jsx";
import Bill from "./Pages/Backoffice/Bill/Bill.jsx";
import Cashbook from "./Pages/Backoffice/Cashbook/Cashbook.jsx";
import Deposit from "./Pages/Backoffice/Deposit/Deposit.jsx";
import Invoice from "./Pages/Backoffice/Invoice/Invoice.jsx";
import ReceivePayment from "./Pages/Backoffice/ReceivePayment/ReceivePayment.jsx";

import Creditors from "./Pages/Backoffice/Creditors/Creditors.jsx";
import Dashboard from "./Pages/Backoffice/Dashboard/Dashboard.jsx";
import Debtors from "./Pages/Backoffice/Debtors/Debtors.jsx";

import Settings from "./Pages/Backoffice/Settings/Settings.jsx";

import Layout from "./Components/Dashboard/Layout";

import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import JoinWaitList from "./Pages/JoinWaitList";
import AdminDashboard from "./Pages/Dashboard/admin/AdminDashboard.jsx";
import DashboardProfile from "./Pages/Dashboard/admin/profile/DashboardProfile.jsx";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/join-wait-list" element={<JoinWaitList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/onboarding" element={<Stepper />} />
          <Route path="/onboarding2" element={<OnBoardHome />} />
          <Route path="/onboarding3" element={<OnBoardFinish/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/dashboard/profile" element={<DashboardProfile/>} />

          <Route exact path="dashboard" element={<Layout/>}>
            <Route index element={<Dashboard />}/>
            <Route exact path="accounts" element={<AccountsList />}/>
            <Route exact path="account_types" element={<AccountTypesList />}/>            
            <Route exact path="items" element={<ItemsList />}/>
            <Route exact path="item_types" element={<ItemTypesList />}/>
            <Route exact path="person_roles" element={<PersonRolesList />}/>
            <Route exact path="payment_methods" element={<PaymentMethodsList />}/>
            
            <Route exact path="school_classes" element={<SchoolClassesList />}/>
            <Route exact path="school_students" element={<SchoolStudentsList />}/>
            <Route exact path="school_payment_configs" element={<SchoolPaymentConfigsList />}/>
            <Route exact path="student_registration" element={<StudentRegistration />}/>

            <Route exact path="receipts" element={<ReceiptsList />}/>
            {/* <Route exact path="create_receipt" element={<CreateReceipt />}/>             */}
            <Route exact path="create_receipt/reg/:id" element={<CreateReceipt />}/>
            {/* <Route exact path="receipts/:id" element={<ReceiptForm />}/> */}
            
            <Route exact path="create_receipt" element={<OneReceipt />}/>
            <Route exact path="receipts/:id" element={<OneReceipt />}/>

            <Route exact path="deposit" element={<Deposit />}/>
            <Route exact path="bill" element={<Bill />}/>
            <Route exact path="invoice" element={<Invoice />}/>
            <Route exact path="cashbook" element={<Cashbook />}/>
            <Route exact path="receive_payment" element={<ReceivePayment />}/>
            
            <Route exact path="creditors" element={<Creditors />}/>
            <Route exact path="debtors" element={<Debtors />}/>
            <Route exact path="settings" element={<Settings />}/>

            <Route exact path="persons" element={<Persons/>}>
              <Route exact path="students" element={<Students />}/>
              <Route exact path="staff" element={<Staff />}/>
              <Route exact path="customers" element={<Customers />}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
