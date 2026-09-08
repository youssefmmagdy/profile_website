import { useState } from "react";
import { PROFILE } from "../data/content";
import type { Dictionary } from "../data/content";
import { useSpotlight } from "../hooks/usePortfolio";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
  PhoneIcon,
  YouTubeIcon,
} from "./Icons";
import Section from "./Section";
import { revealDelay } from "../lib/ui";

const SOCIALS = [
  { key: "linkedin", href: PROFILE.linkedin, Icon: LinkedInIcon },
  { key: "github", href: PROFILE.github, Icon: GitHubIcon },
  { key: "youtube", href: PROFILE.youtube, Icon: YouTubeIcon },
] as const;

function CopyEmailButton({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — the mailto link beside this still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className="icon-btn h-8 w-8 shrink-0"
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-emerald-400" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </button>
  );
}

export default function Contact({ t }: { t: Dictionary }) {
  const cardRef = useSpotlight<HTMLDivElement>();

  return (
    <Section
      id="contact"
      index="06"
      label={t.contact.label}
      title={t.contact.title}
      intro={t.contact.pitch}
      tinted
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        {/* Details */}
        <div ref={cardRef} data-reveal className="panel spotlight p-6 sm:p-8">
          <h3 className="text-sm font-semibold tracking-tight text-ink">
            {t.contact.contactInfo}
          </h3>

          <ul className="mt-5 space-y-1">
            <li className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface">
              <span className="text-accent">
                <EmailIcon />
              </span>
              <a
                href={`mailto:${PROFILE.email}`}
                className="min-w-0 flex-1 truncate text-sm text-dim transition-colors hover:text-ink"
              >
                {PROFILE.email}
              </a>
              <CopyEmailButton label={t.contact.emailCta} />
            </li>

            <li className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface">
              <span className="text-accent">
                <PhoneIcon />
              </span>
              <a
                href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                className="flex-1 text-sm text-dim transition-colors hover:text-ink"
              >
                {PROFILE.phone}
              </a>
            </li>

            <li className="flex items-center gap-3 rounded-lg px-2 py-2.5">
              <span className="text-accent">
                <LocationIcon />
              </span>
              <span className="flex-1 text-sm text-dim">{PROFILE.location}</span>
            </li>
          </ul>

          <a
            href={`mailto:${PROFILE.email}`}
            className="btn btn-primary mt-6 w-full"
          >
            <EmailIcon className="h-4 w-4" />
            {t.contact.emailCta}
          </a>
        </div>

        {/* Socials */}
        <div
          data-reveal
          style={revealDelay(120)}
          className="panel p-6 sm:p-8"
        >
          <h3 className="text-sm font-semibold tracking-tight text-ink">
            {t.contact.connect}
          </h3>

          <div className="mt-5 grid gap-2.5">
            {SOCIALS.map(({ key, href, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-xl border border-line bg-surface px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-accent-soft"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-raise text-dim transition-colors group-hover:text-accent">
                  <Icon />
                </span>
                <span className="flex-1 text-sm font-medium text-ink">
                  {t.contact[key]}
                </span>
                <span className="text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                  <ArrowUpRightIcon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
