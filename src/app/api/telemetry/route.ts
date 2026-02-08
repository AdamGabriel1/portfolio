// src/app/api/go/telemetry/route.ts
export async function GET() {
    const res = await fetch('http://localhost:8080/api/go/telemetry');
    const data = await res.json();
    return Response.json(data);
}