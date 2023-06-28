import React from "react";
import { Spin } from "antd";

export default function CounselorTabWrapper({
    children,
    loading,
    full,
    counselornotfound,
}) {
    if (!loading && full) {
        return children;
    }
    console.log(children, "children");
    return (
        <div className="container">
            <div className="payment-main-outer">
                <div className="row">
                    <div
                        className={
                            counselornotfound
                                ? "col-sm-12 col-md-12 no-counselor"
                                : "col-sm-12 col-md-12"
                        }
                    >
                        <Spin
                            wrapperClassName={"reviewLoading"}
                            tip="Loading..."
                            className="text data"
                            spinning={loading}
                        >
                            {children}
                        </Spin>
                    </div>
                </div>
            </div>
        </div>
    );
}
