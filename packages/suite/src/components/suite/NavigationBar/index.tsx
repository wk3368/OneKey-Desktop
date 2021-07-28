import React, { useState, ComponentProps, Fragment } from 'react';
import DeviceSelector from './components/DeviceSelector';
import NavigationActions from './components/NavigationActions';
import { Icon, TrezorLogo } from '@trezor/components';
import { useSelector } from '@suite-hooks';
import { Dialog, Transition } from '@headlessui/react';
import { isDesktop } from '@suite/utils/suite/env';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

const NavigationBar = () => {
    const [opened, setOpened] = useState(false);
    const userThemeSettings = useSelector(state => state.suite.settings.theme);
    const isDarkModeEnabled = userThemeSettings.variant !== 'light';
    const [isCollapsed, setIsCollapsed] = useState(false);

    const closeMainNavigation = () => {
        setOpened(false);
    };

    return (
        <>
            {/* Header for mobile */}
            <div
                className={classNames(
                    'flex justify-between py-1 bg-white border-b border-gray-100 md:hidden dark:bg-gray-800 dark:border-gray-700',
                    { 'pt-8': isDesktop() },
                )}
            >
                {/* Device Selector */}
                <div className="pl-2 w-[160px]">
                    <DeviceSelector />
                </div>
                {/* Menu Button */}
                <button
                    className="p-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand lg:hidden"
                    onClick={() => setOpened(true)}
                    type="button"
                >
                    {/* TODO i18n */}
                    <span className="sr-only">Open sidebar</span>
                    <span className="w-6 h-6" aria-hidden="true">
                        <Icon
                            onClick={() => setOpened(!opened)}
                            icon="MENU"
                            size={24}
                            className="text-gray-500 dark:text-white/50"
                        />
                    </span>
                </button>
            </div>
            {/* Navigation for mobile */}
            <Transition.Root show={opened} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed inset-0 z-40 flex md:hidden"
                    open={opened}
                    onClose={setOpened}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75 dark:bg-black/50" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex flex-col flex-1 w-full max-w-xs px-4 pt-5 pb-4 bg-white dark:bg-gray-800">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 pt-2 -mr-12">
                                    <button
                                        className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:focus:ring-white/80"
                                        onClick={() => setOpened(false)}
                                        type="button"
                                    >
                                        {/* TODO i18n */}
                                        <span className="sr-only">Close sidebar</span>
                                        <span
                                            className="w-6 h-6 text-white dark:text-white/80"
                                            aria-hidden="true"
                                        >
                                            <Icon
                                                onClick={() => setOpened(!opened)}
                                                icon="CROSS"
                                                size={24}
                                            />
                                        </span>
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex items-center flex-shrink-0">
                                <TrezorLogo
                                    className="self-start pl-[6px]"
                                    type={
                                        `horizontal_${
                                            isDarkModeEnabled ? 'dark' : 'light'
                                        }` as ComponentProps<typeof TrezorLogo>['type']
                                    }
                                    height={27}
                                />
                            </div>
                            <div className="flex flex-col flex-1 h-0 overflow-y-auto">
                                <NavigationActions closeMainNavigation={closeMainNavigation} />
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
            {/* Navigation for desktop */}
            <div className="relative">
                <div
                    className={classNames(
                        'flex-col hidden px-4 overflow-x-hidden h-full pb-5 overflow-y-auto border-r border-gray-100 bg-gray-50 md:flex md:flex-shrink-0 dark:bg-gray-800 dark:border-gray-700',
                        isDesktop() ? 'pt-[48px]' : 'pt-5',
                        isCollapsed ? '' : 'w-64',
                    )}
                >
                    {/* Branding */}
                    <div className="flex items-center flex-shrink-0 pl-[6px]">
                        <TrezorLogo
                            className="self-start w-[27px] overflow-hidden"
                            type={
                                `horizontal_${
                                    isDarkModeEnabled ? 'dark' : 'light'
                                }` as ComponentProps<typeof TrezorLogo>['type']
                            }
                            height={27}
                        />
                    </div>
                    {/* Device Selector */}
                    <DeviceSelector isCollapsed={isCollapsed} />
                    {/* Links and controls */}
                    <NavigationActions isCollapsed={isCollapsed} />
                </div>
                {/* Toggle Button */}
                <div className="absolute top-0 bottom-0 right-0 z-10 translate-x-1/2">
                    <button
                        className="flex justify-center w-6 h-full group"
                        type="button"
                        onClick={() => setIsCollapsed(isCollapsed => !isCollapsed)}
                    >
                        <div className="w-0.5 h-full transition bg-transparent group-hover:bg-brand-500" />
                        <div
                            className={classNames(
                                'absolute p-1.5 bg-white border border-gray-200 rounded-full shadow-sm dark:bg-gray-900 dark:border-gray-700 opacity-0 transition scale-75 group-hover:opacity-100 group-hover:scale-100',
                                isDesktop() ? 'top-[44px]' : 'top-4',
                            )}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className={classNames('w-5 h-5 text-gray-400', {
                                    'rotate-180 translate-x-px': isCollapsed,
                                })}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default NavigationBar;
