import axios from "axios";

export async function createTenant(tenantData) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tenants`,
    tenantData,
    { withCredentials: true }
  );
  return response.data;
}
