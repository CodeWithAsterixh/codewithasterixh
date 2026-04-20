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

export function formatLivePreviewConfirmation({
  projectTitle,
}: {
  projectTitle: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .header { background-color: #1A1A1A; color: white; padding: 40px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
        .header p { margin: 8px 0 0; font-size: 14px; color: #a1a1aa; }
        .content { padding: 40px 32px; color: #18181b; line-height: 1.6; }
        .highlight { background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #5B9BF3; margin: 24px 0; color: #0c4a6e; }
        .privacy { background-color: #fafafa; border: 1px solid #e4e4e7; padding: 18px; border-radius: 8px; margin-top: 24px; }
        .footer { background-color: #f4f4f5; padding: 24px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #e4e4e7; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Live Preview Request Received</h1>
          <p>Asterixh | Project Preview Request</p>
        </div>

        <div class="content">
          <p>Hi there,</p>
          <p>Thanks for requesting a live preview for <strong>${escapeHtml(projectTitle)}</strong>.</p>

          <div class="highlight">
            I have received your request and I will reach back to you within <strong>2 days</strong> with the live preview link.
          </div>

          <div class="privacy">
            <strong>Privacy note:</strong> your email will only be contacted once for this live preview request. This is not a newsletter, and you will not receive recurring emails after that.
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0;"><strong>Asterixh</strong> - Software Engineer & Web Developer</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
}
