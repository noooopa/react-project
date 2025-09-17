// src/components/CategoryModal.jsx
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
// import { createCategory } from "../redux/slices/categoryPostSlice";

const CategoryModal = ({ open, onCancel, mode = "create", rowData }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(
        rowData || {
            분류코드: "",
            분류명: "",
        }
    );

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const preparedData = {
            분류코드: parseInt(form.분류코드, 10),
            분류명: form.분류명,
        };

        // dispatch(createCategory(preparedData));
        console.log("등록 데이터:", preparedData);

        onCancel();
    };

    const inputStyle = { width: 220, height: 32 };
    const labelStyle = {
        display: "inline-block",
        width: 90,
        textAlign: "right",
        marginRight: 8,
    };

    return (
        <Modal
            title={mode === "create" ? "분류 등록" : "분류 상세 보기"}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={600}
            centered
        >
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>분류코드</label>
                <Input
                    style={inputStyle}
                    value={form.분류코드}
                    onChange={(e) => handleChange("분류코드", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>분류명</label>
                <Input
                    style={inputStyle}
                    value={form.분류명}
                    onChange={(e) => handleChange("분류명", e.target.value)}
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

export default CategoryModal;
