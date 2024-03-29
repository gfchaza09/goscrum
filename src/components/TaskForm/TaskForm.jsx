import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

// Styles
import 'react-toastify/dist/ReactToastify.css';
import "./TaskForm.styles.css";

// Actions
import { createTask } from "../../store/actions/tasksActions";

export const TaskForm = () => {

  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = () => {
    dispatch(createTask(values));
    resetForm();
    toast("Tu tarea se creó.");
  };

  const required = "* Campo obligatorio.";

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "La cantidad mínima de caracteres es 6.")
      .required(required),
    status: Yup.string().required(required),
    importance: Yup.string().required(required),
    description: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, touched, handleBlur, values, resetForm } = formik;

  return (
    <section className="task-form">
      <h2>Crear Tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              name="title"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Título"
              className={errors.title && touched.title ? "error" : ""}
              value={values.title}
            />
            {errors.title && touched.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>
          <div>
            <select
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.status && touched.status ? "error" : ""}
              value={values.status}
            >
              <option value="">Seleccionar opción</option>
              <option value="NEW">Nueva</option>
              <option value="IN PROGRESS">En proceso</option>
              <option value="FINISHED">Terminada</option>
            </select>
            {errors.status && touched.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>
          <div>
            <select
              name="importance"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.importance && touched.importance ? "error" : ""}
              value={values.importance}
            >
              <option value="">Seleccionar opción</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
            {errors.importance && touched.importance && (
              <span className="error-message">{errors.importance}</span>
            )}
          </div>
        </div>
        <div>
          <textarea
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.description && touched.description ? "error" : ""}
            placeholder="Descripción"
            value={values.description}
          />
          {errors.description && touched.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>
        <button type="submit">Crear</button>
      </form>
      <ToastContainer />
    </section>
  );
};
