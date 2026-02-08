// src/app/api/go/health/route.ts
export async function GET() {
    const res = await fetch('http://localhost:8080/api/go/health');
    const data = await res.json();
    return Response.json(data);
}