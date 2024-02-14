import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import css from "./FeedbackForm.module.css";
import * as Yup from "yup";

export const FeedbackForm = () => {
  const FeedbackSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Must be a valid email!").required("Required"),
    message: Yup.string()
      .min(3, "Too short")
      .max(256, "Too long")
      .required("Required"),
    level: Yup.string().oneOf(["good", "neutral", "bad"]).required("Required"),
  });

  const nameFieldId = useId();
  const emailFieldId = useId();
  const msgFieldId = useId();
  const levelFieldId = useId();

  const initialValues = {
    username: "",
    email: "",
    message: "",
    level: "good",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik 
    initialValues={initialValues} 
    onSubmit={handleSubmit}
    validationSchema={FeedbackSchema}>
      <Form className={css.form}>
        <label htmlFor={nameFieldId}>Username</label>
        <Field
          className={css.field}
          type="text"
          name="username"
          id={nameFieldId}
        />
        <ErrorMessage name="username" as="span" />
        <label htmlFor={emailFieldId}>Email</label>
        <Field
          className={css.field}
          type="email"
          name="email"
          id={emailFieldId}
        />
        <ErrorMessage name="email" as="span" className={css.error}/>
        <label htmlFor={msgFieldId}>Message</label>
        <Field
          className={css.field}
          as="textarea"
          name="message"
          id={msgFieldId}
        />
        <ErrorMessage name="message" as="span" className={css.error}/>
        <Field as="select" name="level" id={levelFieldId} className={css.select}>
          <option value="good">Good</option>
          <option value="neutral">Neutral</option>
          <option value="bad">Bad</option>
        </Field>
        <ErrorMessage name="level" as="span" className={css.error}/>
        <button className={css.btn} type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};
