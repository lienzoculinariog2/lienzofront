import Button from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {

  return (
    <>
      <div className="min-h-[calc(100vh-var(--header-height,0px)-var(--footer-height,0px))] flex flex-col items-center justify-center text-center py-16 px-4">
        <h1 className="mb-6 font-extrabold text-daily-menu-600 text-8xl md:text-9xl">
          404
        </h1>
        <p className="max-w-md mb-8 text-xl font-semibold text-gray-700 md:text-2xl dark:text-gray-300">
          ¡Oops! Parece que la página que estás buscando no existe.
        </p>
        <div>
        <Link href="/">
          <Button
            variant="dailyMenu"
            className="px-16 py-4 text-lg rounded-lg "
          > Volver al Inicio</Button>
        </Link>
        </div>
        <div>
          <h1>Prueba</h1>
        </div>
      </div>
    </>
  )
}