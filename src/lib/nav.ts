import {
  Activity,
  Boxes,
  Brain,
  Gauge,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/revenue", label: "Revenue", icon: Gauge },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/products", label: "Products", icon: Boxes },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/performance", label: "Performance", icon: Package },
  { to: "/insights", label: "AI Insights", icon: Brain },
  { to: "/activity", label: "Activity", icon: Activity },
];
