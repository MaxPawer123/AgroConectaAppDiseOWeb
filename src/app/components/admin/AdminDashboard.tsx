import {
  Users,
  TrendingUp,
  MapPin,
  AlertTriangle,
  Package,
  ShoppingCart,
  Calendar,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function AdminDashboard() {
  // Mock data - KPIs
  const kpis = [
    {
      title: "Total Ventas",
      value: "Bs 125,450",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "#3BA935",
    },
    {
      title: "Hectáreas Cultivadas",
      value: "342 ha",
      change: "+8.3%",
      trend: "up",
      icon: MapPin,
      color: "#3498DB",
    },
    {
      title: "Usuarios Activos",
      value: "156",
      change: "+24",
      trend: "up",
      icon: Users,
      color: "#2C3E50",
    },
    {
      title: "Alertas Activas",
      value: "3",
      change: "2 zonas con sequía",
      trend: "alert",
      icon: AlertTriangle,
      color: "#E74C3C",
    },
  ];

  // Mock data - Producción por Municipio
  const productionData = [
    {
      municipio: "Sica Sica",
      quinua: 450,
      hortalizas: 320,
      forrajes: 280,
    },
    {
      municipio: "Patacamaya",
      quinua: 380,
      hortalizas: 290,
      forrajes: 350,
    },
  ];

  // Mock data - Ventas mensuales
  const salesData = [
    { mes: "Ene", ventas: 15000 },
    { mes: "Feb", ventas: 18000 },
    { mes: "Mar", ventas: 22000 },
    { mes: "Abr", ventas: 25000 },
    { mes: "May", ventas: 28000 },
    { mes: "Jun", ventas: 32000 },
  ];

  // Mock data - Distribución de productos
  const productDistribution = [
    { name: "Quinua", value: 45, color: "#3BA935" },
    { name: "Hortalizas", value: 35, color: "#F7C331" },
    { name: "Forrajes", value: 20, color: "#A87C4F" },
  ];

  // Mock data - Últimos pedidos
  const recentOrders = [
    {
      id: "RES-089",
      buyer: "Roberto Flores",
      producer: "Juan Mamani",
      product: "Quinua Real Orgánica",
      amount: 120.0,
      status: "COMPLETADO",
      date: "2024-11-25",
    },
    {
      id: "RES-088",
      buyer: "Ana García",
      producer: "María Quispe",
      product: "Haba Verde",
      amount: 85.5,
      status: "PAGADO",
      date: "2024-11-25",
    },
    {
      id: "RES-087",
      buyer: "Carlos Mendoza",
      producer: "Pedro Condori",
      product: "Alfalfa Fresca",
      amount: 150.0,
      status: "RESERVADO",
      date: "2024-11-24",
    },
    {
      id: "RES-086",
      buyer: "María López",
      producer: "Rosa Apaza",
      product: "Papa Imilla",
      amount: 200.0,
      status: "COMPLETADO",
      date: "2024-11-24",
    },
    {
      id: "RES-085",
      buyer: "Luis Pérez",
      producer: "Carlos Choque",
      product: "Cebolla Roja",
      amount: 66.0,
      status: "PAGADO",
      date: "2024-11-24",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      RESERVADO: "bg-yellow-500 text-white",
      PAGADO: "bg-blue-500 text-white",
      COMPLETADO: "bg-green-500 text-white",
      EXPIRADO: "bg-red-500 text-white",
      CANCELADO: "bg-gray-500 text-white",
    };
    return styles[status as keyof typeof styles] || "bg-gray-500 text-white";
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="mb-2">Panel de Control</h1>
        <p className="text-muted-foreground">
          Vista general del sistema AgroConecta
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="border-l-4" style={{ borderLeftColor: kpi.color }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <Icon className="h-5 w-5" style={{ color: kpi.color }} />
                </div>
                <div className="space-y-1">
                  <h2 className="mb-1" style={{ color: kpi.color }}>
                    {kpi.value}
                  </h2>
                  <p className="text-xs text-muted-foreground">{kpi.change}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Producción por Municipio */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Producción por Municipio</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="municipio" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quinua" fill="#3BA935" name="Quinua (qq)" />
                <Bar dataKey="hortalizas" fill="#F7C331" name="Hortalizas (kg)" />
                <Bar dataKey="forrajes" fill="#A87C4F" name="Forrajes (qq)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribución de Productos */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Ventas Mensuales */}
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Ventas Mensuales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="ventas"
                stroke="#3BA935"
                strokeWidth={2}
                name="Ventas (Bs)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Últimos Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Comprador</TableHead>
                <TableHead>Productor</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    {order.id}
                  </TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>{order.producer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>Bs {order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString("es-BO")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#E8F5E9] rounded-lg">
                <Package className="h-6 w-6 text-[#3BA935]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Productos Registrados
                </p>
                <h3>245</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#FFF9E6] rounded-lg">
                <ShoppingCart className="h-6 w-6 text-[#F7C331]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Transacciones Totales
                </p>
                <h3>892</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#EFEBE9] rounded-lg">
                <Activity className="h-6 w-6 text-[#A87C4F]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tasa de Éxito</p>
                <h3>94.2%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
