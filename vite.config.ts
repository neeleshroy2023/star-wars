/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Use global test functions like `describe`, `test`, etc.
    environment: 'jsdom', // Simulate browser environment
    setupFiles: './src/setupTests.ts', // Path to setup file
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
