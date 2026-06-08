export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
      
      {/* Contenedor principal */}
      <div className="max-w-4xl w-full text-center space-y-6">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Bienvenido a <span className="text-blue-600">Estudio</span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Esta es la base limpia de nuestra nueva landing page construida con Next.js y Tailwind CSS.
        </p>

        {/* Botón de prueba */}
        <div className="pt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg">
            Empezar
          </button>
        </div>

      </div>

    </main>
  );
}