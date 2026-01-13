'use client';


export default function PageError({
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-error mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
        <p className="mb-8">An error occurred. Please try again.</p>
        <button onClick={reset} className="btn btn-primary">
          Try Again
        </button>
      </div>
    </div>
  );
}