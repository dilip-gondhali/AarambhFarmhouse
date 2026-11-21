import React, { useState, useEffect, useRef } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import {
  BOOKING_OCCASIONS,
  BookingFormValues,
  RESORT_CONFIG,
  RESORT_IMAGES,
  buildWhatsAppEnquiryMessage,
  buildWhatsAppUrl,
  getQuickWhatsAppUrl,
} from '../data/resortData';
import { ResilientImage } from './ResilientImage';

interface BookingSectionProps {
  selectedOccasion: string;
}

interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ selectedOccasion }) => {
  const todayIso = new Date().toISOString().split('T')[0];

  const [values, setValues] = useState<BookingFormValues>({
    fullName: '',
    mobileNumber: '',
    checkInDate: '',
    checkOutDate: '',
    guests: '4',
    occasion: selectedOccasion || BOOKING_OCCASIONS[0],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const whatsappLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (selectedOccasion) {
      setValues((prev) => ({ ...prev, occasion: selectedOccasion }));
    }
  }, [selectedOccasion]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const digitsOnly = values.mobileNumber.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      nextErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (!values.checkInDate) {
      nextErrors.checkInDate = 'Please select your preferred check-in date.';
    }

    if (!values.checkOutDate) {
      nextErrors.checkOutDate = 'Please select your check-out date.';
    } else if (values.checkInDate && values.checkOutDate < values.checkInDate) {
      nextErrors.checkOutDate = 'Check-out date cannot be before check-in date.';
    }

    const guestCount = Number(values.guests);
    if (!values.guests || Number.isNaN(guestCount) || guestCount < 1) {
      nextErrors.guests = 'Please specify at least 1 guest.';
    }

    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedMsg = buildWhatsAppEnquiryMessage(values);
    const whatsappHref = buildWhatsAppUrl(formattedMsg);

    setSubmittedMessage(formattedMsg);
    setSubmittedUrl(whatsappHref);
    setCopied(false);

    // Programmatically trigger anchor link in new tab (avoids window.open popup blocks)
    setTimeout(() => {
      if (whatsappLinkRef.current) {
        whatsappLinkRef.current.href = whatsappHref;
        whatsappLinkRef.current.click();
      }
    }, 0);
  };

  const handleCopyMessage = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="booking" className="bg-[#FFFFFF] py-24 lg:py-32 border-t border-[#E8DDC8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Details & Authentic Instagram QR */}
          <div className="lg:col-span-5">
            <p className="text-[#607D50] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
              Reservations &amp; Enquiries
            </p>
            <h2 className="font-serif text-[#183D2B] text-4xl sm:text-5xl leading-[1.1] font-medium mb-5">
              Ready for Your Perfect Getaway?
            </h2>
            <p className="text-[#242824]/80 text-[15px] sm:text-base leading-[1.75] mb-9">
              Your memorable stay at Aarambh is just one booking away. Get in touch with us to
              check availability and plan your visit.
            </p>

            {/* Contact Details List */}
            <div className="divide-y divide-[#E8DDC8] border-y border-[#E8DDC8] mb-8">
              <a
                href={RESORT_CONFIG.phoneHref}
                className="py-4 flex items-center gap-4 group hover:bg-[#F8F5EC]/60 -mx-3 px-3 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F8F5EC] border border-[#E8DDC8] text-[#183D2B] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs text-[#607D50] font-semibold uppercase tracking-wider">
                    Phone Number
                  </p>
                  <p className="text-base text-[#183D2B] font-medium tabular-nums group-hover:underline">
                    {RESORT_CONFIG.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={getQuickWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 flex items-center gap-4 group hover:bg-[#F8F5EC]/60 -mx-3 px-3 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#183D2B] text-[#F8F5EC] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs text-[#607D50] font-semibold uppercase tracking-wider">
                    WhatsApp Booking Desk
                  </p>
                  <p className="text-base text-[#183D2B] font-medium group-hover:underline">
                    Chat directly for instant availability
                  </p>
                </div>
              </a>

              <a
                href={RESORT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 flex items-center gap-4 group hover:bg-[#F8F5EC]/60 -mx-3 px-3 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F8F5EC] border border-[#E8DDC8] text-[#183D2B] flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs text-[#607D50] font-semibold uppercase tracking-wider">
                    Instagram
                  </p>
                  <p className="text-base text-[#183D2B] font-medium group-hover:underline">
                    {RESORT_CONFIG.instagramHandle}
                  </p>
                </div>
              </a>

              <div className="py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F8F5EC] border border-[#E8DDC8] text-[#183D2B] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs text-[#607D50] font-semibold uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-base text-[#183D2B] font-medium">
                    {RESORT_CONFIG.locationShort}
                  </p>
                </div>
              </div>
            </div>

            {/* Authentic Resort Brand Crest & Instagram Scan Card */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-[#E8DDC8] bg-[#F8F5EC] p-3 flex flex-col justify-between">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#F8F5EC] flex items-center justify-center">
                  <ResilientImage
                    src={RESORT_IMAGES.brandLogoLight}
                    alt="Official Aarambh Farmhouse Staycation & Resort logo"
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <p className="text-xs text-[#242824]/75 mt-2.5 text-center">
                  Official Resort Identity
                </p>
              </div>

              <a
                href={RESORT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl overflow-hidden border border-[#E8DDC8] bg-[#F8F5EC] p-3 flex flex-col justify-between hover:border-[#607D50] transition-colors group"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#242824] flex items-center justify-center">
                  <ResilientImage
                    src={RESORT_IMAGES.instagramQr}
                    alt="Scan Instagram QR code for @aarambhfarmstaycationresort"
                    className="w-full h-full object-contain bg-[#242824]"
                  />
                </div>
                <p className="text-xs text-[#183D2B] font-medium mt-2.5 text-center group-hover:underline">
                  Follow on Instagram
                </p>
              </a>
            </div>
          </div>

          {/* Right Column: Booking Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#F8F5EC] border border-[#E8DDC8] p-6 sm:p-10">
              <div className="mb-8">
                <h3 className="font-serif text-3xl text-[#183D2B] font-medium leading-snug">
                  Booking Enquiry Form
                </h3>
                <p className="text-sm text-[#242824]/75 mt-1.5">
                  Fill in your stay details below to instantly open WhatsApp with your pre-filled
                  booking request.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2"
                    >
                      Full Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={values.fullName}
                      onChange={handleChange}
                      placeholder="e.g., Rohan Deshmukh"
                      aria-invalid={Boolean(errors.fullName)}
                      className={`w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border text-sm text-[#242824] placeholder:text-[#242824]/40 focus:outline-none focus:ring-2 focus:ring-[#183D2B]/25 transition-colors ${
                        errors.fullName
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#E8DDC8] focus:border-[#183D2B]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label
                      htmlFor="mobileNumber"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2"
                    >
                      Mobile Number <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      required
                      value={values.mobileNumber}
                      onChange={handleChange}
                      placeholder="e.g., +91 98200 12345"
                      aria-invalid={Boolean(errors.mobileNumber)}
                      className={`w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border text-sm text-[#242824] tabular-nums placeholder:text-[#242824]/40 focus:outline-none focus:ring-2 focus:ring-[#183D2B]/25 transition-colors ${
                        errors.mobileNumber
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#E8DDC8] focus:border-[#183D2B]'
                      }`}
                    />
                    {errors.mobileNumber && (
                      <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.mobileNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Check-in & Check-out Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="checkInDate"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2"
                    >
                      Check-in Date <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="checkInDate"
                      name="checkInDate"
                      type="date"
                      min={todayIso}
                      required
                      value={values.checkInDate}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.checkInDate)}
                      className={`w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border text-sm text-[#242824] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#183D2B]/25 transition-colors ${
                        errors.checkInDate
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#E8DDC8] focus:border-[#183D2B]'
                      }`}
                    />
                    {errors.checkInDate && (
                      <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.checkInDate}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkOutDate"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2"
                    >
                      Check-out Date <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="checkOutDate"
                      name="checkOutDate"
                      type="date"
                      min={values.checkInDate || todayIso}
                      required
                      value={values.checkOutDate}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.checkOutDate)}
                      className={`w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border text-sm text-[#242824] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#183D2B]/25 transition-colors ${
                        errors.checkOutDate
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#E8DDC8] focus:border-[#183D2B]'
                      }`}
                    />
                    {errors.checkOutDate && (
                      <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.checkOutDate}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Guests & Occasion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2"
                    >
                      Number of Guests <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="guests"
                      name="guests"
                      type="number"
                      min={1}
                      max={120}
                      required
                      value={values.guests}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.guests)}
                      className={`w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border text-sm text-[#242824] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#183D2B]/25 transition-colors ${
                        errors.guests
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#E8DDC8] focus:border-[#183D2B]'
                      }`}
                    />
                    {errors.guests ? (
                      <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.guests}</span>
                      </p>
                    ) : (
                      <p className="mt-1.5 text-[11px] text-[#242824]/60">
                        4 AC rooms (extra beds provided) · AC hall hosts 70–80 guests
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="occasion"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2"
                    >
                      Occasion / Booking Type
                    </label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={values.occasion}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#E8DDC8] text-sm text-[#242824] focus:outline-none focus:border-[#183D2B] focus:ring-2 focus:ring-[#183D2B]/25 transition-colors"
                    >
                      {BOOKING_OCCASIONS.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#183D2B] mb-2"
                  >
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Share preferences such as extra beds needed, AC hall event setup for 70–80 guests, BBQ on request, or birthday decorations..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#E8DDC8] text-sm text-[#242824] placeholder:text-[#242824]/40 focus:outline-none focus:border-[#183D2B] focus:ring-2 focus:ring-[#183D2B]/25 transition-colors resize-y"
                  />
                </div>

                {/* Hidden anchor triggered cleanly upon valid form submission */}
                <a
                  ref={whatsappLinkRef}
                  href={submittedUrl || getQuickWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  Open WhatsApp
                </a>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#183D2B] text-[#F8F5EC] text-sm sm:text-[15px] font-semibold hover:bg-[#23533B] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#183D2B]"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.85} />
                    <span>Book via WhatsApp</span>
                  </button>

                  <p className="text-xs text-[#242824]/65 leading-relaxed">
                    Opens WhatsApp directly with your submitted stay details for fast confirmation.
                  </p>
                </div>
              </form>

              {/* Confirmation Summary & Direct Backup Actions */}
              {submittedMessage && submittedUrl && (
                <div
                  role="status"
                  className="mt-8 p-5 rounded-xl bg-[#FFFFFF] border border-[#607D50]/40"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2 text-[#183D2B] font-semibold text-sm">
                      <Check className="w-4 h-4 text-[#607D50]" strokeWidth={2.2} />
                      <span>Your WhatsApp booking enquiry is ready</span>
                    </div>
                  </div>

                  <pre className="text-xs text-[#242824]/80 whitespace-pre-wrap font-sans bg-[#F8F5EC] p-3.5 rounded-lg border border-[#E8DDC8] mb-4 leading-relaxed">
                    {submittedMessage}
                  </pre>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={submittedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#183D2B] text-[#F8F5EC] text-xs sm:text-sm font-medium hover:bg-[#23533B] transition-colors whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Open WhatsApp Now</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E8DDC8] text-xs sm:text-sm font-medium text-[#183D2B] hover:bg-[#F8F5EC] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#607D50]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
