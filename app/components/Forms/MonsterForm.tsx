"use client";
import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useAlert } from "@/app/context/AlertContext";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface MonsterFormValues {
  name: string;
  img: string;
  type: string;
  description: string;
  abilities: string[];
  stats: {
    health: number;
    attack: number;
    defense: number;
    speed: number;
  };
  evolution: string;
}

const initialValues: MonsterFormValues = {
  name: "",
  img: "",
  type: "",
  description: "",
  abilities: [""],
  stats: {
    health: 0,
    attack: 0,
    defense: 0,
    speed: 0,
  },
  evolution: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  img: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  type: Yup.string().required("Type is required"),
  description: Yup.string().required("Description is required"),
  abilities: Yup.array()
    .of(Yup.string().required("Ability is required"))
    .min(1, "At least one ability is required"),
  stats: Yup.object({
    health: Yup.number()
      .min(0, "Health must be at least 0")
      .required("Health is required"),
    attack: Yup.number()
      .min(0, "Attack must be at least 0")
      .required("Attack is required"),
    defense: Yup.number()
      .min(0, "Defense must be at least 0")
      .required("Defense is required"),
    speed: Yup.number()
      .min(0, "Speed must be at least 0")
      .required("Speed is required"),
  }).required(),
  evolution: Yup.string().required("Evolution is required"),
});

const MonsterForm: React.FC = () => {
  const { showAlert } = useAlert();

  const handleSubmit = async (values: MonsterFormValues) => {
    console.log(values);
    try {
      const response: { data: { message: string }; status: number } =
        await axios.post(
          `${baseURL}/api/addMonster`,
          { values },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      console.log(response, "Response from api");

      if (response.status === 200) {
        showAlert(response.data.message, "success");
      }
    } catch (error: any) {
      console.log(error, "Error");
      showAlert(error.response.data.message, "danger");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form className="space-y-4">
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "img", label: "Image URL", type: "text" },
            { name: "type", label: "Type", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "evolution", label: "Evolution", type: "text" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label htmlFor={name}>{label}</label>
              <Field
                name={name}
                // as={type}
                className={`flex h-10 w-full rounded-md border ${
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-[#e4cfcf]"
                } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                  errors.name && touched.name
                    ? "focus:ring-red-500"
                    : "focus:ring-gray-400"
                } focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
              />
              <ErrorMessage
                name={name}
                component="div"
                className="text-red-500"
              />
            </div>
          ))}

          <div>
            <label htmlFor="abilities">Abilities</label>
            <FieldArray name="abilities">
              {({ push, remove, form }) => (
                <div>
                  {form.values.abilities.map((_: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 my-5"
                    >
                      <Field
                        name={`abilities.${index}`}
                        className={`flex h-10 w-full rounded-md border ${
                          errors.abilities &&
                          touched.abilities &&
                          errors.abilities[index]
                            ? // touched.abilities.at(index)
                              "border-red-500"
                            : "border-[#e4cfcf]"
                        } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                          errors.abilities &&
                          touched.abilities &&
                          errors.abilities[index]
                            ? // touched.abilities[index]
                              "focus:ring-red-500"
                            : "focus:ring-gray-400"
                        } focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-2"
                      >
                        <IoClose size={20} />
                      </button>
                      <ErrorMessage
                        name={`abilities.${index}`}
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push("")}
                    className="mt-2"
                  >
                    Add Ability
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          <div>
            <h4>Stats</h4>
            {[
              { name: "stats.health", label: "Health" },
              { name: "stats.attack", label: "Attack" },
              { name: "stats.defense", label: "Defense" },
              { name: "stats.speed", label: "Speed" },
            ].map(({ name, label }) => (
              <div key={name}>
                <label htmlFor={name}>{label}</label>
                <Field
                  name={name}
                  type="number"
                  className={`flex h-10 w-full rounded-md border ${
                    errors.stats && touched.stats
                      ? // errors.stats[name.split(".")[1]] &&
                        // touched.stats[name.split(".")[1]]
                        "border-red-500"
                      : "border-[#e4cfcf]"
                  } bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                    errors.stats && touched.stats
                      ? // errors.stats[name.split(".")[1]] &&
                        // touched.stats[name.split(".")[1]]
                        "focus:ring-red-500"
                      : "focus:ring-gray-400"
                  } focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                />
                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-red-500"
                />
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MonsterForm;
