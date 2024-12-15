import { removeToken } from "@/public/utils/localStorage";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="d-flex px-4 py-2 justify-content-between">
      <div>TODO</div>
      <div className="btn-group">
        <button type="button" className="btn btn-primary">
          최신순
        </button>
        <button type="button" className="btn btn-primary">
          우선순위
        </button>
      </div>

      <div onClick={() => removeToken("loginToken")}>
        <Link to={"/"}>log out</Link>
      </div>
    </header>
  );
}
