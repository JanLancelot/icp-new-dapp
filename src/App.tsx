import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import VolunteerForm from "./pages/VolunteerForm";
import Authentication from "./pages/Authentication";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Organization from "./pages/Organization";
import CreateOrgProfile from "./pages/CreateOrgProfile";
import MyOrganizations from "./pages/MyOrganizations";
import ManageOrgHome from "./pages/ManageOrgHome";
import CreateEvent from "./pages/CreateEvent";
import OrgProfile from "./pages/OrgProfile";
import EditOrgProfile from "./pages/EditOrgProfile";
import Chat from "./pages/Chat";
import ViewApplications from "./pages/ViewApplications";
import OrgMembers from "./pages/OrgMembers";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/opportunities",
      element: <Discover />
    },
    {
      path: "/application-form",
      element: <VolunteerForm />
    },
    {
      path: "/authentication",
      element: <Authentication />
    },
    {
      path: "/help-center",
      element: <Help />
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/organization-welcome",
      element: <Organization />
    },
    {
      path: "/create-org-profile",
      element: <CreateOrgProfile />
    },
    {
      path: '/my-organizations',
      element: <MyOrganizations />
    },
    {
      path: '/manage-org-home',
      element: <ManageOrgHome />
    },
    {
      path: '/create-event',
      element: <CreateEvent />
    },
    {
      path: '/org-profile',
      element: <OrgProfile />
    },
    {
      path: '/edit-org-profile',
      element: <EditOrgProfile />
    },
    {
      path: '/chat',
      element: <Chat />
    },
    {
      path: '/view-applications',
      element: <ViewApplications />
    },
    {
      path: '/manage-org-members',
      element: <OrgMembers />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
