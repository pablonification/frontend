"use client"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <section className="relative overflow-hidden">
          <div className="container-custom section-padding">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-neutral-900">
                Selamat Datang, Admin!
              </h1>
              <p className="text-lg text-neutral-600">
                Kelola konten website Lab Kimia Dasar dari halaman ini.
              </p>
              <div className="mt-8">
                <img
                  src="/pajang-2.png"
                  alt="Dashboard"
                  className="w-full max-w-3xl mx-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
