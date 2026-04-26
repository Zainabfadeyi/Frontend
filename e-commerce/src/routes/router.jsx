import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";

const router =createBrowserRouter([
    {
        path:'/',
        element:<Login/>
    }
])
export default router;