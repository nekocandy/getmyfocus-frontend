import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";

export default function Navbar() {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const onButtonClick = () => {
    if (isAuthenticated) {
      logout({
        returnTo: window.location.origin,
      });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <nav className="border-b border-stone-700 text-gray-300 py-5 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-end">
          <img src="/tmf.svg" alt="logo" className="h-7 w-7 rounded-full" />
          <span className="text-lg font-bold ml-2">TrackMyFocus</span>
        </div>

        <div>
          <button
            disabled={isLoading}
            className={clsx(
              "transition-all duration-250",
              "text-sm px-8 py-1 rounded",
              isLoading && "disabled:(hidden)",
              !isLoading &&
                isAuthenticated &&
                "bg-red-700/40 text-red-500 hover:(bg-red-700/60 text-red-200)",
              !isLoading &&
                !isAuthenticated &&
                "bg-yellow-500/20 text-yellow-500 hover:(bg-yellow-600/30 text-yellow-500/70)"
            )}
            onClick={onButtonClick}
          >
            {!isLoading && isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
}
