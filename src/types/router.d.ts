// types/router.d.ts
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    subtitle?: string;
    transition?: {
      enter: string;
      leave: string;
    };
    hidden?: boolean;
    headerType?: string;
  }
}
