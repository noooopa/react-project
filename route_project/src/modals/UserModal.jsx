// src/components/UserModal.jsx
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
// import { createUser } from "../redux/slices/userPostSlice";

const UserModal = ({ open, onCancel, mode = "create", rowData }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(
        rowData || {
            id: "",
            이름: "",
            이메일: "",
        }
    );

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const preparedData = {
            id: parseInt(form.id, 10),
            이름: form.이름,
            이메일: form.이메일,
        };

        // dispatch(createUser(preparedData));
        console.log("등록 데이터:", preparedData);

        onCancel();
    };

    const inputStyle = { width: 250, height: 32 };
    const labelStyle = {
        display: "inline-block",
        width: 80,
        textAlign: "right",
        marginRight: 8,
    };

    return (
        <Modal
            title={mode === "create" ? "사용자 등록" : "사용자 상세 보기"}
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
                <label style={labelStyle}>이름</label>
                <Input
                    style={inputStyle}
                    value={form.이름}
                    onChange={(e) => handleChange("이름", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>이메일</label>
                <Input
                    style={inputStyle}
                    value={form.이메일}
                    onChange={(e) => handleChange("이메일", e.target.value)}
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

export default UserModal;
