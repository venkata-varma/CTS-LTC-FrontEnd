import { useEffect, useState } from "react";
import { getAllCheques } from "../services/chequeService";
import Header from "../components/Header/Header";
import AnalyticsCards from "../components/Analyticscards/Analyticscards";
import Filtersidebar from "../components/Filtersidebar/Filtersidebar";
import Tabletoolbar from "../components/Tabletoolbar/Tabletoolbar";
import Chequetable from "../components/Chequetable/Chequetable";
import "./Chequetrackingsystempage.css";
import Addchequemodal from "../components/Addchequemodal/Addchequemodal";
import Pagination from "../components/Pagination/Pagination";

function ChequeTrackingPage() {
  const [cheques, setCheques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("chequeReceivedDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isAddChequeModalOpen, setIsAddChequeModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);


  const [filters, setFilters] = useState({
    status: [],
    amountRange: "",
    attachment: "",
    dateRange: "",
  });
  const [filteredCheques, setFilteredCheques] = useState([]);

  useEffect(() => {
    const fetchCheques = async () => {
      try {
        setLoading(true);

        const response = await getAllCheques();

        const allCheques = response.data?.allCheques || [];

        setCheques(allCheques);
        setFilteredCheques(allCheques);
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchCheques();
  }, []);

  useEffect(() => {
    let result = [...cheques];

    // Status Filter

    if (filters.status.length > 0) {
      result = result.filter((cheque) =>
        filters.status.includes(cheque.status),
      );
    }

    // Amount Filter
    if (filters.amountRange) {
      result = result.filter((cheque) => {
        const amount = Number(cheque.amountDetails.chequeAmount);

        switch (filters.amountRange) {
          case "0-10000":
            return amount <= 10000;

          case "10001-50000":
            return amount >= 10001 && amount <= 50000;

          case "50000+":
            return amount > 50000;

          default:
            return true;
        }
      });
    }

    // Attachment Filter
    if (filters.attachment) {
      result = result.filter((cheque) => {
        if (filters.attachment === "available") {
          return cheque.attachmentUrl;
        }

        return !cheque.attachmentUrl;
      });
    }

    // Date Range Filter (based on chequeReceivedDate)

    if (filters.dateRange) {
      const today = new Date();

      result = result.filter((cheque) => {
        const receivedDate = new Date(cheque.chequeReceivedDate);

        switch (filters.dateRange) {
          case "today":
            return receivedDate.toDateString() === today.toDateString();

          case "week": {
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());

            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            return receivedDate >= startOfWeek && receivedDate <= endOfWeek;
          }

          case "month":
            return (
              receivedDate.getMonth() === today.getMonth() &&
              receivedDate.getFullYear() === today.getFullYear()
            );

          default:
            return true;
        }
      });
    }

    // Search Filter

    if (searchTerm.trim()) {
      const search = searchTerm.trim().toLowerCase();

      result = result.filter((cheque) => {
        return (
          cheque.chequeNo?.trim().toLowerCase().includes(search) ||
          cheque.accountHolderName?.trim().toLowerCase().includes(search) ||
          cheque.invoiceNo?.trim().toLowerCase().includes(search) ||
          cheque.customerAccountNumber?.trim().toLowerCase().includes(search)
        );
      });
    }

    // Sorting

    result.sort((a, b) => {
      let valueA;
      let valueB;

      switch (sortField) {
        case "chequeNo":
          valueA = a.chequeNo;
          valueB = b.chequeNo;
          break;

        case "accountHolderName":
          valueA = a.accountHolderName;
          valueB = b.accountHolderName;
          break;

        case "amount":
          valueA = Number(a.amountDetails.chequeAmount);
          valueB = Number(b.amountDetails.chequeAmount);
          break;

        case "status":
          valueA = a.status;
          valueB = b.status;
          break;

        case "customerAccountNumber":
          valueA = a.customerAccountNumber;
          valueB = b.customerAccountNumber;
          break;

        case "chequeReceivedDate":
          valueA = new Date(a.chequeReceivedDate);
          valueB = new Date(b.chequeReceivedDate);
          break;

        case "chequeSubmittedDate":
          valueA = new Date(a.chequeSubmittedDate);
          valueB = new Date(b.chequeSubmittedDate);
          break;

        case "chequeClearanceDate":
          valueA = new Date(a.chequeClearanceDate);
          valueB = new Date(b.chequeClearanceDate);
          break;

        case "invoiceNumber":
          valueA = a.invoiceNo;
          valueB = b.invoiceNo;
          break;

        default:
          return 0;
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;

      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });

    setFilteredCheques(result);
  }, [cheques, filters, searchTerm, sortField, sortDirection]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);
  if (loading) {
    return <h2>Loading...</h2>;
  }

// =============================
// PAGINATION
// =============================

const recordsPerPage = 10;

const totalPages = Math.ceil(
  filteredCheques.length / recordsPerPage,
);

const indexOfLastCheque =
  currentPage * recordsPerPage;

const indexOfFirstCheque =
  indexOfLastCheque - recordsPerPage;

const currentPageCheques = filteredCheques.slice(
  indexOfFirstCheque,
  indexOfLastCheque,
);
  return (
    <div className="page-container">
      <Header onAddCheque={() => setIsAddChequeModalOpen(true)} />
      <AnalyticsCards cheques={cheques} />
      <div className="main-content">
        <Filtersidebar filters={filters} setFilters={setFilters} />
        <div className="right-section">
          <div className="table-card">
            <Tabletoolbar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              totalRecords={filteredCheques.length}
            />

            <Chequetable
              cheques={currentPageCheques}
              sortField={sortField}
              sortDirection={sortDirection}
              setSortField={setSortField}
              setSortDirection={setSortDirection}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={filteredCheques.length}
              recordsPerPage={recordsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
      {isAddChequeModalOpen && (
        <Addchequemodal onClose={() => setIsAddChequeModalOpen(false)} />
      )}
    </div>
  );
}

export default ChequeTrackingPage;
