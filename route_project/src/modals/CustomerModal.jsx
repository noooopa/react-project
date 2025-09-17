// src/components/CustomerModal.jsx
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
// import { createCustomer } from "../redux/slices/customerPostSlice";

const CustomerModal = ({ open, onCancel, mode = "create", rowData }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(
        rowData || {
            고객코드: "",
            고객명: "",
            지역: "",
        }
    );

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const preparedData = {
            고객코드: parseInt(form.고객코드, 10),
            고객명: form.고객명,
            지역: form.지역,
        };

        // 등록 기능 연결 가능
        // dispatch(createCustomer(preparedData));
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
            title={mode === "create" ? "고객 등록" : "고객 상세 보기"}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={600}
            centered
        >
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>고객코드</label>
                <Input
                    style={inputStyle}
                    value={form.고객코드}
                    onChange={(e) => handleChange("고객코드", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>고객명</label>
                <Input
                    style={inputStyle}
                    value={form.고객명}
                    onChange={(e) => handleChange("고객명", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>지역</label>
                <Input
                    style={inputStyle}
                    value={form.지역}
                    onChange={(e) => handleChange("지역", e.target.value)}
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

export default CustomerModal;
