import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDates } from "../redux/slices/dateSlice";
import DateModal from "../modals/DateModal";
import { AgGridReact } from "ag-grid-react";

const DatePage = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((s) => s.dates);

    const theme = useSelector((s) => s.theme.mode);
    const gridThemeClass = theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine";

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("view");
    const [selectedRow, setSelectedRow] = useState(null);

    const gridRef = useRef(null);

    useEffect(() => {
        dispatch(fetchDates());
    }, [dispatch]);

    const rowData = useMemo(() => data, [data]);

    const columnDefs = useMemo(
        () => [
            { headerName: "날짜ID", field: "id", flex: 1 },
            { headerName: "연도", field: "year", flex: 1 },
            { headerName: "월", field: "month", flex: 1 },
            { headerName: "일", field: "day", flex: 1 },
        ],
        []
    );

    const openCreateModal = () => {
        setModalMode("create");
        setSelectedRow(null);
        setModalOpen(true);
    };

    const onRowClicked = (event) => {
        setModalMode("view");
        setSelectedRow(event.data);
        setModalOpen(true);
    };

    if (loading) return <div className="text-rose-400">Loading...</div>;
    if (error) return <div className="text-red-400">Error: {error}</div>;

    return (
        <div className="p-4 rounded-lg shadow-lg h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-rose-400">날짜 테이블</h2>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="검색..."
                        onChange={(e) => gridRef.current.api.setQuickFilter(e.target.value)}
                        className="px-3 py-2 rounded bg-white text-gray-900 focus:ring-rose-600"
                    />
                    <button
                        onClick={() => gridRef.current.api.exportDataAsCsv()}
                        className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
                    >
                        CSV 다운로드
                    </button>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        날짜 등록
                    </button>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="px-3 py-2 rounded bg-gray-600 text-white hover:bg-gray-500"
                    >
                        {sidebarOpen ? "⬅️ 사이드바 닫기" : "➡️ 사이드바 열기"}
                    </button>
                </div>
            </div>

            <div className={gridThemeClass} style={{ height: 500, width: "100%" }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    rowSelection="single"
                    animateRows={true}
                    onRowClicked={onRowClicked}
                />
            </div>

            {modalOpen && (
                <DateModal
                    open={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    mode={modalMode}
                    rowData={selectedRow}
                />
            )}
        </div>
    );
};

export default DatePage;
