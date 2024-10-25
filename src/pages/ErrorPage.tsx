import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = `${error.status} - ${error.statusText || error.message}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (

    <div className={`block w-full h-screen overflow-hidden`}>
      <div className="flex w-full h-full overflow-y-auto bg-black text-white">
        <div className="m-auto">
          <div className="flex flex-col gap-4 items-center justify-center h-screen text-center">
            <h1 className='text-3xl'>Oops! {errorMessage}</h1>
            <div>Sorry, an unexpected error has occurred.</div>

            <Link to='/' className="btn uppercase bg-white/20 text-center py-2.5 px-4 rounded-full">
              Go to home
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}