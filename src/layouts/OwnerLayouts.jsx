import OwnerSidebar from "@/components/ownerManage/sidebar/OwnerSidebar";

import { Outlet } from "react-router-dom";

const OwnerLayouts = () => {
  return (
    <div className="min-h-screen">
      <OwnerSidebar />

      <main className="ml-72 w-[calc(100%-18rem)] min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayouts;
