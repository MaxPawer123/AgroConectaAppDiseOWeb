import { useState } from "react";
import { Plus, Edit, Trash2, MapPin, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import quinuaImage from "figma:asset/d70a8a4876d7ebf558541a0290f27e39f8579cc7.png";

interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  description: string;
  image: string;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Quinua Real Blanca",
      quantity: 500,
      unit: "kg",
      price: 3.5,
      location: "Sica Sica",
      description: "Quinua Real variedad Blanca de excelente calidad orgánica",
      image: quinuaImage,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "kg",
    price: "",
    location: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                quantity: Number(formData.quantity),
                price: Number(formData.price),
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        image: quinuaImage,
      };
      setProducts([...products, newProduct]);
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      quantity: "",
      unit: "kg",
      price: "",
      location: "",
      description: "",
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      quantity: product.quantity.toString(),
      unit: product.unit,
      price: product.price.toString(),
      location: product.location,
      description: product.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1>Mis Productos</h1>
          <p className="text-muted-foreground">
            Gestiona y registra tus productos agrícolas
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProduct(null);
                resetForm();
              }}
              className="bg-[#3BA935] hover:bg-[#2E8B2A]"
            >
              <Plus className="mr-2 h-5 w-5" />
              Registrar Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Producto" : "Registrar Nuevo Producto"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ej: Papa, Quinua, Habas"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    placeholder="500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="unit">Unidad</Label>
                  <Select
                    value={formData.unit}
                    onValueChange={(value) =>
                      setFormData({ ...formData, unit: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                      <SelectItem value="arroba">Arrobas</SelectItem>
                      <SelectItem value="quintal">Quintales</SelectItem>
                      <SelectItem value="tonelada">Toneladas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Precio por Unidad (Bs)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="3.50"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Ubicación</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData({ ...formData, location: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sica Sica">Sica Sica</SelectItem>
                      <SelectItem value="Patacamaya">Patacamaya</SelectItem>
                      <SelectItem value="Umala">Umala</SelectItem>
                      <SelectItem value="Ayo Ayo">Ayo Ayo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe las características de tu producto..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#3BA935] hover:bg-[#2E8B2A]">
                  {editingProduct ? "Actualizar" : "Guardar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  onClick={() => handleEdit(product)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{product.name}</span>
                <Badge className="bg-[#3BA935]">
                  Bs {product.price}/{product.unit}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>
                    {product.quantity} {product.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{product.location}</span>
                </div>
                <p className="text-sm mt-2">{product.description}</p>
                <div className="pt-2 border-t mt-4">
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="text-[#3BA935]">
                    Bs {(product.quantity * product.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-24 w-24 mx-auto text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-muted-foreground">
            No hay productos registrados
          </h3>
          <p className="text-muted-foreground">
            Comienza registrando tu primer producto
          </p>
        </div>
      )}
    </div>
  );
}