import React, { createContext, useState, useContext } from "react";

// Context đơn giản để chia sẻ state "advancedFeatures" giữa các component
const AdvancedFeaturesContext = createContext();

export function AdvancedFeaturesProvider({ children }) {
  const [advancedFeatures, setAdvancedFeatures] = useState(false);

  return (
    <AdvancedFeaturesContext.Provider value={{ advancedFeatures, setAdvancedFeatures }}>
      {children}
    </AdvancedFeaturesContext.Provider>
  );
}

export function useAdvancedFeatures() {
  return useContext(AdvancedFeaturesContext);
}
