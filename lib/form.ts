export const FORM_BASE =
  "https://docs.google.com/forms/d/e/1FAIpQLSdPIAvFsaQeKHwAJWAC33xvvqW3mtoMaGRhfGeXf8MTsUpjvg/viewform";

export const FORM_FIELDS = {
  area: "entry.1122349319",
  category: "entry.1393374049",
};

export function buildFormUrl({
  area,
  category,
}: {
  area?: string;
  category?: string;
}) {
  const params = new URLSearchParams();

  if (area) params.append(FORM_FIELDS.area, area);
  if (category) params.append(FORM_FIELDS.category, category);

  return `${FORM_BASE}?${params.toString()}`;
}