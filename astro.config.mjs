// @ts-check
import { defineConfig } from 'astro/config';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import react from '@astrojs/react'; // 新增这行

export default defineConfig({
  output: 'static',
    integrations: [
    react(), // 新增这行
    tina()
  ],
  vite: {
    plugins: [tinaAdminDevRedirect()],
    ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] },
  },
});
