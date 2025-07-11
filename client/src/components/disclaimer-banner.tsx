import { Info } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-y border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center">
          <Info className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0" />
          <p className="text-amber-800 text-sm font-medium text-center">
            <strong>Vigtigt:</strong> Vi leverer kun analytisk information. Vi rangerer ikke, sælger ikke, anbefaler ikke eller faciliterer forsikringskøb. Alle beslutninger forbliver hos dig.
          </p>
        </div>
      </div>
    </div>
  );
}
