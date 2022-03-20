import Chart, { Legend, Series, Label, Export } from "devextreme-react/chart";
import "devextreme/dist/css/dx.material.blue.light.css";
import { useEffect, useMemo, useState } from "react";
import data from "@/mock/users.json";
import Form, { SimpleItem, GroupItem } from "devextreme-react/form";

const chartTypes = ["spline", "bar", "line"];

const ChartView = () => {
    const [keys, setKeys] = useState<string[]>([]);

    const [chartData, setChartData] = useState({
        argumentField: "name",
        valueField: "age",
        tableName: 'table name',
        rotated: false,
        showLabel: false,
        showLegend: true,
        legendColor: "#c45",
        chartType: "bar",
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
            return columnName;
        });
    }, []);

    const setField = ({ dataField, value }: any) => {
        setChartData((prev) => ({ ...prev, [dataField]: value }));
    };

    useEffect(() => {
        columns && setKeys(columns);
    }, [columns]);

    return (
        <>
            <Form
                onFieldDataChanged={setField}
                formData={chartData}
                labelMode="floating"
                labelLocation="left"
                style={{ padding: '9px' }}
            >
                <GroupItem cssClass="first-group" colCount={6}>
                    <GroupItem colSpan={2}>
                        <SimpleItem
                            dataField="argumentField"
                            editorType="dxSelectBox"
                            editorOptions={{
                                items: keys.filter((x) => x !== chartData.valueField),
                            }}
                        />
                        <SimpleItem
                            dataField="valueField"
                            editorType="dxSelectBox"
                            editorOptions={{
                                items: keys.filter((x) => x !== chartData.argumentField),
                            }}
                        />

                    </GroupItem>

                    <GroupItem colSpan={3}>
                        <SimpleItem dataField="legendColor" editorType="dxColorBox" />
                        <SimpleItem
                            colSpan={2}
                            dataField="chartType"
                            editorType="dxSelectBox"
                            editorOptions={{ items: chartTypes }}
                        />

                    </GroupItem>
                    <GroupItem colSpan={1}>
                        <SimpleItem dataField="showLabel" editorType="dxCheckBox" />
                        <SimpleItem dataField="showLegend" editorType="dxCheckBox" />

                        <SimpleItem dataField="rotated" editorType="dxCheckBox" />
                    </GroupItem>
                </GroupItem>
                <GroupItem colCount={6}>

                    <SimpleItem colSpan={6}
                        dataField="tableName"
                    />


                </GroupItem>

            </Form>

            <Chart
                style={{ padding: '9px' }}
                title={chartData.tableName}
                dataSource={data}
                id="chart"
                rotated={chartData.rotated}
            >
                <Series
                    valueField={chartData.valueField}
                    argumentField={chartData.argumentField}
                    name="My oranges"
                    type={chartData.chartType}
                    color={chartData.legendColor}
                >
                    <Label visible={chartData.showLabel} backgroundColor="#c18e92" />
                </Series>

                <Legend visible={chartData.showLegend} />

                <Export enabled={true} />
            </Chart>
        </>
    );
};

export default ChartView;
