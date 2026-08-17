import { spacingSettings } from "../../../../data/loadstuffingcalculator/spacingSettings";
import "./Step3spacing.css";

function Step3spacing({ productForm, setProductForm }) {
  const productTypeId = productForm.productType?.id;
  const configuration = spacingSettings[productTypeId];

  if (!configuration) {
    return <p>No spacing settings available.</p>;
  }
  const handleTiltChange = (optionId, checked) => {
    setProductForm((previous) => ({
      ...previous,

      spacingSettings: {
        ...previous.spacingSettings,

        [optionId]: {
          enabled: checked,
        },
      },
    }));
  };
  const handlePlacementChange = (placement) => {
    setProductForm((previous) => ({
      ...previous,

      spacingSettings: {
        ...previous.spacingSettings,

        placement: {
          value: placement,
        },
      },
    }));
  };
  return (
    <div className="step3-spacing">
      <div className="spacing-heading">
        <h3>Spacing Settings</h3>

        <p>
          Select the directions in which this product may be tilted during
          loading.
        </p>
      </div>

      <div className="spacing-options">
        {configuration.tiltOptions.map((option) => (
          <label
            key={option.id}
            className={`spacing-option-card ${
              option.disabled ? "disabled" : ""
            }`}
          >
            <div className="spacing-option-header">
              <input
                type="checkbox"
                disabled={option.disabled}
                checked={
                  productForm.spacingSettings[option.id]?.enabled || false
                }
                onChange={(event) =>
                  handleTiltChange(option.id, event.target.checked)
                }
              />

              <span>{option.label}</span>
            </div>

            <img src={option.image} alt={option.label} />
          </label>
        ))}
      </div>

      {configuration.placementOptions.length > 0 && (
        <div className="placement-section">
          <h4>{configuration.placementTitle}</h4>

          <div className="placement-options">
            {configuration.placementOptions.map((option) => (
              <label
                key={option.id}
                className={`placement-option-card ${
                  productForm.spacingSettings.placement?.value === option.id
                    ? "selected"
                    : ""
                }`}
              >
                <img src={option.image} alt={option.label} />

                <div className="placement-radio">
                  <input
                    type="radio"
                    name="placement"
                    value={option.id}
                    checked={
                      productForm.spacingSettings.placement?.value === option.id
                    }
                    onChange={() => handlePlacementChange(option.id)}
                  />

                  <span>{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Step3spacing;
