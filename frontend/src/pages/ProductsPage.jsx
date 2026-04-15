import { useState } from "react";
import EmptyState from "../components/EmptyState";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import Spinner from "../components/Spinner";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import { useToast } from "../context/ToastContext";
import { getApiErrorMessage } from "../utils/errors";

export default function ProductsPage() {
  const { isAdmin } = useAuth();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const {
    products,
    page,
    setPage,
    pageInfo,
    loading,
    error,
    fetchProducts,
    createProduct,
    deleteProduct,
  } = useProducts({ pageSize: 10 });

  const handleCreate = async (payload) => {
    setSubmitting(true);
    try {
      await createProduct(payload);
      showToast({
        type: "success",
        title: "Product added",
        description: "Inventory was updated successfully.",
      });
      setPage(0);
      await fetchProducts(0);
      return true;
    } catch (err) {
      showToast({
        type: "error",
        title: "Unable to add product",
        description: getApiErrorMessage(err),
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    setDeletingId(product.id);
    try {
      await deleteProduct(product.id);
      showToast({
        type: "success",
        title: "Product deleted",
        description: `${product.name} was removed successfully.`,
      });
      const targetPage = products.length === 1 && page > 0 ? page - 1 : page;
      if (targetPage !== page) {
        setPage(targetPage);
      } else {
        await fetchProducts(page);
      }
    } catch (err) {
      showToast({
        type: "error",
        title: "Unable to delete product",
        description: getApiErrorMessage(err),
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {isAdmin ? <ProductForm onSubmit={handleCreate} loading={submitting} /> : null}

      {loading ? (
        <Spinner label="Loading products..." />
      ) : error && products.length === 0 ? (
        <div className="card border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{error}</div>
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Inventory will appear here once products are added."
        />
      ) : (
        <>
          {error ? (
            <div className="card border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
          ) : null}
          <ProductTable
            products={products}
            canManage={isAdmin}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Page {pageInfo.page + 1} of {pageInfo.totalPages}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setPage((current) => Math.max(current - 1, 0))}
                disabled={pageInfo.page === 0}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() =>
                  setPage((current) =>
                    Math.min(current + 1, Math.max(pageInfo.totalPages - 1, 0))
                  )
                }
                disabled={pageInfo.page >= pageInfo.totalPages - 1}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
