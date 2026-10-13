import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    // Quien prefiere menos movimiento ve el primer cuadro y decide si reproducir.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause()
      setPlaying(false)
    }
  }, [])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const control =
    'flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink/70 text-text backdrop-blur transition-colors hover:border-muted'

  return (
    <section className="relative isolate overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[72%_center]"
        src="/media/hero.mp4"
        poster="/media/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Capas de lectura: oscurecen el lado del texto y funden el video con la siguiente sección. */}
      <div className="absolute inset-0 -z-10 bg-ink/55 lg:bg-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/75 lg:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl items-center px-5 pb-28 pt-16 sm:px-8">
        <div className="max-w-xl">
          <h1 className="text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
            Aprende tecnología con un camino claro, desde tu primera línea de código.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-text/80">
            Cursos, recursos y rutas de formación reunidos en un solo lugar. Empieza gratis y avanza a tu ritmo.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/registro"
              className="rounded-lg bg-mark px-6 py-3.5 font-semibold text-mark-ink transition-colors hover:bg-[#ffd566]"
            >
              Crear cuenta gratis
            </Link>
            <a
              href="#rutas"
              className="rounded-lg border border-line bg-ink/40 px-6 py-3.5 font-medium text-text backdrop-blur transition-colors hover:border-muted"
            >
              Ver las rutas
            </a>
          </div>
          <p className="mt-5 text-sm text-text/70">Sin tarjeta de crédito. Todo el contenido es gratis por ahora.</p>
        </div>
      </div>

      <div className="absolute bottom-6 right-5 flex gap-2 sm:right-8">
        <button
          type="button"
          onClick={togglePlay}
          className={control}
          aria-label={playing ? 'Pausar el video' : 'Reproducir el video'}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className={control}
          aria-label={muted ? 'Activar el sonido del video' : 'Silenciar el video'}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </section>
  )
}
