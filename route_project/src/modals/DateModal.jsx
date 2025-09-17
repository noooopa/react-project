// src/components/DateModal.jsx
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
// import { createDate } from "../redux/slices/datePostSlice";

const DateModal = ({ open, onCancel, mode = "create", rowData }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(
        rowData || {
            id: "",
            year: "",
            month: "",
            day: "",
        }
    );

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const preparedData = {
            id: parseInt(form.id, 10),
            year: parseInt(form.year, 10),
            month: parseInt(form.month, 10),
            day: parseInt(form.day, 10),
        };

        // dispatch(createDate(preparedData));
        console.log("등록 데이터:", preparedData);

        onCancel();
    };

    const inputStyle = { width: 200, height: 32 };
    const labelStyle = {
        display: "inline-block",
        width: 80,
        textAlign: "right",
        marginRight: 8,
    };

    return (
        <Modal
            title={mode === "create" ? "날짜 등록" : "날짜 상세 보기"}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={600}
            centered
        >
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>ID</label>
                <Input
                    style={inputStyle}
                    value={form.id}
                    onChange={(e) => handleChange("id", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>연도</label>
                <Input
                    style={inputStyle}
                    value={form.year}
                    onChange={(e) => handleChange("year", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>월</label>
                <Input
                    style={inputStyle}
                    value={form.month}
                    onChange={(e) => handleChange("month", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>일</label>
                <Input
                    style={inputStyle}
                    value={form.day}
                    onChange={(e) => handleChange("day", e.target.value)}
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

export default DateModal;
