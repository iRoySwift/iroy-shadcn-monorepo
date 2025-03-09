const zinc = {
  inlineColors: {
    light: {
      background: "white",
      foreground: "zinc-950",
      card: "white",
      "card-foreground": "zinc-950",
      popover: "white",
      "popover-foreground": "zinc-950",
      primary: "zinc-900",
      "primary-foreground": "zinc-50",
      secondary: "zinc-100",
      "secondary-foreground": "zinc-900",
      muted: "zinc-100",
      "muted-foreground": "zinc-500",
      accent: "zinc-100",
      "accent-foreground": "zinc-900",
      destructive: "red-500",
      "destructive-foreground": "zinc-50",
      border: "zinc-200",
      input: "zinc-200",
      ring: "zinc-950",
    },
    dark: {
      background: "zinc-950",
      foreground: "zinc-50",
      card: "zinc-950",
      "card-foreground": "zinc-50",
      popover: "zinc-950",
      "popover-foreground": "zinc-50",
      primary: "zinc-50",
      "primary-foreground": "zinc-900",
      secondary: "zinc-800",
      "secondary-foreground": "zinc-50",
      muted: "zinc-800",
      "muted-foreground": "zinc-400",
      accent: "zinc-800",
      "accent-foreground": "zinc-50",
      destructive: "red-900",
      "destructive-foreground": "zinc-50",
      border: "zinc-800",
      input: "zinc-800",
      ring: "zinc-300",
    },
  },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "240 10% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "240 10% 3.9%",
      primary: "240 5.9% 10%",
      "primary-foreground": "0 0% 98%",
      secondary: "240 4.8% 95.9%",
      "secondary-foreground": "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      "muted-foreground": "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      "accent-foreground": "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: "240 10% 3.9%",
      "chart-1": "12 76% 61%",
      "chart-2": "173 58% 39%",
      "chart-3": "197 37% 24%",
      "chart-4": "43 74% 66%",
      "chart-5": "27 87% 67%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      card: "240 10% 3.9%",
      "card-foreground": "0 0% 98%",
      popover: "240 10% 3.9%",
      "popover-foreground": "0 0% 98%",
      primary: "0 0% 98%",
      "primary-foreground": "240 5.9% 10%",
      secondary: "240 3.7% 15.9%",
      "secondary-foreground": "0 0% 98%",
      muted: "240 3.7% 15.9%",
      "muted-foreground": "240 5% 64.9%",
      accent: "240 3.7% 15.9%",
      "accent-foreground": "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: "240 4.9% 83.9%",
      "chart-1": "220 70% 50%",
      "chart-2": "160 60% 45%",
      "chart-3": "30 80% 55%",
      "chart-4": "280 65% 60%",
      "chart-5": "340 75% 55%",
    },
  },
  cssVarsV4: {
    light: {
      background: "oklch(1 0 0)", // --color-white
      foreground: "oklch(0.141 0.005 285.823)", // --color-zinc-950
      card: "oklch(1 0 0)", // --color-white
      "card-foreground": "oklch(0.141 0.005 285.823)", // --color-zinc-950
      popover: "oklch(1 0 0)", // --color-white
      "popover-foreground": "oklch(0.141 0.005 285.823)", // --color-zinc-950
      primary: "oklch(0.21 0.006 285.885)", // --color-zinc-900
      "primary-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      secondary: "oklch(0.967 0.001 286.375)", // --color-zinc-100
      "secondary-foreground": "oklch(0.21 0.006 285.885)", // --color-zinc-900
      muted: "oklch(0.967 0.001 286.375)", // --color-zinc-100
      "muted-foreground": "oklch(0.552 0.016 285.938)", // --color-zinc-500
      accent: "oklch(0.967 0.001 286.375)", // --color-zinc-100
      "accent-foreground": "oklch(0.21 0.006 285.885)", // --color-zinc-900
      destructive: "oklch(0.577 0.245 27.325)", // --color-red-600
      "destructive-foreground": "oklch(0.577 0.245 27.325)", // --color-red-600
      border: "oklch(0.92 0.004 286.32)", // --color-zinc-200
      input: "oklch(0.92 0.004 286.32)", // --color-zinc-200
      ring: "oklch(0.871 0.006 286.286)", // --color-zinc-300
      "chart-1": "oklch(0.646 0.222 41.116)", // --color-orange-600
      "chart-2": "oklch(0.6 0.118 184.704)", // --color-teal-600
      "chart-3": "oklch(0.398 0.07 227.392)", // --color-cyan-900
      "chart-4": "oklch(0.828 0.189 84.429)", // --color-amber-400
      "chart-5": "oklch(0.769 0.188 70.08)", // --color-amber-500
      radius: "0.625rem", // Not a color
      sidebar: "oklch(0.985 0 0)", // --color-zinc-50
      "sidebar-foreground": "oklch(0.141 0.005 285.823)", // --color-zinc-950
      "sidebar-primary": "oklch(0.21 0.006 285.885)", // --color-zinc-900
      "sidebar-primary-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      "sidebar-accent": "oklch(0.967 0.001 286.375)", // --color-zinc-100
      "sidebar-accent-foreground": "oklch(0.21 0.006 285.885)", // --color-zinc-900
      "sidebar-border": "oklch(0.92 0.004 286.32)", // --color-zinc-200
      "sidebar-ring": "oklch(0.871 0.006 286.286)", // --color-zinc-300
    },
    dark: {
      background: "oklch(0.141 0.005 285.823)", // --color-zinc-950
      foreground: "oklch(0.985 0 0)", // --color-zinc-50
      card: "oklch(0.141 0.005 285.823)", // --color-zinc-950
      "card-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      popover: "oklch(0.141 0.005 285.823)", // --color-zinc-950
      "popover-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      primary: "oklch(0.985 0 0)", // --color-zinc-50
      "primary-foreground": "oklch(0.21 0.006 285.885)", // --color-zinc-900
      secondary: "oklch(0.274 0.006 286.033)", // --color-zinc-800
      "secondary-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      muted: "oklch(0.274 0.006 286.033)", // --color-zinc-800
      "muted-foreground": "oklch(0.705 0.015 286.067)", // --color-zinc-400
      accent: "oklch(0.274 0.006 286.033)", // --color-zinc-800
      "accent-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      destructive: "oklch(0.396 0.141 25.723)", // --color-red-900
      "destructive-foreground": "oklch(0.637 0.237 25.331)", // --color-red-500
      border: "oklch(0.274 0.006 286.033)", // --color-zinc-800
      input: "oklch(0.274 0.006 286.033)", // --color-zinc-800
      ring: "oklch(0.442 0.017 285.786)", // --color-zinc-600
      "chart-1": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "chart-2": "oklch(0.696 0.17 162.48)", // --color-emerald-500
      "chart-3": "oklch(0.769 0.188 70.08)", // --color-amber-500
      "chart-4": "oklch(0.627 0.265 303.9)", // --color-purple-500
      "chart-5": "oklch(0.645 0.246 16.439)", // --color-rose-500
      sidebar: "oklch(0.21 0.006 285.885)", // --color-zinc-900
      "sidebar-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      "sidebar-primary": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "sidebar-primary-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      "sidebar-accent": "oklch(0.274 0.006 286.033)", // --color-zinc-800
      "sidebar-accent-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      "sidebar-border": "oklch(0.274 0.006 286.033)", // --color-zinc-800
      "sidebar-ring": "oklch(0.442 0.017 285.786)", // --color-zinc-600
    },
  },
  inlineColorsTemplate:
    "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n  ",
  cssVarsTemplate:
    "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n    --background: 0 0% 100%;\n    --foreground: 240 10% 3.9%;\n    --card: 0 0% 100%;\n    --card-foreground: 240 10% 3.9%;\n    --popover: 0 0% 100%;\n    --popover-foreground: 240 10% 3.9%;\n    --primary: 240 5.9% 10%;\n    --primary-foreground: 0 0% 98%;\n    --secondary: 240 4.8% 95.9%;\n    --secondary-foreground: 240 5.9% 10%;\n    --muted: 240 4.8% 95.9%;\n    --muted-foreground: 240 3.8% 46.1%;\n    --accent: 240 4.8% 95.9%;\n    --accent-foreground: 240 5.9% 10%;\n    --destructive: 0 84.2% 60.2%;\n    --destructive-foreground: 0 0% 98%;\n    --border: 240 5.9% 90%;\n    --input: 240 5.9% 90%;\n    --ring: 240 10% 3.9%;\n    --radius: 0.5rem;\n    --chart-1: 12 76% 61%;\n    --chart-2: 173 58% 39%;\n    --chart-3: 197 37% 24%;\n    --chart-4: 43 74% 66%;\n    --chart-5: 27 87% 67%;\n  }\n\n  .dark {\n    --background: 240 10% 3.9%;\n    --foreground: 0 0% 98%;\n    --card: 240 10% 3.9%;\n    --card-foreground: 0 0% 98%;\n    --popover: 240 10% 3.9%;\n    --popover-foreground: 0 0% 98%;\n    --primary: 0 0% 98%;\n    --primary-foreground: 240 5.9% 10%;\n    --secondary: 240 3.7% 15.9%;\n    --secondary-foreground: 0 0% 98%;\n    --muted: 240 3.7% 15.9%;\n    --muted-foreground: 240 5% 64.9%;\n    --accent: 240 3.7% 15.9%;\n    --accent-foreground: 0 0% 98%;\n    --destructive: 0 62.8% 30.6%;\n    --destructive-foreground: 0 0% 98%;\n    --border: 240 3.7% 15.9%;\n    --input: 240 3.7% 15.9%;\n    --ring: 240 4.9% 83.9%;\n    --chart-1: 220 70% 50%;\n    --chart-2: 160 60% 45%;\n    --chart-3: 30 80% 55%;\n    --chart-4: 280 65% 60%;\n    --chart-5: 340 75% 55%;\n  }\n}\n\n@layer base {\n  * {\n    @apply border-border;\n  }\n  body {\n    @apply bg-background text-foreground;\n  }\n}",
};

export default zinc;
