import {
  Sprout,
  Eye,
  TrendingUp,
  Calendar,
  MapPin,
  Maximize2,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Progress } from "../ui/progress";

interface QuinuaLotsProps {
  onNavigateToFinancial?: () => void;
}

export function QuinuaLots({ onNavigateToFinancial }: QuinuaLotsProps) {
  // Datos de lotes de quinua
  const quinuaLots = [
    {
      id: "1",
      code: "Q-2025",
      name: "Lote Quinua Real",
      variety: "Quinua Real Blanca",
      status: "En Crecimiento",
      statusColor: "bg-[#3BA935]",
      statusIcon: "🌱",
      area: "2.5 Ha",
      sowingDate: "15 Oct 2024",
      estimatedHarvest: "Mar 2025",
      progress: 60,
      currentPhase: "Floración",
      image:
        "https://images.unsplash.com/photo-1643412390887-6b98fd788909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBmaWVsZCUyMGZhcm1pbmd8ZW58MXx8fHwxNzY0NjIzNTk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      totalInvested: 9700,
      projectedIncome: 35000,
      location: "Comunidad Villa Remedios",
    },
    {
      id: "2",
      code: "Q-2024-B",
      name: "Lote Quinua Roja",
      variety: "Quinua Roja Pasankalla",
      status: "Por Cosechar",
      statusColor: "bg-[#F7C331]",
      statusIcon: "🌾",
      area: "1.8 Ha",
      sowingDate: "01 Sep 2024",
      estimatedHarvest: "Feb 2025",
      progress: 90,
      currentPhase: "Maduración",
      image:
        "https://images.unsplash.com/photo-1706721844988-5e0137c60d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmRlYW4lMjBhZ3JpY3VsdHVyZSUyMGZhcm18ZW58MXx8fHwxNzY0NjIzNTk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      totalInvested: 8200,
      projectedIncome: 28000,
      location: "Comunidad Villa Remedios",
    },
    {
      id: "3",
      code: "Q-2025-C",
      name: "Lote Quinua Negra",
      variety: "Quinua Negra Collana",
      status: "Siembra Reciente",
      statusColor: "bg-blue-500",
      statusIcon: "🌿",
      area: "3.0 Ha",
      sowingDate: "20 Nov 2024",
      estimatedHarvest: "Abr 2025",
      progress: 25,
      currentPhase: "Germinación",
      image:
        "https://images.unsplash.com/photo-1643412390887-6b98fd788909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBmaWVsZCUyMGZhcm1pbmd8ZW58MXx8fHwxNzY0NjIzNTk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      totalInvested: 4500,
      projectedIncome: 42000,
      location: "Comunidad Villa Remedios",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div>
            <h1 className="text-gray-900 mb-2">Mis Lotes de Quinua</h1>
            <p className="text-muted-foreground">
              Gestiona tus cultivos de quinua, costos y proyecciones financieras
            </p>
          </div>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <Sprout className="h-8 w-8 text-[#3BA935]" />
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Lotes Activos</p>
            <p className="text-green-900">{quinuaLots.length} Lotes</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Maximize2 className="h-8 w-8 text-blue-600" />
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Área Total</p>
            <p className="text-blue-900">
              {quinuaLots.reduce((sum, lot) => sum + parseFloat(lot.area), 0).toFixed(1)} Ha
            </p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">💰</div>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Inversión Total</p>
            <p className="text-orange-900">
              Bs{" "}
              {quinuaLots
                .reduce((sum, lot) => sum + lot.totalInvested, 0)
                .toLocaleString()}
            </p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl">📈</div>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Ingresos Proyectados</p>
            <p className="text-purple-900">
              Bs{" "}
              {quinuaLots
                .reduce((sum, lot) => sum + lot.projectedIncome, 0)
                .toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Grid de Tarjetas de Lotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quinuaLots.map((lot) => (
            <Card
              key={lot.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Imagen del Lote */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={lot.image}
                  alt={lot.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${lot.statusColor} text-white`}>
                    {lot.statusIcon} {lot.status}
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-sm">Código: {lot.code}</p>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-gray-900 mb-1">{lot.name}</h3>
                  <p className="text-sm text-muted-foreground">{lot.variety}</p>
                </div>

                {/* Información del Lote */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Maximize2 className="h-4 w-4 text-[#3BA935]" />
                    <span>Área: {lot.area}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-[#3BA935]" />
                    <span>{lot.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-[#3BA935]" />
                    <span>Siembra: {lot.sowingDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-[#F7C331]" />
                    <span>Cosecha est.: {lot.estimatedHarvest}</span>
                  </div>
                </div>

                {/* Barra de Progreso */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Progreso del Ciclo</p>
                    <p className="text-sm text-[#3BA935]">{lot.progress}%</p>
                  </div>
                  <Progress value={lot.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Fase actual: {lot.currentPhase}
                  </p>
                </div>

                {/* Resumen Financiero */}
                <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Invertido</p>
                      <p className="text-sm text-red-700">
                        Bs {lot.totalInvested.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Proyección</p>
                      <p className="text-sm text-[#3BA935]">
                        Bs {lot.projectedIncome.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onNavigateToFinancial}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Button>
                  <Button className="flex-1 bg-[#3BA935] hover:bg-[#2E8B2A]">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Gestionar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Banner Informativo */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] border-green-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#3BA935] rounded-lg">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-2">
                💡 Consejo de Gestión Financiera
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Registra todos tus costos de forma detallada para tener una
                proyección exacta de tus ganancias. La quinua es un cultivo
                rentable cuando se gestiona correctamente.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  Ver Tutorial
                </Button>
                <Button size="sm" className="bg-[#3BA935] hover:bg-[#2E8B2A]">
                  Ir a Configuración de Costos
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}