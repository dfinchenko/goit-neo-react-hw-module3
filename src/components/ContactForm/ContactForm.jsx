import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

const DEFAULT_VALUES = {
  name: "",
  number: "",
};

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const FormField = ({ label, name, type, id }) => (
  <div className={css.field}>
    <label htmlFor={id}>{label}</label>
    <Field type={type} name={name} id={id} />
    <ErrorMessage className={css.error} name={name} component="span" />
  </div>
);

const ContactForm = ({ addContact }) => {
  const formId = useId();

  const onSubmit = (values, { resetForm }) => {
    addContact({ id: nanoid(), ...values });
    resetForm();
  };

  return (
    <Formik
      validationSchema={ContactFormSchema}
      initialValues={DEFAULT_VALUES}
      onSubmit={onSubmit}
    >
      <Form className={css.form}>
        <FormField label="Name" name="name" type="text" id={`${formId}-name`} />
        <FormField
          label="Number"
          name="number"
          type="tel"
          id={`${formId}-number`}
        />
        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
