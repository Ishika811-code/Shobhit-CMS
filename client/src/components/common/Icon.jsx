
const iconPaths = {
    back: (
        <>
            <path d="m15 18-6-6 6-6" />
            <path d="M9 12h12" />
        </>
    ),
    help: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M9.6 9a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2-2.4 4" />
            <path d="M12 17h.01" />
        </>
    ),
    user: (
        <>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.5-3.2 3-5 7-5s6.5 1.8 7 5z" />
        </>
    ),
    university: (
        <>
            <path d="m3 9 9-5 9 5-9 5z" />
            <path d="M5 11v7m4-5v5m6-5v5m4-7v7M3 21h18" />
        </>
    ),
    student: (
        <>
            <path d="m3 9 9-5 9 5-9 5z" />
            <path d="M7 11v5c3.2 2.4 6.8 2.4 10 0v-5" />
            <path d="M21 9v6" />
        </>
    ),
    faculty: (
        <>
            <path d="M4 5h6l2 2 2-2h6v14h-6l-2 2-2-2H4z" />
            <path d="M12 7v12m-5-9h2m6 0h2m-10 3h2m6 0h2" />
        </>
    ),
    staff: (
        <>
            <path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6z" />
            <path d="M12 8v4m0 3h.01" />
        </>
    ),
    shield: <path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6z" />,
    id: (
        <>
            <rect x="4" y="6" width="16" height="14" rx="2" />
            <path d="M9 6V4h6v2m-8 5h2m3 0h3m-8 4h2m3 0h3" />
        </>
    ),
    lock: (
        <>
            <rect x="5" y="10" width="14" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
        </>
    ),
    eye: (
        <>
            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.5" />
        </>
    ),
    eyeOff: (
        <>
            <path d="m3 3 18 18M10.6 6.2A10 10 0 0 1 12 6c6.5 0 10 6 10 6a15 15 0 0 1-3 3.6M6.2 6.2C3.5 8 2 12 2 12s3.5 6 10 6c1 0 1.9-.2 2.8-.5" />
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </>
    ),
    login: (
        <>
            <path d="M10 17l5-5-5-5m5 5H3" />
            <path d="M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
        </>
    ),
    support: (
        <>
            <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
            <path d="M4 13h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2Zm16 0h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2Zm-8 8h3" />
        </>
    ),
};


export function Icon({ name, className = '', ...props }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.9"
            viewBox="0 0 24 24"
            {...props}
        >
            {iconPaths[name]}
        </svg>
    );
}
