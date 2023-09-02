import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import path from 'path'
 


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "events", replacement: "rollup-plugin-node-polyfills/polyfills/events" },
  
    ],
  },
});
