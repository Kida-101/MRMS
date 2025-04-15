export async function createTenant(tenantData) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tenants`,
    tenantData
  );
  return response.data;
}
