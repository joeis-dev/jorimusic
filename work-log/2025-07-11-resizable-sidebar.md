## Resizable Sidebar Implementation

**Issue:**
The sidebar was taking up more than 50% of the screen on web/desktop, and there was a request to make it resizable and start at 10% of the screen width.

**Solution:**
Implemented a resizable sidebar using the `react-resizable-panels` library. The `MainLayout.tsx` component was modified to conditionally render `PanelGroup`, `Panel`, and `PanelResizeHandle` for web platforms. The sidebar's initial size is set to 10% of the screen width, and a resize handle is provided for user adjustment.

**Changes Made:**
1.  Installed `react-resizable-panels`.
2.  Modified `frontend/src/MainLayout.tsx`:
    *   Imported `PanelGroup`, `Panel`, and `PanelResizeHandle`.
    *   Added `Platform` import for conditional rendering.
    *   Wrapped the `Sidebar` and main content in `PanelGroup` with `direction="horizontal"` for web.
    *   Set `defaultSize={10}` and `minSize={5}` for the `Sidebar`'s `Panel`.
    *   Added a `PanelResizeHandle` between the `Sidebar` and the main content.
    *   Added a `resizeHandle` style to `StyleSheet.create` for the resize handle.
    *   Used conditional rendering (`Platform.OS === 'web'`) to apply the resizable layout only on web.

This allows the sidebar to be initially smaller and user-resizable on web/desktop, while maintaining the existing layout for other platforms.