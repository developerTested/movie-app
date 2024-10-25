import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";

export default function Home() {

  return (

    <div className="bg-midnight text-slate-200 h-screen">
      <Banner />

      <MovieRow title="Playing Right Now" url="now_playing" />
      <MovieRow title="Upcoming Movies" url="upcoming" />
      <MovieRow title="Popular Movies" url="popular" />
      <MovieRow title="Top Rated Movies" url="top_rated" />
    </div>
  )
}
