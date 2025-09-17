// src/components/RegionModal.jsx
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
// import { createRegion } from "../redux/slices/regionPostSlice";

const RegionModal = ({ open, onCancel, mode = "create", rowData }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(
        rowData || {
            region_code: "",
            sido: "",
            gugun: "",
            region: "",
        }
    );

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const preparedData = {
            region_code: parseInt(form.region_code, 10),
            sido: form.sido,
            gugun: form.gugun,
            region: form.region,
        };

        // dispatch(createRegion(preparedData));
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
            title={mode === "create" ? "지역 등록" : "지역 상세 보기"}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={700}
            centered
        >
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>지역코드</label>
                <Input
                    style={inputStyle}
                    value={form.region_code}
                    onChange={(e) => handleChange("region_code", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>시도</label>
                <Input
                    style={inputStyle}
                    value={form.sido}
                    onChange={(e) => handleChange("sido", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>구군</label>
                <Input
                    style={inputStyle}
                    value={form.gugun}
                    onChange={(e) => handleChange("gugun", e.target.value)}
                    disabled={mode === "view"}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>지역명</label>
                <Input
                    style={inputStyle}
                    value={form.region}
                    onChange={(e) => handleChange("region", e.target.value)}
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

export default RegionModal;
