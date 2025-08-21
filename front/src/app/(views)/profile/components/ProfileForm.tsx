// src/components/auth/ProfileForm.tsx
"use client";
import Button from "@/components/ui/Button";
import { IUser } from "@/types/User";
import * as Yup from "yup";
import { Formik } from "formik";
// Eliminamos la importación de useAuth0 porque ya no se usa
// import { useAuth0 } from '@auth0/auth0-react'; 

interface ProfileFormProps {
  user: IUser;
  onSave: (formData: Partial<IUser>) => void;
}

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const profileValidationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  address: Yup.string().required("La dirección es obligatoria"),
  phone: Yup.string()
    .matches(/^\d+$/, "Solo números")
    .required("El teléfono es obligatorio"),
  
  birthday: Yup.date()
    .max(new Date("2007-01-01"), "Debe ser mayor de 18")
    .required("La fecha de nacimiento es obligatoria"),

  diet: Yup.string().oneOf(["general", "vegetariano", "celiaco", "vegano", "diabetico"]),
});

const ProfileForm = ({ user, onSave }: ProfileFormProps) => {
  // Eliminamos esta línea que ya no se usa
  // const { user: auth0User } = useAuth0();

  return (
    <Formik
      initialValues={{
        name: user?.name || "",
        email: user?.email || "",
        address: user?.address || "",
        phone: user?.phone?.toString() || "",
        diet: user?.diet || "general",
        birthday: user.birthday
            ? new Date(user.birthday).toLocaleDateString("en-CA")
            : "",
      }}
      validationSchema={profileValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const dataToSave: Partial<IUser> = {
          ...values,
          phone: values.phone?.replace(/\D/g, "")
            ? parseInt(values.phone.replace(/\D/g, ""), 10)
            : undefined,
          birthday: values.birthday
            ? parseLocalDate(values.birthday)
            : undefined,
        };
        await onSave(dataToSave);
        setSubmitting(false);
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
        errors,
        touched,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-lg shadow-md"
        >
          {/* Campo Nombre */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {touched.name && errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Campo Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              readOnly
              className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-100 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Campo Dirección */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {touched.address && errors.address && (
              <p className="text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          {/* Campo Teléfono */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {touched.phone && errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
          
          {/* Campo Tipo de Dieta */}
          <div className="mb-6">
            <label
              htmlFor="diet"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Tipo de Dieta
            </label>
            <select
              id="diet"
              name="diet"
              value={values.diet}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option value="general">Sin dieta especifica</option>
              <option value="vegetariano">Vegetariano</option>
              <option value="celiaco">Celíaco</option>
              <option value="vegano">Vegano</option>
              <option value="diabetico">Diabetico</option>
            </select>
            {touched.diet && errors.diet && (
              <p className="text-sm text-red-500">{errors.diet}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit" disabled={isSubmitting} variant="default">
              {isSubmitting ? "Guardando..." : "Guardar Perfil"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ProfileForm;
