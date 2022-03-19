import { SelectBox } from "devextreme-react";
import React from "react";
import styled from "styled-components";

const fieldVariants = {


}


const FieldVariants = {
    valueField: 'Value Field',
    argumentField: 'Argument Field'
}

type FieldVariantsName = keyof typeof FieldVariants;

const FieldSelectorColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 5px;
`

export const FieldsSelector = ({
    fields,
    fieldKey,
    setField, chartData, exceptKey
}: {
    fields: string[];
    fieldKey: FieldVariantsName;
    setField: (value: string, fieldKey: string) => void;
    chartData: any;
    exceptKey: string
}) => {
    return (
        <FieldSelectorColumn>
            <div className="dx-field-label">{FieldVariants[fieldKey]}</div>
            <SelectBox value={chartData[fieldKey]} onValueChanged={e => setField(e.value, fieldKey)
            } items={fields.filter(x => x !== chartData[exceptKey])} />

        </FieldSelectorColumn>
    );
};
