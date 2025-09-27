export function Footer() {
  return (
    <footer className="bg-white/70 border-t border-white/40">
      <div className="lux-container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:py-10">
        <div className="flex items-center justify-center md:justify-start">
          <img
            src="/The Lemelson Estate (1).png"
            alt="Eden Estate wordmark"
            className="h-36 w-auto md:h-56"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm text-stone-700 md:text-right">
          <a href="tel:+15085969338" className="hover:text-stone-800 transition">
            +1 (508) 596-9338
          </a>
          <a
            href="mailto:admin@lemelsoncapital.com"
            className="hover:text-stone-800 transition"
          >
            admin@lemelsoncapital.com
          </a>
          <div className="mt-2 flex items-center justify-center gap-3 md:justify-end">
            <a
              href="https://www.facebook.com/p/Eden-The-Lemelson-Estate-100087154695200/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition hover:bg-[#2a86ff]"
              aria-label="Facebook"
            >
              <img src="/Symbol.png" alt="Facebook" className="h-4 w-4" width={16} height={16} />
            </a>
            <a
              href="https://www.instagram.com/the_lemelson_estate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-800 shadow-sm transition hover:bg-stone-100"
              aria-label="Instagram"
            >
              <img src="/Instagram_Symbol_1.png" alt="Instagram" className="h-4 w-4" width={16} height={16} />
            </a>
            <a
              href="https://x.com/LemelsonEstate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/90"
              aria-label="X (formerly Twitter)"
            >
              <img src="/X_idVRwaKp9b_1.png" alt="X" className="h-4 w-4" width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
