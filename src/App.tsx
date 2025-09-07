import { memo, useCallback } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

// Components
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Toast from "@/components/ui/toast";
import { AuthProvider } from "@/hooks/useAuth";
import { RemoveToast } from "@/redux/slices/ToastSlice";
import { persistor, type RootState, store } from "@/redux/store/app";
import AppRoutes from "@/routes/index";

// 創建一個內部的 Toast 組件，在 Provider 內部使用 Redux hooks
const ToastWrapper = memo(() => {
  const dispatch = useDispatch();
  const currentToast = useSelector((state: RootState) => state.toastSlice.currentToast);

  // 使用 useCallback 優化 removeCurToast 函數
  const removeCurToast = useCallback(() => {
    dispatch(RemoveToast(null));
  }, [dispatch]);

  if (!currentToast) return null;

  return <Toast {...currentToast} onClose={removeCurToast} />;
});

ToastWrapper.displayName = "ToastWrapper";

// 內部組件，在 Router 內部使用 useLocation
function AppContent(): React.JSX.Element {
  const location = useLocation();

  // 檢查是否為管理員頁面
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {!isAdminPage && <Header />}
        <main className={isAdminPage ? "flex-1" : "flex flex-1 max-w-7xl mx-auto px-4 py-8"}>
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

        <ToastWrapper />
      </PersistGate>
    </Provider>
  );
}

export default App;
