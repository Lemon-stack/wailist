export default function Notfound() {
  return (
    <section className="flex items-center justify-center h-full p-16">
      <div className="flex flex-col">
        <img className="w-full" src="/Error.svg" alt="" />
        <p className="text-xl md:text-2xl text-blk mb-4">
            Sorry, we couldn&apos;t find this page.
          </p>
          <a
            href="/"
            className="px-8 py-4 text-xl font-semibold rounded bg-brown text-slate-50 hover:bg-blk rotate-2"
          >
            Back to home
          </a>
      </div>
    </section>
  )
}
