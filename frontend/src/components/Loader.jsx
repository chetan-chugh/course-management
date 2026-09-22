export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm font-medium text-slate-500">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-100 border-t-blue-600" aria-hidden="true" />
      {text}
    </div>
  );
}