import { configureStore, combineReducers } from "@reduxjs/toolkit";
import accountsReducer from "../Reducers/accountsSlice";
import accountTypesReducer from "../Reducers/accountTypesSlice";
import itemsReducer from "../Reducers/itemsSlice";
import itemTypesReducer from "../Reducers/itemTypesSlice";
import personRolesReducer from "../Reducers/personRolesSlice";
import paymentMethodsReducer from "../Reducers/paymentMethodsSlice";
import receiptsReducer from "../Reducers/receiptsSlice";
import schoolClassesReducer from "../Reducers/schoolClassesSlice";
import schoolStudentsReducer from "../Reducers/schoolStudentsSlice";
import studentRegistrationsReducer from "../Reducers/studentRegistrationsSlice";
import schoolPaymentConfigsReducer from "../Reducers/schoolPaymentConfigsSlice";
import personsReducer from "../Reducers/personsSlice";
import debtorsReducer from "../Reducers/debtorsSlice";
import depositsReducer from "../Reducers/depositsSlice";
import invoicesReducer from "../Reducers/invoicesSlice";
import receivedPaymentsReducer from "../Reducers/receivedPaymentsSlice";
import billsReducer from "../Reducers/billsSlice";
import paidBillsReducer from "../Reducers/paidBillsSlice";
// import storage from 'redux-persist/lib/storage';
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: storageSession,
  blacklist: [
    "accounttypes", "accounts", "items",
    "schoolClasses", "schoolStudents", "studentRegistrations",
    "schoolPaymentConfigs", "itemTypes", "persons",
    "personRoles", "paymentMethods", "receipts",
    "debtors", "deposits", "invoices", "receivedPayments",
    "bills", "paidBills"
  ],
};

const rootReducer = combineReducers({
  accounts: accountsReducer,
  accounttypes: accountTypesReducer,
  items: itemsReducer,
  itemTypes: itemTypesReducer,
  schoolClasses: schoolClassesReducer,
  schoolStudents: schoolStudentsReducer,
  studentRegistrations: studentRegistrationsReducer,
  schoolPaymentConfigs: schoolPaymentConfigsReducer,
  persons: personsReducer,
  personRoles: personRolesReducer,
  paymentMethods: paymentMethodsReducer,
  receipts: receiptsReducer,
  debtors: debtorsReducer,
  deposits:depositsReducer,
  invoices:invoicesReducer,
  receivedPayments: receivedPaymentsReducer,
  bills:billsReducer,
  paidBills: paidBillsReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk]
// })

export const persistor = persistStore(Store);
