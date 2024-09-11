import { } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LondonBigBen } from "../svgs";


const Navbar = () => {
  return (
    <nav className="flex justify-between p-4">
      <div className="flex justify-between">
        <p>Secret London</p>
        <Link href="/"><LondonBigBen className="bg-white text-xl mx-4"/></Link>
      </div>
      <div className="flex justify-between">
      <Link href="/signup">Signup</Link>
      <Link href="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
