import * as Sentry from "@sentry/react";
import { Navigate, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import CallPage from "./pages/CallPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "@clerk/react";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <>
      <SentryRoutes>
        <Route
          path="/"
          element={
            isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />
          }
        />
        <Route
          path="/auth"
          element={isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
        />

        <Route
          path="/Call/:id"
          element={
            isSignedIn ? <CallPage /> : <Navigate to={"/auth"} replace />
          }
        />

        <Route
          path="*"
          element={
            isSignedIn ? (
              <Navigate to={"/"} replace />
            ) : (
              <Navigate to={"/auth"} replace />
            )
          }
        />
      </SentryRoutes>
      {/* <SignInButton mode="modal" /> */}
      {/* <SignUpButton mode="modal" /> */}
    </>
  );
};

export default App;

// return (
//     <>
//       <Show when="signed-in">
//         <SentryRoutes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/auth" element={<Navigate to={"/"} replace />} />
//         </SentryRoutes>
//       </Show>

//       <Show when="signed-out">
//         <SentryRoutes>
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="*" element={<Navigate to={"/auth"} replace />} />
//         </SentryRoutes>
//         {/* <SignInButton mode="modal" /> */}
//         {/* <SignUpButton mode="modal" /> */}
//       </Show>
//     </>
//   );
