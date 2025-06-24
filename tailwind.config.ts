import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
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
				// Cyberpunk Colors
				cyber: {
					blue: "#00D4FF",
					green: "#00FF88",
					purple: "#FF00FF",
					orange: "#FF6B00",
					dark: "#0A0A0F",
					surface: "#1A1A2E",
					border: "#2A2A4E",
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
				"cyber-gradient": {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
				"cyber-glow": {
					"0%, 100%": {
						boxShadow: "0 0 20px #00D4FF, 0 0 40px #00D4FF, 0 0 60px #00D4FF",
					},
					"50%": {
						boxShadow: "0 0 30px #00D4FF, 0 0 60px #00D4FF, 0 0 90px #00D4FF",
					},
				},
				"cyber-pulse": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.7" },
				},
				"cyber-float": {
					"0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
					"50%": { transform: "translateY(-20px) rotate(5deg)" },
				},
				"matrix-rain": {
					"0%": { transform: "translateY(-100vh)", opacity: "1" },
					"100%": { transform: "translateY(100vh)", opacity: "0" },
				},
				"electric-spark": {
					"0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
					"50%": { transform: "scale(1.2) rotate(180deg)", opacity: "0.8" },
				},
				"holographic-shift": {
					"0%, 100%": {
						backgroundPosition: "0% 50%",
						filter: "hue-rotate(0deg)",
					},
					"50%": {
						backgroundPosition: "100% 50%",
						filter: "hue-rotate(90deg)",
					},
				},
				"neon-flicker": {
					"0%, 100%": { opacity: "1" },
					"2%": { opacity: "0.8" },
					"4%": { opacity: "1" },
					"6%": { opacity: "0.9" },
					"8%": { opacity: "1" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"cyber-gradient": "cyber-gradient 3s ease infinite",
				"cyber-glow": "cyber-glow 2s ease infinite",
				"cyber-pulse": "cyber-pulse 2s ease infinite",
				"cyber-float": "cyber-float 6s ease-in-out infinite",
				"matrix-rain": "matrix-rain 3s linear infinite",
				"electric-spark": "electric-spark 1s ease infinite",
				"holographic-shift": "holographic-shift 4s ease infinite",
				"neon-flicker": "neon-flicker 3s ease infinite",
			},
			fontFamily: {
				cyber: ["Courier New", "Monaco", "Menlo", "Consolas", "monospace"],
				tech: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
			},
			backgroundImage: {
				"cyber-gradient": "linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #16213E 100%)",
				"neon-gradient": "linear-gradient(45deg, #00D4FF, #FF00FF, #00FF88)",
				"circuit-pattern": `
          linear-gradient(90deg, #00D4FF 1px, transparent 1px),
          linear-gradient(#00D4FF 1px, transparent 1px),
          radial-gradient(circle at 20px 20px, #00FF88 2px, transparent 2px)
        `,
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}

export default config
