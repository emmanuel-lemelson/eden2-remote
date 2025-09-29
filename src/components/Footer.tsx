export function Footer() {
  return (
    <footer className="border-t border-white/30 bg-white/70">
      <div className="lux-container flex flex-col gap-4 py-4 md:flex-row md:items-start md:justify-between md:gap-5 md:py-5">
        <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
          <img
            src="/The Lemelson Estate (1).png"
            alt="Eden Estate wordmark"
            className="h-20 w-auto md:h-28 object-contain transform origin-center scale-[1.7] md:scale-[1.5]"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-2.5 text-center text-sm text-stone-700 md:text-right">
          <div className="mx-auto h-px w-12 rounded-full bg-gradient-to-r from-transparent via-[rgba(58,45,20,0.25)] to-transparent md:hidden" />
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Connect</p>
            <div className="flex flex-col gap-1">
              <a
                href="mailto:admin@lemelsoncapital.com"
                className="break-all text-stone-700 transition hover:text-stone-900"
              >
                admin@lemelsoncapital.com
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:justify-end">
            <a
              href="https://www.facebook.com/p/Eden-The-Lemelson-Estate-100087154695200/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition hover:bg-[#2a86ff]"
              aria-label="Facebook"
            >
              <img src="/Symbol.png" alt="Facebook" className="h-4 w-4" width={16} height={16} />
            </a>
            <a
              href="https://www.instagram.com/the_lemelson_estate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-800 shadow-sm transition hover:bg-stone-100"
              aria-label="Instagram"
            >
              <img src="/Instagram_Symbol_1.png" alt="Instagram" className="h-4 w-4" width={16} height={16} />
            </a>
            <a
              href="https://x.com/LemelsonEstate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/90"
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
