import { Sprout, TrendingUp, Share2, MapPin, Calendar, Package, MessageCircle, ArrowRight, Users, ShoppingCart, AlertCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import quinuaImage from "figma:asset/d70a8a4876d7ebf558541a0290f27e39f8579cc7.png";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  // Mock data de lotes
  const recentLots = [
    {
      id: "1",
      code: "Q-2025",
      crop: "Lote Quinua Real",
      variety: "Quinua Real Blanca",
      location: "Comunidad Villa Remedios",
      surfaceHa: 2.5,
      plantingDate: "15 Oct 2024",
      harvestDate: "Mar 2025",
      status: "En Crecimiento",
      progress: 60,
      currentPhase: "Floración",
      totalCosts: 9700,
      projectedRevenue: 35000,
      image: quinuaImage,
    },
    {
      id: "2",
      code: "Q-2024-B",
      crop: "Lote Quinua Roja",
      variety: "Quinua Roja Pasankalla",
      location: "Comunidad Villa Remedios",
      surfaceHa: 1.8,
      plantingDate: "01 Sep 2024",
      harvestDate: "Feb 2025",
      status: "Planificado",
      progress: 80,
      currentPhase: "Maduración",
      totalCosts: 8200,
      projectedRevenue: 28000,
      image: quinuaImage,
    },
    {
      id: "3",
      code: "Q-2025-C",
      crop: "Lote Quinua Negra",
      variety: "Quinua Negra Collana",
      location: "Comunidad Villa Remedios",
      surfaceHa: 3.0,
      plantingDate: "20 Nov 2024",
      harvestDate: "Abr 2025",
      status: "Siembra Reciente",
      progress: 25,
      currentPhase: "Germinación",
      totalCosts: 4500,
      projectedRevenue: 42000,
      image: quinuaImage,
    },
  ];

  // Mock data de productos
  const recentProducts = [
    {
      id: "1",
      name: "Quinua Real Blanca",
      category: "Cereales",
      stock: 150,
      unit: "qq",
      price: 800,
      reserved: 45,
      image: quinuaImage,
    },
    {
      id: "2",
      name: "Quinua Roja Pasankalla",
      category: "Cereales",
      stock: 80,
      unit: "qq",
      price: 850,
      reserved: 20,
      image: quinuaImage,
    },
    {
      id: "3",
      name: "Quinua Negra Premium",
      category: "Cereales",
      stock: 120,
      unit: "qq",
      price: 900,
      reserved: 35,
      image: quinuaImage,
    },
  ];

  // Mock data de comunidad
  const recentMessages = [
    {
      id: "1",
      user: "María Quispe",
      topic: "Consulta sobre fertilizantes orgánicos",
      replies: 8,
      time: "Hace 2 horas",
      category: "Técnicas de Cultivo",
    },
    {
      id: "2",
      user: "Pedro Mamani",
      topic: "Precios de quinua en Oruro",
      replies: 12,
      time: "Hace 5 horas",
      category: "Mercado",
    },
    {
      id: "3",
      user: "Rosa Condori",
      topic: "Control de plagas en época de lluvia",
      replies: 6,
      time: "Hace 1 día",
      category: "Técnicas de Cultivo",
    },
  ];

  // Cálculos de KPIs
  const activeLots = recentLots.filter(l => l.status === "En Crecimiento" || l.status === "Siembra Reciente").length;
  const totalArea = recentLots.reduce((sum, lot) => sum + lot.surfaceHa, 0);
  const totalInvestment = recentLots.reduce((sum, lot) => sum + lot.totalCosts, 0);
  const totalProjectedRevenue = recentLots.reduce((sum, lot) => sum + lot.projectedRevenue, 0);
  const totalProducts = recentProducts.length;
  const totalStock = recentProducts.reduce((sum, p) => sum + p.stock, 0);
  const totalReserved = recentProducts.reduce((sum, p) => sum + p.reserved, 0);
  const totalRevenue = recentProducts.reduce((sum, p) => sum + (p.price * p.reserved), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Crecimiento":
        return "bg-[#3BA935] text-white";
      case "Planificado":
        return "bg-[#F7C331] text-black";
      case "Siembra Reciente":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[#3BA935]">Dashboard AgroConecta</h1>
        <p className="text-muted-foreground">
          Resumen general de tus lotes, productos y actividad en la comunidad
        </p>
      </div>

      {/* KPIs Principales - Grid de 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Lotes Activos */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate("lots")}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Lotes Activos</p>
                <p className="text-3xl text-[#3BA935]">{activeLots} Lotes</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-[#3BA935]/10 flex items-center justify-center">
                <Sprout className="h-5 w-5 text-[#3BA935]" />
              </div>
            </div>
            <div className="mt-2">
              <TrendingUp className="h-4 w-4 text-[#3BA935] inline mr-1" />
              <span className="text-xs text-muted-foreground">En producción</span>
            </div>
          </CardContent>
        </Card>

        {/* Área Total */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate("lots")}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Área Total</p>
                <p className="text-3xl text-blue-600">{totalArea.toFixed(1)} Ha</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <TrendingUp className="h-4 w-4 text-blue-600 inline mr-1" />
              <span className="text-xs text-muted-foreground">Bajo cultivo</span>
            </div>
          </CardContent>
        </Card>

        {/* Inversión Total */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate("lots")}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Inversión Total</p>
                <p className="text-3xl text-orange-600">Bs {totalInvestment.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-orange-600/10 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-muted-foreground">Gastos acumulados</span>
            </div>
          </CardContent>
        </Card>

        {/* Ingresos Proyectados */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate("lots")}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Ingresos Proyectados</p>
                <p className="text-3xl text-purple-600">Bs {totalProjectedRevenue.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-600/10 flex items-center justify-center">
                <span className="text-2xl">💵</span>
              </div>
            </div>
            <div className="mt-2">
              <TrendingUp className="h-4 w-4 text-purple-600 inline mr-1" />
              <span className="text-xs text-muted-foreground">Estimación total</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección: Mis Lotes de Quinua */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2>Mis Lotes de Quinua</h2>
            <p className="text-sm text-muted-foreground">Últimos lotes registrados</p>
          </div>
          <Button variant="outline" onClick={() => onNavigate("lots")}>
            Ver Todos
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentLots.map((lot) => (
            <Card key={lot.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("lots")}>
              {/* Imagen del Lote */}
              <div className="relative h-48">
                <ImageWithFallback
                  src={lot.image}
                  alt={lot.code}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Badge de Estado */}
                <Badge className={`absolute top-3 right-3 ${getStatusColor(lot.status)}`}>
                  {lot.status}
                </Badge>

                {/* Código del Lote */}
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-xs opacity-80">Código: {lot.code}</p>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                {/* Título */}
                <h3 className="text-lg">{lot.crop}</h3>
                <p className="text-sm text-muted-foreground">{lot.variety}</p>

                {/* Detalles */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Share2 className="h-4 w-4 text-blue-600" />
                    <span>Área: {lot.surfaceHa} Ha</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-[#3BA935]" />
                    <span>{lot.location}</span>
                  </div>
                </div>

                {/* Progreso del Ciclo */}
                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="text-[#3BA935]">{lot.progress}%</span>
                  </div>
                  <Progress value={lot.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">Fase: {lot.currentPhase}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Grid: Productos + Comunidad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sección: Mis Productos */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-[#3BA935]" />
                    Mis Productos
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Productos disponibles para venta</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onNavigate("products")}>
                  Ver Todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* KPIs de Productos */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-green-50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl text-[#3BA935]">{totalProducts}</p>
                  <p className="text-xs text-muted-foreground">Productos</p>
                </div>
                <div className="text-center border-l border-r">
                  <p className="text-2xl text-blue-600">{totalStock} qq</p>
                  <p className="text-xs text-muted-foreground">Stock Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-orange-600">{totalReserved} qq</p>
                  <p className="text-xs text-muted-foreground">Reservado</p>
                </div>
              </div>

              {/* Lista de Productos */}
              <div className="space-y-3">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onNavigate("products")}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs">
                        <span className="text-[#3BA935]">Stock: {product.stock} {product.unit}</span>
                        <span className="text-orange-600">Reservado: {product.reserved} {product.unit}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#3BA935]">Bs {product.price}</p>
                      <p className="text-xs text-muted-foreground">por {product.unit}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen Financiero de Productos */}
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ingresos por Reservas</p>
                    <p className="text-2xl text-purple-600">Bs {totalRevenue.toLocaleString()}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sección: Actividad de la Comunidad */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-[#3BA935]" />
                    Actividad de la Comunidad
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Conversaciones recientes</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onNavigate("community")}>
                  Ver Todo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Estadísticas de Comunidad */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl text-blue-600">156</p>
                  <p className="text-xs text-muted-foreground">Productores Activos</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <MessageCircle className="h-6 w-6 text-[#3BA935] mx-auto mb-2" />
                  <p className="text-2xl text-[#3BA935]">28</p>
                  <p className="text-xs text-muted-foreground">Temas Activos</p>
                </div>
              </div>

              {/* Lista de Mensajes Recientes */}
              <div className="space-y-3">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onNavigate("community")}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{message.topic}</p>
                        <p className="text-xs text-muted-foreground mt-1">Por {message.user}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {message.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {message.replies} respuestas
                      </span>
                      <span>{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alertas/Notificaciones */}
              <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Alerta Climática</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Se pronostican heladas para los próximos 3 días en la región de Patacamaya. Protege tus cultivos.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resumen Financiero General */}
      <Card className="bg-gradient-to-r from-[#3BA935] to-[#2E8B2A] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Resumen Financiero General
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm opacity-80 mb-1">Inversión en Lotes</p>
              <p className="text-2xl">Bs {totalInvestment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm opacity-80 mb-1">Ingresos Proyectados (Lotes)</p>
              <p className="text-2xl">Bs {totalProjectedRevenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm opacity-80 mb-1">Ingresos por Productos</p>
              <p className="text-2xl">Bs {totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm opacity-80 mb-1">Margen Proyectado</p>
              <p className="text-2xl">
                {((totalProjectedRevenue - totalInvestment) / totalInvestment * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Barra de Progreso General */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="opacity-80">Progreso Promedio de Lotes</span>
              <span>{Math.round(recentLots.reduce((sum, lot) => sum + lot.progress, 0) / recentLots.length)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-white rounded-full h-3 transition-all"
                style={{ width: `${Math.round(recentLots.reduce((sum, lot) => sum + lot.progress, 0) / recentLots.length)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
