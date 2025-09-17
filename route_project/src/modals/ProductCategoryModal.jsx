// src/components/ProductCategoryModal.jsx
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
// import { createProductCategory } from "../redux/slices/productCategoryPostSlice";

const ProductCategoryModal = ({ open, onCancel, mode = "create", rowData }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(
        rowData || {
            제품코드: "",
            분류코드: "",
        }
    );

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const preparedData = {
            제품코드: parseInt(form.제품코드, 10),
            분류코드: parseInt(form.분류코드, 10),
        };

        // dispatch(createProductCategory(preparedData));
        console.log("등록 데이터:", preparedData);

        onCancel();
    };

    const inputStyle = { width: 220, height: 32 };
    const labelStyle = {
        display: "inline-block",
        width: 100,
        textAlign: "right",
        marginRight: 8,
    };

    return (
        <Modal
            title={mode === "create" ? "제품분류 등록" : "제품분류 상세 보기"}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={600}
            centered
        >
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>제품코드</label>
                <Input
                    style={inputStyle}
                    value={form.제품코드}
                    onChange={(e) => handleChange("제품코드", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>분류코드</label>
                <Input
                    style={inputStyle}
                    value={form.분류코드}
                    onChange={(e) => handleChange("분류코드", e.target.value)}
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

export default ProductCategoryModal;
