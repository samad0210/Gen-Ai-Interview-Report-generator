import {createBrowserRouter} from "react-router";
import Login from "./features/authentication/pages/login";
import Register from "./features/authentication/pages/register";
import Protected from "./features/authentication/components/protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/interview";




export const router = createBrowserRouter([
   {
    path:"/login",
    element:<Login/>
   },
   {
    path:"/register",
    element:<Register/>
   },
   {
    path:"/",
    element:<Protected>
      <Home/>
      </Protected>
   },

   {
      path:"/interview/:interviewId",
      element:<Protected>  
         <Interview/>
      </Protected>
   }



]);