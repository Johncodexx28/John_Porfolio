import { useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Clock,
  Copy,
  Github,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import "./Contact.css";

const topics = [
  "Web Development",
  "Full-Stack App",
  "UI/UX Design",
  "Collaboration",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Web Development",
    message: "",
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailAddress = "cabanigjohnlloyd@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2400);
    } catch {
      // Fallback if clipboard API is unavailable
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2400);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Smooth realistic submission feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      topic: "Web Development",
      message: "",
    });
  };

  return (
    <section
      className="contact-section"
      data-nav-theme="dark"
      aria-labelledby="contact-title"
    >
      <div className="contact-section__container">
        <header className="contact-section__header">
          <p className="contact-section__eyebrow">Get in Touch / Inquiries</p>
          <h2 id="contact-title" className="contact-section__title">
            Let&apos;s build something remarkable.
          </h2>
          <p className="contact-section__subtitle" id="contact">
            Have a project in mind, a question, or a creative proposal? I&apos;m
            always open to discussing new opportunities and ambitious ideas.
          </p>
        </header>

        <div className="contact-section__grid">
          {/* Left Column: Direct Info */}
          <div className="contact-info-panel">
            <div
              className="contact-status-card"
              aria-label="Current work status"
            >
              <span className="contact-status-pulse" aria-hidden="true" />
              <span className="contact-status-text">
                Available for projects &bull; GMT+8
              </span>
            </div>

            <div className="contact-email-box">
              <span className="contact-email-box__label">Direct Inquiries</span>
              <a
                href={`mailto:${emailAddress}`}
                className="contact-email-box__address"
                aria-label={`Send email to ${emailAddress}`}
              >
                {emailAddress}
              </a>
              <div className="contact-email-box__actions">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`contact-copy-btn ${isCopied ? "is-copied" : ""}`}
                  aria-label="Copy email address to clipboard"
                >
                  {isCopied ? (
                    <>
                      <Check size={14} aria-hidden="true" />
                      <span>Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} aria-hidden="true" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${emailAddress}`}
                  className="contact-mail-btn"
                  aria-label="Open mail client"
                >
                  <Mail size={14} aria-hidden="true" />
                  <span>Send email</span>
                </a>
              </div>
            </div>

            <div className="contact-details-list" aria-label="Contact channels">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <MapPin size={16} aria-hidden="true" />
                </div>
                <div className="contact-detail-content">
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">
                    Iloilo City, Philippines
                  </span>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Clock size={16} aria-hidden="true" />
                </div>
                <div className="contact-detail-content">
                  <span className="contact-detail-label">Response Time</span>
                  <span className="contact-detail-value">
                    Within 24&ndash;48 hours
                  </span>
                </div>
              </div>

              <a
                href="https://github.com/Johncodexx28"
                target="_blank"
                rel="noreferrer"
                className="contact-detail-item"
                aria-label="John Lloyd Cabanig GitHub Profile"
              >
                <div className="contact-detail-icon">
                  <Github size={16} aria-hidden="true" />
                </div>
                <div className="contact-detail-content">
                  <span className="contact-detail-label">GitHub</span>
                  <span className="contact-detail-value flex items-center gap-1">
                    github.com/Johncodexx28
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </a>

              <a
                href="https://johnlloydcabanig28.jobs180.com/"
                target="_blank"
                rel="noreferrer"
                className="contact-detail-item"
                aria-label="John Lloyd Cabanig Jobs180 Profile"
              >
                <div className="contact-detail-icon">
                  <Briefcase size={16} aria-hidden="true" />
                </div>
                <div className="contact-detail-content">
                  <span className="contact-detail-label">
                    Professional Profile
                  </span>
                  <span className="contact-detail-value flex items-center gap-1">
                    johnlloydcabanig28.jobs180.com
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-panel">
            {isSubmitted ? (
              <div className="contact-success-state" role="status">
                <div className="contact-success-icon" aria-hidden="true">
                  <Check size={28} />
                </div>
                <h3 className="contact-success-title">Message received!</h3>
                <p className="contact-success-text">
                  Thank you for reaching out, {formData.name || "there"}.
                  I&apos;ve received your note and will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="contact-reset-btn"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="contact-form"
                aria-label="Direct message form"
              >
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label
                      htmlFor="contact-name"
                      className="contact-form__label"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Elena Rostova"
                      className="contact-form__input"
                    />
                  </div>

                  <div className="contact-form__field">
                    <label
                      htmlFor="contact-email"
                      className="contact-form__label"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      className="contact-form__input"
                    />
                  </div>
                </div>

                <div className="contact-form__field">
                  <span className="contact-form__topics-label">
                    What can I help you with?
                  </span>
                  <div
                    className="contact-form__topics"
                    role="radiogroup"
                    aria-label="Project category"
                  >
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        role="radio"
                        aria-checked={formData.topic === topic}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, topic }))
                        }
                        className={`contact-topic-pill ${
                          formData.topic === topic ? "is-selected" : ""
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="contact-form__field">
                  <label
                    htmlFor="contact-message"
                    className="contact-form__label"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, timeline, goals, or whatever is on your mind..."
                    className="contact-form__textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit-btn"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send size={15} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
