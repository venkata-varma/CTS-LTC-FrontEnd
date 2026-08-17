import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createGroup,
  getAllGroupsOfSession,
  deleteGroup,
} from "../../../redux/features/group/groupSlice";
import Addproductmodal from "../Addproductmodal/Addproductmodal";
import Groupcard from "../Groupcard/Groupcard";
import "./Productstab.css";
import { getProductsOfSession } from "../../../redux/features/product/productSlice";

function Productstab() {
  const dispatch = useDispatch();
  const currentSession = useSelector(
    (state) => state.calculationSession.currentSession,
  );

  const { allGroups, loading } = useSelector((state) => state.groupsApi);
  // const [groups, setGroups] = useState([]);

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  useEffect(() => {
    if (!currentSession?._id) {
      return;
    }

    dispatch(getAllGroupsOfSession(currentSession._id));

    dispatch(getProductsOfSession(currentSession._id));
  }, [currentSession, dispatch]);

  const handleAddGroup = async () => {
    if (!currentSession?._id) {
      return;
    }

    const payload = {
      groupName: `Group #${allGroups.length + 1}`,
      calculationSessionId: currentSession._id,
    };

    const response = await dispatch(createGroup(payload));

    if (createGroup.fulfilled.match(response)) {
      dispatch(getAllGroupsOfSession(currentSession._id));
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (!groupId || !currentSession?._id) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this group?\n\nAll products belonging to this group will also be deleted.",
    );

    if (!confirmed) {
      return;
    }

    const response = await dispatch(deleteGroup(groupId));

    if (deleteGroup.fulfilled.match(response)) {
      if (selectedGroupId === groupId) {
        setSelectedGroupId(null);
        setIsAddProductModalOpen(false);
      }

      dispatch(getAllGroupsOfSession(currentSession._id));
    }
  };
const handleOpenAddProductModal = (groupId) => {
  setEditingProduct(null);
  setSelectedGroupId(groupId);
setIsAddProductModalOpen(true);
};
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setSelectedGroupId(product.groupId);
    setIsAddProductModalOpen(true);
  };





  const handleCloseAddProductModal = () => {
    setIsAddProductModalOpen(false);
    setSelectedGroupId(null);
    setEditingProduct(null);

  };

  return (
    <div className="productstab-container">
      <div className="productstab-toolbar">
        <div className="productstab-left">
          <button
            type="button"
            className="primary-button"
            onClick={handleAddGroup}
            disabled={!currentSession}
          >
            + Add Group
          </button>
        </div>

        <div className="productstab-right">
          <button type="button" className="secondary-button">
            Import
          </button>

          <button type="button" className="secondary-button">
            Export
          </button>
        </div>
      </div>

      {!currentSession ? (
        <div className="empty-state">
          Start a calculation session before adding groups.
        </div>
      ) : allGroups.length === 0 ? (
        <div className="empty-state">No groups added yet.</div>
      ) : (
        <div className="groups-list">
          {allGroups.map((group, index) => (
            <Groupcard
              key={group._id}
              group={group}
              loading={loading}
              groupIndex={index}
              onAddProduct={handleOpenAddProductModal}
              onEditProduct={handleEditProduct}
              onDeleteGroup={handleDeleteGroup}

            />
          ))}
        </div>
      )}

      <Addproductmodal
        isOpen={isAddProductModalOpen}
        onClose={handleCloseAddProductModal}
        selectedGroupId={selectedGroupId}
        editingProduct={editingProduct}
      />
    </div>
  );
}

export default Productstab;
