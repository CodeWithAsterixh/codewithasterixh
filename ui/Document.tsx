const DocumentHead = () => {
  return (
    <head>
      {/* Default favicon (light mode) */}
      <link rel="icon" href="/svgs/logo.svg" type="image/svg+xml" />

      {/* Dark mode favicon */}
      <link
        rel="icon"
        href="/svgs/logo-dark.svg"
        type="image/svg+xml"
        media="(prefers-color-scheme: dark)"
      />
    </head>
  );
};

export default DocumentHead;
