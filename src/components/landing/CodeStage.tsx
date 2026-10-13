import { RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

interface Lesson {
  id: string
  label: string
  file: string
  code: string
  output: ReactNode
}

const LESSONS: Lesson[] = [
  {
    id: 'js',
    label: 'JavaScript',
    file: 'hola.js',
    code: 'const nombre = "Camila";\nconsole.log(`Hola, ${nombre}. Ya programas.`);',
    output: <p className="font-mono text-sm text-text">Hola, Camila. Ya programas.</p>,
  },
  {
    id: 'py',
    label: 'Python',
    file: 'hola.py',
    code: 'nombre = "Camila"\nprint(f"Hola, {nombre}. Ya programas.")',
    output: <p className="font-mono text-sm text-text">Hola, Camila. Ya programas.</p>,
  },
  {
    id: 'html',
    label: 'HTML',
    file: 'index.html',
    code: '<h1>Hola, Camila</h1>\n<p>Esta es tu primera página.</p>',
    output: (
      <div className="rounded-md bg-white px-4 py-3 text-[#111]">
        <p className="font-display text-xl font-bold">Hola, Camila</p>
        <p className="text-sm">Esta es tu primera página.</p>
      </div>
    ),
  },
]

const TOKEN = /("[^"]*"?|`[^`]*`?|<\/?[a-zA-Z0-9]*>?|\b(?:const|print|console)\b)/g

function Highlighted({ text }: { text: string }) {
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        const c = part[0]
        if (c === '"' || c === '`') return <span key={i} className="text-peri">{part}</span>
        if (c === '<') return <span key={i} className="text-mark">{part}</span>
        if (/^(const|print|console)$/.test(part)) return <span key={i} className="text-mark">{part}</span>
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

export function CodeStage() {
  const [lessonId, setLessonId] = useState(LESSONS[0].id)
  const [typed, setTyped] = useState(0)
  const [run, setRun] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  const lesson = LESSONS.find((l) => l.id === lessonId) ?? LESSONS[0]
  const done = typed >= lesson.code.length

  useEffect(() => {
    window.clearInterval(timer.current)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setTyped(lesson.code.length)
      return
    }
    setTyped(0)
    let n = 0
    timer.current = window.setInterval(() => {
      n += 1
      setTyped(n)
      if (n >= lesson.code.length) window.clearInterval(timer.current)
    }, 32)
    return () => window.clearInterval(timer.current)
  }, [lesson, run])

  const replay = useCallback(() => setRun((r) => r + 1), [])
  const visible = lesson.code.slice(0, typed)
  const lines = visible.split('\n')

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between border-b border-line bg-raise/60 pr-2">
        <div role="tablist" aria-label="Lenguaje de la lección" className="flex">
          {LESSONS.map((l) => {
            const active = l.id === lessonId
            return (
              <button
                key={l.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setLessonId(l.id)}
                className={`border-b-2 px-4 py-3 text-sm transition-colors ${
                  active
                    ? 'border-mark text-text'
                    : 'border-transparent text-muted hover:text-text'
                }`}
              >
                {l.label}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={replay}
          aria-label="Repetir la escritura del código"
          className="rounded-md p-2 text-muted transition-colors hover:text-text"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="px-5 pb-5 pt-4">
        <p className="mb-3 font-mono text-xs text-muted">{lesson.file}</p>
        <pre
          className="min-h-[5.5rem] overflow-x-auto font-mono text-[13px] leading-7 text-text sm:text-sm"
          aria-label={`Código de ejemplo en ${lesson.label}`}
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              <Highlighted text={line} />
              {i === lines.length - 1 && !done && (
                <span className="caret ml-px inline-block h-4 w-2 translate-y-0.5 bg-mark" aria-hidden="true" />
              )}
            </div>
          ))}
        </pre>
      </div>

      <div className="border-t border-line bg-ink/60 px-5 py-4" aria-live="polite">
        <p className="mb-2 text-xs text-muted">Resultado</p>
        <div className="min-h-[3.25rem]">
          {done ? (
            lesson.output
          ) : (
            <p className="font-mono text-sm text-muted">Escribiendo…</p>
          )}
        </div>
      </div>
    </div>
  )
}
