import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: Object.fromEntries(
        [
          "border",
          "input",
          "ring",
          "background",
          "foreground",
          "primary",
          "secondary",
          "muted",
          "accent",
          "destructive",
        ].map((name) => [
          name,
          {
            DEFAULT: `hsl(var(--${name}))`,
            foreground: `hsl(var(--${name}-foreground))`,
          },
        ]),
      ),
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
};
