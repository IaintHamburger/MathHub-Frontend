import { persistor, store } from "@/redux/store/app";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

// Components
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { AuthProvider } from "@/hooks/useAuth";
import AppRoutes from "@/routes/index";

// 內部組件，在 Router 內部使用 useLocation
function AppContent(): React.JSX.Element {
  const location = useLocation();

  // 檢查是否為管理員頁面
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {!isAdminPage && <Header />}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <AppRoutes />
        </main>
        {!isAdminPage && <Footer />}
      </div>
    </AuthProvider>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContent />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
