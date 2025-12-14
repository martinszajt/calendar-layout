export const dynamic = "force-static";

export async function GET() {
  try {
    return Response.json([]);
  } catch (error) {
    return Response.json(
      { error: "Unexpected server error", details: `${error}` },
      { status: 500 },
    );
  }
}
