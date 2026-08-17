import "./Step2dimensions.css";
import Productpreview from "../../Productpreview/Productpreview";

function Step2dimensions({
  productForm,
  setProductForm,
  dimensionErrors,
  setDimensionErrors,
}) {
  const dimensionFields = productForm.productType?.defaultDimensions || {};

  const handleDimensionChange = (field, value) => {
    setProductForm((previous) => ({
      ...previous,

      dimensions: {
        ...previous.dimensions,

        [field]: {
          value,
          unit: getUnit(field),
        },
      },
    }));

    setDimensionErrors((previous) => ({
      ...previous,
      [field]: value.trim() === "",
    }));
  };
  const handleInputChange = (field, value) => {
    setProductForm((previous) => ({
      ...previous,

      [field]: value,
    }));
  };

  const getUnit = (field) => {
    switch (field) {
      case "weight":
        return "kg";

      default:
        return "mm";
    }
  };

  return (
    <div className="step2-layout">
      <div className="dimension-preview">
        <div className="preview-box">
          <Productpreview productType={productForm.productType} />
        </div>
      </div>

      <div className="dimension-form">
        <div className="form-group full-width">
          <label>Product Name</label>

          <input
            type="text"
            value={productForm.productName}
            onChange={(event) =>
              handleInputChange("productName", event.target.value)
            }
          />
        </div>

        <div className="form-group full-width">
          <label>Product Color</label>

          <input
            type="color"
            value={productForm.color}
            onChange={(event) => handleInputChange("color", event.target.value)}
          />
        </div>

        {Object.keys(dimensionFields).map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>

            <div className="input-with-unit">
              <input
                type="number"
                value={productForm.dimensions[field]?.value || ""}
                onChange={(event) =>
                  handleDimensionChange(field, event.target.value)
                }
              />

              <span>{getUnit(field)}</span>
            </div>

            {dimensionErrors[field] && (
              <p className="required-field-error">Required</p>
            )}
          </div>
        ))}

        <div className="form-group">
          <label>Quantity</label>

          <div className="input-with-unit">
            <input
              type="number"
              min="1"
              value={productForm.quantity}
              onChange={(event) =>
                handleInputChange("quantity", event.target.value)
              }
            />

            <span>pcs</span>
          </div>
          {dimensionErrors.quantity && (
            <p className="required-field-error">Required</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Step2dimensions;
