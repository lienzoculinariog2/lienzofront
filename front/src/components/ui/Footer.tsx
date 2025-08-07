// src/components/ui/Footer/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
return (
    <footer className="bg-primary-background-900 text-secondary-txt-400">
    <div className="container mx-auto px-4 py-8">

        {/* Sección de arriba: políticas y pagos */}
        <div className="flex justify-between items-center pb-4 border-b border-secondary-background-600 mb-8">
        <ul className="flex space-x-4">
            <li>
            <Link href="#" className="hover:underline">Politica de rembolso</Link>
            </li>
            <li>
            <Link href="#" className="hover:underline">Politica de Privacidad</Link>
            </li>
        </ul>
        <div className="flex space-x-2 px-5">
            <Image
            src={"https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/stripe-buttons.png?updatedAt=1754514562835"}
            alt="Pasarela de pago"
            width={150}
            height={150}
            />
        </div>
        </div>

        {/* Sección del medio: columnas de información */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        
        <div className="m-5">
            <h3 className="font-semibold text-primary-txt-100 mb-4">Conectate con nosotros</h3>
            <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:underline">Facebook</Link></li>
            <li><Link href="#" className="hover:underline">Twitter</Link></li>
            <li><Link href="#" className="hover:underline">Instagram</Link></li>
            </ul>
        </div>

        
        <div className="m-5">
            <h3 className="font-semibold text-primary-txt-100 mb-4">Acerca de Nosotros</h3>
            <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:underline">Multiple branches</Link></li>
            <li><Link href="#" className="hover:underline">Take Franchise</Link></li>
            <li><Link href="#" className="hover:underline">Scheduled Offers</Link></li>
            <li><Link href="#" className="hover:underline">Visit Kitchen</Link></li>
            <li><Link href="#" className="hover:underline">Meet Our Team</Link></li>
            <li><Link href="#" className="hover:underline">More Links</Link></li>
            </ul>
        </div>

        <div className="m-5">
            <h3 className="font-semibold text-primary-txt-100 mb-4">Local de Negocio</h3>
            <p className="text-sm">
            Direccion: Av. Dr. Luis Morquio, <br/>
            Uruguay <br/>
            26003 <br/>
            Contacto: (304)-559-3023 <br/>
            204-630-2894 <br/>
            Email: lienzo.culinario.g2@gmail.com  <br/>
            </p>
        </div>

        
        <div className="m-5">
            <h3 className="font-semibold text-primary-txt-100 mb-4">Ubicacion</h3>
            {/* Aquí iría el componente del mapa */}
            <div className="bg-gray-700 h-40 w-full flex items-center justify-center text-sm">
        
            <div className="h-40 w-full">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.5304159298657!2d-56.16427516540167!3d-34.89706334714805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81ab2c666323%3A0xb8b7813a3bec6864!2sAv.%20Dr.%20Luis%20Morquio%2C%2011600%20Montevideo%2C%20Departamento%20de%20Montevideo%2C%20Uruguay!5e0!3m2!1ses-419!2sar!4v1754520124140!5m2!1ses-419!2sar"
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
        </div>

        <div className="text-center text-sm mt-8 pt-4 border-t border-secondary-background-600">
        © 2025 <span className="hover:underline">Lienzo Culinario™</span>. Todos los derechos reservados.
        </div>

    </div>
    </footer>
);
}