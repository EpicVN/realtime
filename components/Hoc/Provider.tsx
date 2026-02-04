import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider 
        attribute="class" 
        defaultTheme="light"
        enableSystem={false}
    >
        {children}
    </ThemeProvider>
  )
}

export default Provider