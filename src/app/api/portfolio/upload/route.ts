import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

// Helper to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");
  return session && session.value === "authorized_portfolio_admin";
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const filename = formData.get("filename") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const name = filename || file.name;
    
    // Convert arrayBuffer to Node Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save directly to the public folder
    const targetDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const targetPath = path.join(targetDir, name);
    fs.writeFileSync(targetPath, buffer);

    return NextResponse.json({ 
      success: true, 
      url: `/${name}`,
      message: `File ${name} uploaded successfully`
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
