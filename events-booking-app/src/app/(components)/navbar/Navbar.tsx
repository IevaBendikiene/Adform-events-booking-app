import {} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LondonBigBen } from "../svgs";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-nav text-page p-4 h-30">
      <div className="flex flex-col justify-center">
        <Link href="/">
          <LondonBigBen className="bg-white text-3xl rounded-md mx-4 p-1/3" />
        </Link>
        <p className="font-lato text-logo text-xxs">Secret London</p>
      </div>
      <div className="flex justify-between gap-3">
        <Link href="/events">Our events</Link>
        <Link href="/editEvent/new">Create event</Link>
        <Link href="/signup">Signup</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
