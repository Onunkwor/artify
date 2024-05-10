import AuthProvider from "./Provider/authProvider";
import Router from "./Router/router";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
