import React from "react"
import { ContextProvider } from "./src/context"



export const wrapRootElement = ({ element }) => (
  <ContextProvider>
      {element}
  </ContextProvider>
)