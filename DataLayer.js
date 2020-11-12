// setup the data layer

import React, { createContext, useContext, useReducer } from "react";

// THIS IS THE DATA LAYER !!!
export const StateContext = createContext();

// BUILD A PROVIDER
export const DataLayer = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// USAGE IN COMPONENTS !!!
export const useDataLayerValue = () => useContext(StateContext);