import "./Productpreview.css";

function Productpreview({ productType }) {
  if (!productType) {
    return (
      <div className="productpreview-placeholder">
        Select a product type
      </div>
    );
  }

  return (
    <div className="productpreview-container">
      <img
        src={productType.image}
        alt={productType.name}
        className="productpreview-image"
      />
    </div>
  );
}

export default Productpreview;