'use client' 

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Что-то пошло не так</h2>
        <button onClick={() => reset()}>
          Перезагрузите страницу
        </button>
      </body>
    </html>
  )
}