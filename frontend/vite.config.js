// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   base: "/",
//   plugins: [tailwindcss(), react()],
//   preview: {
//     port: 8080,
//     strictPort: true,
//   },
//   server: {
//     port: 5000,
//     strictPort: true,
//     host: true,
//     origin: "http://0.0.0.0:5000",
//   },
//   resolve: {
//     alias: {
//       crypto: "crypto-browserify",
//     },
//   },
//   build: {
//     target: "esnext",
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [tailwindcss(), react()],
  preview: {
    port: 8080, // For static file preview after building
    strictPort: true,
  },
  server: {
    port: 3000, // Expose on port 3000 (frontend container's port)
    host: "0.0.0.0", // Make sure it binds to all network interfaces
    strictPort: true, // Make sure the specified port is used
  },
  resolve: {
    alias: {
      crypto: "crypto-browserify",
    },
  },
  build: {
    target: "esnext",
  },
});
