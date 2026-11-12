import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator, IndianRupee, Leaf, PanelsTopLeft, Ruler, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ButtonLink } from '@/components/ui/Button';
import { TextField } from '@/components/ui/FormField';
import { calculatorAssumptions, estimateSavings, type SavingsEstimate } from '@/lib/calculator';
import { formatDecimal, formatInteger, formatRupees } from '@/lib/format';
import { savingsSchema, type SavingsFormInput, type SavingsFormValues } from '@/lib/schemas';
import { routes } from '@/lib/siteLinks';

interface ResultTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  highlight?: boolean;
}

function ResultTile({ icon: Icon, label, value, highlight = false }: ResultTileProps) {
  return (
    <div className={`rounded-2xl p-5 ${highlight ? 'bg-hero text-white' : 'border border-line bg-card'}`}>
      <Icon aria-hidden="true" className={`h-6 w-6 ${highlight ? 'text-sun' : 'text-brand'}`} />
      <dt className={`mt-3 text-sm ${highlight ? 'text-white/75' : 'text-ink-muted'}`}>{label}</dt>
      <dd className={`mt-1 font-display text-2xl font-bold ${highlight ? 'text-white' : 'text-ink'}`}>{value}</dd>
    </div>
  );
}

function Results({ estimate }: { estimate: SavingsEstimate }) {
  return (
    <div>
      <h3 className="text-xl font-semibold">Your estimate</h3>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <ResultTile icon={PanelsTopLeft} label="Suggested system size" value={`${formatDecimal(estimate.systemSizeKw)} kW`} highlight />
        <ResultTile icon={IndianRupee} label="Estimated savings per year" value={formatRupees(estimate.annualSavings)} highlight />
        <ResultTile icon={Zap} label="Estimated generation per year" value={`${formatInteger(estimate.annualGenerationKwh)} units`} />
        <ResultTile icon={Ruler} label="Shadow-free roof area needed" value={`about ${formatInteger(estimate.roofAreaSqFt)} sq ft`} />
        <ResultTile icon={Calculator} label="Your current use per month" value={`${formatInteger(estimate.monthlyUnits)} units`} />
        <ResultTile icon={Leaf} label="CO₂ avoided per year" value={`${formatDecimal(estimate.co2TonnesPerYear)} tonnes`} />
      </dl>
      <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-brand-soft p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink">This is an estimate. A site visit gives you an exact design and quote.</p>
        <ButtonLink to={routes.contact} className="shrink-0">
          Get an exact quote
        </ButtonLink>
      </div>
    </div>
  );
}

export function SavingsCalculator() {
  const [estimate, setEstimate] = useState<SavingsEstimate | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SavingsFormInput, unknown, SavingsFormValues>({
    resolver: zodResolver(savingsSchema),
    defaultValues: { monthlyBill: '', tariffPerUnit: calculatorAssumptions.defaultTariffPerUnit },
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <form noValidate onSubmit={handleSubmit((values) => setEstimate(estimateSavings(values)))} className="h-fit space-y-5 rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8">
        <h2 className="text-xl font-semibold">Enter your bill details</h2>
        <TextField
          id="calc-bill"
          label="Average monthly electricity bill (₹)"
          type="number"
          inputMode="numeric"
          min={0}
          required
          placeholder="e.g. 3000"
          error={errors.monthlyBill?.message}
          {...register('monthlyBill')}
        />
        <TextField
          id="calc-tariff"
          label="Rate per unit (₹/kWh)"
          type="number"
          inputMode="decimal"
          step="0.1"
          min={0}
          required
          hint="Check the energy charge per unit on your bill."
          error={errors.tariffPerUnit?.message}
          {...register('tariffPerUnit')}
        />
        <Button type="submit" size="lg" className="w-full">
          <Calculator aria-hidden="true" className="h-5 w-5" />
          Calculate savings
        </Button>
      </form>

      <div aria-live="polite">
        {estimate ? (
          <Results estimate={estimate} />
        ) : (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-line p-8 text-center">
            <PanelsTopLeft aria-hidden="true" className="h-10 w-10 text-brand" />
            <p className="mt-4 max-w-sm text-ink-muted">Enter your monthly bill and press Calculate to see the system size and savings that fit you.</p>
          </div>
        )}
      </div>
    </div>
  );
}
