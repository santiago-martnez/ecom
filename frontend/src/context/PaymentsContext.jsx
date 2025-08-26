import React from "react";
import { createContext, useContext, useState } from "react";
import { Success, Failure, Pending } from "../api/pagos"; // tus funciones existentes

const PaymentsContext = createContext();

export const usePayments = () => {
  const context = useContext(PaymentsContext);
  if (!context) throw new Error("usePayments debe usarse dentro de un PaymentsProvider");
  return context;
};

export const PaymentsProvider = ({ children }) => {
  const [lastPayment, setLastPayment] = useState(null);
  const [status, setStatus] = useState(null);

  const checkPayment = async (type) => {
    try {
      let res;
      if (type === "success") res = await Success();
      else if (type === "failure") res = await Failure();
      else if (type === "pending") res = await Pending();

      setLastPayment(res?.data);
      setStatus(type);
    } catch (err) {
      console.error("Error consultando pago:", err);
      setStatus("error");
    }
  };

  return (
    <PaymentsContext.Provider value={{ lastPayment, status, checkPayment }}>
      {children}
    </PaymentsContext.Provider>
  );
};
