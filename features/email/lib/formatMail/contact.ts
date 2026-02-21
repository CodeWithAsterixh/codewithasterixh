export function formatContactMessage(formData: {
  fullName: string
  email: string
  message: string
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
        .header { background-color: #1A1A1A; color: white; padding: 32px 24px; text-align: center; }
        .header h1 { margin: 0 0 8px 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em; }
        .header p { margin: 0; font-size: 14px; color: #a1a1aa; }
        .content { padding: 32px 24px; color: #18181b; }
        .field { margin-bottom: 24px; }
        .label { display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 8px; }
        .value { font-size: 16px; line-height: 1.5; color: #18181b; background-color: #f4f4f5; padding: 12px 16px; border-radius: 6px; }
        .message-box { background-color: #f0f9ff; border-left: 4px solid #5B9BF3; padding: 16px; border-radius: 4px; }
        .message-box .value { background-color: transparent; padding: 0; }
        .footer { background-color: #f4f4f5; padding: 24px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #e4e4e7; }
        .link { color: #5B9BF3; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Message</h1>
          <p>via Asterixh Portfolio</p>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="label">From</span>
            <div class="value">${escapeHtml(formData.fullName)}</div>
          </div>
          
          <div class="field">
            <span class="label">Email</span>
            <div class="value"><a href="mailto:${escapeHtml(formData.email)}" class="link">${escapeHtml(formData.email)}</a></div>
          </div>
          
          <div class="field">
            <span class="label">Message</span>
            <div class="message-box">
              <div class="value" style="white-space: pre-wrap;">${escapeHtml(formData.message)}</div>
            </div>
          </div>
          
          <p style="margin-top: 32px; font-size: 13px; color: #71717a; text-align: center;">
            Reply directly to this email to respond to ${escapeHtml(formData.fullName)}.
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0;">Asterixh — Full Stack Developer</p>
          <p style="margin: 4px 0 0 0;"><a href="https://asterixh.vercel.app" class="link">asterixh.vercel.app</a></p>
        </div>
      </div>
    </body>
    </html>
  `

  return html
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
