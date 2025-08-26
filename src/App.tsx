import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Homepage from './pages/Homepage'
import Philosophy from './pages/Philosophy'
import DailyRhythm from './pages/DailyRhythm'
import Traditions from './pages/Traditions'
import TraditionDetail from './pages/TraditionDetail'
import NeighborhoodMap from './pages/NeighborhoodMap'
import Community from './pages/Community'
import Enrollment from './pages/Enrollment'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/daily-rhythm" element={<DailyRhythm />} />
          <Route path="/traditions" element={<Traditions />} />
          <Route path="/traditions/:id" element={<TraditionDetail />} />
          <Route path="/neighborhood" element={<NeighborhoodMap />} />
          <Route path="/community" element={<Community />} />
          <Route path="/enrollment" element={<Enrollment />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App