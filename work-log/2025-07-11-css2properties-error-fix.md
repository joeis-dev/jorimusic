## CSS2Properties Error Fix (Style Merging)

**Issue:**
The "Uncaught TypeError: CSS2Properties doesn't have an indexed property setter for '0'" error persisted, indicating that an array was still being passed to a style property expecting a single value. This issue was found in components where styles were merged using the array syntax `style={[styles.baseStyle, conditionalStyle]}`.

**Solution:**
Replaced the array-based style merging with object spread syntax to ensure that a single, valid style object is always passed to the `style` prop. This was applied to `SearchScreen.tsx`, `PlaylistDetailScreen.tsx`, `HomeScreen.tsx`, and `Sidebar.tsx`.

**Example Change (from `style={[styles.navItem, currentRouteName === 'Home' && styles.activeNavItem]}` to):**
```typescript
style={{ ...styles.navItem, ...(currentRouteName === 'Home' && styles.activeNavItem) }}
```
This ensures that if `currentRouteName === 'Home'` is false, `styles.activeNavItem` is not included in the spread, preventing `undefined` from being spread into the style object, which could lead to the error.

**Files Modified:**
- `frontend/src/screens/SearchScreen.tsx`
- `frontend/src/screens/PlaylistDetailScreen.tsx`
- `frontend/src/screens/HomeScreen.tsx`
- `frontend/src/components/Sidebar.tsx`