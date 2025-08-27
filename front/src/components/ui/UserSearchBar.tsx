import { useState } from "react";
import Button from "@/components/ui/Button";


interface UserSearchBarProps {
  onSearch: (term: string, role?: string) => void;
}


const UserSearchBar = ({ onSearch }: UserSearchBarProps) => {
  const [term, setTerm] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term, role);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 mb-6 sm:flex-row"
    >
      {/* Búsqueda por nombre/email */}
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Filtro opcional por rol */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-4 py-2 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Todos</option>
        <option value="admin">Admin</option>
        <option value="user">Usuario</option>
        <option value="banned">Banneado</option>
      </select>

      <Button type="submit" className="px-6 py-2">
        Buscar
      </Button>
    </form>
  );
};

export default UserSearchBar;
