import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalePage } from "../redux/slices/salesSlice";
import SaleModal from "../modals/SaleModal";
import { AgGridReact } from "ag-grid-react";

const SalesPage = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((s) => s.sales);

    const theme = useSelector((s) => s.theme.mode);
    const gridThemeClass = theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine";

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("view");
    const [selectedRow, setSelectedRow] = useState(null);

    const gridRef = useRef(null);

    useEffect(() => {
        dispatch(fetchSalePage());
    }, [dispatch]);

    const rowData = useMemo(() => data, [data]);

    const columnDefs = useMemo(
        () => [
            { headerName: "주문일", field: "날짜", flex: 1 },
            { headerName: "제품번호", field: "제품코드", flex: 1 },
            { headerName: "고객번호", field: "고객코드", flex: 1 },
            { headerName: "프로모션번호", field: "프로모션코드", flex: 1 },
            { headerName: "채널번호", field: "채널코드", flex: 1 },
            { headerName: "수량", field: "quantity", flex: 1 },
            { headerName: "단가", field: "unitPrice", flex: 1 },
            { headerName: "지역", field: "지역", flex: 1 },
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

    if (loading) return <div className="text-blue-400">Loading...</div>;
    if (error) return <div className="text-red-400">Error: {error}</div>;

    return (
        <div className="p-4 rounded-lg shadow-lg h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-blue-400">판매 테이블</h2>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="검색..."
                        onChange={(e) => gridRef.current.api.setQuickFilter(e.target.value)}
                        className="px-3 py-2 rounded bg-white text-gray-900 focus:ring-blue-600"
                    />
                    <button
                        onClick={() => gridRef.current.api.exportDataAsCsv()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        CSV 다운로드
                    </button>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        판매 등록
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
                <SaleModal
                    open={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    mode={modalMode}
                    rowData={selectedRow}
                />
            )}
        </div>
    );
};

export default SalesPage;
