export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const slug = params.id; // 'a', 'b', or 'c'
  return new Response("Hello, Next.js...." + slug);
}

//   /api/restaurant/2342-324-24-324323 (UUID) -- HTTP GET
