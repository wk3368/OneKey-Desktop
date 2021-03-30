declare module '*.svg';

// declare module '*.svg' {
//     const content: any;
//     export const ReactComponent: any;
//     export default content;
// }

declare global {
    interface Window {
        $BLE_MODE?: boolean;
        $BLE_DATA?: Record<string, string>;
    }
}
