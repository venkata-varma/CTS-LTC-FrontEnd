import { useEffect, useRef, useState, useMemo } from "react";

import Reactivatesessionconfirmmodal from "./Reactivatesessionconfirmmodal";

import "./Sessiontoolbar.css";

function Sessiontoolbar({
  currentSession,
  allSessions,
  loading,
  reactivatingSessionId,
  onStartNewSession,
  onSaveAndStartNewSession,
  onReactivateSession,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sessionPendingReactivation, setSessionPendingReactivation] =
    useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Date unavailable";
    }

    return new Date(dateValue).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    return new Date(dateValue).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleReactivateClick = (session) => {
    setIsDropdownOpen(false);
    setSessionPendingReactivation(session);
  };

  const handleConfirmReactivation = async () => {
    if (!sessionPendingReactivation?._id) {
      return;
    }

    const wasSuccessful = await onReactivateSession(
      sessionPendingReactivation._id,
    );

    if (wasSuccessful) {
      setSessionPendingReactivation(null);
    }
  };

  const isReactivating =
    reactivatingSessionId === sessionPendingReactivation?._id;

  const filteredSessions = useMemo(() => {
    if (!searchTerm.trim()) {
      return allSessions;
    }

    const search = searchTerm.toLowerCase().trim();

    return allSessions.filter((session) =>
      session.sessionTitle?.toLowerCase().includes(search),
    );
  }, [allSessions, searchTerm]);

  return (
    <>
      <div className="session-toolbar">
        <div className="session-toolbar-left">
          {currentSession ? (
            <div className="current-session-card">
              <span className="session-label">Current Session</span>

              <strong className="session-title">
                {currentSession.sessionTitle}
              </strong>

              <span className="session-start-time">
                {formatDate(currentSession.startTime)}
                {" • "}
                {formatTime(currentSession.startTime)}
              </span>

              <span className="session-status session-status-open">Open</span>
            </div>
          ) : (
            <div className="no-session">
              No active session. Start a new session to continue.
            </div>
          )}
        </div>

        <div className="session-toolbar-right">
          <button
            type="button"
            className="session-primary-button"
            onClick={onStartNewSession}
            disabled={loading || Boolean(currentSession)}
          >
            {loading && !currentSession ? "Starting..." : "Start New Session"}
          </button>

          <button
            type="button"
            className="session-primary-button"
            onClick={onSaveAndStartNewSession}
            disabled={loading || !currentSession}
          >
            {loading && currentSession
              ? "Saving..."
              : "Save Current & Start New"}
          </button>

          <div className="session-dropdown-wrapper" ref={dropdownRef}>
            <button
              type="button"
              className="session-dropdown-trigger"
              onClick={() => setIsDropdownOpen((previous) => !previous)}
              disabled={allSessions.length === 0}
            >
              Sessions ({allSessions.length})
              <span
                className={`session-dropdown-arrow ${
                  isDropdownOpen ? "open" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {isDropdownOpen && (
              <div className="session-dropdown-panel">
                <div className="session-dropdown-heading">
                  Calculation Sessions
                </div>
<div className="session-search">
  <input
    type="text"
    placeholder="Search session..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
  />
</div>
                <div className="session-dropdown-list">
                  {filteredSessions.map((session) => {
                    const isCurrentSession =
                      session._id === currentSession?._id ||
                      session.status === "open";

                    return (
                      <div
                        key={session._id}
                        className={`session-dropdown-card ${
                          isCurrentSession ? "current" : ""
                        }`}
                      >
                        <div className="session-dropdown-card-header">
                          <strong>{session.sessionTitle}</strong>

                          <span
                            className={`session-status session-status-${session.status}`}
                          >
                            {session.status}
                          </span>
                        </div>

                        <div className="session-dropdown-date">
                          {formatDate(session.startTime)}
                          {" • "}
                          {formatTime(session.startTime)}
                        </div>

                        <button
                          type="button"
                          className="reactivate-session-button"
                          disabled={
                            isCurrentSession || Boolean(reactivatingSessionId)
                          }
                          onClick={() => handleReactivateClick(session)}
                        >
                          {isCurrentSession
                            ? "Active Session"
                            : reactivatingSessionId === session._id
                              ? "Reactivating..."
                              : "Reactivate"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Reactivatesessionconfirmmodal
        isOpen={Boolean(sessionPendingReactivation)}
        session={sessionPendingReactivation}
        loading={isReactivating}
        onClose={() => setSessionPendingReactivation(null)}
        onConfirm={handleConfirmReactivation}
      />
    </>
  );
}

export default Sessiontoolbar;
