export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-yellow-400">Cinerex</span>
          <span className="text-gray-400">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6 text-gray-400 text-sm">
          <a href="#" className="hover:text-yellow-400 transition-colors">Aviso de Privacidad</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Términos y Condiciones</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Contacto</a>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-yellow-400 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-yellow-400 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.13 4.659.388 3.678 1.368c-.98.98-1.238 2.092-1.296 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.058 1.282.316 2.394 1.296 3.374.98.98 2.092 1.238 3.374 1.296C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.282-.058 2.394-.316 3.374-1.296.98-.98 1.238-2.092 1.296-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.058-1.282-.316-2.394-1.296-3.374-.98-.98-2.092-1.238-3.374-1.296C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-yellow-400 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}