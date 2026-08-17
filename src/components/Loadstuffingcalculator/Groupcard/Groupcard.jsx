import { useEffect, useState } from "react";
import { FiCheck, FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGroup,
  getAllGroupsOfSession,
} from "../../../redux/features/group/groupSlice";

import {
  deleteProduct,
  getProductsOfSession,
} from "../../../redux/features/product/productSlice";
import "./Groupcard.css";
import BoxIcon from "../../../assets/loadstuffingcalculator/smallIcons/box.svg";
import BigBagIcon from "../../../assets/loadstuffingcalculator/smallIcons/bigbag.svg";
import SackIcon from "../../../assets/loadstuffingcalculator/smallIcons/sack.svg";
import BarrelIcon from "../../../assets/loadstuffingcalculator/smallIcons/barrel.svg";
import RollIcon from "../../../assets/loadstuffingcalculator/smallIcons/roll.svg";

function Groupcard({
  group,
  groupIndex,
  loading,
  onAddProduct,
  onEditProduct,
  onDeleteGroup,
}) {
  const dispatch = useDispatch();

  const currentSession = useSelector(
    (state) => state.calculationSession.currentSession,
  );
  const productsByGroup = useSelector(
    (state) => state.productsApi.productsByGroup,
  );

  const products = productsByGroup[group._id] || [];
  const productIcons = {
    Box: BoxIcon,
    "Big Bag": BigBagIcon,
    Sack: SackIcon,
    Barrel: BarrelIcon,
    Roll: RollIcon,
  };
  const [isEditing, setIsEditing] = useState(false);

  const [groupName, setGroupName] = useState(group.groupName);

  useEffect(() => {
    setGroupName(group.groupName);
  }, [group.groupName]);

  const handleSaveGroup = async () => {
    const trimmedName = groupName.trim();

    if (trimmedName === "" || trimmedName === group.groupName) {
      setGroupName(group.groupName);
      setIsEditing(false);
      return;
    }

    const response = await dispatch(
      updateGroup({
        groupId: group._id,
        payload: {
          groupName: trimmedName,
        },
      }),
    );

    if (updateGroup.fulfilled.match(response)) {
      dispatch(getAllGroupsOfSession(currentSession._id));

      setIsEditing(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSaveGroup();
    }

    if (event.key === "Escape") {
      setGroupName(group.groupName);
      setIsEditing(false);
    }
  };
  const handleDeleteProduct = async (productId) => {
    console.log("productid first console===", productId)
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    const response = await dispatch(deleteProduct(productId));

    if (deleteProduct.fulfilled.match(response)) {
      dispatch(getProductsOfSession(currentSession._id));
    }
  };
  return (
    <section className="group-card">
      <div className="group-card-header">
        <div className="group-title-section">
          <span className="group-color-indicator" aria-hidden="true" />

          {isEditing ? (
            <input
              className="group-name-input"
              value={groupName}
              autoFocus
              onChange={(event) => setGroupName(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <h3>{group.groupName}</h3>
          )}

          <button
            type="button"
            className="group-edit-button"
            onClick={() => {
              if (isEditing) {
                handleSaveGroup();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? <FiCheck /> : <FiEdit2 />}
          </button>
        </div>

        <button
          type="button"
          className="delete-group-button"
          onClick={() => onDeleteGroup(group._id)}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Delete Group"}
        </button>
      </div>

      <div className="group-products-section">
        {products.length === 0 ? (
          <div className="group-empty-state">
            No products have been added to this group.
          </div>
        ) : (
          <>
            <div className="products-table-header">
              <div>Type</div>

              <div>Product Name</div>

              <div>Len / Diam</div>

              <div>Width</div>

              <div>Height</div>

              <div>Weight</div>

              <div>Qty</div>

              <div>Color</div>

              <div>Actions</div>
            </div>

            {products.map((product) => {
              const d = product.productFormDimensions || {};

              return (
                <div key={product._id} className="products-table-row">
                  <div className="product-type-cell">
                    <img
                      src={productIcons[product.productType] || BoxIcon}
                      alt={product.productType}
                      className="product-type-icon"
                    />
                  </div>

                  <div className="product-name-cell">
                    <strong>{product.productName}</strong>

                    <small>{product.productType}</small>
                  </div>

                  <div className="increase-size-values">
                    {d.length?.value || d.diameter?.value || "-"}
                  </div>

                  <div className="increase-size-values">
                    {d.width?.value || "-"}
                  </div>

                  <div className="increase-size-values">
                    {d.height?.value || "-"}
                  </div>

                  <div className="increase-size-values">
                    {d.weight?.value || "-"}
                  </div>

                  <div className="increase-size-values">
                    {d.quantity || "-"}
                  </div>

                  <div>
                    <span
                      className="product-color-dot"
                      style={{
                        background: product.productColor || "#2563eb",
                      }}
                    />
                  </div>

                  <div className="product-action-buttons">
                    <button
                      className="icon-button settings-button"
                      type="button"
                      onClick={() =>
                        onEditProduct({
                          ...product,

                          productType: {
                            id: product.productType,
                            name: product.productType,
                          },
                        })
                      }
                    >
                      ⚙
                    </button>
                    <button
                      className="icon-button delete-button-small"
                      type="button"
                      onClick={() => handleDeleteProduct(product._id)}
                      disabled={loading}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="group-card-footer">
        <button
          type="button"
          className="add-product-to-group-button"
          onClick={() => onAddProduct(group._id)}
        >
          + Add Product
        </button>

        <span className="group-number">Group {groupIndex + 1}</span>
      </div>
    </section>
  );
}

export default Groupcard;
