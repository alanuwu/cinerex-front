
'use client'

export default function PrivacyNotice() {
  return (
    <main className="max-w-4xl mx-auto p-6 my-10 bg-white rounded-lg shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Aviso de Privacidad de CineRex</h1>

      <p className="mb-4">
        En CineRex, nos comprometemos a proteger su privacidad y asegurar que su información personal sea tratada con responsabilidad y confidencialidad.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Información que recopilamos</h2>
        <p>
          Recopilamos datos personales que usted proporciona directamente al utilizar nuestros servicios, tales como nombre, correo electrónico, número telefónico, información de pago y preferencias de compra.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Uso de la información</h2>
        <p>
          La información recopilada es utilizada para procesar sus compras, brindarle atención personalizada, enviar promociones y mejorar nuestros servicios.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Compartir información</h2>
        <p>
          CineRex no venderá ni compartirá su información personal con terceros ajenos, salvo en los casos necesarios para cumplir con obligaciones legales o para la prestación de servicios asociados (como procesadores de pago).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Seguridad de la información</h2>
        <p>
          Implementamos medidas técnicas y administrativas para proteger su información contra accesos no autorizados, alteraciones o destrucción.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Derechos de los usuarios</h2>
        <p>
          Usted puede ejercer sus derechos de acceso, rectificación, cancelación y oposición (ARCO), enviando una solicitud a nuestro correo electrónico de contacto.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Cambios en el aviso de privacidad</h2>
        <p>
          CineRex se reserva el derecho de modificar este aviso en cualquier momento. Las actualizaciones serán publicadas en esta página.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Contacto</h2>
        <p>
          Para cualquier duda o solicitud relacionada con su información personal, por favor contáctenos en: <a href="mailto:privacidad@cinerex.com" className="text-blue-600 underline hover:text-blue-800">privacidad@cinerex.com</a>
        </p>
      </section>

      <p className="text-right text-sm text-gray-600">Fecha de última actualización: 1 de junio de 2025</p>
    </main>
  )
}
