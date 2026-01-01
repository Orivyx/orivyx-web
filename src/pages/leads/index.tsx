import { useIsMobile } from "../landing/hooks";
import { LeadsDesktop } from "./LeadsDesktop";
import { LeadsMobile } from "./LeadsMobile";

export function Leads() {
  const isMobile = useIsMobile();

  return isMobile ? <LeadsMobile /> : <LeadsDesktop />;
}

