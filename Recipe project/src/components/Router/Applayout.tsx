import { Outlet } from "react-router-dom";
import Menu from "./Menu";

const AppLayout = () => {
  return (
    <>
      <div>
        <Menu />
        <div></div>
        <Outlet />
        <div></div>
      </div>
    </>
  );
};

export default AppLayout;
