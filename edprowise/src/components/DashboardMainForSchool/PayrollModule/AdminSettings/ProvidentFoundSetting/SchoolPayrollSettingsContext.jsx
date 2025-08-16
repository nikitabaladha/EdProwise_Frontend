import { createContext, useState, useContext } from "react";

export const SchoolPayrollSettingsContext = createContext();

export const SchoolPayrollSettingsProvider = ({ children }) => {
  const [pfEsiSettings, setPfEsiSettings] = useState({
    pfEnable: false,
    esiEnable: false,
  });
 
  return (
    <SchoolPayrollSettingsContext.Provider value={{ pfEsiSettings, setPfEsiSettings }}>
      {children}
    </SchoolPayrollSettingsContext.Provider>
  );
};

export const usePayrollSettings = () => {
  const context = useContext(SchoolPayrollSettingsContext);
  if (!context) {
    throw new Error('usePayrollSettings must be used within a SchoolPayrollSettingsProvider');
  }
  return context;
};