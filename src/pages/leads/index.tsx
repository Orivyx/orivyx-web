import { useIsMobile } from "../landing/hooks";
import { LeadsDesktop } from "./leadsDesktop";
import { LeadsMobile } from "./leadsMobile";

export function Leads() {
  const isMobile = useIsMobile();

  return isMobile ? <LeadsMobile /> : <LeadsDesktop />;
}
