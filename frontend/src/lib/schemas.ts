import * as z from 'zod/mini';
import { services } from './services';

/**
 * Form schemas and their messages. Keep messages plain and actionable (RULES.md §2.5).
 * Uses zod/mini (tree-shakable) to keep form pages within the bundle budget (STYLE.md §11).
 */

const optionalText = (max: number, label: string) =>
  z.string().check(z.trim(), z.maxLength(max, { error: `${label} can be at most ${max} characters. Please shorten it.` }));

export const enquiryServiceOptions: readonly string[] = [...services.map((service) => service.title), 'Something else'];

export const enquirySchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, { error: 'Please enter your name so we know who to reply to.' }),
      z.maxLength(80, { error: 'Name can be at most 80 characters.' }),
    ),
  service: z.string().check(z.refine((value) => enquiryServiceOptions.includes(value), { error: 'Please choose the service you need.' })),
  location: optionalText(120, 'Location'),
  monthlyBill: optionalText(20, 'Monthly bill').check(
    z.refine((value) => value === '' || /^\d{1,7}$/.test(value), {
      error: 'Enter your monthly bill in rupees as a number, for example 2500.',
    }),
  ),
  message: optionalText(1000, 'Message'),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;

export const savingsSchema = z.object({
  monthlyBill: z.coerce
    .number({ error: 'Enter your average monthly electricity bill in rupees.' })
    .check(
      z.gte(300, { error: 'Enter a monthly bill of at least ₹300.' }),
      z.lte(5_000_000, { error: 'For bills above ₹50,00,000 a month, please contact us for a detailed study.' }),
    ),
  tariffPerUnit: z.coerce
    .number({ error: 'Enter the rate per unit shown on your bill.' })
    .check(
      z.gte(1, { error: 'The rate per unit must be at least ₹1.' }),
      z.lte(25, { error: 'The rate per unit must be ₹25 or less. Check the value on your bill.' }),
    ),
});

export type SavingsFormInput = z.input<typeof savingsSchema>;
export type SavingsFormValues = z.output<typeof savingsSchema>;
