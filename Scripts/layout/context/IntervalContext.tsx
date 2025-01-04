import React, { useState, createContext, ReactNode } from "react";

// Tạo context
const IntervalContext = createContext<any>(null);

interface IntervalProviderProps {
  children: ReactNode;
}

function IntervalProvider({ children }: IntervalProviderProps) {
  
  const [list_interval, set_list_interval] = useState<Array<any>>([]);

  
  const close_all_interval = () => {
 
    list_interval.forEach((interval: any) => {
      clearInterval(interval);
    });
   
    set_list_interval([]);
  };

  
  const add_interval = (new_interval: any) => {
    set_list_interval((prev) => [...prev, new_interval]);
  };

  // Giá trị context sẽ chứa cả list_interval và các hàm add_interval, close_all_interval
  const value = {
    list_interval,
    add_interval,
    close_all_interval,
  };

  return (
    <IntervalContext.Provider value={value}>
      {children}
    </IntervalContext.Provider>
  );
}

export { IntervalContext, IntervalProvider };
