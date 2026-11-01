import { Shell } from "@/components/Shell";
import { Activity } from "@/pages/Activity";
import { Customers } from "@/pages/Customers";
import { Insights } from "@/pages/Insights";
import { Orders } from "@/pages/Orders";
import { Overview } from "@/pages/Overview";
import { Performance } from "@/pages/Performance";
import { Products } from "@/pages/Products";
import { Revenue } from "@/pages/Revenue";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  // Primary product opens at site root — no framework picker.
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  return (
    <BrowserRouter basename={basename === "/" ? undefined : basename}>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Overview />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="performance" element={<Performance />} />
          <Route path="insights" element={<Insights />} />
          <Route path="activity" element={<Activity />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
