export interface CustomTerminalCommand {
  command: string;
  description?: string;
  output: string;
  kind?: "out" | "sys" | "err";
}

/**
 * Identity and terminal configuration in one place — everything the laptop
 * console needs to introduce me. Projects deliberately live in lib/projects.ts
 * instead, so the cards, the terminal and the case studies all read one list.
 */
export const PORTFOLIO_CONFIG = {
  name: "Pranav Shukla",
  shortName: "Pranav.",
  role: "Applied ML & Full-stack Engineer",
  email: "pranavmshukla@gmail.com",
  resumePdfPath: "/resume/Pranav-Shukla-Resume.pdf",

  githubUsername: "PranavShukla2",
  socials: {
    github: "https://github.com/PranavShukla2",
    linkedin: "https://www.linkedin.com/in/pranav-shukla-softwaredeveloper/",
    site: "https://pranavmshukla.in",
  },

  terminal: {
    sectionEyebrow: "Boot it up",
    sectionTitle: "Browse my work the coder's way.",
    sectionDescription:
      "A bonus way to explore — run ls, neofetch or stats, play snake, or boot DOOM. Tab completes, ↑/↓ walks your history.",
    prompt: "pranav@portfolio projects %",
    osName: "PranavOS",
    osVersion: "PranavOS v1.0 (x86_64-wasm)",
    uname:
      "Linux PranavOS 6.8.0-wasm #1-SMP PREEMPT_DYNAMIC x86_64 GNU/Linux · Next.js 15 · React 19",
    whoami:
      "Pranav Shukla · Applied ML & Full-stack Engineer · B.Tech CSE @ VIT Bhopal '28 · Data Analyst @ Com1 Communication Technologies · builds Kleene, ArbFlow and healthcare biosignal models.",
    sudoGrantedText:
      "[sudo] password for pranav: ********** → Authentication successful. Ship it.",
    sudoDeniedText:
      "🚨 Permission denied: PranavOS kernel blocked that one. Nothing here is worth rm -rf'ing.",

    customCommands: [
      {
        command: "experience",
        description: "Show work history",
        output:
          "Data Analyst · Com1 Communication Technologies (Aug 2026 – Feb 2027) · current\n  UK housing-data platform covering 2,500+ housing organisations — SQL against the\n  production warehouse, plus Python data-quality checks that flag ingestion anomalies\n  before the data reaches published reports.\n\nData Analyst · DigitalPlus24x7 (Nov 2025 – May 2026) · completed\n  Cut report-generation time 35% by replacing manual ETL with scheduled Python and\n  tuned SQL; 40% faster dashboards across 5+ live campaigns; Looker Studio surface\n  tracking 10+ KPIs for marketing leadership.",
      },
      {
        command: "education",
        description: "Show education",
        output:
          "Vellore Institute of Technology (VIT), Bhopal\nB.Tech, Computer Science and Engineering · CGPA 8.79 / 10 · Expected 2028",
      },
    ] as CustomTerminalCommand[],

    /** ASCII face art for the `pranav` command. */
    faceArt: `
     .--------.
    /  .-.  .-. \\
   |  ( o )( o ) |     "Hi, I'm Pranav."
   |     ___     |   Applied ML & Full-stack
   \\   '-----'   /    VIT Bhopal · CSE '28
    '-..______.-'
`,

    /** Stylised banner for the \`whoami\` command. */
    whoamiBanner: `
██████╗ ██████╗  █████╗ ███╗   ██╗ █████╗ ██╗   ██╗
██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗██║   ██║
██████╔╝██████╔╝███████║██╔██╗ ██║███████║██║   ██║
██╔═══╝ ██╔══██╗██╔══██║██║╚██╗██║██╔══██║╚██╗ ██╔╝
██║     ██║  ██║██║  ██║██║ ╚████║██║  ██║ ╚████╔╝
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝
`,

    neofetch: {
      asciiArt: `   _____
  /     \\
 | () () |  PRANAV
  \\  ^  /   SHUKLA
   |||||
   |||||
  [=====]`,
      os: "PranavOS v1.0 (x86_64-wasm)",
      host: "VIT Bhopal · B.Tech CSE '28",
      kernel: "Next.js 15 · React 19 · Tailwind",
      shipped: "ArbFlow · Kleene · Ankur (CNAMS)",
      languages: "Python, C++, Rust, TypeScript, SQL, Dart, Java",
      focus: "Applied ML · WebAssembly · Full-stack SaaS",
    },
  },
} as const;

export type PortfolioConfig = typeof PORTFOLIO_CONFIG;
