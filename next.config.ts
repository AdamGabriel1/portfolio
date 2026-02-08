/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/telemetry',
        destination: 'http://localhost:8080/api/telemetry', // Porta onde seu Go está rodando
      },
    ];
  },
};

export default nextConfig;