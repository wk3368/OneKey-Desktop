import React from 'react';
import { SelectBar, SelectBarProps } from '@trezor/components';
import { useGraph } from '@suite-hooks';
import { GraphScale } from '@wallet-types/graph';

const GraphScaleDropdownItem = (props: Omit<SelectBarProps<GraphScale>, 'options'>) => {
    const { selectedView, setSelectedView } = useGraph();

    return (
        <SelectBar
            onChange={setSelectedView}
            selectedOption={selectedView}
            options={[
                { label: '线性', value: 'linear' },
                { label: '对数', value: 'log' },
            ]}
            {...props}
        />
    );
};

export default GraphScaleDropdownItem;
