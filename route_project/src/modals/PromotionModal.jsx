// src/components/PromotionModal.jsx
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
// import { createPromotion } from "../redux/slices/promotionPostSlice";

const PromotionModal = ({ open, onCancel, mode = "create", rowData }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(
        rowData || {
            프로모션코드: "",
            프로모션명: "",
            설명: "",
        }
    );

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const preparedData = {
            프로모션코드: parseInt(form.프로모션코드, 10),
            프로모션명: form.프로모션명,
            설명: form.설명,
        };

        // 등록 기능을 연결하려면 주석 해제
        // dispatch(createPromotion(preparedData));
        console.log("등록 데이터:", preparedData);

        onCancel();
    };

    const inputStyle = { width: 250, height: 32 };
    const labelStyle = {
        display: "inline-block",
        width: 110,
        textAlign: "right",
        marginRight: 8,
    };

    return (
        <Modal
            title={mode === "create" ? "프로모션 등록" : "프로모션 상세 보기"}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={700}
            centered
        >
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>프로모션코드</label>
                <Input
                    style={inputStyle}
                    value={form.프로모션코드}
                    onChange={(e) => handleChange("프로모션코드", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>프로모션명</label>
                <Input
                    style={inputStyle}
                    value={form.프로모션명}
                    onChange={(e) => handleChange("프로모션명", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>설명</label>
                <Input.TextArea
                    style={{ width: 400 }}
                    rows={4}
                    value={form.설명}
                    onChange={(e) => handleChange("설명", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>

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

export default PromotionModal;
