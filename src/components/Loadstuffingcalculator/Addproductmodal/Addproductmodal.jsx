import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  getProductsOfSession,
} from "../../../redux/features/product/productSlice";
import Commonmodal from "../Commonmodal/Commonmodal";

import Step1producttype from "./Productwizardsteps/Step1producttype";
import Step2dimensions from "./Productwizardsteps/Step2dimensions";
import Step3spacing from "./Productwizardsteps/Step3spacing";
import Step4stuffingsettings from "./Productwizardsteps/Step4stuffingsettings";
import { productTypes } from "../../../data/loadstuffingcalculator/productTypes";
import "./Addproductmodal.css";

const initialProductForm = {
  productType: null,
  productName: "",
  color: "#2563eb",
  dimensions: {},
  quantity: 1,
  spacingSettings: {},
  stuffingSettings: {},
};

function Addproductmodal({ isOpen, onClose, selectedGroupId, editingProduct }) {
  const dispatch = useDispatch();

  const currentSession = useSelector(
    (state) => state.calculationSession.currentSession,
  );

  const [currentStep, setCurrentStep] = useState(1);

  const [productForm, setProductForm] = useState(initialProductForm);
  const [dimensionErrors, setDimensionErrors] = useState({});
  const isEditMode = Boolean(editingProduct);

  const [originalProductType, setOriginalProductType] = useState(null);

  const [productTypeChanged, setProductTypeChanged] = useState(false);

  useEffect(() => {
    if (!editingProduct) {
      return;
    }

    const productTypeName =
      typeof editingProduct.productType === "object"
        ? editingProduct.productType.name
        : editingProduct.productType;

    const productTypeObject = productTypes.find(
      (item) => item.name === productTypeName,
    );
    setOriginalProductType(productTypeObject);

    setProductTypeChanged(false);

    setProductForm({
      productType: productTypeObject,

      productName: editingProduct.productName,

      color: editingProduct.productColor,

      dimensions: editingProduct.productFormDimensions || {},

      quantity: editingProduct.productFormDimensions?.quantity || 1,

      spacingSettings: editingProduct.spacingSettings || {},

      stuffingSettings: editingProduct.stuffingSettings || {},
    });

    setCurrentStep(1);
  }, [editingProduct]);

  const goNext = () => {
    if (currentStep === 1 && isEditMode && productTypeChanged) {
      setProductForm((previous) => ({
        ...previous,

        dimensions: {},

        quantity: 1,

        spacingSettings: {},

        stuffingSettings: {},
      }));
    }
    if (currentStep === 2) {
      const dimensionFields = productForm.productType?.defaultDimensions || {};

      const errors = {};

      Object.keys(dimensionFields).forEach((field) => {
        const value = productForm.dimensions[field]?.value;
        if (value === undefined || value === null || value === "") {
          errors[field] = true;
        }
      });

      if (
        productForm.quantity === "" ||
        productForm.quantity === null ||
        productForm.quantity === undefined
      ) {
        errors.quantity = true;
      }

      setDimensionErrors(errors);

      if (Object.keys(errors).length > 0) {
        return;
      }
    }
    if (currentStep < 4) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  const handleSubmitProduct = async () => {
    const payload = {
      productName: productForm.productName,

      productType: productForm.productType.name,

      productColor: productForm.color,

      groupId: selectedGroupId,

      calculationSessionId: currentSession._id,

      productFormDimensions: {
        ...productForm.dimensions,

        quantity: productForm.quantity,
      },

      spacingSettings: productForm.spacingSettings,

      stuffingSettings: productForm.stuffingSettings,
    };

    let response;

    if (isEditMode) {
      response = await dispatch(
        updateProduct({
          productId: editingProduct._id,
          payload,
        }),
      );
    } else {
      response = await dispatch(createProduct(payload));
    }

    const success = isEditMode
      ? updateProduct.fulfilled.match(response)
      : createProduct.fulfilled.match(response);

    if (success) {
      await dispatch(getProductsOfSession(currentSession._id));

      setCurrentStep(1);

      setProductForm(initialProductForm);

      setProductTypeChanged(false);

      setOriginalProductType(null);

      onClose();
    }
  };

  return (
    <Commonmodal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Product"
      size="large"
    >
      <div className="addproductmodal-body">
        <div className="wizard-progress">
          Step <strong>{currentStep}</strong> of <strong>4</strong>
        </div>

        <div className="wizard-content">
          {currentStep === 1 && (
            <Step1producttype
              productForm={productForm}
              setProductForm={setProductForm}
              isEditMode={isEditMode}
              originalProductType={originalProductType}
              productTypeChanged={productTypeChanged}
              setProductTypeChanged={setProductTypeChanged}
            />
          )}

          {currentStep === 2 && (
            <Step2dimensions
              productForm={productForm}
              setProductForm={setProductForm}
              dimensionErrors={dimensionErrors}
              setDimensionErrors={setDimensionErrors}
            />
          )}

          {currentStep === 3 && (
            <Step3spacing
              productForm={productForm}
              setProductForm={setProductForm}
            />
          )}

          {currentStep === 4 && (
            <Step4stuffingsettings
              productForm={productForm}
              setProductForm={setProductForm}
            />
          )}
        </div>

        <div className="wizard-footer">
          <button
            type="button"
            className="secondary-button"
            onClick={currentStep === 1 ? onClose : goBack}
          >
            {currentStep === 1 ? "Cancel" : "Back"}
          </button>

          <button
            type="button"
            className="primary-button"
            disabled={currentStep === 1 && !productForm.productType}
            onClick={currentStep === 4 ? handleSubmitProduct : goNext}
          >
            {currentStep === 4
              ? isEditMode
                ? "Update Product"
                : "Add Product"
              : "Next"}
          </button>
        </div>
      </div>
    </Commonmodal>
  );
}

export default Addproductmodal;
