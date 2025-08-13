import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites, getHistory } from "@/lib/userData";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    try {
      await authenticateUser(userName, password);
      await updateAtoms();
      router.push("/favourites");
    } catch (err) {
      setErrorMsg(err.message || "Login failed");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 480, marginTop: 40 }}>
      <h2 className="mb-3">Login</h2>
      <p className="text-muted">Log in to manage your favourites and history.</p>

      {errorMsg ? (
        <div className="alert alert-danger" role="alert">{errorMsg}</div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Username</label>
          <input
            id="userName"
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      <div className="mt-3">
        <span className="text-muted">Don’t have an account? </span>
        <a href="/register">Register</a>
      </div>
    </div>
  );
}
