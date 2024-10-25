import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import MasterLayout from './layouts/MasterLayout'
import MoviePage from './pages/MoviePage'
import WatchMoviePage from './pages/WatchMoviePage'
import SearchPage from './pages/SearchPage'

const routes = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <MasterLayout />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/movie/:movieId',
        element: <MoviePage />,
      },
      {
        path: '/movie/:movieId/watch',
        element: <WatchMoviePage />,
      },
      {
        path: '/tv/:tvId',
        element: <Home />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      }
    ]
  }
])

export default function Routes() {
  return (
    <RouterProvider router={routes} />
  )
}
