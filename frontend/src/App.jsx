import { useEffect, useState } from "react"
import api from "./services/api"

function App() {

  const [risks, setRisks] = useState([])
  const [title, setTitle] = useState("")
  const [severity, setSeverity] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchRisks()
  }, [])

  const fetchRisks = () => {
    api.get("/risks")
      .then((res) => {
        setRisks(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addRisk = () => {

    const newRisk = {
      title,
      severity
    }

    api.post("/risks", newRisk)
      .then(() => {
        fetchRisks()
        setTitle("")
        setSeverity("")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteRisk = (id) => {
    api.delete(`/risks/${id}`)
      .then(() => {
        fetchRisks()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (

    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 p-10 text-white">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-8 text-center">
          Cyber Risk Dashboard
        </h1>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <div className="bg-blue-600 p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg">Total Risks</h2>
            <p className="text-4xl font-bold mt-2">
              {risks.length}
            </p>
          </div>

          <div className="bg-red-600 p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg">High Risks</h2>
            <p className="text-4xl font-bold mt-2">
              {risks.filter(r => r.severity === "High").length}
            </p>
          </div>

          <div className="bg-green-600 p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg">Low Risks</h2>
            <p className="text-4xl font-bold mt-2">
              {risks.filter(r => r.severity === "Low").length}
            </p>
          </div>

        </div>

        {/* Add Risk Form */}

        <div className="bg-white text-black p-6 rounded-2xl shadow-lg mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Add New Risk
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Risk Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-3 w-full rounded-lg"
            />

            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="border p-3 w-full rounded-lg"
            >
              <option value="">Select Severity</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button
              onClick={addRisk}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
            >
              Add Risk
            </button>

          </div>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search Risk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 w-full rounded-xl mb-6 text-black"
        />

        {/* Risk List */}

        <div className="space-y-4">

          {risks
            .filter((risk) =>
              risk.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((risk) => (

              <div
                key={risk.id}
                className="bg-white text-black p-5 rounded-2xl shadow-lg flex justify-between items-center"
              >

                <div>

                  <h2 className="text-2xl font-bold">
                    {risk.title}
                  </h2>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm
                      ${risk.severity === "High"
                        ? "bg-red-500"
                        : risk.severity === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                  >
                    {risk.severity}
                  </span>

                </div>

                <button
                  onClick={() => deleteRisk(risk.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            ))}

        </div>

      </div>

    </div>
  )
}

export default App