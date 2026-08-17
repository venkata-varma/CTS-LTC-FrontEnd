import { useState } from "react";

import "./Loadstuffingcalculator.css";

import Tabs from "../../components/Loadstuffingcalculator/Tabs/Tabs";
import Productstab from "../../components/Loadstuffingcalculator/Productstab/Productstab";
import Containerstab from "../../components/Loadstuffingcalculator/Containerstab/Containerstab";
import Stuffingresulttab from "../../components/Loadstuffingcalculator/Stuffingresulttab/Stuffingresulttab";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  startNewSession,
  saveAndStartNewSession,
  getAllSessionsOfUser,
  reactivateSession,
} from "../../redux/features/calculateSession/calculationSessionSlice";
import { useEffect } from "react";
import Sessiontoolbar from "../../components/Loadstuffingcalculator/Sessiontoolbar/Sessiontoolbar";

function Loadstuffingcalculator() {
  const [activeTab, setActiveTab] = useState("products");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentSession, allSessions, loading, reactivatingSessionId } =
    useSelector((state) => state.calculationSession);
  const { allGroups } = useSelector((state) => state.groupsApi);

  const { productsByGroup } = useSelector((state) => state.productsApi);

  useEffect(() => {
    dispatch(getAllSessionsOfUser());
  }, [dispatch]);

  const handleStartNewSession = () => {
    dispatch(startNewSession());
  };

  const handleSaveAndStartNewSession = () => {
    if (!currentSession?._id) {
      return;
    }

    dispatch(saveAndStartNewSession(currentSession._id));
  };
  const handleReactivateSession = async (reactivateId) => {
    if (!currentSession?._id || !reactivateId) {
      return false;
    }

    try {
      await dispatch(
        reactivateSession({
          currentOpenId: currentSession._id,
          reactivateId,
        }),
      ).unwrap();

      await dispatch(getAllSessionsOfUser());

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  };
  const handleTabChange = (tab) => {
    if (tab === "containers") {
      if (allGroups.length === 0) {
        alert("Please add at least one group.");

        return;
      }

      const hasProducts = Object.values(productsByGroup).some(
        (products) => products.length > 0,
      );

      if (!hasProducts) {
        alert("Please add at least one product before proceeding.");

        return;
      }
    }

    setActiveTab(tab);
  };
  return (
    <div className="loadstuffingcalculator-page">
      <div className="loadstuffingcalculator-container">
        <div className="page-header">
          <div className="page-header-content">
            <div className="page-header-text">
              <h1>Load & Stuffing Calculator</h1>

              <p>
                Plan and optimize the loading of products into containers and
                trucks.
              </p>
            </div>

            <button
              className="dashboard-button"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        <Sessiontoolbar
          currentSession={currentSession}
          allSessions={allSessions}
          loading={loading}
          reactivatingSessionId={reactivatingSessionId}
          onStartNewSession={handleStartNewSession}
          onSaveAndStartNewSession={handleSaveAndStartNewSession}
          onReactivateSession={handleReactivateSession}
        />

        <Tabs activeTab={activeTab} setActiveTab={handleTabChange} />

        <div className="tab-content">
          {activeTab === "products" && <Productstab />}

          {activeTab === "containers" && <Containerstab />}

          {activeTab === "result" && <Stuffingresulttab />}
        </div>
      </div>
    </div>
  );
}

export default Loadstuffingcalculator;
