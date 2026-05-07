import type { Preview } from "@storybook/react-vite"

import "../src/styles.css"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    options: {
      storySort: {
        order: ["Theme", "Assets", "*"],
      },
    },
  },
}

export default preview
