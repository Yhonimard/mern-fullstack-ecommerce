import { getInstance, routes } from "./axiosInstance";

const getProduct = async () => {
  try {
    const response = await getInstance().get(routes.getProducts())
    const {
      data: { result },
    } = response
    return result
  } catch (err) {
    return err;
  }
};

const getCategories = async () => {
  try {
    const response = await getInstance().get(routes.getCategories())
    const {
      data: { result },
    } = response
    return result
  } catch (err) {
    return err
  }
}

export { getProduct, getCategories }
