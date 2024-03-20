import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserList } from "./components/UserList";
import "./styles/App.css";
import { EditUser } from "./components/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
    // TODO: try adding a loader to fetch users here
  },
  {
    path: "users/edit/:userId",
    element: <EditUser />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
