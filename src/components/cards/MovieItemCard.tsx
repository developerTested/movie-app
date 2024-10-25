import { MovieType } from '@/types/tmdb'

type MovieItemCardProps = {
  movie: MovieType,
  size?: 'xs' | 'sm' | 'normal' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
}

export default function MovieItemCard({ movie }: MovieItemCardProps) {
  return (
    <div className="flex gap-4">
      <h3>
        {movie.title || movie.original_title}
      </h3>
    </div>
  )
}
