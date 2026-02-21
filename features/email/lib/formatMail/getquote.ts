export function formatQuoteMessage(formData: {
  name: string
  email: string
  phone?: string
  productType?: string
  size?: string
  notes?: string
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
        .section { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #f4f4f5; }
        .section:last-child { border-bottom: none; }
        .section-title { font-size: 14px; font-weight: 700; color: #1A1A1A; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; }
        .field { margin-bottom: 16px; }
        .label { display: block; font-size: 12px; font-weight: 600; color: #71717a; margin-bottom: 4px; }
        .value { font-size: 16px; line-height: 1.5; color: #18181b; }
        .highlight-box { background-color: #f0f9ff; border-left: 4px solid #5B9BF3; padding: 16px; border-radius: 4px; margin-top: 8px; }
        .footer { background-color: #f4f4f5; padding: 24px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #e4e4e7; }
        .link { color: #5B9BF3; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Quote Request</h1>
          <p>via Asterixh Portfolio</p>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Contact Information</div>
            <div class="field">
              <span class="label">Name</span>
              <div class="value">${escapeHtml(formData.name)}</div>
            </div>
            <div class="field">
              <span class="label">Email</span>
              <div class="value"><a href="mailto:${escapeHtml(formData.email)}" class="link">${escapeHtml(formData.email)}</a></div>
            </div>
            ${formData.phone ? `
            <div class="field">
              <span class="label">Phone</span>
              <div class="value">${escapeHtml(formData.phone)}</div>
            </div>` : ''}
          </div>
          
          ${(formData.productType || formData.size) ? `
          <div class="section">
            <div class="section-title">Request Details</div>
            ${formData.productType ? `
            <div class="field">
              <span class="label">Product / Service</span>
              <div class="value">${escapeHtml(formData.productType)}</div>
            </div>` : ''}
            ${formData.size ? `
            <div class="field">
              <span class="label">Size / Scope</span>
              <div class="value">${escapeHtml(formData.size)}</div>
            </div>` : ''}
          </div>` : ''}
          
          ${formData.notes ? `
          <div class="section">
            <div class="section-title">Additional Notes</div>
            <div class="highlight-box">
              <div class="value" style="white-space: pre-wrap;">${escapeHtml(formData.notes)}</div>
            </div>
          </div>` : ''}
          
          <p style="margin-top: 24px; font-size: 13px; color: #71717a; text-align: center;">
            Reply directly to this email to respond to ${escapeHtml(formData.name)}.
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
