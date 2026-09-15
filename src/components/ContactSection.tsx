import React, { useState } from 'react';
import { Phone, Mail, Instagram, Facebook, MapPin, Send, Check, Copy } from 'lucide-react';
import { BUSINESS_INFO } from '../data/furnitureData';
import { InquiryFormData } from '../types';

interface ContactSectionProps {
  preselectedItemTitle?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedItemTitle }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    furnitureNeeded: preselectedItemTitle || 'Living Room',
    projectDetails: preselectedItemTitle
      ? `Hello, I would like to inquire about the ${preselectedItemTitle} for our space.`
      : '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [draftGenerated, setDraftGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  // Update if preselectedItemTitle changes from outside
  React.useEffect(() => {
    if (preselectedItemTitle) {
      setFormData((prev) => ({
        ...prev,
        furnitureNeeded: preselectedItemTitle,
        projectDetails: `Hello, I would like to inquire about the ${preselectedItemTitle} for our space.`,
      }));
    }
  }, [preselectedItemTitle]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number.';
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Please share a few details about your space or questions.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Show honest drafted action flow
    setDraftGenerated(true);
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Furniture Inquiry: ${formData.furnitureNeeded} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Category / Item: ${formData.furnitureNeeded}\n\n` +
      `Project Details:\n${formData.projectDetails}\n\n` +
      `Sent via Armdecor Furniture Website Catalog`
    );
    return `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
  };

  const copyToClipboard = () => {
    const text =
      `Armdecor Furniture Inquiry\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Item / Service: ${formData.furnitureNeeded}\n` +
      `Details: ${formData.projectDetails}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Showroom Inquiries"
      className="py-20 sm:py-28 bg-[#E8DFCE]/30 dark:bg-[#15100C] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[2px] bg-[#C88916]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C88916] font-semibold">
              Get In Touch
            </span>
            <span className="w-8 h-[2px] bg-[#C88916]" />
          </div>

          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2118] dark:text-[#F5F1E8] tracking-tight leading-[1.2] mb-4"
          >
            LET'S FIND THE RIGHT PIECE FOR YOUR SPACE
          </h2>

          <p className="text-sm sm:text-base text-[#6F685D] dark:text-[#DDD4C7] font-light max-w-xl mx-auto">
            Connect with Armdecor Furniture in Los Angeles to discuss specific pieces, custom dimensions, finishes, or curated living arrangements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Business Details Side (Col 1-5) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] dark:bg-[#201812] border border-[#E8DFCE] dark:border-[#382E25] p-6 sm:p-8 shadow-[0_4px_24px_rgba(43,33,24,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h3 className="font-serif text-2xl text-[#2B2118] dark:text-[#F5F1E8] mb-2">
              {BUSINESS_INFO.name}
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#C88916] font-medium mb-8">
              {BUSINESS_INFO.tagline}
            </p>

            {/* Verified Location */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F5F1E8] dark:bg-[#2A1F17] border border-[#E8DFCE] dark:border-[#382E25] flex items-center justify-center text-[#C88916] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#6F685D] dark:text-[#A89F93] font-semibold mb-1">
                    Location
                  </h4>
                  <p className="text-sm sm:text-base text-[#2B2118] dark:text-[#F5F1E8] font-medium">
                    {BUSINESS_INFO.locationString}
                  </p>
                </div>
              </div>

              {/* Verified Phone Numbers */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F5F1E8] dark:bg-[#2A1F17] border border-[#E8DFCE] dark:border-[#382E25] flex items-center justify-center text-[#C88916] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#6F685D] dark:text-[#A89F93] font-semibold mb-1">
                    Telephone Inquiries
                  </h4>
                  <div className="space-y-1">
                    <div>
                      <a
                        id="contact-primary-phone-link"
                        href={`tel:${BUSINESS_INFO.primaryPhone}`}
                        className="text-sm sm:text-base text-[#2B2118] dark:text-[#F5F1E8] hover:text-[#C88916] dark:hover:text-[#C88916] font-medium transition-colors"
                      >
                        {BUSINESS_INFO.primaryPhoneFormatted}
                      </a>
                      <span className="text-[11px] text-[#6F685D] dark:text-[#8E8478] ml-2 font-light">
                        (Primary)
                      </span>
                    </div>
                    <div>
                      <a
                        id="contact-secondary-phone-link"
                        href={`tel:${BUSINESS_INFO.secondaryPhone}`}
                        className="text-sm sm:text-base text-[#2B2118] dark:text-[#F5F1E8] hover:text-[#C88916] dark:hover:text-[#C88916] font-medium transition-colors"
                      >
                        {BUSINESS_INFO.secondaryPhoneFormatted}
                      </a>
                      <span className="text-[11px] text-[#6F685D] dark:text-[#8E8478] ml-2 font-light">
                        (Direct)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F5F1E8] dark:bg-[#2A1F17] border border-[#E8DFCE] dark:border-[#382E25] flex items-center justify-center text-[#C88916] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#6F685D] dark:text-[#A89F93] font-semibold mb-1">
                    Direct Email
                  </h4>
                  <a
                    id="contact-email-link"
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-sm sm:text-base text-[#2B2118] dark:text-[#F5F1E8] hover:text-[#C88916] dark:hover:text-[#C88916] font-medium transition-colors"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-6 border-t border-[#E8DFCE] dark:border-[#382E25]">
              <h4 className="text-xs uppercase tracking-wider text-[#6F685D] dark:text-[#A89F93] font-semibold mb-3">
                Connect With Our Showroom
              </h4>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a
                  id="contact-instagram-link"
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#F5F1E8] dark:bg-[#291F18] border border-[#E8DFCE] dark:border-[#382E25] hover:border-[#C88916] text-[#2B2118] dark:text-[#F5F1E8] text-xs font-medium transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#C88916]" />
                  <span>{BUSINESS_INFO.instagramHandle}</span>
                </a>

                <a
                  id="contact-facebook-link"
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#F5F1E8] dark:bg-[#291F18] border border-[#E8DFCE] dark:border-[#382E25] hover:border-[#C88916] text-[#2B2118] dark:text-[#F5F1E8] text-xs font-medium transition-colors"
                >
                  <Facebook className="w-4 h-4 text-[#C88916]" />
                  <span>{BUSINESS_INFO.facebookHandle}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Inquiry Form Side (Col 6-12) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] dark:bg-[#201812] border border-[#E8DFCE] dark:border-[#382E25] p-6 sm:p-10 shadow-[0_4px_24px_rgba(43,33,24,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <h3 className="font-serif text-2xl text-[#2B2118] dark:text-[#F5F1E8] mb-2">
              Showroom & Custom Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#6F685D] dark:text-[#A89F93] mb-6">
              Complete the details below to generate a tailored message directly for our Los Angeles team.
            </p>

            {draftGenerated ? (
              /* Honest Draft Flow Display */
              <div
                id="inquiry-draft-confirmation"
                className="p-6 bg-[#F5F1E8]/70 dark:bg-[#1A140E] border border-[#C88916]/40 space-y-4 animate-fadeIn"
              >
                <div className="flex items-center gap-2.5 text-[#C88916]">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                  <h4 className="font-serif text-lg font-semibold text-[#2B2118] dark:text-[#F5F1E8]">
                    Inquiry Prepared Successfully
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-[#6F685D] dark:text-[#DDD4C7] leading-relaxed">
                  As this is a direct showroom catalog preview without third-party email routing cookies, you can immediately send this inquiry through your preferred email client or copy the text summary for phone/message contact:
                </p>

                {/* Draft Preview Box */}
                <div className="p-4 bg-[#FFFFFF] dark:bg-[#241C15] border border-[#E8DFCE] dark:border-[#382E25] text-xs text-[#2B2118] dark:text-[#E8DFCE] font-mono leading-relaxed space-y-1">
                  <p><strong>To:</strong> {BUSINESS_INFO.email}</p>
                  <p><strong>From:</strong> {formData.name} ({formData.email}, {formData.phone})</p>
                  <p><strong>Piece / Category:</strong> {formData.furnitureNeeded}</p>
                  <p className="pt-2 text-[#6F685D] dark:text-[#A89F93]"><strong>Message:</strong> {formData.projectDetails}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <a
                    id="open-email-client-btn"
                    href={getMailtoLink()}
                    className="w-full sm:w-auto px-6 py-3 bg-[#C88916] hover:bg-[#B37810] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email Client</span>
                  </a>

                  <button
                    id="copy-inquiry-btn"
                    type="button"
                    onClick={copyToClipboard}
                    className="w-full sm:w-auto px-6 py-3 bg-[#2B2118] dark:bg-[#2D221A] hover:bg-[#C88916] text-[#F5F1E8] text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#C88916]" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDraftGenerated(false)}
                    className="text-xs text-[#6F685D] hover:text-[#2B2118] dark:text-[#A89F93] dark:hover:text-[#FFFFFF] underline py-2 ml-auto"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs uppercase tracking-wider text-[#2B2118] dark:text-[#F5F1E8] font-medium mb-1.5"
                  >
                    Your Full Name <span className="text-[#C88916]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Katherine Miller"
                    className={`w-full px-4 py-3 bg-[#F5F1E8]/40 dark:bg-[#1B1510] border ${
                      errors.name ? 'border-red-500' : 'border-[#E8DFCE] dark:border-[#382E25]'
                    } text-sm text-[#2B2118] dark:text-[#F5F1E8] placeholder-[#A89F93] focus:outline-none focus:border-[#C88916]`}
                  />
                  {errors.name && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs uppercase tracking-wider text-[#2B2118] dark:text-[#F5F1E8] font-medium mb-1.5"
                    >
                      Email Address <span className="text-[#C88916]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="katherine@example.com"
                      className={`w-full px-4 py-3 bg-[#F5F1E8]/40 dark:bg-[#1B1510] border ${
                        errors.email ? 'border-red-500' : 'border-[#E8DFCE] dark:border-[#382E25]'
                      } text-sm text-[#2B2118] dark:text-[#F5F1E8] placeholder-[#A89F93] focus:outline-none focus:border-[#C88916]`}
                    />
                    {errors.email && (
                      <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs uppercase tracking-wider text-[#2B2118] dark:text-[#F5F1E8] font-medium mb-1.5"
                    >
                      Phone Number <span className="text-[#C88916]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(818) 000-0000"
                      className={`w-full px-4 py-3 bg-[#F5F1E8]/40 dark:bg-[#1B1510] border ${
                        errors.phone ? 'border-red-500' : 'border-[#E8DFCE] dark:border-[#382E25]'
                      } text-sm text-[#2B2118] dark:text-[#F5F1E8] placeholder-[#A89F93] focus:outline-none focus:border-[#C88916]`}
                    />
                    {errors.phone && (
                      <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Furniture / Service Needed */}
                <div>
                  <label
                    htmlFor="contact-category"
                    className="block text-xs uppercase tracking-wider text-[#2B2118] dark:text-[#F5F1E8] font-medium mb-1.5"
                  >
                    Furniture Category / Selected Piece
                  </label>
                  <input
                    id="contact-category"
                    type="text"
                    value={formData.furnitureNeeded}
                    onChange={(e) => setFormData({ ...formData, furnitureNeeded: e.target.value })}
                    placeholder="e.g. Modern Classic Sectional Ensemble or Custom Dining Set"
                    className="w-full px-4 py-3 bg-[#F5F1E8]/40 dark:bg-[#1B1510] border border-[#E8DFCE] dark:border-[#382E25] text-sm text-[#2B2118] dark:text-[#F5F1E8] placeholder-[#A89F93] focus:outline-none focus:border-[#C88916]"
                  />
                </div>

                {/* Project Details */}
                <div>
                  <label
                    htmlFor="contact-details"
                    className="block text-xs uppercase tracking-wider text-[#2B2118] dark:text-[#F5F1E8] font-medium mb-1.5"
                  >
                    Project Details & Inquiries <span className="text-[#C88916]">*</span>
                  </label>
                  <textarea
                    id="contact-details"
                    rows={4}
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder="Share dimensions, room layout, preferred materials, or timeline..."
                    className={`w-full px-4 py-3 bg-[#F5F1E8]/40 dark:bg-[#1B1510] border ${
                      errors.projectDetails ? 'border-red-500' : 'border-[#E8DFCE] dark:border-[#382E25]'
                    } text-sm text-[#2B2118] dark:text-[#F5F1E8] placeholder-[#A89F93] focus:outline-none focus:border-[#C88916]`}
                  />
                  {errors.projectDetails && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.projectDetails}</p>
                  )}
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full py-3.5 px-8 bg-[#2B2118] dark:bg-[#C88916] hover:bg-[#C88916] dark:hover:bg-[#D99A29] text-[#FFFFFF] dark:text-[#1F1F1F] text-xs sm:text-sm uppercase tracking-[0.18em] font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]"
                  >
                    <Send className="w-4 h-4" />
                    <span>CONTACT US</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
