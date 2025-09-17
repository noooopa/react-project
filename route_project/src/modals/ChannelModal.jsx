// src/components/ChannelModal.jsx
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
// import { createChannel } from "../redux/slices/channelPostSlice";

const ChannelModal = ({ open, onCancel, mode = "create", rowData }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(
        rowData || {
            채널코드: "",
            채널명: "",
            설명: "",
        }
    );

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const preparedData = {
            채널코드: parseInt(form.채널코드, 10),
            채널명: form.채널명,
            설명: form.설명,
        };

        // dispatch(createChannel(preparedData));
        console.log("등록 데이터:", preparedData);

        onCancel();
    };

    const inputStyle = { width: 250, height: 32 };
    const labelStyle = {
        display: "inline-block",
        width: 100,
        textAlign: "right",
        marginRight: 8,
    };

    return (
        <Modal
            title={mode === "create" ? "채널 등록" : "채널 상세 보기"}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={700}
            centered
        >
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>채널코드</label>
                <Input
                    style={inputStyle}
                    value={form.채널코드}
                    onChange={(e) => handleChange("채널코드", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>채널명</label>
                <Input
                    style={inputStyle}
                    value={form.채널명}
                    onChange={(e) => handleChange("채널명", e.target.value)}
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

export default ChannelModal;
