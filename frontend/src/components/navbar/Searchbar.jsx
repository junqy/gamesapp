import React, { useState } from "react";
import { AutoComplete, message, Badge, Avatar, Space } from "antd";
import * as GamesService from "../../api/services/rawg-services/GamesService";
import { useNavigate } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";

const renderItem = (title, count, id, image) => ({
    value: String(id),
    label: (
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Space>
                {image ? (
                    <Avatar size="medium" shape="square" src={image} />
                ) : (
                    <Avatar size="medium" shape="square">
                        <FaGamepad />
                    </Avatar>
                )}
                {title}
            </Space>
            <>
                <Badge
                    count={count}
                    color={count > 74 ? "#52c41a" : count > 50 ? "#faad14" : ""}
                />
            </>
        </Space>
    ),
});

function Searchbar({ loading, setLoading }) {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const searchGames = async (searchText) => {
        setLoading(true);
        const response = await GamesService.getGames(1, "search", searchText);
        setLoading(false);
        if (!response.error) {
            const serializedArray = [];
            response.results?.map((item) =>
                serializedArray.push(
                    renderItem(
                        item.name,
                        item.metacritic,
                        item.id,
                        item.background_image
                    )
                )
            );
            setOptions(!searchText ? [] : serializedArray);
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const onSelect = (data) => {
        console.log(data);
        setValue("");
        navigate(`/game/${data}`);
    };

    const onChange = (data) => {
        setValue(data);
    };

    return (
        <>
            <AutoComplete
                allowClear
                value={value}
                options={options}
                style={{
                    width: "100%",
                }}
                onSelect={onSelect}
                onSearch={searchGames}
                onChange={onChange}
                placeholder={
                    <>
                        <SearchOutlined /> Szukaj gry...
                    </>
                }
            />
        </>
    );
}

export default Searchbar;
