import "./App.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
