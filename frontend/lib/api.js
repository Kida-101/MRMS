import axios from 'axios';

const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAdmin = async (id) => {
  const { data } = await axios.get(`${backend}/admin?id=${id}`);
  return data;
}