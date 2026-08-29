import { BRAND } from "@/lib/brand";

export function DemoRibbon() {
  return (
    <p className="demo-ribbon" role="status">
      <span className="status-dot" aria-hidden="true" />
      {BRAND.demoNotice}
    </p>
  );
}
