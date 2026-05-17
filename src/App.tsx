import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { OverviewPage } from './pages/OverviewPage'
import { InstitutionsPage } from './pages/InstitutionsPage'
import { FxMarketPage } from './pages/FxMarketPage'

const App: FC = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/institutions" element={<InstitutionsPage />} />
        <Route path="/fx-market" element={<FxMarketPage />} />
      </Route>
    </Routes>
  )
}

export default App