import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ToolbarActions } from "../components/ToolbarActions";
import { NAVIGATION } from "../config/navigation";
import { theme } from "../theme/theme";
import { useAppRouter } from "../hooks/useAppRouter";
import Home from "../pages/home";
import Expenses from "../pages/expenses";
import Categories from "../pages/categories";

function DashboardLayoutContent() {
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <img
            src="/favicon.svg"
            alt="Expenses Tracker Logo"
            style={{ height: 40, width: 40 }}
          />
        ),
        title: "Expenses Tracker",
        homeUrl: "/",
      }}
      router={useAppRouter()}
      theme={theme}
    >
      <DashboardLayout
        slots={{
          toolbarActions: ToolbarActions,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

export default function DashboardLayoutApp() {
  return (
    <BrowserRouter>
      <DashboardLayoutContent />
    </BrowserRouter>
  );
}
