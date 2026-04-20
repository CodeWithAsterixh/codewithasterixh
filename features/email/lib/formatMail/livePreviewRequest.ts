function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
  };

  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export function formatLivePreviewRequestMessage({
  projectTitle,
  projectSlug,
  requesterEmail,
  liveUrl,
}: {
  projectTitle: string;
  projectSlug: string;
  requesterEmail: string;
  liveUrl?: string | null;
}) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f5; }
        .container { max-width: 640px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .header { background-color: #1A1A1A; color: white; padding: 32px 24px; text-align: center; }
        .header h1 { margin: 0 0 8px 0; font-size: 24px; font-weight: 700; }
        .header p { margin: 0; font-size: 14px; color: #a1a1aa; }
        .content { padding: 32px 24px; color: #18181b; }
        .field { margin-bottom: 20px; }
        .label { display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 8px; }
        .value { font-size: 16px; line-height: 1.5; color: #18181b; background-color: #f4f4f5; padding: 12px 16px; border-radius: 8px; }
        .note { background-color: #f0f9ff; border-left: 4px solid #5B9BF3; padding: 16px; border-radius: 8px; margin-top: 28px; color: #0c4a6e; }
        .link { color: #5B9BF3; text-decoration: none; }
        .footer { background-color: #f4f4f5; padding: 24px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #e4e4e7; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Live Preview Requested</h1>
          <p>A visitor requested access to a project preview</p>
        </div>

        <div class="content">
          <div class="field">
            <span class="label">Project</span>
            <div class="value">${escapeHtml(projectTitle)}</div>
          </div>

          <div class="field">
            <span class="label">Project Slug</span>
            <div class="value">${escapeHtml(projectSlug)}</div>
          </div>

          <div class="field">
            <span class="label">Requester Email</span>
            <div class="value"><a href="mailto:${escapeHtml(requesterEmail)}" class="link">${escapeHtml(requesterEmail)}</a></div>
          </div>

          ${
            liveUrl
              ? `
          <div class="field">
            <span class="label">Stored Live URL</span>
            <div class="value"><a href="${escapeHtml(liveUrl)}" class="link">${escapeHtml(liveUrl)}</a></div>
          </div>
          `
              : ""
          }

          <div class="note">
            The visitor has already received an automatic acknowledgement telling them you will reply within 2 days with the live preview link. Their email should only be used for this request.
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0;">Asterixh Portfolio Notification</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
}
