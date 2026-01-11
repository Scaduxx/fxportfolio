export default function LabPage() {
  return (
    <main className="px-6 md:px-12 lg:px-20 mt-20 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Lab</h1>

      <p className="mb-6 text-sm text-gray-600">
        Upload experimental work, behind-the-scenes, tutorials, and R&D content.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative aspect-[4/5] bg-gray-200"></div>
        <div className="relative aspect-[4/5] bg-gray-200"></div>
        <div className="relative aspect-[4/5] bg-gray-200"></div>
      </div>
    </main>
  )
}