"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Something went wrong
        </h1>

        <p className="text-gray-700 mb-6">
          {error.message || "An unexpected error occurred."}
        </p>

        <button
          onClick={reset}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
