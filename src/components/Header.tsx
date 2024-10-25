import { useEffect, useState } from "react"
import { headerMenu } from "../utilities/menu";
import { Link } from "react-router-dom";
import SearchForm from "./form/SearchForm";
import useActiveMenu from "@/hooks/useActiveMenu";

export default function Header() {

  const [scrolled, setScrolled] = useState(false);
  const [active] = useActiveMenu()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <div className={`${scrolled ? 'bg-black' : 'bg-transparent'} text-white z-1030 fixed top-0 w-full px-4`}>
      <div className="container size-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-extrabold text-4xl p-1 text-white">
            StreamVerse
          </Link>
          <div className="menu size-full flex items-center">
            {headerMenu.map((m) => <Link key={m.url} to={m.url} className={`px-4 py-2 border-b-2 ${active === m.url ? "font-bold border-white" : "font-normal border-transparent hover:border-white"} transition-all duration-200`}>
              {m.title}
            </Link>)}
          </div>
        </div>
        <SearchForm />
      </div>
    </div>
  )
}
