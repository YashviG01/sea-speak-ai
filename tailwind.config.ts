import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Ocean-inspired color palette
        ocean: {
          50: "hsl(200 30% 96%)",
          100: "hsl(200 25% 90%)",
          200: "hsl(200 20% 80%)",
          300: "hsl(200 25% 65%)",
          400: "hsl(200 40% 50%)",
          500: "hsl(200 60% 40%)",
          600: "hsl(205 70% 30%)",
          700: "hsl(210 80% 25%)",
          800: "hsl(215 85% 20%)",
          900: "hsl(220 90% 15%)",
          950: "hsl(225 95% 10%)",
        },
        turquoise: {
          50: "hsl(185 40% 95%)",
          100: "hsl(185 45% 88%)",
          200: "hsl(185 50% 78%)",
          300: "hsl(185 60% 65%)",
          400: "hsl(185 70% 55%)",
          500: "hsl(185 80% 45%)",
          600: "hsl(190 85% 40%)",
          700: "hsl(190 85% 35%)",
          800: "hsl(195 85% 30%)",
          900: "hsl(200 85% 25%)",
        },
        coral: {
          50: "hsl(10 70% 95%)",
          100: "hsl(10 75% 88%)",
          200: "hsl(10 80% 78%)",
          300: "hsl(8 82% 68%)",
          400: "hsl(6 84% 62%)",
          500: "hsl(5 85% 58%)",
          600: "hsl(4 86% 52%)",
          700: "hsl(3 87% 46%)",
          800: "hsl(2 88% 40%)",
          900: "hsl(1 90% 34%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
