import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, CheckCircle2, Mail, MessageCircle, Send } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ButtonAnchor } from '@/components/ui/Button';
import { SelectField, TextareaField, TextField } from '@/components/ui/FormField';
import { enquirySchema, enquiryServiceOptions, type EnquiryValues } from '@/lib/schemas';
import { useEnquiry } from './useEnquiry';

interface EnquiryFormProps {
  /** Pre-selects a service, e.g. when arriving from a service page. */
  defaultService?: string;
}

const emptyValues: EnquiryValues = { name: '', service: '', location: '', monthlyBill: '', message: '' };

export function EnquiryForm({ defaultService }: EnquiryFormProps) {
  const { status, send, reset: resetStatus } = useEnquiry();
  const resultRef = useRef<HTMLDivElement>(null);
  const initialService = defaultService && enquiryServiceOptions.includes(defaultService) ? defaultService : '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { ...emptyValues, service: initialService },
  });

  // Move focus to the result so screen-reader users hear the outcome.
  useEffect(() => {
    if (status.state !== 'idle') resultRef.current?.focus();
  }, [status.state]);

  if (status.state !== 'idle') {
    const blocked = status.state === 'blocked';
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-2xl border border-line bg-card p-6 shadow-card focus:outline-none sm:p-8">
        {blocked ? (
          <AlertTriangle aria-hidden="true" className="h-10 w-10 text-sun" />
        ) : (
          <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-leaf" />
        )}
        <h3 className="mt-4 text-xl font-semibold">{blocked ? 'One more step' : 'Your message is ready in WhatsApp'}</h3>
        <p className="mt-2 text-ink-muted">
          {blocked
            ? 'Your browser stopped WhatsApp from opening. Tap a button below to send your enquiry.'
            : 'Press send in WhatsApp and we will reply as soon as possible. If WhatsApp did not open, use a button below.'}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor href={status.whatsappLink} target="_blank" rel="noopener noreferrer" variant="whatsapp">
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            Open WhatsApp
          </ButtonAnchor>
          <ButtonAnchor href={status.emailLink} variant="outline">
            <Mail aria-hidden="true" className="h-5 w-5" />
            Send by email instead
          </ButtonAnchor>
        </div>
        <button
          type="button"
          onClick={() => {
            reset({ ...emptyValues, service: initialService });
            resetStatus();
          }}
          className="mt-6 rounded text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(send)}
      aria-describedby="enquiry-note"
      className="space-y-5 rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="enquiry-name" label="Your name" required autoComplete="name" error={errors.name?.message} {...register('name')} />
        <SelectField
          id="enquiry-service"
          label="Service needed"
          required
          placeholder="Choose a service"
          options={enquiryServiceOptions}
          error={errors.service?.message}
          {...register('service')}
        />
        <TextField
          id="enquiry-location"
          label="Location"
          hint="Town or village, so we can plan the visit."
          autoComplete="address-level2"
          error={errors.location?.message}
          {...register('location')}
        />
        <TextField
          id="enquiry-bill"
          label="Monthly electricity bill (₹)"
          inputMode="numeric"
          hint="Optional. Helps us size a solar system."
          error={errors.monthlyBill?.message}
          {...register('monthlyBill')}
        />
      </div>
      <TextareaField
        id="enquiry-message"
        label="Message"
        placeholder="Tell us about your roof, load or the work you need."
        error={errors.message?.message}
        {...register('message')}
      />
      <p id="enquiry-note" className="text-sm text-ink-muted">
        Sending opens WhatsApp with your message filled in. We reply on the number you send it from.
      </p>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        <Send aria-hidden="true" className="h-5 w-5" />
        Send enquiry on WhatsApp
      </Button>
    </form>
  );
}
