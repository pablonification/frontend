export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-500 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">TailwindCSS Test</h1>
      <div className="bg-blue-500 text-white p-4 rounded-lg">
        <p className="text-lg">If you can see colors, TailwindCSS is working!</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-green-500 h-20 rounded"></div>
        <div className="bg-yellow-500 h-20 rounded"></div>
        <div className="bg-purple-500 h-20 rounded"></div>
      </div>
    </div>
  )
}


