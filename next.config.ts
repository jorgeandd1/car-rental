// next.config.ts
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ no bloquear build por ESLint
  },
  // si usas imágenes remotas, mantén aquí remotePatterns
};
export default nextConfig;
