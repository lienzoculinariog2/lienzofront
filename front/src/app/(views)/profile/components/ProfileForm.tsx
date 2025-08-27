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

const profileValidationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  address: Yup.string().required("La dirección es obligatoria"),
  phone: Yup.string()
    .matches(/^\d+$/, "Solo números")
    .required("El teléfono es obligatorio"),

  diet: Yup.string().oneOf([
    "general",
    "vegetariano",
    "celiaco",
    "vegano",
    "diabetico",
  ]),
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
      }}
      validationSchema={profileValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const dataToSave: Partial<IUser> = {
          ...values,
          phone: values.phone?.replace(/\D/g, "")
            ? parseInt(values.phone.replace(/\D/g, ""), 10)
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
          className="p-6 space-y-6 border shadow-lg rounded-2xl bg-black/50 backdrop-blur-md border-primary-txt-800"
        >
          {/* Campo Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-primary-txt-300"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 text-primary-txt-100 bg-black/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-txt-500"
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-primary-txt-300"
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
              className="w-full px-4 py-2 border border-gray-700 cursor-not-allowed text-primary-txt-300 bg-gray-800/50 rounded-xl"
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Campo Dirección */}
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-semibold text-primary-txt-300"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 text-primary-txt-100 bg-black/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-txt-500"
            />
            {touched.address && errors.address && (
              <p className="mt-1 text-sm text-red-400">{errors.address}</p>
            )}
          </div>

          {/* Campo Teléfono */}
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-semibold text-primary-txt-300"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 text-primary-txt-100 bg-black/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-txt-500"
            />
            {touched.phone && errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* Campo Dieta */}
          <div>
            <label
              htmlFor="diet"
              className="block mb-2 text-sm font-semibold text-primary-txt-300"
            >
              Tipo de Dieta
            </label>
            <select
              id="diet"
              name="diet"
              value={values.diet}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 text-primary-txt-100 bg-black/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-txt-500"
            >
              <option value="general">Sin dieta específica</option>
              <option value="vegetariano">Vegetariano</option>
              <option value="celiaco">Celíaco</option>
              <option value="vegano">Vegano</option>
              <option value="diabetico">Diabético</option>
            </select>
            {touched.diet && errors.diet && (
              <p className="mt-1 text-sm text-red-400">{errors.diet}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="dark"
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Guardando..." : "Guardar Perfil"}
            </Button>

            {typeof user.isSuscribed === "boolean" && (
              <Button
                type="button"
                onClick={() => onSave({ isSuscribed: !user.isSuscribed })}
                variant="dark"
                className="w-full sm:w-auto"
              >
                {user.isSuscribed
                  ? "Cancelar suscripción"
                  : "Suscribirse a la newsletter"}
              </Button>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ProfileForm;
