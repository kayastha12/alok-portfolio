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

    // Try to commit to GitHub if token is provided
    const token = request.headers.get('x-github-token');
    if (token) {
      const owner = 'kayastha12';
      const repo = 'alok-portfolio';
      const filePath = `public/${name}`;

      // Get current file SHA (if exists)
      const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?t=${Date.now()}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Alok-Portfolio-Upload',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });
      let sha = '';
      if (getRes.ok) {
        const data = await getRes.json();
        sha = data.sha;
      }

      // Commit the file
      const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'Alok-Portfolio-Upload',
        },
        body: JSON.stringify({
          message: `chore: upload ${name} via admin panel`,
          content: buffer.toString('base64'),
          sha: sha || undefined,
        }),
      });

      if (!commitRes.ok) {
        const err = await commitRes.json();
        return NextResponse.json({ error: err.message || 'GitHub upload failed' }, { status: 500 });
      }

      // Return success, file will be served from root
      return NextResponse.json({ success: true, url: `/${name}`, message: `File ${name} uploaded via GitHub` });
    }

    // Fallback: write to local public folder (dev only)
    const targetDir = path.join(process.cwd(), 'public');
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
