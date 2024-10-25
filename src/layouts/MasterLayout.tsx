import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MasterLayout() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}
