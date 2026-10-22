import type { Problem } from "../../types";

import { problem as clientFeedback } from "./client-feedback";
import { problem as clinicNoshows } from "./clinic-noshows";
import { problem as freelanceInvoices } from "./freelance-invoices";
import { problem as warehouseInventory } from "./warehouse-inventory";
import { problem as tutorScheduling } from "./tutor-scheduling";
import { problem as restaurantSuppliers } from "./restaurant-suppliers";
import { problem as propertyMaintenance } from "./property-maintenance";
import { problem as salonRebooking } from "./salon-rebooking";
import { problem as accountantDocs } from "./accountant-docs";
import { problem as gymChurn } from "./gym-churn";
import { problem as photoSelects } from "./photo-selects";

// Order matters: todaysProblems is the first three entries.
export const problems: Problem[] = [
  clientFeedback,
  clinicNoshows,
  freelanceInvoices,
  warehouseInventory,
  tutorScheduling,
  restaurantSuppliers,
  propertyMaintenance,
  salonRebooking,
  accountantDocs,
  gymChurn,
  photoSelects,
];

export const todaysProblems = problems.slice(0, 3);

export function getProblem(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}
