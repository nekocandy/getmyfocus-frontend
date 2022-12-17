import { Suspense } from "react";
import { useRoutes } from "react-router";

import routes from "~react-pages";

export default function App() {
  return (
    <div className="h-screen bg-[#1a1a1a]">
      <div className="h-full max-w-7xl mx-auto">
        <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
      </div>
    </div>
  );
}
