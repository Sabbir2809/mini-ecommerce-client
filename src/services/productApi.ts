/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "../constants";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await response.json();
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
