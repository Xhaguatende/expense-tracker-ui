import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { isAuthenticated, login, signUp } = useAuth();

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      {!isAuthenticated && (
        <p>
          Please <button onClick={login}>Login</button> or{" "}
          <button onClick={signUp}>Sign-up</button> to continue.
        </p>
      )}
    </div>
  );
};

export default Home;
