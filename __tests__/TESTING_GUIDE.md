# Component Testing Documentation

## Overview
This document outlines the testing strategy and test cases for Phase 1 UI components.

## Test Framework
- **Jest**: JavaScript testing framework
- **React Testing Library**: For component testing
- **Testing Focus**: User interactions, accessibility, visual states

## Components Tested

### 1. Input Component (`components/ui/Input.tsx`)

#### Test Categories
- **Rendering Tests**: Default props, labels, error/helper text
- **Variant Tests**: default, filled, underline styles
- **Size Tests**: sm, md, lg sizes
- **Icon Tests**: Left/right icon rendering and padding
- **State Tests**: disabled, error, required, fullWidth
- **Accessibility Tests**: ARIA attributes, label association
- **Interaction Tests**: onChange, onFocus, onBlur handlers

#### Debug Points
- Component logs rendering with props in development mode
- Validates all variant styles applied correctly
- Confirms error states override normal styles

---

### 2. Textarea Component (`components/ui/Textarea.tsx`)

#### Test Categories
- **Rendering Tests**: Default props, labels, rows configuration
- **Variant Tests**: default, filled styles
- **Size Tests**: sm, md, lg sizes
- **State Tests**: disabled, error, required, fullWidth, minRows/maxRows
- **Accessibility Tests**: ARIA attributes, label association
- **Interaction Tests**: onChange, onFocus, onBlur handlers

#### Debug Points
- Component logs rendering with textarea-specific props
- Validates dynamic rows calculation (minRows, maxRows)
- Confirms resize-y functionality

---

### 3. Select Component (`components/ui/Select.tsx`)

#### Test Categories
- **Rendering Tests**: Default props, options rendering, placeholder
- **Variant Tests**: default, filled styles
- **Size Tests**: sm, md, lg sizes
- **Options Tests**: Rendering, disabled options, value selection
- **Icon Tests**: Chevron icon positioning
- **State Tests**: disabled, error, required, fullWidth
- **Accessibility Tests**: ARIA attributes, label association
- **Interaction Tests**: onChange handler, keyboard navigation

#### Debug Points
- Component logs options count
- Validates chevron icon positioning
- Confirms all options render correctly

---

### 4. Checkbox Component (`components/ui/Checkbox.tsx`)

#### Test Categories
- **Rendering Tests**: Default unchecked, checked states
- **Size Tests**: sm, md, lg sizes
- **State Tests**: disabled, error, checked/unchecked
- **Icon Tests**: Check icon rendering when checked
- **Accessibility Tests**: Hidden native checkbox, custom visual, label association
- **Interaction Tests**: onChange handler, keyboard support

#### Debug Points
- Component logs checked state
- Validates check icon appearance/size
- Confirms sr-only class on native checkbox

---

### 5. Card Component (`components/ui/Card.tsx`)

#### Test Categories
- **Rendering Tests**: Default rendering, children rendering
- **Variant Tests**: default, outlined, elevated, ghost styles
- **Padding Tests**: none, sm, md, lg padding
- **Hover Tests**: hoverable prop effects
- **Click Tests**: clickable cursor styling
- **Accessibility Tests**: Proper semantic markup

#### Debug Points
- Component logs variant and padding configuration
- Validates hover transitions
- Confirms shadow and border styles per variant

---

## Manual Testing Checklist

### Visual Testing (Browser)
- [ ] Visit `/dev` page in browser
- [ ] Verify all components render correctly
- [ ] Test responsive behavior at breakpoints (530px, 768px, 1024px, 1200px)
- [ ] Check hover states on interactive elements
- [ ] Validate focus states (tab navigation)
- [ ] Confirm error states display correctly

### Functional Testing
- [ ] Type in input fields - onChange fires
- [ ] Type in textarea - onChange fires
- [ ] Select dropdown options - onChange fires
- [ ] Click checkboxes - toggle works
- [ ] Test disabled states - no interaction possible
- [ ] Test required fields - asterisk displays

### Accessibility Testing
- [ ] Tab through all form elements - logical order
- [ ] Screen reader announces labels correctly
- [ ] Error messages read by screen reader
- [ ] Keyboard interactions work (Space/Enter for checkbox)
- [ ] Color contrast meets WCAG AA standards

### Browser Compatibility
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

---

## Debug Console Output

When visiting `/dev` page in development mode, console shows:

```
[ComponentShowcase] Mounted
[Input Component] Rendering Input with props: { variant, size, label, error, disabled }
[Textarea Component] Rendering Textarea with props: { variant, size, label, error, disabled, rows }
[Select Component] Rendering Select with props: { variant, size, label, error, disabled, optionsCount }
[Checkbox Component] Rendering Checkbox with props: { size, label, error, disabled, checked }
[Card Component] Rendering Card with props: { variant, padding, hoverable, clickable }
```

---

## Test Execution

### Running Tests (when Jest configured)
```bash
# Run all tests
npm test

# Run specific test file
npm test Input.test.ts

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Current Status
- ✅ Test structure defined
- ✅ Debug logging implemented in components
- ⏳ Jest configuration needed for execution
- ⏳ React Testing Library setup needed

---

## Next Steps

1. **Install Testing Dependencies**
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
   ```

2. **Configure Jest** (`jest.config.js`)
   - Setup Next.js compatibility
   - Configure test environment
   - Add coverage thresholds

3. **Write Actual Tests**
   - Convert test structures to real assertions
   - Add user event simulations
   - Test component integration

4. **CI/CD Integration**
   - Add test script to GitHub Actions
   - Enforce test passing before merge
   - Generate and publish coverage reports

---

## Component Implementation Summary

### ✅ Completed Components
1. **Input** - Text input with variants, sizes, icons, error states
2. **Textarea** - Multi-line input with variants and dynamic rows
3. **Select** - Dropdown with options, custom styling, chevron icon
4. **Checkbox** - Custom checkbox with check icon, sizes, states
5. **Card** - Container with variants, padding options, hover effects

### 🔍 Debug Features
- All components log rendering in development mode
- Props logged for debugging
- Console output format: `[ComponentName] message`

### 📊 Test Coverage Goals
- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Key user flows
- **Accessibility Tests**: WCAG AA compliance
- **Visual Regression**: Screenshot comparisons (future)
