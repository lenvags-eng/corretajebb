import type { Metadata } from "next";

import { AdminWorkspace } from "@/components/admin/admin-workspace";

export const metadata: Metadata = {
  title: "Panel DEMO | B & B Corretaje",
  description:
    "Panel local ficticio para demostrar gestión, roles y ciclo de publicaciones de B & B Corretaje.",
};

export default function PanelPage() {
  return <AdminWorkspace />;
}
