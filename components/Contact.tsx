export default function Contact() {
    return (
        <section id="contact" className="relative w-full min-h-screen scroll-mt-0">
            <div className="sticky top-0 z-30 h-screen w-full">
                <div className="relative h-full w-full overflow-hidden bg-slate-950/95 text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.18),transparent_30%)] opacity-95" />
                    <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center p-8 sm:p-12">
                        <div className="w-full rounded-4xl border border-white/10 bg-slate-950/70 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl text-center">
                            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                                Contacts Section here
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}