"use client";

import { useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CONTACT } from "@/data/site";
import * as contactForm from "@/lib/contact-form";
import Button from "./ui/Button";
import ModalShell from "./ui/ModalShell";
import { useDialog } from "./ui/useDialog";

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  message: "",
};

const requiredMessages = {
  firstName: "Podaj imię.",
  lastName: "Podaj nazwisko.",
  phone: "Podaj numer telefonu.",
  message: "Napisz, w czym możemy pomóc.",
};

function phoneDigitCount(phone) {
  const normalized = phone
    .trim()
    .replace(/^\+/, "")
    .replace(/[ .\-()]/g, "");

  return (normalized.match(/\d/g) ?? []).length;
}

function validateField(name, values) {
  const value = values[name].trim();

  if (!value) {
    return requiredMessages[name];
  }

  if (name === "phone") {
    const digits = phoneDigitCount(value);

    if (digits < 9 || digits > 15) {
      return "Numer telefonu wygląda na niepoprawny.";
    }
  }

  if (name === "message" && value.length < 10) {
    return "Wiadomość jest za krótka — dopisz kilka zdań.";
  }

  return "";
}

function validateForm(values) {
  return Object.keys(initialValues).reduce((errors, name) => {
    const message = validateField(name, values);

    if (message) {
      errors[name] = message;
    }

    return errors;
  }, {});
}

function fieldClassName(error) {
  return [
    "mt-2 w-full rounded-[12px] border-[1.5px] bg-white px-4 py-3 text-base text-ink transition-colors duration-[180ms] outline-none focus:border-ink",
    error ? "border-acc-ink" : "border-ink/16",
  ].join(" ");
}

export default function ContactModal({ onClose, returnFocusRef }) {
  const idPrefix = useId();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);
  const fieldRefs = {
    firstName: firstNameRef,
    lastName: lastNameRef,
    phone: phoneRef,
    message: messageRef,
  };
  const portalRoot = typeof document === "undefined" ? null : document.body;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(false);

  const { dialogRef, requestClose, visible } = useDialog({
    onClosed: onClose,
    returnFocusRef,
    initialFocusRef: firstNameRef,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (errors[name]) {
      const message = validateField(name, nextValues);
      setErrors((current) => {
        const nextErrors = { ...current };

        if (message) {
          nextErrors[name] = message;
        } else {
          delete nextErrors[name];
        }

        return nextErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(values);
    const firstInvalid = Object.keys(initialValues).find(
      (name) => nextErrors[name],
    );
    setErrors(nextErrors);

    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
    };

    setPending(true);
    setResult(false);

    try {
      await contactForm.sendContactMessage(payload);
    } catch {
      setResult(true);
    } finally {
      setPending(false);
    }
  };

  const fieldData = [
    {
      label: "Imię",
      name: "firstName",
      type: "text",
      autoComplete: "given-name",
      maxLength: 100,
      ref: firstNameRef,
    },
    {
      label: "Nazwisko",
      name: "lastName",
      type: "text",
      autoComplete: "family-name",
      maxLength: 100,
      ref: lastNameRef,
    },
    {
      label: "Numer telefonu",
      name: "phone",
      type: "tel",
      autoComplete: "tel",
      inputMode: "tel",
      // Telefon zajmuje całą szerokość pod dwukolumnowym imieniem i nazwiskiem.
      fullWidth: true,
      ref: phoneRef,
    },
  ];

  const modal = (
    <ModalShell
      ariaLabel="Umów niezobowiązujące spotkanie"
      dialogRef={dialogRef}
      requestClose={requestClose}
      visible={visible}
    >
      <p className="mb-5 pr-12 text-ink/62">
        Zostaw kontakt, a odezwiemy się w ciągu jednego dnia roboczego.
      </p>

      <form noValidate onSubmit={handleSubmit}>
        <fieldset className="space-y-4 disabled:opacity-70" disabled={pending}>
          <div className="grid gap-4 min-[560px]:grid-cols-2">
            {fieldData.map((field) => {
              const error = errors[field.name];
              const fieldId = `${idPrefix}-${field.name}`;
              const errorId = `${fieldId}-error`;

              return (
                <div
                  key={field.name}
                  className={field.fullWidth ? "min-[560px]:col-span-2" : undefined}
                >
                  <label
                    className="block text-[.92rem] font-bold"
                    htmlFor={fieldId}
                  >
                    {field.label}
                  </label>
                  <input
                    ref={field.ref}
                    id={fieldId}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    inputMode={field.inputMode}
                    required
                    maxLength={field.maxLength}
                    value={values[field.name]}
                    onChange={handleChange}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? errorId : undefined}
                    className={fieldClassName(error)}
                  />
                  {error ? (
                    <p
                      id={errorId}
                      className="mt-2 text-[.86rem] font-bold text-acc-ink"
                    >
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div>
            <label
              className="block text-[.92rem] font-bold"
              htmlFor={`${idPrefix}-message`}
            >
              Treść wiadomości
            </label>
            <textarea
              ref={messageRef}
              id={`${idPrefix}-message`}
              name="message"
              autoComplete="off"
              required
              rows={4}
              maxLength={2000}
              value={values.message}
              onChange={handleChange}
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={
                errors.message ? `${idPrefix}-message-error` : undefined
              }
              className={`${fieldClassName(errors.message)} resize-y`}
            />
            {errors.message ? (
              <p
                id={`${idPrefix}-message-error`}
                className="mt-2 text-[.86rem] font-bold text-acc-ink"
              >
                {errors.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" className="w-full justify-center">
            Wyślij wiadomość
          </Button>
        </fieldset>
      </form>

      <div role="status" aria-live="polite" className="text-ink empty:hidden">
        {result ? (
          <div className="mt-4 space-y-2">
            <p>Formularz nie jest jeszcze podłączony do wysyłki.</p>
            <p>
              Napisz na{" "}
              <a
                className="font-bold text-acc-ink"
                href={`mailto:${CONTACT.email}`}
              >
                {CONTACT.email}
              </a>{" "}
              lub zadzwoń{" "}
              <a
                className="font-bold text-acc-ink"
                href={`tel:${CONTACT.phoneHref}`}
              >
                {CONTACT.phoneLabel}
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>
    </ModalShell>
  );

  return portalRoot ? createPortal(modal, portalRoot) : null;
}
