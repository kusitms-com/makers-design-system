# Responsive Navigation Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden this branch's navigation/footer components against narrow widths, long labels, and variable page counts without changing the visual design for the current happy-path stories.

**Architecture:** Keep the existing component APIs and Tailwind-token style. Add defensive layout classes and small helper logic where the component currently assumes fixed content length. Prefer responsive overflow/windowing behavior inside each component instead of requiring every consumer to wrap it correctly.

**Tech Stack:** React, TypeScript, Tailwind CSS token classes, Vitest, Testing Library, Storybook.

---

## File Structure

- Modify: `packages/ui/src/components/Pagination/Pagination.tsx`
  - Add compact page windowing so `totalPages` does not render every page number.
  - Preserve `onPageChange(page: number)` and existing icon controls.
- Modify: `packages/ui/src/components/Pagination/Pagination.test.tsx`
  - Add tests for ellipsis/windowing and bounded rendered page count.
- Modify: `packages/ui/src/components/NavigationTab/NavigationTab.tsx`
  - Prevent long tab labels from overflowing fixed-width flex items.
- Modify: `packages/ui/src/components/NavigationTab/NavigationTab.test.tsx`
  - Add tests for text truncation classes on tab labels.
- Modify: `packages/ui/src/components/Header/Header.tsx`
  - Give the nav region `min-w-0` and controlled overflow/flex behavior.
- Modify: `packages/ui/src/components/HeaderNavigation/HeaderNavigation.tsx`
  - Allow nav labels to truncate inside constrained header width.
- Modify: `packages/ui/src/components/Header/Header.test.tsx`
  - Add tests for header nav overflow defense.
- Modify: `packages/ui/src/components/HeaderNavigation/HeaderNavigation.test.tsx`
  - Add tests for label truncation classes.
- Modify: `packages/ui/src/components/Footer/Footer.tsx`
  - Let desktop copyright wrap instead of forcing `whitespace-pre`.
- Modify: `packages/ui/src/components/Footer/Footer.test.tsx`
  - Add a test for desktop copyright wrapping.
- Modify: `packages/ui/src/components/HeaderMobile/HeaderMobile.tsx`
  - Let mobile menu item labels truncate within 320px-class widths.
- Modify: `packages/ui/src/components/HeaderMobile/HeaderMobile.test.tsx`
  - Add a test for mobile menu label overflow defense.
- Modify: `apps/docs/src/Pagination.stories.tsx`
  - Add a long pagination story to visually verify compact behavior.
- Modify: `apps/docs/src/NavigationTab.stories.tsx`
  - Add long label or narrow container story.
- Modify: `apps/docs/src/Header.stories.tsx`
  - Add constrained desktop header story.
- Modify: `apps/docs/src/Footer.stories.tsx`
  - Add long copyright/contact story.
- Modify: `apps/docs/src/HeaderMobile.stories.tsx`
  - Add long mobile menu item story.

---

### Task 1: Pagination Windowing

**Files:**
- Modify: `packages/ui/src/components/Pagination/Pagination.tsx`
- Test: `packages/ui/src/components/Pagination/Pagination.test.tsx`
- Docs: `apps/docs/src/Pagination.stories.tsx`

- [ ] **Step 1: Add failing tests for compact pagination**

Add these cases to `packages/ui/src/components/Pagination/Pagination.test.tsx`:

```tsx
it("renders a compact page window when total pages are large", () => {
  render(<Pagination currentPage={10} totalPages={20} />)

  expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "9" })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "10" })).toHaveAttribute(
    "aria-current",
    "page",
  )
  expect(screen.getByRole("button", { name: "11" })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "20" })).toBeInTheDocument()
  expect(screen.getAllByText("...")).toHaveLength(2)
})

it("does not render every page button for large totals", () => {
  render(<Pagination currentPage={10} totalPages={20} />)

  const numericButtons = screen
    .getAllByRole("button")
    .filter((button) => /^\d+$/.test(button.textContent ?? ""))

  expect(numericButtons).toHaveLength(5)
})
```

- [ ] **Step 2: Run pagination tests and verify failure**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/Pagination/Pagination.test.tsx
```

Expected: FAIL because all 20 page buttons are rendered and no ellipses exist.

- [ ] **Step 3: Implement compact page item generation**

In `packages/ui/src/components/Pagination/Pagination.tsx`, add a helper above `Pagination`:

```tsx
type PageItem = number | "ellipsis-start" | "ellipsis-end"

const getPageItems = (
  currentPage: number,
  totalPages: number,
): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const middleStart = Math.max(2, currentPage - 1)
  const middleEnd = Math.min(totalPages - 1, currentPage + 1)
  const items: PageItem[] = [1]

  if (middleStart > 2) {
    items.push("ellipsis-start")
  }

  for (let page = middleStart; page <= middleEnd; page += 1) {
    items.push(page)
  }

  if (middleEnd < totalPages - 1) {
    items.push("ellipsis-end")
  }

  items.push(totalPages)

  return items
}
```

Replace:

```tsx
const pages = Array.from({ length: safeTotalPages }, (_, i) => i + 1)
```

with:

```tsx
const pageItems = getPageItems(safeCurrentPage, safeTotalPages)
```

Replace the page map block with:

```tsx
{pageItems.map((pageItem) => {
  if (typeof pageItem !== "number") {
    return (
      <span
        key={pageItem}
        aria-hidden="true"
        className="font-sans text-body-16m text-label-disable"
      >
        ...
      </span>
    )
  }

  return (
    <button
      key={pageItem}
      type="button"
      className={cn(
        "whitespace-nowrap font-sans",
        pageItem === safeCurrentPage
          ? "text-body-16b text-label-normal"
          : "text-body-16m text-label-disable",
      )}
      onClick={() => handlePageChange(pageItem)}
      aria-current={pageItem === safeCurrentPage ? "page" : undefined}
    >
      {pageItem}
    </button>
  )
})}
```

- [ ] **Step 4: Run pagination tests and verify pass**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/Pagination/Pagination.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Add Storybook visual scenario**

In `apps/docs/src/Pagination.stories.tsx`, add:

```tsx
export const ManyPages: Story = {
  args: {
    currentPage: 10,
    totalPages: 20,
  },
}
```

- [ ] **Step 6: Commit pagination task**

Run:

```bash
git add packages/ui/src/components/Pagination/Pagination.tsx packages/ui/src/components/Pagination/Pagination.test.tsx apps/docs/src/Pagination.stories.tsx
git commit -m "fix: compact pagination page range"
```

---

### Task 2: NavigationTab Long Label Defense

**Files:**
- Modify: `packages/ui/src/components/NavigationTab/NavigationTab.tsx`
- Test: `packages/ui/src/components/NavigationTab/NavigationTab.test.tsx`
- Docs: `apps/docs/src/NavigationTab.stories.tsx`

- [ ] **Step 1: Add failing test for tab label truncation**

Add this test to `packages/ui/src/components/NavigationTab/NavigationTab.test.tsx`:

```tsx
it("constrains long tab labels inside the tab item", () => {
  render(<NavigationTabItem>Very long navigation tab label</NavigationTabItem>)

  expect(screen.getByText("Very long navigation tab label")).toHaveClass(
    "max-w-full",
    "overflow-hidden",
    "text-ellipsis",
  )
})
```

- [ ] **Step 2: Run NavigationTab tests and verify failure**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/NavigationTab/NavigationTab.test.tsx
```

Expected: FAIL because the span lacks truncation classes.

- [ ] **Step 3: Add truncation classes**

In `packages/ui/src/components/NavigationTab/NavigationTab.tsx`, change the label span class from:

```tsx
"whitespace-nowrap font-sans",
```

to:

```tsx
"max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-sans",
```

- [ ] **Step 4: Run NavigationTab tests and verify pass**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/NavigationTab/NavigationTab.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Add narrow Storybook scenario**

In `apps/docs/src/NavigationTab.stories.tsx`, add:

```tsx
export const NarrowLongLabels: Story = {
  render: () => (
    <div className="w-80 bg-fill-normal">
      <NavigationTab size="s">
        <NavigationTabItem active>아주 긴 탭 이름입니다</NavigationTabItem>
        <NavigationTabItem>두 번째 긴 탭 이름입니다</NavigationTabItem>
        <NavigationTabItem>세 번째</NavigationTabItem>
      </NavigationTab>
    </div>
  ),
}
```

- [ ] **Step 6: Commit NavigationTab task**

Run:

```bash
git add packages/ui/src/components/NavigationTab/NavigationTab.tsx packages/ui/src/components/NavigationTab/NavigationTab.test.tsx apps/docs/src/NavigationTab.stories.tsx
git commit -m "fix: constrain navigation tab labels"
```

---

### Task 3: Header and HeaderNavigation Overflow Defense

**Files:**
- Modify: `packages/ui/src/components/Header/Header.tsx`
- Modify: `packages/ui/src/components/HeaderNavigation/HeaderNavigation.tsx`
- Test: `packages/ui/src/components/Header/Header.test.tsx`
- Test: `packages/ui/src/components/HeaderNavigation/HeaderNavigation.test.tsx`
- Docs: `apps/docs/src/Header.stories.tsx`

- [ ] **Step 1: Add failing test for header nav container**

Add this test to `packages/ui/src/components/Header/Header.test.tsx`:

```tsx
it("constrains the desktop navigation region inside the header", () => {
  const { container } = render(
    <Header logo={<span>Logo</span>}>
      <HeaderNavigation>Long navigation label</HeaderNavigation>
    </Header>,
  )

  const nav = container.querySelector("nav")

  expect(nav).toHaveClass("min-w-0", "overflow-hidden")
})
```

- [ ] **Step 2: Add failing test for HeaderNavigation label truncation**

Add this test to `packages/ui/src/components/HeaderNavigation/HeaderNavigation.test.tsx`:

```tsx
it("constrains long labels in narrow header layouts", () => {
  render(<HeaderNavigation>Very long navigation label</HeaderNavigation>)

  expect(screen.getByRole("button", { name: "Very long navigation label" }))
    .toHaveClass("max-w-full", "overflow-hidden", "text-ellipsis")
})
```

- [ ] **Step 3: Run header tests and verify failure**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/Header/Header.test.tsx src/components/HeaderNavigation/HeaderNavigation.test.tsx
```

Expected: FAIL because `nav` and `HeaderNavigation` lack overflow defense classes.

- [ ] **Step 4: Constrain header nav region**

In `packages/ui/src/components/Header/Header.tsx`, change:

```tsx
<nav className="flex items-center gap-6">{children}</nav>
```

to:

```tsx
<nav className="flex min-w-0 items-center justify-end gap-6 overflow-hidden">
  {children}
</nav>
```

- [ ] **Step 5: Constrain HeaderNavigation labels**

In `packages/ui/src/components/HeaderNavigation/HeaderNavigation.tsx`, change:

```tsx
"flex items-center justify-center px-4 whitespace-nowrap",
```

to:

```tsx
"flex max-w-full items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-4",
```

- [ ] **Step 6: Run header tests and verify pass**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/Header/Header.test.tsx src/components/HeaderNavigation/HeaderNavigation.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Add constrained header Storybook scenario**

In `apps/docs/src/Header.stories.tsx`, add:

```tsx
export const ConstrainedDesktop: Story = {
  render: () => (
    <div className="mx-auto w-256 bg-fill-normal">
      <Header logo={<HeaderDesktopLogo />}>
        <HeaderNavigation href="#about">학회소개</HeaderNavigation>
        <HeaderNavigation href="#projects">아주 긴 프로젝트 메뉴</HeaderNavigation>
        <HeaderNavigation href="#archive">32기 아카이브</HeaderNavigation>
        <HeaderNavigation href="#review">후기</HeaderNavigation>
        <HeaderNavigation href="#recruiting">리크루팅</HeaderNavigation>
      </Header>
    </div>
  ),
}
```

- [ ] **Step 8: Commit header task**

Run:

```bash
git add packages/ui/src/components/Header/Header.tsx packages/ui/src/components/Header/Header.test.tsx packages/ui/src/components/HeaderNavigation/HeaderNavigation.tsx packages/ui/src/components/HeaderNavigation/HeaderNavigation.test.tsx apps/docs/src/Header.stories.tsx
git commit -m "fix: constrain header navigation overflow"
```

---

### Task 4: Footer Desktop Text Wrapping

**Files:**
- Modify: `packages/ui/src/components/Footer/Footer.tsx`
- Test: `packages/ui/src/components/Footer/Footer.test.tsx`
- Docs: `apps/docs/src/Footer.stories.tsx`

- [ ] **Step 1: Add failing test for desktop copyright wrapping**

Add this test to `packages/ui/src/components/Footer/Footer.test.tsx`:

```tsx
it("allows desktop copyright text to wrap inside its column", () => {
  render(
    <Footer
      logo={<span>Logo</span>}
      copyright="KUSITMS very long copyright text that should wrap in narrow layouts"
    />,
  )

  expect(
    screen.getByText(
      "KUSITMS very long copyright text that should wrap in narrow layouts",
    ),
  ).toHaveClass("whitespace-pre-wrap")
})
```

- [ ] **Step 2: Run Footer tests and verify failure**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/Footer/Footer.test.tsx
```

Expected: FAIL because desktop copyright uses `whitespace-pre`.

- [ ] **Step 3: Let desktop copyright wrap**

In `packages/ui/src/components/Footer/Footer.tsx`, change:

```tsx
<p className="whitespace-pre font-sans text-body-16sb text-label-normal">
```

to:

```tsx
<p className="whitespace-pre-wrap font-sans text-body-16sb text-label-normal">
```

- [ ] **Step 4: Run Footer tests and verify pass**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/Footer/Footer.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Add long desktop footer story**

In `apps/docs/src/Footer.stories.tsx`, add:

```tsx
export const DesktopLongContent: Story = {
  render: () => (
    <div className="w-full overflow-x-auto bg-fill-normal">
      <div className="mx-auto w-256">
        <Footer
          device="desktop"
          logo={<FooterDesktopLogo />}
          bylawsHref="https://example.com/bylaws"
          contactIcons={contactIcons}
          copyright={
            "KUSITMS (큐시즘, 한국대학생IT경영학회) 긴 저작권 문구 예시\n© 2023.KUSITMS. ALL rights reserved."
          }
        />
      </div>
    </div>
  ),
}
```

- [ ] **Step 6: Commit footer task**

Run:

```bash
git add packages/ui/src/components/Footer/Footer.tsx packages/ui/src/components/Footer/Footer.test.tsx apps/docs/src/Footer.stories.tsx
git commit -m "fix: allow desktop footer text wrapping"
```

---

### Task 5: HeaderMobileItem Label Overflow Defense

**Files:**
- Modify: `packages/ui/src/components/HeaderMobile/HeaderMobile.tsx`
- Test: `packages/ui/src/components/HeaderMobile/HeaderMobile.test.tsx`
- Docs: `apps/docs/src/HeaderMobile.stories.tsx`

- [ ] **Step 1: Add failing test for mobile item text truncation**

Add this test to `packages/ui/src/components/HeaderMobile/HeaderMobile.test.tsx` in the `HeaderMobileItem` describe block:

```tsx
it("constrains long mobile menu labels", () => {
  render(<HeaderMobileItem>Very long mobile navigation label</HeaderMobileItem>)

  expect(screen.getByText("Very long mobile navigation label")).toHaveClass(
    "overflow-hidden",
    "text-ellipsis",
  )
})
```

- [ ] **Step 2: Run HeaderMobile tests and verify failure**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/HeaderMobile/HeaderMobile.test.tsx
```

Expected: FAIL because the label has `whitespace-nowrap` but no overflow handling.

- [ ] **Step 3: Add mobile item truncation classes**

In `packages/ui/src/components/HeaderMobile/HeaderMobile.tsx`, change:

```tsx
<span className="w-full whitespace-nowrap text-center font-sans text-headline-20sb text-label-normal">
```

to:

```tsx
<span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-sans text-headline-20sb text-label-normal">
```

- [ ] **Step 4: Run HeaderMobile tests and verify pass**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/HeaderMobile/HeaderMobile.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Add long mobile item Storybook scenario**

In `apps/docs/src/HeaderMobile.stories.tsx`, add a story that uses the existing mobile wrapper pattern with a long label:

```tsx
export const LongMenuItem: Story = {
  render: () => (
    <div className="flex w-80 flex-col items-center">
      <HeaderMobile
        className="w-full"
        logo={<HeaderMobileLogo />}
        menuIcon={<ToggleOpenSIcon />}
        closeIcon={<ToggleOpenSIcon />}
        isOpen
      />
      <HeaderMobileMenu className="w-full" isOpen>
        <HeaderMobileItem>아주 긴 모바일 내비게이션 메뉴 이름</HeaderMobileItem>
      </HeaderMobileMenu>
    </div>
  ),
}
```

- [ ] **Step 6: Commit HeaderMobile task**

Run:

```bash
git add packages/ui/src/components/HeaderMobile/HeaderMobile.tsx packages/ui/src/components/HeaderMobile/HeaderMobile.test.tsx apps/docs/src/HeaderMobile.stories.tsx
git commit -m "fix: constrain mobile header item labels"
```

---

### Task 6: Final Verification

**Files:**
- Read: `packages/ui/package.json`
- Read: `apps/docs/package.json`

- [ ] **Step 1: Run target component tests**

Run:

```bash
pnpm --filter @kusitms.com/ui exec vitest run src/components/Footer/Footer.test.tsx src/components/Header/Header.test.tsx src/components/HeaderMobile/HeaderMobile.test.tsx src/components/HeaderNavigation/HeaderNavigation.test.tsx src/components/NavigationFilter/NavigationFilter.test.tsx src/components/NavigationTab/NavigationTab.test.tsx src/components/Pagination/Pagination.test.tsx
```

Expected: PASS with 7 test files.

- [ ] **Step 2: Run full UI tests**

Run:

```bash
pnpm --filter @kusitms.com/ui test -- --run
```

Expected: PASS after dependency state is fixed. If this still fails with unresolved `@radix-ui/react-accordion` or `@radix-ui/react-select`, run `pnpm install` and retry. If it still fails, inspect `packages/ui/package.json` dependencies before changing source.

- [ ] **Step 3: Run typecheck**

Run:

```bash
pnpm --filter @kusitms.com/ui typecheck
```

Expected: PASS.

- [ ] **Step 4: Run Storybook or docs dev server for visual check**

Run:

```bash
pnpm --filter docs storybook
```

Open the local Storybook URL and inspect:

- `Components/Pagination/ManyPages`
- `Components/NavigationTab/NarrowLongLabels`
- `Components/Header/ConstrainedDesktop`
- `Components/Footer/DesktopLongContent`
- `Components/HeaderMobile/LongMenuItem`

Expected: no horizontal page overflow, no overlapping text, no nav item collision, current happy-path stories unchanged.

- [ ] **Step 5: Commit final verification notes if any docs changed**

If only code and stories changed in prior tasks, no extra commit is required. If verification required package/dependency changes, commit them:

```bash
git add packages/ui/package.json pnpm-lock.yaml
git commit -m "fix: align ui test dependencies"
```

---

## Self-Review

**Spec coverage:** The plan covers every responsive risk found in the review: unbounded pagination, tab label overflow, desktop header overflow, desktop footer non-wrapping text, and mobile menu label overflow. `NavigationFilter` is intentionally left unchanged because it already uses mobile horizontal scrolling and desktop wrapping.

**Placeholder scan:** No placeholder tasks remain. Every code edit has exact file paths, exact replacement snippets, and verification commands.

**Type consistency:** The plan preserves existing public props. The only new type is local `PageItem` inside `Pagination.tsx`, and all page item usage is contained in the same task.
