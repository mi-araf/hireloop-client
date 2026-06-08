"use client";

import { useMemo, useState } from "react";
import {
    Button,
    FieldError,
    Fieldset,
    Form,
    Input,
    InputGroup,
    Label,
    ListBox,
    Select,
    TextArea,
    TextField,
} from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";
import {
    FiBriefcase,
    FiEdit3,
    FiGlobe,
    FiImage,
    FiMapPin,
    FiPlus,
    FiUploadCloud,
    FiUsers,
    FiX,
} from "react-icons/fi";
import { createCompany } from "@/lib/actions/companies";

const textInputClass =
    "h-12 w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 hover:border-zinc-700 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60";

const textAreaClass =
    "min-h-28 w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 hover:border-zinc-700 focus:border-zinc-500";

const selectBoxClass = "flex w-full flex-col gap-1";

const triggerClasses =
    "h-12 w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 text-sm text-zinc-100 outline-none transition hover:border-zinc-700 data-[focus-visible=true]:border-zinc-500";

const popoverClasses =
    "rounded-xl border border-zinc-800 bg-zinc-950 p-1 shadow-2xl shadow-black/40";

const listItemClasses =
    "cursor-pointer rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none transition hover:bg-zinc-900 data-[focused=true]:bg-zinc-900 data-[selected=true]:bg-white data-[selected=true]:text-black";

const detailCardClass =
    "rounded-xl border border-zinc-800 bg-zinc-950/60 p-4";

const statusStyles = {
    pending: "border-amber-500/25 bg-amber-500/10 text-amber-300",
    approved: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
    rejected: "border-rose-500/25 bg-rose-500/10 text-rose-300",
};

const industries = [
    { id: "technology", label: "Technology" },
    { id: "finance", label: "Finance" },
    { id: "healthcare", label: "Healthcare" },
    { id: "education", label: "Education" },
    { id: "marketing", label: "Marketing" },
    { id: "retail", label: "Retail" },
    { id: "other", label: "Other" },
];

const employeeRanges = [
    { id: "1-10", label: "1-10 employees" },
    { id: "11-50", label: "11-50 employees" },
    { id: "51-200", label: "51-200 employees" },
    { id: "201-500", label: "201-500 employees" },
    { id: "501-1000", label: "501-1000 employees" },
    { id: "1000+", label: "1000+ employees" },
];

function getLabel(options, id) {
    return options.find((item) => item.id === id)?.label || id || "Not provided";
}

function normalizeWebsite(value) {
    const cleanValue = String(value || "").trim();

    if (!cleanValue) return "";

    return cleanValue
        .replace(/^https?:\/\//i, "")
        .replace(/\/+$/, "");
}

function buildWebsiteUrl(value) {
    const website = normalizeWebsite(value);

    return website ? `https://${website}` : "";
}

export default function CompanyProfile({ initialCompany = null, recruiter }) {
    const [company, setCompany] = useState(initialCompany);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [logoPreview, setLogoPreview] = useState(initialCompany?.logoUrl || "");

    const hasCompany = Boolean(company);

    const formDefaults = useMemo(() => {
        return {
            name: company?.name || "",
            websiteUrl: normalizeWebsite(company?.websiteUrl || ""),
            logoUrl: company?.logoUrl || "",
            industry: company?.industry || "technology",
            location: company?.location || "",
            employeeCount: company?.employeeCount || "1-10",
            description: company?.description || "",
            status: company?.status || "pending",
            recruiterId: recruiter.id
        };
    }, [company, recruiter]);

    const startRegister = () => {
        setCompany(null);
        setLogoPreview("");
        setErrors({});
        setIsEditing(true);
    };

    const startEdit = () => {
        setLogoPreview(company?.logoUrl || "");
        setErrors({});
        setIsEditing(true);
    };

    const cancelForm = () => {
        setErrors({});
        setLogoPreview(company?.logoUrl || "");
        setIsEditing(false);
    };

    const handleLogoChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Please upload a PNG, JPG, or JPEG image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Logo must be less than 5MB.");
            return;
        }

        setLogoPreview(URL.createObjectURL(file));
    };

    const validateCompany = (payload) => {
        const nextErrors = {};

        if (!payload.name) {
            nextErrors.name = "Company name is required.";
        }

        if (!payload.websiteUrl) {
            nextErrors.websiteUrl = "Website URL is required.";
        } else if (!/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(normalizeWebsite(payload.websiteUrl))) {
            nextErrors.websiteUrl = "Enter a valid website, e.g. company.com.";
        }

        if (!payload.industry) {
            nextErrors.industry = "Industry is required.";
        }

        if (!payload.location) {
            nextErrors.location = "Location is required.";
        }

        if (!payload.employeeCount) {
            nextErrors.employeeCount = "Employee count is required.";
        }

        if (!payload.description || payload.description.length < 20) {
            nextErrors.description = "Description must be at least 20 characters.";
        }

        return nextErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const payload = {
            name: String(formData.get("name") || "").trim(),
            websiteUrl: buildWebsiteUrl(formData.get("websiteUrl")),
            logoUrl: logoPreview || company?.logoUrl || "",
            industry: String(formData.get("industry") || "").trim(),
            location: String(formData.get("location") || "").trim(),
            employeeCount: String(formData.get("employeeCount") || "").trim(),
            description: String(formData.get("description") || "").trim(),
            status: company?.status || "pending",
        };

        const validationErrors = validateCompany(payload);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fix the highlighted fields.");
            return;
        }
        
        console.log("Company desc:", payload);

        const companyLoad = await createCompany(payload);

        // if (companyLoad.insertedId) {
        //     toast.success("Company registered successfully.");
        // }

        setCompany(payload);
        setIsEditing(false);
        setErrors({});

        toast.success(hasCompany ? "Company information updated." : "Company registered successfully.");
    };

    if (!hasCompany && !isEditing) {
        return (
            <section className="min-h-screen bg-[#101010] px-4 py-10 text-zinc-100">
                <Toaster position="top-right" />

                <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-900 bg-[#141414] p-8 shadow-2xl shadow-black/30">
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 px-6 py-16 text-center">
                        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
                            <FiBriefcase className="text-2xl text-zinc-300" />
                        </div>

                        <h2 className="text-2xl font-semibold text-white">
                            No company registered
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
                            Register your company profile so you can manage company details,
                            logo, industry, location, and hiring information from one place.
                        </p>

                        <Button
                            type="button"
                            onPress={startRegister}
                            className="mt-7 h-11 rounded-lg bg-white px-6 font-semibold text-black transition-colors hover:bg-zinc-200"
                        >
                            <FiPlus />
                            Register Company
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    if (hasCompany && !isEditing) {
        return (
            <section className="min-h-screen bg-[#101010] px-4 py-10 text-zinc-100">
                <Toaster position="top-right" />

                <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-900 bg-[#141414] p-6 shadow-2xl shadow-black/30">
                    <div className="mb-6 flex flex-col gap-4 border-b border-zinc-900 pb-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl font-semibold text-white">
                                    Company Profile
                                </h2>

                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusStyles[company.status] || statusStyles.pending
                                        }`}
                                >
                                    {company.status}
                                </span>
                            </div>

                            <p className="text-sm text-zinc-500">
                                Company status is reviewed and updated by Admin.
                            </p>
                        </div>

                        <Button
                            type="button"
                            onPress={startEdit}
                            className="h-11 rounded-lg border border-zinc-800 bg-zinc-950 px-5 font-medium text-zinc-200 transition-colors hover:bg-zinc-900"
                        >
                            <FiEdit3 />
                            Edit
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-[220px_1fr]">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                                {company.logoUrl ? (
                                    <img
                                        src={company.logoUrl}
                                        alt={`${company.name} logo`}
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    <FiImage className="text-4xl text-zinc-600" />
                                )}
                            </div>

                            <h3 className="mt-4 text-center text-lg font-semibold text-white">
                                {company.name}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <DetailItem
                                icon={<FiGlobe />}
                                label="Website URL"
                                value={
                                    <a
                                        href={company.websiteUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-zinc-100 underline decoration-zinc-700 underline-offset-4 hover:text-white"
                                    >
                                        {company.websiteUrl}
                                    </a>
                                }
                            />

                            <DetailItem
                                icon={<FiBriefcase />}
                                label="Industry"
                                value={getLabel(industries, company.industry)}
                            />

                            <DetailItem
                                icon={<FiMapPin />}
                                label="Location"
                                value={company.location}
                            />

                            <DetailItem
                                icon={<FiUsers />}
                                label="Employee Count"
                                value={getLabel(employeeRanges, company.employeeCount)}
                            />

                            <div className="md:col-span-2">
                                <DetailItem
                                    label="Brief Description"
                                    value={company.description}
                                    large
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#101010] px-4 py-10 text-zinc-100">
            <Toaster position="top-right" />

            <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-900 bg-[#141414] p-6 shadow-2xl shadow-black/30">
                <div className="mb-8 flex flex-col gap-2 border-b border-zinc-900 pb-5">
                    <h2 className="text-2xl font-semibold text-white">
                        {hasCompany ? "Update Company Information" : "Register Company"}
                    </h2>

                    <p className="text-sm text-zinc-500">
                        Add your company details. Approval status will be handled by Admin.
                    </p>
                </div>

                <Form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                    validationErrors={errors}
                    validationBehavior="aria"
                >
                    <Fieldset className="space-y-6 w-full">
                        <legend className="w-full border-b border-zinc-900 pb-2 text-lg font-medium text-zinc-300">
                            Company Information
                        </legend>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <TextField
                                name="name"
                                isInvalid={!!errors.name}
                                defaultValue={formDefaults.name}
                                className="flex w-full flex-col gap-1"
                            >
                                <Label className="text-sm font-medium text-zinc-400">
                                    Company Name
                                </Label>
                                <Input
                                    placeholder="e.g. Acme Corp"
                                    className={textInputClass}
                                />
                                {errors.name && (
                                    <FieldError className="mt-1 text-xs text-danger">
                                        {errors.name}
                                    </FieldError>
                                )}
                            </TextField>

                            <Select
                                name="industry"
                                className={selectBoxClass}
                                isInvalid={!!errors.industry}
                                defaultSelectedKeys={[formDefaults.industry]}
                                placeholder="Select industry"
                            >
                                <Label className="mb-1 block text-sm font-medium text-zinc-400">
                                    Industry / Category
                                </Label>

                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value className="text-white placeholder:text-zinc-600" />
                                    <Select.Indicator />
                                </Select.Trigger>

                                {errors.industry && (
                                    <span className="mt-1 text-xs text-danger">
                                        {errors.industry}
                                    </span>
                                )}

                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        {industries.map((industry) => (
                                            <ListBox.Item
                                                key={industry.id}
                                                id={industry.id}
                                                textValue={industry.label}
                                                className={listItemClasses}
                                            >
                                                {industry.label}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <TextField
                                name="websiteUrl"
                                isInvalid={!!errors.websiteUrl}
                                defaultValue={formDefaults.websiteUrl}
                                className="flex w-full flex-col gap-1"
                            >
                                <Label className="text-sm font-medium text-zinc-400">
                                    Website URL
                                </Label>

                                <InputGroup className="h-12 rounded-lg border border-zinc-800 bg-zinc-900/80 text-sm transition hover:border-zinc-700">
                                    <InputGroup.Prefix className="px-3 text-zinc-600">
                                        https://
                                    </InputGroup.Prefix>
                                    <InputGroup.Input
                                        placeholder="www.company.com"
                                        className="h-full flex-1 bg-transparent pr-4 text-zinc-100 outline-none placeholder:text-zinc-600"
                                    />
                                </InputGroup>

                                {errors.websiteUrl && (
                                    <FieldError className="mt-1 text-xs text-danger">
                                        {errors.websiteUrl}
                                    </FieldError>
                                )}
                            </TextField>

                            <TextField
                                name="location"
                                isInvalid={!!errors.location}
                                defaultValue={formDefaults.location}
                                className="flex w-full flex-col gap-1"
                            >
                                <Label className="text-sm font-medium text-zinc-400">
                                    Location
                                </Label>

                                <div className="relative flex items-center">
                                    <FiMapPin className="pointer-events-none absolute left-3 z-10 text-zinc-600" />
                                    <Input
                                        placeholder="City, Country"
                                        className={`${textInputClass} pl-10`}
                                    />
                                </div>

                                {errors.location && (
                                    <FieldError className="mt-1 text-xs text-danger">
                                        {errors.location}
                                    </FieldError>
                                )}
                            </TextField>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Select
                                name="employeeCount"
                                className={selectBoxClass}
                                isInvalid={!!errors.employeeCount}
                                defaultSelectedKeys={[formDefaults.employeeCount]}
                                placeholder="Select employee range"
                            >
                                <Label className="mb-1 block text-sm font-medium text-zinc-400">
                                    Employee Count Range
                                </Label>

                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                {errors.employeeCount && (
                                    <span className="mt-1 text-xs text-danger">
                                        {errors.employeeCount}
                                    </span>
                                )}

                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        {employeeRanges.map((range) => (
                                            <ListBox.Item
                                                key={range.id}
                                                id={range.id}
                                                textValue={range.label}
                                                className={listItemClasses}
                                            >
                                                {range.label}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <div className="flex flex-col gap-1">
                                <Label className="text-sm font-medium text-zinc-400">
                                    Company Logo
                                </Label>

                                <div className="flex items-center gap-4">
                                    <label
                                        htmlFor="companyLogo"
                                        className="group flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-700 bg-zinc-900/80 transition hover:border-zinc-500 hover:bg-zinc-900"
                                    >
                                        {logoPreview ? (
                                            <img
                                                src={logoPreview}
                                                alt="Company logo preview"
                                                className="size-full object-cover"
                                            />
                                        ) : (
                                            <FiUploadCloud className="text-xl text-zinc-500 group-hover:text-zinc-300" />
                                        )}

                                        <input
                                            id="companyLogo"
                                            name="logo"
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg"
                                            onChange={handleLogoChange}
                                            className="hidden"
                                        />
                                    </label>

                                    <div>
                                        <p className="text-sm font-medium text-zinc-300">
                                            Upload image
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-600">
                                            PNG, JPG up to 5MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fieldset>

                    <Fieldset className="space-y-6 w-full">
                        <legend className="w-full border-b border-zinc-900 pb-2 text-lg font-medium text-zinc-300">
                            Company Description
                        </legend>

                        <TextField
                            name="description"
                            isInvalid={!!errors.description}
                            defaultValue={formDefaults.description}
                            className="flex w-full flex-col gap-1"
                        >
                            <Label className="text-sm font-medium text-zinc-400">
                                Brief Description
                            </Label>

                            <TextArea
                                placeholder="Tell us about your company's mission and culture..."
                                rows={5}
                                className={textAreaClass}
                            />

                            {errors.description && (
                                <FieldError className="mt-1 text-xs text-danger">
                                    {errors.description}
                                </FieldError>
                            )}
                        </TextField>
                    </Fieldset>

                    <div className="flex w-full justify-end gap-3 border-t border-zinc-800 pt-4">
                        <Button
                            type="button"
                            onPress={cancelForm}
                            variant="bordered"
                            className="h-11 rounded-lg border-zinc-800 px-6 font-medium text-zinc-300 hover:bg-zinc-900"
                        >
                            <FiX />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="h-11 rounded-lg bg-white px-6 font-semibold text-black transition-colors hover:bg-zinc-200"
                        >
                            {hasCompany ? "Update Company" : "Register Company"}
                        </Button>
                    </div>
                </Form>
            </div>
        </section>
    );
}

function DetailItem({ icon, label, value, large = false }) {
    return (
        <div className={`${detailCardClass} ${large ? "min-h-32" : ""}`}>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-500">
                {icon && <span className="text-zinc-600">{icon}</span>}
                <span>{label}</span>
            </div>

            <div className="text-sm leading-6 text-zinc-100">
                {value || "Not provided"}
            </div>
        </div>
    );
}