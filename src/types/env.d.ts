/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENVIRONMENT: "development" | "production" | "staging";
  readonly VITE_RSA_PUBLIC_KEY: string;
  readonly VITE_RSA_ENCRYPTION_ENABLED: boolean;
  readonly VITE_USE_CREDENTIALS: boolean;
}

// biome-ignore lint/correctness/noUnusedVariables: meta env of type is automatically detected
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// 全域型別定義
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
