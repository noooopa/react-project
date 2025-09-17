// src/components/ProductModal.jsx
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
// 만약 등록용 thunk를 만든다면 아래 import 수정
// import { createProduct } from "../redux/slices/productPostSlice";

const ProductModal = ({ open, onCancel, mode = "create", rowData }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(
        rowData || {
            제품코드: "",
            제품명: "",
            가격: "",
        }
    );

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const preparedData = {
            제품코드: parseInt(form.제품코드, 10),
            제품명: form.제품명,
            가격: parseInt(form.가격, 10),
        };

        // 등록 기능을 구현할 경우 dispatch 호출
        // dispatch(createProduct(preparedData));
        console.log("등록 데이터:", preparedData);

        onCancel();
    };

    const inputStyle = { width: 200, height: 32 };
    const labelStyle = {
        display: "inline-block",
        width: 100,
        textAlign: "right",
        marginRight: 8,
    };

    return (
        <Modal
            title={mode === "create" ? "제품 등록" : "제품 상세 보기"}
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
                <label style={labelStyle}>제품명</label>
                <Input
                    style={inputStyle}
                    value={form.제품명}
                    onChange={(e) => handleChange("제품명", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>가격</label>
                <Input
                    style={inputStyle}
                    value={form.가격}
                    onChange={(e) => handleChange("가격", e.target.value)}
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

export default ProductModal;
