"use client";

type SessionExpiredModalProps = {
  onLogin: () => void;
};

export default function SessionExpiredModal({
  onLogin,
}: SessionExpiredModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">

      <div className="w-[90%] max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl animate-[scaleIn_0.3s_ease-out]">

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-3xl">
          🔐
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-slate-800">
          Session Expired
        </h2>

        {/* Message */}
        <p className="mt-3 text-slate-500">
          Your login session has expired for security reasons.
        </p>

        <p className="mt-1 text-slate-500">
          Please login again to continue using Project Tracker.
        </p>

        {/* Button */}
        <button
          onClick={onLogin}
          className="mt-6 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98]"
        >
          🔑 Go to Login
        </button>

      </div>
    </div>
  );
}