"use client";
import Button from "@/components/ui/Button";
import { IUser } from "@/types/User";
import * as Yup from "yup";
import { Formik } from "formik";

interface ProfileFormProps {
  user: IUser;
  onSave: (formData: Partial<IUser>) => void;
}

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // mes base 0
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

  diet: Yup.string().oneOf(["general", "vegetariano", "celiaco", "fitness"]),
});

const ProfileForm = ({ user, onSave }: ProfileFormProps) => {
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
          className="bg-white shadow-md rounded-lg p-6"
        >
          {/* Campo Nombre */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Campo Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Campo Dirección */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {touched.address && errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* Campo Teléfono */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {touched.phone && errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Campo Fecha de Nacimiento */}
          <div className="mb-4">
            <label
              htmlFor="birthday"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={values.birthday}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {touched.birthday && errors.birthday && (
              <p className="text-red-500 text-sm">{errors.birthday}</p>
            )}
          </div>

          {/* Campo Tipo de Dieta */}
          <div className="mb-6">
            <label
              htmlFor="diet"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tipo de Dieta
            </label>
            <select
              id="diet"
              name="diet"
              value={values.diet}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="general">General</option>
              <option value="vegetariano">Vegetariano</option>
              <option value="celiaco">Celíaco</option>
              <option value="fitness">Fitness</option>
            </select>
            {touched.diet && errors.diet && (
              <p className="text-red-500 text-sm">{errors.diet}</p>
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
