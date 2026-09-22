export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="my-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
      {onRetry && (
        <button onClick={onRetry} className="font-semibold underline underline-offset-2 hover:text-red-900">
          Try again
        </button>
      )}
    </div>
  );
}