import React, { useEffect, useState, useRef } from "react";
import { message, Row, Col, Space } from "antd";
import * as FiltersService from "../../api/services/rawg-services/FiltersService";
import { useDispatch, useSelector } from "react-redux";
import { addFiltersPage, setFilters } from "../../state";
import useOnScreen from "../../hooks/useOnScreen";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useLocation } from "react-router-dom";
import Filters from "./Filters";

const spinIcon = (
    <LoadingOutlined
        style={{
            fontSize: 32,
        }}
        spin
    />
);

function FiltersPage({ loading, setLoading }) {
    const bottomRef = useRef(null);
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [page, setPage] = useState(1);
    const isBottom = useOnScreen(bottomRef);
    const { pathname } = useLocation();
    const [dataEnd, setDataEnd] = useState(false);
    const [smallData, setSmallData] = useState(false)

    const getFilters = async (name) => {
        if (dataEnd) {
            return null;
        }
        setLoading(true);
        const response = await FiltersService.getFilters(page, name);
        setLoading(false);
        if (response.next === null) {
            setDataEnd(true);
        }
        if (!response.error) {
            if (page === 1) {
                dispatch(setFilters({ filters: response.results }));
                if (response.results.length < 11) {
                    setSmallData(true)
                }
                setPage(2);
            } else if (isBottom || smallData) {
                dispatch(addFiltersPage({ filters: response.results }));
                setPage(page + 1);
            }
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const handleQueryParams = () => {
        if (pathname === "/genres") {
            getFilters("/genres");
        } else if (pathname === "/tags") {
            getFilters("/tags");
        } else if (pathname === "/developers") {
            getFilters("/developers");
        } else if (pathname === "/platforms") {
            getFilters("/platforms");
        }
    };

    useEffect(() => {
        dispatch(setFilters({ filters: [] }));
        setPage(1);
        setDataEnd(false)
        setSmallData(false)
    }, [pathname]);

    useEffect(() => {
        handleQueryParams();
    }, [isBottom, smallData]);

    return (
        <>
            {contextHolder}
            <Row gutter={[24, 24]}>
                <Col xs={24}>
                    <Filters filters={filters} />
                </Col>
                <Col ref={bottomRef} xs={24}>
                    <Space
                        style={{
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        {loading && <Spin indicator={spinIcon} />}
                    </Space>
                </Col>
            </Row>
        </>
    );
}

export default FiltersPage;
