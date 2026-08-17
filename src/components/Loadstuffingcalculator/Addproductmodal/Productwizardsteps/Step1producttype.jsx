import { productTypes } from "../../../../data/loadstuffingcalculator/productTypes";
import "./Step1producttype.css";

function Step1producttype({
  productForm,
  setProductForm,
  isEditMode,
  originalProductType,
  productTypeChanged,
  setProductTypeChanged,
}) {
  const handleSelectProduct = (product) => {
    const hasChanged =
      isEditMode &&
      originalProductType &&
      originalProductType.name !== product.name;
    setProductTypeChanged(hasChanged);
    setProductForm((previous) => ({
      ...previous,
      productType: product,
      productName: product.name,
      color: "#2563eb",
    }));
  };

  return (
    <>
      <h3>Select Product Type</h3>
      {isEditMode && (
        <div className="edit-product-warning">
          ⚠️ Changing the product type and clicking <strong>Next</strong> will
          permanently remove the existing dimensions, spacing and stuffing
          settings.
        </div>
      )}
      <div className="product-types-grid">
        {productTypes.map((product) => (
          <div
            key={product.id}
            className={`product-type-card ${
              productForm.productType?.id === product.id ? "selected" : ""
            }`}
            onClick={() => handleSelectProduct(product)}
          >
            <div className="producttype-icon">
              <img src={product.icon} alt={product.name} />
            </div>

            <h4 className="producttype-name">{product.name}</h4>

            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Step1producttype;
