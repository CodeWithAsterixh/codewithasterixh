export function formatConfirmationMessage({
  name,
}: {
  name: string;
}) {
  const firstName = name.split(' ')[0];
  
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
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em; }
        .logo { font-size: 14px; color: #a1a1aa; margin-top: 8px; font-weight: 500; }
        .content { padding: 40px 32px; color: #18181b; line-height: 1.6; }
        .content p { margin: 16px 0; }
        .highlight { background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #5B9BF3; margin: 24px 0; color: #0c4a6e; }
        .cta-button { display: inline-block; margin-top: 24px; padding: 14px 32px; background-color: #1A1A1A; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; transition: opacity 0.2s; }
        .footer { background-color: #f4f4f5; padding: 32px; text-align: center; font-size: 13px; color: #71717a; border-top: 1px solid #e4e4e7; }
        .link { color: #5B9BF3; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Message Received!</h1>
          <div class="logo">Asterixh | Full Stack Developer</div>
        </div>
        
        <div class="content">
          <p>Hi ${escapeHtml(firstName)},</p>
          
          <p>Thank you for getting in touch! I've received your message and appreciate you reaching out.</p>
          
          <div class="highlight">
            <strong>What happens next?</strong><br>
            I'll review your inquiry and get back to you within <strong>24 hours</strong>.
          </div>
          
          <p>In the meantime, feel free to check out my latest projects or connect with me on social media.</p>
          
          <div style="text-align: center;">
            <a href="https://asterixh.vercel.app/works" class="cta-button">View My Works</a>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 12px 0;"><strong>Asterixh</strong> — Building fast, scalable web applications.</p>
          <p style="margin: 0; font-size: 12px; color: #a1a1aa;">Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return html;
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
