
'use client'

export default function TermsAndConditions() {
  return (
    <main className="max-w-4xl mx-auto p-6 my-10 bg-white rounded-lg shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Términos y Condiciones de CineRex</h1>

      <p className="mb-4">
        Bienvenido a la página web de CineRex. Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones. Si no está de acuerdo con alguno de estos términos, por favor no utilice nuestro sitio.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Uso del Sitio Web</h2>
        <p>
          CineRex le concede una licencia limitada para acceder y hacer uso personal de este sitio web, sin derecho a descargar (excepto el caché de página) o modificarlo, total o parcialmente, excepto con consentimiento expreso por escrito de CineRex.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Reservas y Compras</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Las entradas y servicios disponibles en nuestro sitio web están sujetos a disponibilidad.</li>
          <li>
            CineRex se reserva el derecho de rechazar o cancelar cualquier compra por razones legítimas, incluyendo pero no limitando a errores en el precio o disponibilidad.
          </li>
          <li>Los precios y promociones pueden cambiar sin previo aviso.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Pago y Facturación</h2>
        <p>
          Los pagos realizados a través de nuestro sitio web son seguros y están sujetos a la política de privacidad de CineRex.
          Usted se compromete a proporcionar información precisa y completa para la facturación.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Uso de Contenido</h2>
        <p>
          Todo el contenido, incluyendo imágenes, videos, textos, marcas y logos en este sitio web son propiedad de CineRex o de terceros licenciantes.
          Está prohibida la reproducción, distribución, modificación o uso comercial sin autorización previa.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Responsabilidad</h2>
        <p>
          CineRex no será responsable de daños directos, indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso del sitio web o los servicios ofrecidos.
          No garantizamos que el sitio esté libre de errores, virus u otros componentes dañinos.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Privacidad</h2>
        <p>
          El uso de la página está sujeto a nuestra Política de Privacidad, la cual puede consultar{' '}
          <a href="#" className="text-blue-600 underline hover:text-blue-800">
            aquí
          </a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Enlaces a Terceros</h2>
        <p>
          Nuestro sitio puede contener enlaces a sitios web de terceros que no están bajo el control de CineRex.
          No asumimos responsabilidad alguna por el contenido o prácticas de privacidad de esos sitios.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Modificaciones de los Términos</h2>
        <p>
          CineRex se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones serán efectivas desde su publicación en esta página.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">9. Ley Aplicable y Jurisdicción</h2>
        <p>
          Estos términos se regirán e interpretarán conforme a las leyes del país donde opera CineRex, y cualquier disputa será sometida a los tribunales competentes de dicha jurisdicción.
        </p>
      </section>

      <p className="text-right text-sm text-gray-600">Fecha de última actualización: 1 de junio de 2025</p>
    </main>
  )
}
