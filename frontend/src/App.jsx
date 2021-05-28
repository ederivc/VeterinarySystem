import AuthProvider from "./auth/AuthProvider";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
