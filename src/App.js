import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Home from "./Pages/Home";
import Stepper from "./Pages/OnboardingScreens/Stepper";
import AccountsList from "./Pages/Backoffice/Accounts/AccountsList.jsx";
import AccountTypesList from "./Pages/Backoffice/AccountTypes/AccountTypes.jsx";
import ItemsList from "./Pages/Backoffice/Items/ItemsList.jsx";
import ItemTypesList from "./Pages/Backoffice/ItemTypes/ItemTypesList.jsx";
import PersonRolesList from "./Pages/Backoffice/PersonRoles/PersonRolesList.jsx";
import PaymentMethodsList from "./Pages/Backoffice/PaymentMethods/PaymentMethodsList.jsx";

import SchoolClassesList from "./Pages/Backoffice/SchoolClasses/SchoolClassesList.jsx";
import SchoolStudentsList from "./Pages/Backoffice/SchoolStudents/SchoolStudentsList.jsx";
import SchoolPaymentConfigsList from "./Pages/Backoffice/SchoolPaymentConfigs/SchoolPaymentConfigsList.jsx";
import StudentRegistration from "./Pages/Backoffice/StudentRegistration/StudentRegistrationList.jsx";

import Persons from "./Pages/Backoffice/Persons/Persons.jsx";
import Students from "./Pages/Backoffice/Persons/Students/StudentsList.jsx";
import Staff from "./Pages/Backoffice/Persons/Staff/StaffList.jsx";
import Customers from "./Pages/Backoffice/Persons/Customers/CustomersList.jsx";

import OneReceipt from "./Pages/Backoffice/Receipts_old/OneReceipt";
// import CreateReceipt from "./Pages/Backoffice/Receipts/CreateReceipt.jsx";
import ReceiptsList from "./Pages/Backoffice/Receipt/ReceiptsList.jsx";
import ReceiptForm from "./Pages/Backoffice/Receipt/receiptForm/ReceiptForm";

import DepositsList from "./Pages/Backoffice/Deposit/DepositsList.jsx";
import CreateDeposit from "./Pages/Backoffice/Deposit/newDeposit/CreateDeposit.jsx";
//
import Cashbook from "./Pages/Backoffice/Cashbook/Cashbook.jsx";
// import Invoice from "./Pages/Backoffice/Invoice/Invoice.jsx";
import BillsList from "./Pages/Backoffice/Bill/BillsList";
import BillForm from "./Pages/Backoffice/Bill/billForm/BillForm";
import PaidBillsList from "./Pages/Backoffice/PayBill/PaidBillsList";
import PayBillForm from "./Pages/Backoffice/PayBill/newPayBill/PayBillForm";
//
import InvoicesList from "./Pages/Backoffice/Invoice/InvoicesList";
import InvoiceForm from "./Pages/Backoffice/Invoice/invoiceForm/InvoiceForm";
import ReceivedPaymentsList from "./Pages/Backoffice/ReceivePayment/ReceivePaymentsList";
import ReceivePaymentForm from "./Pages/Backoffice/ReceivePayment/newReceivePayment/ReceivePaymentForm";
//
import Creditors from "./Pages/Backoffice/Creditors/Creditors.jsx";
import Debtors from "./Pages/Backoffice/Debtors/Debtors.jsx";
import Dashboard from "./Pages/Backoffice/Dashboard/Dashboard.jsx";

import Settings from "./Pages/Backoffice/Settings/Settings.jsx";

import Layout from "./Components/Dashboard/Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/signup" element={<SignUp />}/>
          <Route exact path="/onboarding" element={<Stepper />}/>

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

            
            <Route exact path="one-receipt" element={<OneReceipt />}/>            
            {/* <Route exact path="new-receipt/reg/:id" element={<CreateReceipt />}/> */}
            {/* <Route exact path="receipts/:id" element={<ReceiptForm />}/> */}
            <Route exact path="receipts" element={<ReceiptsList />}/>
            <Route exact path="new-receipt" element={<ReceiptForm />}/>
            <Route exact path="receipts/:id" element={<ReceiptForm />}/>

            <Route exact path="deposits" element={<DepositsList />}/>
            <Route exact path="new-deposit" element={<CreateDeposit />}/>

            {/* <Route exact path="bill" element={<Bill />}/> */}
            <Route exact path="bills" element={<BillsList />}/>
            <Route exact path="new-bill" element={<BillForm />}/>
            <Route exact path="bills/:id" element={<BillForm/>}/>
            {/*  */}
            <Route exact path="paid-bills" element={<PaidBillsList />}/>
            <Route exact path="new-bill-payment" element={<PayBillForm />}/>
            {/*  */}
            <Route exact path="invoices" element={<InvoicesList />}/>
            <Route exact path="new-invoice" element={<InvoiceForm />}/>
            <Route exact path="invoices/:id" element={<InvoiceForm/>}/>
            
            <Route exact path="cashbook" element={<Cashbook />}/>
            <Route exact path="received-payments" element={<ReceivedPaymentsList />}/>
            <Route exact path="new-payment" element={<ReceivePaymentForm />}/>
            
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
