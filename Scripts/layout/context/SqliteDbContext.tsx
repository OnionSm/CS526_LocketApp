import React, { useState, createContext, ReactNode } from "react";



const SqliteDbContext = createContext<any>(null);

interface SqliteDbProviderProps 
{
  children: ReactNode; 
}

function SqliteDbProvider({children} : SqliteDbProviderProps)
{
    const [db, set_db] = useState(null);

    const value = {
        db,
        set_db
    };

    return(
        <SqliteDbContext.Provider value={value}>
            {children}
        </SqliteDbContext.Provider>
    );
}

export { SqliteDbContext, SqliteDbProvider};