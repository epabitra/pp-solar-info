import { Info } from 'lucide-react';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Layout';
import { SavingsCalculator } from '@/features/calculator/SavingsCalculator';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { calculatorAssumptions } from '@/lib/calculator';
import { formatDecimal, formatInteger } from '@/lib/format';
import { photos } from '@/lib/images';

const a = calculatorAssumptions;

const assumptions = [
  `Each 1 kW of panels generates about ${formatInteger(a.unitsPerKwPerDay)} units (kWh) a day on average.`,
  `Each 1 kW needs about ${formatInteger(a.roofSqFtPerKw)} sq ft of shadow-free roof.`,
  `Grid electricity produces about ${formatDecimal(a.co2KgPerKwh)} kg of CO₂ per unit.`,
  'Savings are based only on the energy charge per unit. Fixed charges, taxes and net-metering rules vary and are not included.',
  `System size is rounded up to the nearest ${formatDecimal(a.sizeStepKw)} kW, with a minimum of ${formatInteger(a.minimumSizeKw)} kW.`,
];

export default function CalculatorPage() {
  useDocumentMeta('Solar savings calculator', 'Estimate the rooftop solar system size, yearly generation and savings for your monthly electricity bill.');

  return (
    <>
      <PageHeader
        title="Solar savings calculator"
        lead="Find the solar system size that fits your electricity bill, and how much it could save you each year."
        crumbs={[{ label: 'Savings calculator' }]}
        photo={photos.rooftopBlueSky}
      />
      <Section labelledBy="calculator-title">
        <h2 id="calculator-title" className="sr-only">
          Calculator
        </h2>
        <SavingsCalculator />
        <div className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Info aria-hidden="true" className="h-5 w-5 text-brand" />
            How we estimate
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
            {assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-muted">
            Actual results depend on your roof direction, shading, panel type and usage pattern. We confirm everything during the site visit.
          </p>
        </div>
      </Section>
      <CtaBanner title="Want an exact figure?" text="We visit your site, check the roof and your bills, and give you a clear design and quote." />
    </>
  );
}
