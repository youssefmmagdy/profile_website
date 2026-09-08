type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const EmailIcon = ({ className = "h-[18px] w-[18px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7.5 7.2 5a2.2 2.2 0 0 0 2.6 0l7.2-5" />
  </svg>
);

export const PhoneIcon = ({ className = "h-[18px] w-[18px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h1.8a1 1 0 0 1 .95.68l1.2 3.5a1 1 0 0 1-.5 1.2l-1.6.83a11.5 11.5 0 0 0 5.44 5.44l.83-1.6a1 1 0 0 1 1.2-.5l3.5 1.2a1 1 0 0 1 .68.95v1.8A2.5 2.5 0 0 1 16.5 21C9.6 21 3 14.4 3 5.5Z" />
  </svg>
);

export const LocationIcon = ({ className = "h-[18px] w-[18px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M20 10.5c0 5.2-6.3 10.2-7.5 11.1a.8.8 0 0 1-1 0C10.3 20.7 4 15.7 4 10.5a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10.3" r="2.8" />
  </svg>
);

export const DownloadIcon = ({ className = "h-[18px] w-[18px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M12 3.5v11" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4.5 18.5v.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-.5" />
  </svg>
);

export const ExternalLinkIcon = ({
  className = "h-[15px] w-[15px]",
}: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M14 4h6v6" />
    <path d="m20 4-8.5 8.5" />
    <path d="M18 14.5v3.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5" />
  </svg>
);

export const PlayIcon = ({ className = "h-[18px] w-[18px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10.2 9.3a.6.6 0 0 1 .93-.5l3.6 2.7a.6.6 0 0 1 0 1l-3.6 2.7a.6.6 0 0 1-.93-.5Z" />
  </svg>
);

export const ArrowUpRightIcon = ({
  className = "h-4 w-4",
}: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M7 17 17 7" />
    <path d="M8.5 7H17v8.5" />
  </svg>
);

export const ArrowDownIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M12 4.5v15" />
    <path d="m6 13.5 6 6 6-6" />
  </svg>
);

export const ArrowUpIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M12 19.5v-15" />
    <path d="m6 10.5 6-6 6 6" />
  </svg>
);

export const SunIcon = ({ className = "h-[17px] w-[17px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.4 5.6l-1.4 1.4M7 17l-1.4 1.4M18.4 18.4 17 17M7 7 5.6 5.6" />
  </svg>
);

export const MoonIcon = ({ className = "h-[17px] w-[17px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M20 13.6A8.2 8.2 0 0 1 10.4 4a8.5 8.5 0 1 0 9.6 9.6Z" />
  </svg>
);

export const MenuIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const SparkIcon = ({ className = "h-[15px] w-[15px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M12 3.5 13.7 9a2 2 0 0 0 1.3 1.3l5.5 1.7-5.5 1.7A2 2 0 0 0 13.7 15L12 20.5 10.3 15A2 2 0 0 0 9 13.7L3.5 12 9 10.3A2 2 0 0 0 10.3 9Z" />
  </svg>
);

export const SearchIcon = ({ className = "h-[15px] w-[15px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
);

export const DocumentIcon = ({ className = "h-[18px] w-[18px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8Z" />
    <path d="M14 3.5V8h4.5" />
    <path d="M9 13h6M9 16.5h4" />
  </svg>
);

export const CopyIcon = ({ className = "h-[15px] w-[15px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <rect x="9" y="9" width="11.5" height="11.5" rx="2" />
    <path d="M15 6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15" />
  </svg>
);

export const CheckIcon = ({ className = "h-[15px] w-[15px]" }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const CornerDownLeftIcon = ({
  className = "h-[13px] w-[13px]",
}: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M19 5v6a3 3 0 0 1-3 3H6" />
    <path d="m9.5 10.5-3.5 3.5 3.5 3.5" />
  </svg>
);

export const LinkedInIcon = ({ className = "h-[18px] w-[18px]" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export const GitHubIcon = ({ className = "h-[18px] w-[18px]" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.41-4.03-1.41-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58A12 12 0 0 0 12 0Z" />
  </svg>
);

export const YouTubeIcon = ({ className = "h-[18px] w-[18px]" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.54 12 3.54 12 3.54s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
  </svg>
);
