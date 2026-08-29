"use client";

import { usePathname } from "next/navigation";

import { DemoRibbon } from "@/components/site/demo-ribbon";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

type AppChromeProps = {
  children: React.ReactNode;
};

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isPanel = pathname.startsWith("/panel");

  if (isPanel) {
    return (
      <>
        <DemoRibbon />
        <main id="contenido" className="admin-site-main">
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <div className="sticky-shell">
        <DemoRibbon />
        <SiteHeader />
      </div>
      <main id="contenido" className="site-main">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
