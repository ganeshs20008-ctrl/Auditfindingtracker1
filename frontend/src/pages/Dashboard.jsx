export default function Dashboard() {
  return (
    <div className="p-8">
      
      <h1 className="text-4xl font-bold mb-6">
        Cyber Risk Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-gray-500">Total Risks</h2>
          <p className="text-3xl font-bold">120</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-gray-500">High Risk</h2>
          <p className="text-3xl font-bold text-red-500">30</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-gray-500">Medium Risk</h2>
          <p className="text-3xl font-bold text-yellow-500">50</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-gray-500">Low Risk</h2>
          <p className="text-3xl font-bold text-green-500">40</p>
        </div>

      </div>

    </div>
  )
}