import { DataGrid, Form } from "devextreme-react";
import Button from "devextreme-react/button";
import Chart, {
    ArgumentAxis,
    Legend,
    Series,
    ValueAxis,
    Label,
    Export,
    Tick,
    CommonSeriesSettings,
} from "devextreme-react/chart";
import ArrayStore from "devextreme/data/array_store";
import "devextreme/dist/css/dx.material.blue.light.css";
import {
    useEffect,
    useMemo,
    useState,
} from "react";
import data from "@/mock/users.json";
import { Border } from "devextreme-react/bar-gauge";
import styled from "styled-components";
import { FieldsSelector } from "./FieldsSelector";



const FieldsSelectorWrap = styled.div`
  width: 100%;
  max-height: 220px;
  padding: 5px;
  display: flex;
  background: #f7f3f3;
`;

const ChartView = () => {
    const [keys, setKeys] = useState<string[]>([]);

    const [chartData, setChartData] = useState({
        argumentField: "name",
        valueField: "age",
        rotated: false,
    });

    const columns = useMemo(() => {
        const uniqueColumnNames = data.reduce((acc, post) => {
            for (const key of Object.keys(post)) {
                if (
                    !(key in acc) &&
                    typeof post[key as keyof typeof post] !== "object"
                ) {
                    acc[key] = true;
                }
            }

            return acc;
        }, {} as Record<string, boolean>);

        return Object.keys(uniqueColumnNames).map((columnName) => {
            return columnName

        });
    }, []);

    const setField = (value: string, key: string) => {
        setChartData({ ...chartData, [key]: value });
    };

    useEffect(() => {
        columns && setKeys(columns);
    }, [columns]);


    return (
        <>

            <FieldsSelectorWrap>
                <FieldsSelector
                    fieldKey="argumentField"
                    exceptKey="valueField"
                    chartData={chartData}
                    setField={setField}
                    fields={keys}
                />
                <FieldsSelector
                    fieldKey="valueField"
                    exceptKey="argumentField"
                    chartData={chartData}
                    setField={setField}
                    fields={keys}
                />

            </FieldsSelectorWrap>
            <Chart title="wow" dataSource={data} id="chart">
                
                <Series
                    valueField={chartData.valueField}
                    argumentField={chartData.argumentField}
                    name="My oranges"
                    type="bar"
                    color="#ffaa66"
                />

                <Legend visible={false} />

                <Export enabled={true} />
            </Chart>
        </>
    );
};

export default ChartView;
