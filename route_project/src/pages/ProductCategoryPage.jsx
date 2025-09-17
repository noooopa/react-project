// src/pages/ProductCategoryPage.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategories } from "../redux/slices/productCategorySlice";
import ProductCategoryModal from "../modals/ProductCategoryModal";

// ✅ ag-grid CSS는 App.jsx에서 전역 import (여기선 제거)
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
import { AgGridReact } from "ag-grid-react";

const ProductCategoryPage = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((s) => s.productCategories);

    // ✅ 전역 테마 읽기
    const theme = useSelector((s) => s.theme.mode);
    const gridThemeClass = theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine";

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("view"); // "view" | "create"
    const [selectedRow, setSelectedRow] = useState(null);

    const gridRef = useRef();

    const columnDefs = useMemo(
        () => [
            { headerName: "제품분류코드", field: "product_category_code", checkboxSelection: true },
            { headerName: "제품분류명", field: "product_category_name" },
            { headerName: "상위분류", field: "parent_category_code" },
            { headerName: "설명", field: "description" },
        ],
        []
    );

    useEffect(() => {
        dispatch(fetchProductCategories());
    }, [dispatch]);

    return (
        <div className="card">
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button onClick={() => setModalOpen(true)}>신규</button>
                <button disabled={!selectedRow}>수정</button>
                <button disabled={!selectedRow}>삭제</button>
            </div>

            {/* ✅ 테마 동기화된 그리드 컨테이너 */}
            <div className={gridThemeClass} style={{ height: 500, width: "100%" }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data || []}
                    columnDefs={columnDefs}
                    rowSelection="single"
                    onSelectionChanged={() => {
                        const sel = gridRef.current?.api.getSelectedRows?.()[0] ?? null;
                        setSelectedRow(sel);
                    }}
                />
            </div>

            {/* 모달 */}
            {modalOpen && (
                <ProductCategoryModal
                    open={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    mode={modalMode}
                    rowData={selectedRow}
                />
            )}
        </div>
    );
};

export default ProductCategoryPage;
