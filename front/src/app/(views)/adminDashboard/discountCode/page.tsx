"use client";

import { useEffect, useState } from "react";
import { IDiscountCode, ICreateDiscountCodeDto } from "@/types/DiscountCode";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { discountCodeService } from "@/services/draft/discountCodeService";

const DiscountCodeManagement = () => {
  const [codes, setCodes] = useState<IDiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // estados del form
  const [newCode, setNewCode] = useState<ICreateDiscountCodeDto>({
    name: "",
    percentage: null,
    validUntil: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await discountCodeService.getAll();
      setCodes(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los códigos de descuento.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await discountCodeService.create({
        name: newCode.name, // ✅ ahora coincide con lo que espera el backend
        percentage: newCode.percentage,
        validUntil: newCode.validUntil,
      });
      toast.success("Código de descuento creado correctamente");
      setNewCode({ name: "", percentage: 0, validUntil: "" });
      await fetchCodes();
    } catch (err) {
      toast.error("No se pudo crear el código de descuento");
      console.error(err);
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    try {
      if (active) {
        await discountCodeService.inactivate(id);
        toast.info("Código inactivado");
      } else {
        await discountCodeService.activate(id);
        toast.success("Código activado");
      }
      fetchCodes();
    } catch (err) {
      console.error(err);
      toast.error("No se pudo actualizar el estado");
    }
  };

  const filteredCodes = codes.filter((c) =>
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container min-h-screen p-8 mx-auto text-center">
        Cargando códigos de descuento...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container min-h-screen p-8 mx-auto text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container min-h-screen p-8 mx-auto">
      <h1 className="my-6 text-4xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        Gestión de Códigos de Descuento
      </h1>

      {/* Formulario */}
      <div className="p-6 mb-12 shadow-lg rounded-2xl bg-black/50 backdrop-blur-md">
        <h2 className="mb-6 text-2xl font-bold text-primary-txt-500">
          Crear nuevo código
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Palabra clave"
            value={newCode.name}
            onChange={(e) => setNewCode({ ...newCode, name: e.target.value })}
            className="w-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
          />
          <input
            type="number"
            placeholder="Descuento %"
            value={newCode.percentage ?? ""}
            onChange={(e) =>
              setNewCode({ ...newCode, percentage: Number(e.target.value) })
            }
            className="w-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
          />
          <input
            type="text"
            placeholder="Valido hasta"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            value={newCode.validUntil}
            onChange={(e) =>
              setNewCode({ ...newCode, validUntil: e.target.value })
            }
            className="w-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleCreate}>Crear Código</Button>
        </div>
      </div>

      {/* Lista de códigos */}
      <div className="p-6 shadow-lg rounded-2xl bg-black/50 backdrop-blur-md">
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-primary-txt-500">
            Lista de códigos
          </h2>
          <input
            type="text"
            placeholder="Buscar por código..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg md:w-1/3 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
          />
        </div>

        {filteredCodes.length === 0 ? (
          <p className="text-gray-400">
            No hay códigos que coincidan con la búsqueda.
          </p>
        ) : (
          <ul className="flex flex-col gap-8">
            {filteredCodes.map((code) => (
              <li key={code.id} className="relative mt-6">
                <h3 className="absolute px-4 py-1 text-lg font-bold text-white rounded-t-lg -top-6 left-4 bg-daily-menu-600">
                  {code.code}
                </h3>
                <div className="flex flex-col items-start justify-between p-6 pt-10 transition-colors border border-gray-700 rounded-lg md:flex-row hover:bg-gray-800/50">
                  <div className="flex flex-col flex-1 gap-2 text-base text-gray-300 md:flex-row md:justify-between">
                    <p>
                      <span className="font-bold text-green-400">
                        %
                      </span>{" "}
                      {code.percentage}
                    </p>
                    <p>
                      <span className="font-bold text-green-400">
                        Válido hasta:
                      </span>{" "}
                      {new Date(code.validUntil).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-bold text-green-400 ">
                        Estado:
                      </span>{" "}
                      {code.isActive ? "Activo" : "Inactivo"}
                    </p>
                    <Button
                      onClick={() => toggleActive(code.id, code.isActive)}
                    >
                      {code.isActive ? "Inactivar" : "Activar"}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DiscountCodeManagement;
