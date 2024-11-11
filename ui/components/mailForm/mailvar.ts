export function __MAILER__(data: {
  name: string;
  email: string;
  textContent: string;
}) {
  const { email, name, textContent } = data;

  const subject = `Message from ${name}`;
  const body = `
  Name: ${name}
  Email: ${email}

  Message:
  ${textContent}

  ---
  Sent from the portfolio of Paul Peter - Web Developer
`;
  const mailtoLink = `mailto:peterpaultolulope@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
}
