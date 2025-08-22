// src/components/UserManagementList.tsx
"use client";

import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { userService } from '@/services/draft/userService';
import { IUser } from '@/types/User';
import Button from '@/components/ui/Button'; 

const UserManagementList = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = await getAccessTokenSilently();
      const userList = await userService.findAll(accessToken);
      setUsers(userList);
    } catch (err) {
      setError('Error al cargar la lista de usuarios. No tienes permiso o ha ocurrido un problema de red.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user' | 'banned') => {
    setUpdating(userId);
    try {
      const accessToken = await getAccessTokenSilently();
      await userService.updateRole(userId, newRole, accessToken);
      await fetchUsers();
    } catch (err) {
      setError('No se pudo actualizar el rol del usuario.');
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <div className="container min-h-screen p-8 mx-auto text-center">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="container min-h-screen p-8 mx-auto text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container min-h-screen p-8 mx-auto">
      <h1 className="my-6 text-4xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        Panel de Usuarios
      </h1>
      <div className="p-6 mt-8 shadow-lg rounded-2xl bg-black/50 backdrop-blur-md">
        <h2 className="mb-8 text-2xl font-bold text-primary-txt-500">
          Lista de Usuarios
        </h2>

        {users.length === 0 ? (
          <p className="text-gray-400">No hay usuarios para mostrar.</p>
        ) : (
          <ul className="flex flex-col gap-8">
            {users.map((user) => (
              <li
                key={user.id}
                className="relative mt-6"
              >
                {/* Nombre del usuario como marcador */}
                <h3 className="absolute px-4 py-1 text-lg font-bold text-white rounded-t-lg -top-6 left-4 bg-daily-menu-600">
                  {user.name || user.email}
                </h3>
                
                {/* Tarjeta de datos del usuario, con fondo dinámico */}
                <div className="flex flex-col items-start justify-between p-6 pt-10 transition-colors border border-gray-700 rounded-lg md:flex-row hover:bg-gray-800/50">
                  {/* Contenedor principal de la información, con divisores */}
                  <div className="flex flex-col justify-between flex-1 gap-4 mb-4 divide-y divide-gray-700 md:flex-row md:items-center md:gap-0 md:divide-y-0 md:divide-x md:mb-0">
                    {/* Columna de detalles principales */}
                    <div className="flex-1 text-center md:text-left md:pr-8">
                      <div className="text-sm text-gray-300">
                        <p>
                          <span className="font-semibold text-green-400">Email:</span>
                          <span className="ml-1 break-all">{user.email}</span>
                        </p>
                        <p className="mt-1">
                          <span className="font-semibold text-green-400">Dirección:</span>
                          <span className="ml-1 break-all">{user.address}</span>
                        </p>
                      </div>
                    </div>

                    {/* Columna de detalles secundarios */}
                    <div className="flex-1 text-center md:text-left md:px-8">
                      <div className="text-sm text-gray-300">
                          <p>
                          <span className="font-semibold text-green-400">Teléfono:</span>
                          <span className="ml-1">{user.phone || 'No especificado'}</span>
                        </p>
                        <p className="mt-1">
                          <span className="font-semibold text-green-400">Dirección:</span>
                          <span className="ml-1">{user.address || 'No especificada'}</span>
                        </p>
                       
                      </div>
                    </div>
                    {/* Columna de detalles terciarios */}
                    <div className="flex-1 text-center md:text-left md:pl-8">
                      <div className="text-sm text-gray-300">
                        <p>
                          <span className="font-semibold text-green-400">Rol:</span>
                          <span className="ml-1 capitalize">{user.roles}</span>
                        </p>
                        <p className="mt-1">
                          <span className="font-semibold text-green-400">Dieta:</span>
                          <span className="ml-1 capitalize">{user.diet || 'No especificada'}</span>
                        </p>
                      </div>
                    </div>
                  </div>


                  {/* Contenedor de botones de acción */}
                  <div className="flex flex-col items-center justify-between text-sm text-gray-200 md:items-end">
                    <div className="flex flex-wrap justify-center gap-2 md:justify-end">
                      <Button
                        onClick={() => handleRoleChange(user.id, 'admin')}
                        disabled={updating === user.id || user.roles === 'admin'}
                        className="text-xs md:text-sm"
                      >
                        Admin
                      </Button>
                      <Button
                        onClick={() => handleRoleChange(user.id, 'user')}
                        disabled={updating === user.id || user.roles === 'user'}
                        className="text-xs md:text-sm"
                      >
                        Usuario
                      </Button>
                      <Button
                        onClick={() => handleRoleChange(user.id, 'banned')}
                        disabled={updating === user.id || user.roles === 'banned'}
                        className="text-xs md:text-sm"
                      >
                        Bannear
                      </Button>
                    </div>
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

export default UserManagementList;