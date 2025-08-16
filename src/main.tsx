import App from '@/App';
import '@/index.css';
import '@/language/i18n'; // 導入 i18n 配置
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <App />
)
