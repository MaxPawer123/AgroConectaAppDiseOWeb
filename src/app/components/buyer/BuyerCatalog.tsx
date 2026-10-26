import { useState } from "react";
import { Search, Filter, MapPin, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BuyerCatalogProps {
  onNavigateToDetail: (productId: string) => void;
}

export function BuyerCatalog({ onNavigateToDetail }: BuyerCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // Mock data de productos
  const products = [
    {
      id: "1",
      name: "Quinua Real Orgánica",
      type: "Quinua",
      price: "12.00",
      unit: "kg",
      location: "Sica Sica",
      community: "Comunidad Villa Remedios",
      producer: "Juan Mamani",
      stock: 150,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      harvestDate: "2024-05-15",
    },
    {
      id: "2",
      name: "Haba Verde Fresca",
      type: "Hortaliza",
      price: "8.50",
      unit: "kg",
      location: "Patacamaya",
      community: "Comunidad Vinto Coopani",
      producer: "María Quispe",
      stock: 80,
      image: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400",
      harvestDate: "2024-06-20",
    },
    {
      id: "3",
      name: "Alfalfa Fresca",
      type: "Forraje",
      price: "25.00",
      unit: "quintal",
      location: "Sica Sica",
      community: "Comunidad Jalsuri",
      producer: "Pedro Condori",
      stock: 200,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
      harvestDate: "2024-06-10",
    },
    {
      id: "4",
      name: "Papa Imilla",
      type: "Hortaliza",
      price: "4.00",
      unit: "kg",
      location: "Patacamaya",
      community: "Comunidad Ulloma",
      producer: "Rosa Apaza",
      stock: 500,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
      harvestDate: "2024-06-01",
    },
    {
      id: "5",
      name: "Cebolla Roja",
      type: "Hortaliza",
      price: "5.50",
      unit: "kg",
      location: "Sica Sica",
      community: "Comunidad Machacamarca",
      producer: "Carlos Choque",
      stock: 120,
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
      harvestDate: "2024-06-15",
    },
    {
      id: "6",
      name: "Zanahoria Orgánica",
      type: "Hortaliza",
      price: "6.00",
      unit: "kg",
      location: "Patacamaya",
      community: "Comunidad Cañuma",
      producer: "Ana Flores",
      stock: 95,
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
      harvestDate: "2024-06-18",
    },
    {
      id: "7",
      name: "Quinua Negra",
      type: "Quinua",
      price: "15.00",
      unit: "kg",
      location: "Sica Sica",
      community: "Comunidad Villa Remedios",
      producer: "José Ticona",
      stock: 75,
      image: "https://images.unsplash.com/photo-1585326470854-eb6b25dfb1e3?w=400",
      harvestDate: "2024-05-20",
    },
    {
      id: "8",
      name: "Avena Forrajera",
      type: "Forraje",
      price: "30.00",
      unit: "quintal",
      location: "Patacamaya",
      community: "Comunidad Ulloma",
      producer: "Miguel Huanca",
      stock: 180,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
      harvestDate: "2024-06-05",
    },
  ];

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.producer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.community.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || product.type === selectedType;
    const matchesLocation =
      selectedLocation === "all" || product.location === selectedLocation;

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F5E9] pb-20 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Catálogo de Productos</h1>
          <p className="text-muted-foreground">
            Explora productos frescos y locales de nuestros productores
          </p>
        </div>

        {/* Búsqueda y Filtros */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Búsqueda */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Buscar producto, productor o comunidad..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Filtro de Tipo */}
              <div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de producto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="Quinua">Quinua</SelectItem>
                    <SelectItem value="Hortaliza">Hortalizas</SelectItem>
                    <SelectItem value="Forraje">Forrajes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro de Ubicación */}
              <div>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ubicaciones</SelectItem>
                    <SelectItem value="Sica Sica">Sica Sica</SelectItem>
                    <SelectItem value="Patacamaya">Patacamaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filtros activos */}
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Búsqueda: {searchQuery}
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  <Filter className="h-3 w-3" />
                  {selectedType}
                </Badge>
              )}
              {selectedLocation !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {selectedLocation}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            {filteredProducts.length} producto
            {filteredProducts.length !== 1 ? "s" : ""} encontrado
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-[#3BA935]"
              onClick={() => onNavigateToDetail(product.id)}
            >
              <CardContent className="p-0">
                {/* Imagen */}
                <div className="relative h-48">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#3BA935] hover:bg-[#2E8B2A]">
                      {product.type}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs">
                    Stock: {product.stock}
                  </div>
                </div>

                {/* Información */}
                <div className="p-4">
                  <h3 className="mb-2">{product.name}</h3>

                  {/* Productor y Comunidad */}
                  <div className="space-y-1 mb-3">
                    <p className="text-sm text-muted-foreground">
                      👤 {product.producer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      📍 {product.community}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      🏘️ {product.location}
                    </p>
                  </div>

                  {/* Precio */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-[#3BA935]">
                        Bs {product.price}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        por {product.unit}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#3BA935] hover:bg-[#2E8B2A]"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sin resultados */}
        {filteredProducts.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No se encontraron productos con los filtros seleccionados</p>
              <Button
                variant="link"
                className="mt-4 text-[#3BA935]"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                  setSelectedLocation("all");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
