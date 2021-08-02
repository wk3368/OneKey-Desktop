/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useContext, useEffect } from 'react';
import { LayoutContext } from '@suite-components';

const PortfolioContainer: React.FC<{ menu: React.ReactNode }> = ({ menu }) => {
    const { setLayout } = useContext(LayoutContext);

    useEffect(() => {
        if (setLayout) setLayout('Portfolio', null, menu, true);
    }, [setLayout, menu]);

    return null;
};

export default PortfolioContainer;
