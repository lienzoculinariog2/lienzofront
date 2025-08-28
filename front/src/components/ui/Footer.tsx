// src/components/ui/Footer/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary-background-900 text-secondary-txt-400">
      <div className="container mx-auto px-4 py-8">
        {/* Sección de arriba: Logo y pagos */}
        <div className="flex justify-between items-center pb-4 border-b border-secondary-background-600 mb-8">
          <div>
            {/* Enlace del logo a la página principal */}
            <Link href="/">
              <Image
                src={"https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/2145c662-3775-48b0-aba7-55d032195e32-removebg-preview.png?updatedAt=1754512253493"}
                alt="Lienzo Culinario Logo"
                width={120} 
                height={60} 
                className="filter invert"
              />
            </Link>
          </div>
          <div className="flex space-x-2 px-5">
            {/* Enlace de Stripe a su página oficial, abriendo en una nueva pestaña */}
            <Link
              href="https://www.stripe.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={
                  "https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/Stripe-Emblema.png?updatedAt=1756314594497"
                }
                alt="Pasarela de pago"
                width={150}
                height={150}
              />
            </Link>
          </div>
        </div>

        {/* Sección del medio: columnas de información */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="m-5">
            <h3 className="font-semibold text-primary-txt-100 mb-4">
              Equipo Back
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="flex items-center hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="mr-2" /> Francisco Arano
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="mr-2" /> Felipe Melo
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/cathemolinab/"
                  className="flex items-center hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="mr-2" /> Catherine Molina
                </Link>
              </li>
            </ul>
          </div>

          <div className="m-5">
            <h3 className="font-semibold text-primary-txt-100 mb-4">
              Equipo Front
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://www.linkedin.com/in/joaquin-curbelo-9a45621b9/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  className="flex items-center hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="mr-2" /> Joaquin Curbelo
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/agust%C3%ADn-rodr%C3%ADguez-77ba3269/"
                  className="flex items-center hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="mr-2" /> Agustín Rodriguez
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/bruno-giugno-0406ba1a5/"
                  className="flex items-center hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="mr-2" /> Bruno Giugno
                </Link>
              </li>
            </ul>
          </div>

          <div className="m-5">
            <h3 className="font-semibold text-primary-txt-100 mb-4">
              Local de Negocio
            </h3>
            <p className="text-sm">
              Direccion: Av. Dr. Luis Morquio, <br />
              Uruguay <br />
              26003 <br />
              Contacto: (304)-559-3023 <br />
              204-630-2894 <br />
              Email: lienzo.culinario.g2@gmail.com <br />
            </p>
          </div>

          <div className="m-5">
            <h3 className="font-semibold text-primary-txt-100 mb-4">Ubicacion</h3>
            <div className="h-40 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26179.18569753504!2d-56.161883!3d-34.896455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81ab2c666323%3A0xb8b7813a3bec6864!2sAv.%20Dr.%20Luis%20Morquio%2C%2011600%20Montevideo%2C%20Departamento%20de%20Montevideo%2C%20Uruguay!5e0!3m2!1ses-419!2sar!4v1756312788524!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-8 pt-4 border-t border-secondary-background-600">
          © 2025 <span className="hover:underline">Lienzo Culinario™</span>.
          Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}