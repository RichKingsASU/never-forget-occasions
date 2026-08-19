import { Info } from "lucide-react";

export const CatalogPreviewBanner = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 rounded-lg border border-corten/30 bg-corten/10 px-3 py-2 text-xs text-corten ${className}`}>
    <Info className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
    <span>Gift catalog preview — fulfillment launching soon. Delivery speeds shown are targets, not guarantees.</span>
  </div>
);
