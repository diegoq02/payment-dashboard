import type { FC } from 'react'
import { Bell, AlertTriangle, ChevronRight } from 'lucide-react'
import { alertCards } from '../../data/mockPeerGroups'
import { useState } from 'react'

interface AlertStreamProps {
  maxAlerts?: number;
}

export const AlertStream: FC<AlertStreamProps> = ({ maxAlerts = 5 }) => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null)
  
  const sortedAlerts = [...alertCards].sort((a, b) => {
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
    return severityOrder[b.severity] - severityOrder[a.severity]
  }).slice(0, maxAlerts)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Alertas de Anomalías</h3>
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            {sortedAlerts.length} activas
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {sortedAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                  {getSeverityIcon(alert.severity)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900">{alert.institution}</span>
                    <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{alert.explanation}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span className="mr-3">
                      {alert.observed > 0 ? '+' : ''}{alert.observed.toFixed(1)}% vs. peer avg
                    </span>
                    <span className="mr-3">|</span>
                    <span>Z-score: {alert.zScore.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedAlert === alert.id ? 'rotate-90' : ''}`} />
            </div>
            {expandedAlert === alert.id && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Comparación Peer</h4>
                <div className="space-y-2">
                  {alert.peerComparison.map((peer, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{peer}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                  <span>Peer Average: {alert.peerAvg.toLocaleString('es-PE')}</span>
                  <span>Peer Std Dev: {alert.peerStd.toLocaleString('es-PE')}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}