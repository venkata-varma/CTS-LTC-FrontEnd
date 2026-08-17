import "./Step4stuffingsettings.css";

import { stuffingSettings } from "../../../../data/loadstuffingcalculator/stuffingSettings";

function Step4stuffingsettings({ productForm, setProductForm }) {
  const configuration = stuffingSettings[productForm.productType?.id];

  if (!configuration) {
    return <p>No stuffing settings available.</p>;
  }

  const handleCheckboxChange = (settingId, checked) => {
    setProductForm((previous) => ({
      ...previous,

      stuffingSettings: {
        ...previous.stuffingSettings,

        [settingId]: {
          ...previous.stuffingSettings[settingId],

          enabled: checked,

          value: checked
            ? previous.stuffingSettings[settingId]?.value || ""
            : "",
        },
      },
    }));
  };
  const handleValueChange = (settingId, value, unit) => {
    setProductForm((previous) => ({
      ...previous,

      stuffingSettings: {
        ...previous.stuffingSettings,

        [settingId]: {
          ...previous.stuffingSettings[settingId],

          enabled: true,

          value,
          unit,
        },
      },
    }));
  };

  return (
    <>
      <h3>Stuffing Settings</h3>

      <p className="stuffing-subtitle">
        Specify the parameters of the allowable load that can be placed on top.
      </p>

      <div className="stuffing-settings-grid">
        {configuration.map((setting) => (
          <div key={setting.id} className="stuffing-card">
            <label className="stuffing-checkbox">
              <input
                type="checkbox"
                checked={
                  productForm.stuffingSettings[setting.id]?.enabled || false
                }
                onChange={(event) =>
                  handleCheckboxChange(setting.id, event.target.checked)
                }
              />

              {setting.label}
            </label>

            <img
              src={setting.image}
              alt={setting.label}
              className="stuffing-image"
            />

            <div className="stuffing-input">
              <input
                type="number"
                disabled={!productForm.stuffingSettings[setting.id]?.enabled}
                value={productForm.stuffingSettings[setting.id]?.value || ""}
                onChange={(event) =>
                  handleValueChange(
                    setting.id,
                    event.target.value,
                    setting.unit,
                  )
                }
              />

              <span>{setting.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Step4stuffingsettings;
