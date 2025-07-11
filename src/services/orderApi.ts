import { BASE_URL } from "../constants";

export const placeOrder = async (data: {
  name: string;
  email: string;
  address: string;
}) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to place order");
  }

  return result;
};
