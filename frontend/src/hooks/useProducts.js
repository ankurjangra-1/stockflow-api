import { useCallback, useEffect, useState } from "react";
import { productService } from "../services/api";
import { getApiErrorMessage } from "../utils/errors";

export function useProducts({ pageSize = 10, autoLoad = true, initialPage = 0 } = {}) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [pageInfo, setPageInfo] = useState({ page: initialPage, totalPages: 1 });
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(
    async (requestedPage = page) => {
      setLoading(true);
      try {
        const response = await productService.getAll({ page: requestedPage, size: pageSize });
        const payload = response?.data;

        if (!payload || !Array.isArray(payload.content)) {
          throw new Error("Invalid product response received from the server.");
        }

        setProducts(payload.content);
        setPageInfo({
          page: Number.isInteger(payload.number) ? payload.number : requestedPage,
          totalPages:
            Number.isInteger(payload.totalPages) && payload.totalPages > 0
              ? payload.totalPages
              : 1,
        });
        setError("");
        return payload.content;
      } catch (err) {
        const message = getApiErrorMessage(err);
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize]
  );

  useEffect(() => {
    if (!autoLoad) {
      return;
    }

    fetchProducts(page).catch(() => {});
  }, [autoLoad, fetchProducts, page]);

  const createProduct = useCallback(async (payload) => productService.create(payload), []);
  const deleteProduct = useCallback(async (id) => productService.delete(id), []);

  return {
    products,
    page,
    setPage,
    pageInfo,
    loading,
    error,
    setError,
    fetchProducts,
    createProduct,
    deleteProduct,
  };
}
