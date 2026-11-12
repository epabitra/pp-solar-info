/**
 * Rooftop solar sizing estimate. These are planning assumptions, not quotes:
 * the UI must show them next to the result (STYLE.md §9). Confirm the values with the client (MEMORY.md).
 */
export const calculatorAssumptions = {
  /** Typical daily generation per kW of panels in Odisha, in kWh. */
  unitsPerKwPerDay: 4,
  /** Rough shadow-free roof area needed per kW, in square feet. */
  roofSqFtPerKw: 100,
  /** Grid emission factor in kg CO2 per kWh (approximate national average). */
  co2KgPerKwh: 0.71,
  /** Default electricity rate shown in the form; the visitor should change it to match their bill. */
  defaultTariffPerUnit: 6,
  /** Systems are rounded up to this step, in kW. */
  sizeStepKw: 0.5,
  minimumSizeKw: 1,
  daysPerMonth: 30,
} as const;

export interface SavingsInput {
  monthlyBill: number;
  tariffPerUnit: number;
}

export interface SavingsEstimate {
  monthlyUnits: number;
  systemSizeKw: number;
  annualGenerationKwh: number;
  annualSavings: number;
  roofAreaSqFt: number;
  co2TonnesPerYear: number;
}

function roundUpTo(value: number, step: number): number {
  return Math.ceil(value / step) * step;
}

export function estimateSavings({ monthlyBill, tariffPerUnit }: SavingsInput): SavingsEstimate {
  const a = calculatorAssumptions;
  const monthlyUnits = monthlyBill / tariffPerUnit;
  const exactSizeKw = monthlyUnits / (a.unitsPerKwPerDay * a.daysPerMonth);
  const systemSizeKw = Math.max(a.minimumSizeKw, roundUpTo(exactSizeKw, a.sizeStepKw));
  const annualGenerationKwh = systemSizeKw * a.unitsPerKwPerDay * 365;
  // Savings cannot exceed what the visitor currently consumes.
  const offsetUnits = Math.min(annualGenerationKwh, monthlyUnits * 12);

  return {
    monthlyUnits,
    systemSizeKw,
    annualGenerationKwh,
    annualSavings: offsetUnits * tariffPerUnit,
    roofAreaSqFt: systemSizeKw * a.roofSqFtPerKw,
    co2TonnesPerYear: (annualGenerationKwh * a.co2KgPerKwh) / 1000,
  };
}
