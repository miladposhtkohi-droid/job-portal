import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");
    const configuredSecret = process.env.STORYBLOK_WEBHOOK_SECRET;

    // Check secret token if configured in environment
    if (configuredSecret && secret !== configuredSecret) {
      return NextResponse.json({ message: "Ogiltig hemlig nyckel" }, { status: 401 });
    }

    const payload = await request.json().catch(() => ({}));

    // Revalidate the specific story page if slug is provided
    if (payload?.full_slug) {
      revalidatePath(`/${payload.full_slug}`);
    }

    // Always revalidate jobs list and home
    revalidatePath("/jobs");
    revalidatePath("/");

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
      slug: payload?.full_slug || null,
    });
  } catch (error) {
    console.error("Fel vid on-demand revalidering:", error);
    return NextResponse.json(
      { message: "Internt fel vid revalidering" },
      { status: 500 }
    );
  }
}
