import axios from "axios";

export async function getTenants() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tenants`
  );
  return response.data.data;
}

export async function createTenant(tenantData) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tenants`,
    tenantData,
    { withCredentials: true }
  );
  return response.data;
}

export async function getTenant(tenantId) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tenants/${tenantId}`
  );
  return response.data.data;
}
