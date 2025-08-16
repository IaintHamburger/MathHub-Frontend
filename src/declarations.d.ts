declare module "*.svg" {
  import type * as React from "react";

  // 支援：import { ReactComponent as Logo } from './logo.svg';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  // 支援：import logoUrl from './logo.svg';
  const src: string;
  export default src;
}
