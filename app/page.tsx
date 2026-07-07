"use client";

import Image from "next/image";
import type { ChangeEvent, DragEvent, FormEvent, MouseEvent } from "react";
import { useRef, useState } from "react";

const contactEmail = "contact.printlylab@gmail.com";
const siteBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/printly.github.io" : "");

type IconName =
  | "shield"
  | "lock"
  | "bolt"
  | "cube"
  | "layers"
  | "spark"
  | "package"
  | "upload"
  | "mail"
  | "check";

const materials = ["PLA", "PETG", "ABS", "ASA", "TPU"];
const acceptedFileExtensions = [".stl", ".3mf", ".obj", ".step", ".stp", ".zip"];
const colors = [
  { name: "White", value: "#f8fafc" },
  { name: "Black", value: "#18181b" },
  { name: "Gray", value: "#94a3b8" },
  { name: "Blue", value: "#2F6BFF" },
  { name: "Red", value: "#ef4444" },
  { name: "Yellow", value: "#facc15" },
  { name: "Custom", value: "linear-gradient(135deg, #2F6BFF, #7A7A7A, #18181B)" }
];

const featureHighlights: Array<{
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    title: "High Quality",
    description: "Precision FDM prints",
    icon: "shield"
  },
  {
    title: "Secure",
    description: "Your files are safe",
    icon: "lock"
  },
  {
    title: "Fast Turnaround",
    description: "Reliable service",
    icon: "bolt"
  }
];

const services: Array<{
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    title: "FDM 3D Printing",
    description: "Strong, durable parts with practical layer control.",
    icon: "cube"
  },
  {
    title: "Material Options",
    description: "PLA, PETG, ABS, ASA, and TPU for different uses.",
    icon: "layers"
  },
  {
    title: "Color Choices",
    description: "Pick standard colors or describe a custom filament.",
    icon: "spark"
  },
  {
    title: "Pickup & Shipping",
    description: "Local pickup or shipping after your quote is approved.",
    icon: "package"
  }
];

const steps: Array<{
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    title: "Upload",
    description: "Send STL, 3MF, OBJ, STEP, or ZIP files.",
    icon: "upload"
  },
  {
    title: "Quote",
    description: "We review your files and send a clear quote.",
    icon: "mail"
  },
  {
    title: "Print",
    description: "Once approved, we produce your FDM order.",
    icon: "check"
  },
  {
    title: "Deliver",
    description: "Pick up locally or choose shipping when ready.",
    icon: "package"
  }
];

function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}

async function copyTextToClipboard(text: string) {
  if (!navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function isAcceptedModelFile(fileName: string) {
  const normalizedFileName = fileName.toLowerCase();

  return acceptedFileExtensions.some((extension) =>
    normalizedFileName.endsWith(extension)
  );
}

function Icon({ name, className = "size-7" }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 5 3.4 8.4 7 10 3.6-1.6 7-5 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-5" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect width="14" height="10" x="5" y="11" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z" />
          <path d="M12 11 4.4 6.7" />
          <path d="m12 11 7.6-4.3" />
          <path d="M12 11v9" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 8 4-8 4-8-4 8-4Z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 17 8 4 8-4" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4" />
          <path d="M12 17v4" />
          <path d="M3 12h4" />
          <path d="M17 12h4" />
          <path d="m6 6 2.4 2.4" />
          <path d="m15.6 15.6 2.4 2.4" />
          <path d="m18 6-2.4 2.4" />
          <path d="m8.4 15.6-2.4 2.4" />
        </svg>
      );
    case "package":
      return (
        <svg {...common}>
          <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z" />
          <path d="M4.4 6.7 12 11l7.6-4.3" />
          <path d="M12 11v9" />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M5 20h14" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect width="18" height="14" x="3" y="5" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    default:
      return null;
  }
}

function buildMailto(form: HTMLFormElement, fileNames: string[]) {
  const data = new FormData(form);
  const subject = "Printly FDM Quote Request";
  const color =
    data.get("color") === "Custom"
      ? `Custom - ${data.get("customColor") ?? ""}`
      : data.get("color") ?? "";
  const delivery = data.get("delivery") ?? "";
  const shippingAddressLines =
    delivery === "Shipping"
      ? [
          "",
          "Shipping Address:",
          `Street: ${data.get("shippingStreet") ?? ""}`,
          `Apt / Suite: ${data.get("shippingUnit") ?? ""}`,
          `City: ${data.get("shippingCity") ?? ""}`,
          `State: ${data.get("shippingState") ?? ""}`,
          `ZIP Code: ${data.get("shippingZip") ?? ""}`
        ]
      : [];
  const body = [
    "Hi Printly,",
    "",
    "I would like a quote for an FDM 3D printing project.",
    "",
    `Name: ${data.get("name") ?? ""}`,
    `Email / Phone: ${data.get("contact") ?? ""}`,
    "Technology: FDM",
    `Material: ${data.get("material") ?? ""}`,
    `Color: ${color}`,
    `Quantity: ${data.get("quantity") ?? ""}`,
    `Size / Requirement: ${data.get("size") ?? ""}`,
    `Delivery Method: ${delivery}`,
    ...shippingAddressLines,
    `Selected Files: ${
      fileNames.length > 0 ? fileNames.join(", ") : "I will attach them manually"
    }`,
    "",
    "Notes:",
    `${data.get("notes") ?? ""}`,
    "",
    "Please attach all model files before sending this email."
  ].join("\n");

  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Home() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [emailNotice, setEmailNotice] = useState("");
  const [quoteNotice, setQuoteNotice] = useState("");
  const [quoteMailto, setQuoteMailto] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addFileNames(nextFileNames: string[]) {
    const acceptedFileNames = nextFileNames.filter(isAcceptedModelFile);

    if (acceptedFileNames.length === 0) {
      return;
    }

    setFileNames((currentFileNames) => [
      ...new Set([...currentFileNames, ...acceptedFileNames])
    ]);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFileNames = Array.from(event.target.files ?? []).map((file) => file.name);

    addFileNames(nextFileNames);
    event.target.value = "";
  }

  function handleFileDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    addFileNames(Array.from(event.dataTransfer.files).map((file) => file.name));
  }

  function handleFileDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function removeSelectedFile(fileName: string) {
    setFileNames((currentFileNames) =>
      currentFileNames.filter((currentFileName) => currentFileName !== fileName)
    );
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleEmailClick(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
    setEmailNotice("Opening your mail app. Email copied if your browser allows it.");

    void copyTextToClipboard(contactEmail).then((copied) => {
      setEmailNotice(
        copied
          ? "Email copied. If nothing opened, paste it into your email app."
          : "If nothing opened, copy this address into your email app."
      );
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setQuoteMailto("");
      setQuoteNotice("Please complete the required fields first, then submit again.");
      form.reportValidity();
      return;
    }

    const mailto = buildMailto(form, fileNames);

    setQuoteMailto(mailto);
    setQuoteNotice(
      "Opening your email draft. If nothing opens, your browser needs a default mail app. Attach your model files before sending."
    );
    void copyTextToClipboard(contactEmail);
    window.location.href = mailto;
  }

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-white text-[#18181B]">
      <header className="container-page flex py-8">
        <Image
          src={assetPath("/images/printly-logo-transparent.png")}
          alt="Printly"
          width={1242}
          height={388}
          priority
          sizes="288px"
          className="h-auto w-56 object-contain sm:w-64 lg:w-72"
        />
      </header>

      <section className="container-page grid gap-12 pb-16 pt-0 lg:grid-cols-[0.45fr_0.55fr] lg:items-start lg:pb-24 lg:pt-0">
        <div>
          <p className="text-[13px] font-extrabold uppercase text-[#2F6BFF]">
            FDM 3D Printing
          </p>
          <h1 className="mt-5 max-w-[28rem] text-3xl font-extrabold leading-[1.08] text-[#18181B] sm:text-4xl">
            Custom FDM
            <br />
            Printing.
            <br />
            <span className="text-[#2F6BFF]">Made Simple.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-[1.6] text-[#555555] sm:text-lg">
            Upload your model, choose your options, and we will take care of the
            rest with a clear quote before printing.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#quote"
              className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#2F6BFF] px-7 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 hover:bg-[#1F5AF6]"
            >
              <Icon name="upload" className="size-5" />
              Upload Your Model
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[40rem] lg:ml-auto">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={assetPath("/images/fdm-studio-hero.png")}
              alt="FDM 3D printing studio with a desktop printer producing a blue part"
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1024px) 52vw, 92vw"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="grid max-w-4xl gap-8 md:grid-cols-3">
          {featureHighlights.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 md:border-r md:border-[#ECEFF5] md:pr-8 last:md:border-r-0"
            >
              <div className="grid size-12 shrink-0 place-items-center text-[#2F6BFF]">
                <Icon name={feature.icon} className="size-8" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#18181B]">
                  {feature.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-[#555555]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F8FAFD] py-24 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[13px] font-extrabold uppercase text-[#2F6BFF]">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#18181B] sm:text-4xl">
              What We Offer
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-[#ECEFF5] bg-white p-8 text-center shadow-soft transition hover:-translate-y-1 hover:border-[#2F6BFF] hover:shadow-[0_10px_30px_rgba(47,107,255,0.10)]"
              >
                <div className="mx-auto grid size-14 place-items-center text-[#2F6BFF]">
                  <Icon name={service.icon} className="size-10" />
                </div>
                <h3 className="mt-6 text-base font-extrabold text-[#18181B]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#555555]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="container-page py-24 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-extrabold uppercase text-[#2F6BFF]">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#18181B] sm:text-4xl">
            Four Simple Steps
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {index < steps.length - 1 ? (
                <div className="absolute left-[calc(50%+3rem)] top-10 hidden h-px w-[calc(100%-6rem)] border-t border-dashed border-[#ECEFF5] md:block" />
              ) : null}
              <div className="relative z-10 mx-auto grid size-20 place-items-center rounded-full bg-[#EAF2FF] text-[#2F6BFF]">
                <span className="absolute -top-2 right-1 grid size-6 place-items-center rounded-full bg-[#2F6BFF] text-xs font-extrabold text-white">
                  {index + 1}
                </span>
                <Icon name={step.icon} className="size-8" />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-[#18181B]">
                {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-44 text-sm leading-6 text-[#555555]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="quote" className="container-page pb-10 pt-4 sm:pb-12">
        <div className="overflow-hidden rounded-lg border border-[#ECEFF5] bg-white shadow-soft">
          <div className="grid lg:grid-cols-[0.31fr_0.69fr]">
            <aside className="bg-[#F8FAFD] p-8 sm:p-10">
              <h2 className="text-3xl font-extrabold leading-tight text-[#18181B] sm:text-4xl">
                Get Started
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Fill out the form and upload your model. We will get back to you
                with a clear FDM quote.
              </p>
              <div className="mt-9 grid gap-3">
                {["Quote first", "Pickup or shipping"].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-[#ECEFF5] bg-white px-4 py-3 text-sm font-extrabold text-[#18181B]"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-2 text-sm">
                <p className="font-semibold text-[#7A7A7A]">
                  Need help before submitting?
                </p>
                <a
                  className="focus-ring inline-flex rounded-lg font-extrabold text-[#2F6BFF] hover:text-[#1F5AF6]"
                  href={`mailto:${contactEmail}`}
                  onClick={handleEmailClick}
                >
                  {contactEmail}
                </a>
                {emailNotice ? (
                  <p className="text-xs font-semibold leading-5 text-[#555555]" aria-live="polite">
                    {emailNotice}
                  </p>
                ) : null}
              </div>
            </aside>

            <form
              className="grid gap-5 p-6 sm:p-8 lg:grid-cols-2"
              noValidate
              onSubmit={handleSubmit}
            >
              <label className="grid gap-2">
                <span className="form-label">Your Name</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="form-field"
                  placeholder="Enter your name"
                />
              </label>

              <label className="grid gap-2">
                <span className="form-label">Email / Phone</span>
                <input
                  required
                  name="contact"
                  autoComplete="email"
                  className="form-field"
                  placeholder="Enter your email or phone"
                />
              </label>

              <div className="grid gap-2">
                <span className="form-label">Upload 3D Models</span>
                <div
                  className="rounded-lg border border-dashed border-[#2F6BFF]/60 bg-[#EAF2FF] px-5 py-5 transition hover:border-[#2F6BFF]"
                  onDrop={handleFileDrop}
                  onDragOver={handleFileDragOver}
                >
                  <input
                    ref={fileInputRef}
                    name="files"
                    type="file"
                    multiple
                    accept=".stl,.3mf,.obj,.step,.stp,.zip"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className="focus-ring flex w-full flex-col items-center justify-center rounded-lg py-3 text-center transition hover:bg-white/70"
                    onClick={openFilePicker}
                  >
                    <span className="grid size-9 place-items-center text-[#2F6BFF]">
                      <Icon name="upload" className="size-6" />
                    </span>
                    <span className="mt-1 block text-sm font-extrabold text-[#18181B]">
                      {fileNames.length > 0
                        ? `${fileNames.length} file${fileNames.length === 1 ? "" : "s"} selected`
                        : "Click to upload or drag and drop"}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-[#7A7A7A]">
                      STL, 3MF, OBJ, STEP, ZIP up to 100MB
                    </span>
                  </button>
                  {fileNames.length > 0 ? (
                    <div className="mt-4 grid gap-2" aria-live="polite">
                      {fileNames.map((fileName) => (
                        <div
                          key={fileName}
                          className="flex flex-col gap-2 rounded-lg border border-[#ECEFF5] bg-white px-3 py-3 text-left sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="break-all text-sm font-bold text-[#18181B]">
                            {fileName}
                          </span>
                          <button
                            type="button"
                            className="focus-ring rounded-lg px-3 py-2 text-xs font-extrabold text-[#7A7A7A] transition hover:bg-[#EAF2FF] hover:text-[#2F6BFF]"
                            onClick={() => removeSelectedFile(fileName)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="grid content-start gap-5">
                <label className="grid gap-2">
                  <span className="form-label">Quantity</span>
                  <input
                    required
                    min={1}
                    name="quantity"
                    type="number"
                    defaultValue={1}
                    className="form-field"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="form-label">Size Requirement</span>
                  <input
                    name="size"
                    className="form-field"
                    placeholder="e.g. 10cm height"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="form-label">Material</span>
                <select required name="material" className="form-field" defaultValue="">
                  <option value="" disabled>
                    Select material
                  </option>
                  {materials.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="form-label">Color</span>
                <select
                  required
                  name="color"
                  className="form-field"
                  value={selectedColor}
                  onChange={(event) => setSelectedColor(event.target.value)}
                >
                  <option value="" disabled>
                    Select color
                  </option>
                  {colors.map((color) => (
                    <option key={color.name} value={color.name}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </label>

              {selectedColor === "Custom" ? (
                <label className="grid gap-2 lg:col-span-2">
                  <span className="form-label">Custom Color</span>
                  <input
                    required
                    name="customColor"
                    className="form-field"
                    placeholder="Describe the color, HEX, or filament brand if you know it"
                  />
                </label>
              ) : null}

              <div className="lg:col-span-2">
                <p className="form-label">Available Colors</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <span
                      key={color.name}
                      className="inline-flex items-center gap-2 rounded-full border border-[#ECEFF5] bg-white px-3 py-2 text-xs font-bold text-[#555555]"
                    >
                      <span
                        className="size-4 rounded-full border border-[#ECEFF5]"
                        style={{ background: color.value }}
                      />
                      {color.name}
                    </span>
                  ))}
                </div>
              </div>

              <label className="grid gap-2 lg:col-span-2">
                <span className="form-label">Delivery Method</span>
                <select
                  required
                  name="delivery"
                  className="form-field"
                  value={selectedDelivery}
                  onChange={(event) => setSelectedDelivery(event.target.value)}
                >
                  <option value="" disabled>
                    Select pickup or shipping
                  </option>
                  <option value="Pickup">Pickup</option>
                  <option value="Shipping">Shipping</option>
                </select>
              </label>

              {selectedDelivery === "Shipping" ? (
                <div className="grid gap-4 rounded-lg border border-[#ECEFF5] bg-[#EAF2FF] p-4 lg:col-span-2 lg:grid-cols-2">
                  <p className="form-label lg:col-span-2">Shipping Address</p>
                  <label className="grid gap-2 lg:col-span-2">
                    <span className="text-xs font-extrabold uppercase text-[#7A7A7A]">
                      Street Address
                    </span>
                    <input
                      required
                      name="shippingStreet"
                      autoComplete="street-address"
                      className="form-field"
                      placeholder="123 Main St"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-extrabold uppercase text-[#7A7A7A]">
                      Apt / Suite
                    </span>
                    <input
                      name="shippingUnit"
                      autoComplete="address-line2"
                      className="form-field"
                      placeholder="Apt, suite, unit"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-extrabold uppercase text-[#7A7A7A]">
                      City
                    </span>
                    <input
                      required
                      name="shippingCity"
                      autoComplete="address-level2"
                      className="form-field"
                      placeholder="City"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-extrabold uppercase text-[#7A7A7A]">
                      State
                    </span>
                    <input
                      required
                      name="shippingState"
                      autoComplete="address-level1"
                      className="form-field"
                      placeholder="CA"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-extrabold uppercase text-[#7A7A7A]">
                      ZIP Code
                    </span>
                    <input
                      required
                      name="shippingZip"
                      autoComplete="postal-code"
                      className="form-field"
                      placeholder="90001"
                    />
                  </label>
                </div>
              ) : null}

              <label className="grid gap-2 lg:col-span-2">
                <span className="form-label">Additional Notes</span>
                <textarea
                  name="notes"
                  rows={3}
                  className="form-field resize-none py-3"
                  placeholder="Anything else we should know?"
                />
              </label>

              <button
                type="submit"
                className="focus-ring min-h-[52px] rounded-xl bg-[#2F6BFF] px-6 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 hover:bg-[#1F5AF6] lg:col-span-2"
              >
                Submit Quote Request
              </button>
              {quoteNotice ? (
                <div
                  className="rounded-lg border border-[#ECEFF5] bg-[#F8FAFD] px-4 py-3 text-sm font-semibold leading-6 text-[#555555] lg:col-span-2"
                  aria-live="polite"
                >
                  <p>{quoteNotice}</p>
                  {quoteMailto ? (
                    <a
                      className="focus-ring mt-2 inline-flex rounded-lg font-extrabold text-[#2F6BFF] hover:text-[#1F5AF6]"
                      href={quoteMailto}
                    >
                      Open email draft again
                    </a>
                  ) : null}
                </div>
              ) : null}
            </form>
          </div>
        </div>
        <footer className="flex flex-col gap-3 py-8 text-sm font-semibold text-[#7A7A7A] sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright {new Date().getFullYear()} Printly. All rights reserved.</span>
          <a
            className="focus-ring rounded-lg px-3 py-2 hover:bg-[#EAF2FF] hover:text-[#2F6BFF]"
            href={`mailto:${contactEmail}`}
            onClick={handleEmailClick}
          >
            {contactEmail}
          </a>
        </footer>
      </section>
    </main>
  );
}
