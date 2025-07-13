import { persistor, store } from "@/redux/store/app";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

// Components
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
      <div className="min-h-screen bg-gray-50">
        {!isAdminPage && <Header />}
        <main>
          <AppRoutes />
        </main>
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
