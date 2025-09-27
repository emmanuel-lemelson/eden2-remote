export function Footer() {
  return (
    <footer className="bg-white/70 border-t border-white/40">
      <div className="lux-container flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-stone-500">Eden Estate</p>
          <p className="mt-3 text-base text-stone-700">
            28-acre private retreat in Stowe, Vermont. 11,400 square feet of alpine
            serenity.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-stone-700 md:text-right">
          <a href="tel:+18025551234" className="hover:text-stone-800 transition">
            +1 (802) 555-1234
          </a>
          <a
            href="mailto:hello@edenstowe.com"
            className="hover:text-stone-800 transition"
          >
            hello@edenstowe.com
          </a>
          <span className="text-xs tracking-[0.3em] uppercase text-stone-500">
            © {new Date().getFullYear()} Eden Estate
          </span>
        </div>
      </div>
    </footer>
  );
}
