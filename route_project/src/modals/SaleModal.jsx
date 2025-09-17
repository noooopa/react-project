// src/components/SaleModal.jsx
import React, { useState } from "react";
import { Modal, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { createSale } from "../redux/slices/salePostSlice";

const 지역목록 = [
    { 지역코드: 11110, 시도: "서울특별시", 구군시: "종로구" },
    { 지역코드: 11140, 시도: "서울특별시", 구군시: "중구" },
    { 지역코드: 26110, 시도: "부산광역시", 구군시: "중구" },
    { 지역코드: 26140, 시도: "부산광역시", 구군시: "서구" },
    // ... 나머지 지역 데이터 추가
];

const SaleModal = ({ open, onCancel, mode = "create", rowData }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(
        rowData || {
            날짜: "",
            수량: "",
            단가: "",
            시도: "",
            지역코드: "",
            제품코드: "",
            고객코드: "",
            프로모션코드: "",
            채널코드: "",
        }
    );

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSidoChange = (sido) => {
        const region = 지역목록.find((r) => r.시도 === sido);
        const 지역코드 = region ? region.지역코드 : "";
        setForm((prev) => ({ ...prev, 시도: sido, 지역코드 }));
    };

    const handleSubmit = () => {
        const preparedData = {
            날짜: form.날짜,
            지역: form.시도,
            지역코드: parseInt(form.지역코드, 10),
            프로모션코드: parseInt(form.프로모션코드, 10),
            Quantity: parseInt(form.수량, 10),
            UnitPrice: parseInt(form.단가, 10),
            제품코드: parseInt(form.제품코드, 10),
            고객코드: parseInt(form.고객코드, 10),
            채널코드: parseInt(form.채널코드, 10),
        };

        dispatch(createSale(preparedData));
        onCancel();
    };

    const inputStyle = { width: 180, height: 32 };
    const labelStyle = {
        display: "inline-block",
        width: 100,
        textAlign: "right",
        marginRight: 8,
    };

    return (
        <Modal
            title={mode === "create" ? "판매 등록" : "상세 보기"}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={1100}
            centered
            style={{ top: 30 }}
        >
            {/* 입력/상세 폼 */}
            <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                <div>
                    <label style={labelStyle}>날짜</label>
                    <Input
                        style={inputStyle}
                        value={form.날짜}
                        onChange={(e) => handleChange("날짜", e.target.value)}
                        disabled={mode === "view"}
                    />
                </div>
                <div>
                    <label style={labelStyle}>수량</label>
                    <Input
                        style={inputStyle}
                        value={form.수량}
                        onChange={(e) => handleChange("수량", e.target.value)}
                        disabled={mode === "view"}
                    />
                </div>
                <div>
                    <label style={labelStyle}>단가</label>
                    <Input
                        style={inputStyle}
                        value={form.단가}
                        onChange={(e) => handleChange("단가", e.target.value)}
                        disabled={mode === "view"}
                    />
                </div>
                <div>
                    <label style={labelStyle}>지역</label>
                    {mode === "create" ? (
                        <Select
                            style={inputStyle}
                            value={form.시도}
                            onChange={handleSidoChange}
                        >
                            {[...new Set(지역목록.map((r) => r.시도))].map((sido) => (
                                <Select.Option key={sido} value={sido}>
                                    {sido}
                                </Select.Option>
                            ))}
                        </Select>
                    ) : (
                        <Input style={inputStyle} value={form.시도} disabled />
                    )}
                </div>
            </div>

            <div style={{ display: "flex", gap: 20 }}>
                <div>
                    <label style={labelStyle}>제품코드</label>
                    <Input
                        style={inputStyle}
                        value={form.제품코드}
                        onChange={(e) => handleChange("제품코드", e.target.value)}
                        disabled={mode === "view"}
                    />
                </div>
                <div>
                    <label style={labelStyle}>고객코드</label>
                    <Input
                        style={inputStyle}
                        value={form.고객코드}
                        onChange={(e) => handleChange("고객코드", e.target.value)}
                        disabled={mode === "view"}
                    />
                </div>
                <div>
                    <label style={labelStyle}>프로모션코드</label>
                    <Input
                        style={inputStyle}
                        value={form.프로모션코드}
                        onChange={(e) => handleChange("프로모션코드", e.target.value)}
                        disabled={mode === "view"}
                    />
                </div>
                <div>
                    <label style={labelStyle}>채널코드</label>
                    <Input
                        style={inputStyle}
                        value={form.채널코드}
                        onChange={(e) => handleChange("채널코드", e.target.value)}
                        disabled={mode === "view"}
                    />
                </div>
            </div>

            {/* 푸터 버튼 */}
            <div style={{ textAlign: "right", marginTop: 20 }}>
                <Button onClick={onCancel} style={{ marginRight: 10 }}>
                    닫기
                </Button>
                {mode === "create" && (
                    <Button type="primary" onClick={handleSubmit}>
                        등록
                    </Button>
                )}
            </div>
        </Modal>
    );
};

export default SaleModal;
