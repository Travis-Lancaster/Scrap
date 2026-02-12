# QAQC Module

Quality Assurance/Quality Control system for gold exploration operations.

## Overview

The QAQC module provides industry-standard (NI 43-101 / JORC) quality control reporting for laboratory assay data, including:

- **Drill Hole Integration**: Traffic light status display in drill hole view
- **Global Dashboard**: Executive reporting with trend analysis
- **Standards Analysis**: Shewhart control charts for accuracy
- **Duplicate Analysis**: Scatter plots for precision assessment
- **Bias Monitoring**: Laboratory performance trends
- **Failure Management**: Active failure tracking and workflows

## Features

### 1. Drill Hole QAQC Tab

Located in: [`../drill-hole/sections/QaqcSection.tsx`](../drill-hole/sections/QaqcSection.tsx)

- **Traffic Light Status**: PASS (green), FAIL (red), PENDING (yellow)
- **Batch Validation**: Detailed QC sample inspection
- **Failed Samples Grid**: AG Grid with action buttons
- **Re-assay Workflow**: Request re-analysis for failed samples

### 2. Global Dashboard

Route: `/qaqc/dashboard`

Main View: [`./views/QaqcDashboardView.tsx`](./views/QaqcDashboardView.tsx)

**Three-Column Layout:**
- **Left (280px)**: Filter panel with saved filter sets
- **Center (60%)**: Tabbed charts (Standards, Duplicates, Trends)
- **Right (320px)**: Live failure log with action buttons

### 3. Chart Components

- **Shewhart Control Chart**: Time-series with ±2σ and ±3σ limits
- **Duplicate Scatter Plot**: Original vs duplicate with 1:1 line
- **Bias Trend Chart**: Monthly lab performance by Z-Score

## Architecture

### State Management

**Zustand Store**: [`./store/qaqc-store.ts`](./store/qaqc-store.ts)

```typescript
- filters: Current filter configuration
- chartData: Cached chart datasets
- failures: Active failure list
- filterSets: Saved filter configurations
```

### Data Flow

```
User Action → Update Store → Hook Refetches → Update Store → Components Re-render
```

**Example:**
```typescript
// Apply filters
useQaqcStore.getState().setFilters({ elements: ['Au'] });

// Hook auto-refetches
useQaqcChartData() → fetches from API → updates store

// Components read from store
const chartData = useQaqcStore(state => state.chartData);
```

### Custom Hooks

- [`useQaqcChartData`](./hooks/useQaqcChartData.ts): Fetches chart datasets
- [`useQaqcFailures`](./hooks/useQaqcFailures.ts): Fetches active failures
- [`useQaqcStatus`](../drill-hole/hooks/useQaqcStatus.ts): Drill hole status
- [`useQaqcValidation`](../drill-hole/hooks/useQaqcValidation.ts): Batch validation

## Components

### Drill Hole Components

Located in: [`../drill-hole/components/qaqc/`](../drill-hole/components/qaqc/)

- `QaqcStatusRibbon`: Traffic light indicator
- `QaqcBatchValidationDrawer`: Detailed validation view
- `QaqcBatchSummaryGrid`: AG Grid for batch summary
- `QaqcFailedSamplesGrid`: AG Grid for failed samples

### Dashboard Components

#### Filters

Located in: [`./components/filters/`](./components/filters/)

- `QaqcFilterPanel`: Main filter sidebar with all controls

#### Charts

Located in: [`./components/charts/`](./components/charts/)

- `QaqcShewhartChart`: Standards control chart (ECharts)
- `QaqcScatterChart`: Duplicate correlation plot (ECharts)
- `QaqcBiasChart`: Lab bias trends (ECharts)

#### Failure Log

Located in: [`./components/failure-log/`](./components/failure-log/)

- `QaqcFailureLog`: Right sidebar with active failures

## Backend Integration

### API Service

Service Layer: [`../../services/qaqcService.ts`](../../services/qaqcService.ts)

**Methods:**
```typescript
- getHoleStatus(collarId, element): Simple status for traffic light
- getHoleValidation(collarId, element): Detailed batch validation
- getChartData(filters): Three result sets (Shewhart, Scatter, Bias)
- getActiveFailures(element, labCode): Failure log data
- saveFilterSet(filterSet): Save filter configuration
- createReassayRequest(request): Request re-assay
- signOffFailure(batch, comments): Sign-off workflow
```

### Backend Endpoints

Expected API endpoints (from [`../../api/database`](../../api/database)):

```
POST /api/qaqc/hole-status           → sp_GetDrillHoleQAQCStatus
POST /api/qaqc/hole-validation       → sp_GetHoleValidation
POST /api/qaqc/chart-data            → sp_GetGlobalCharts
GET  /api/qaqc/active-failures       → Active failure query
POST /api/qaqc/filter-sets           → Save filter set
POST /api/qaqc/reassay-request       → Create re-assay request
POST /api/qaqc/sign-off              → Sign-off failure
```

## Usage

### Adding QAQC Tab to Drill Hole

In [`../drill-hole/views/DrillHoleDetailView.tsx`](../drill-hole/views/DrillHoleDetailView.tsx):

```typescript
import { QaqcSection } from '../sections/QaqcSection';
import { CheckCircleOutlined } from '@ant-design/icons';

// Add to tab configuration
{
  key: 'qaqc',
  label: 'QAQC',
  icon: <CheckCircleOutlined />,
  component: <QaqcSection />
}
```

### Accessing Dashboard

Add route in router configuration:

```typescript
{
  path: '/qaqc/dashboard',
  component: lazy(() => import('#src/pages/qaqc')),
  meta: {
    title: 'QAQC Dashboard',
    requiresAuth: true,
    permissions: ['canAccessQAQC']
  }
}
```

## File Structure

```
src/pages/qaqc/
├── index.tsx                          # Main entry point
├── README.md                          # This file
│
├── views/
│   ├── QaqcDashboardView.tsx         # Main dashboard view
│   └── index.ts
│
├── components/
│   ├── filters/
│   │   └── QaqcFilterPanel.tsx       # Filter sidebar
│   │
│   ├── charts/
│   │   ├── QaqcShewhartChart.tsx     # Control chart
│   │   ├── QaqcScatterChart.tsx      # Scatter plot
│   │   ├── QaqcBiasChart.tsx         # Bias chart
│   │   └── index.ts
│   │
│   └── failure-log/
│       ├── QaqcFailureLog.tsx        # Failure sidebar
│       └── index.ts
│
├── hooks/
│   ├── useQaqcChartData.ts           # Chart data fetching
│   ├── useQaqcFailures.ts            # Failure fetching
│   └── index.ts
│
├── store/
│   └── qaqc-store.ts                 # Zustand store
│
└── types/ (shared)
    └── ../../types/qaqc.ts           # TypeScript interfaces
```

## Development

### Running the Dashboard

```bash
# Start development server
npm run dev

# Navigate to
http://localhost:3000/qaqc/dashboard
```

### Testing

```bash
# Unit tests
npm test src/pages/qaqc

# Component tests
npm test QaqcShewhartChart
```

### Debugging

Enable console logging:

```typescript
console.log("[FLOW:qaqc-dashboard] [ACTION] User action");
```

Check store state in Redux DevTools:

```typescript
useQaqcStore.getState(); // View current state
```

## Best Practices

### Filters

- Apply filters explicitly with "Apply Filters" button
- Save commonly used filters as filter sets
- Use quick date buttons (30d, 90d, 1yr) for convenience

### Charts

- Click points on Shewhart chart to investigate failures
- Use zoom/pan on charts for detailed analysis
- Watch for red indicators (failures, high RPD, significant bias)

### Workflow

1. **Review Status**: Check traffic light in drill hole view
2. **Investigate**: Click "View Details" for batch validation
3. **Analyze**: View charts in global dashboard
4. **Take Action**: Request re-assay or sign-off failures
5. **Monitor**: Watch failure log for new issues

## Troubleshooting

### No Data Showing

- Check filters (date range, elements, labs)
- Verify backend API endpoints are working
- Check browser console for errors

### Charts Not Loading

- Ensure `echarts-for-react` is installed
- Check `useQaqcChartData` hook is fetching
- Verify data format matches TypeScript interfaces

### Filters Not Working

- Click "Apply Filters" button after changes
- Check Zustand store is updating
- Verify hook refetching on filter changes

## Performance

### Optimization

- Chart data cached in Zustand store
- Polling disabled by default (enable for failure log)
- Lazy loading for route splitting
- Efficient AG Grid rendering

### Monitoring

- Watch for slow chart renders (>1s)
- Monitor API response times
- Check memory usage with large datasets

## Future Enhancements

- [ ] Blank contamination timeline chart
- [ ] Small-multiples overview (all standards)
- [ ] Export to PDF/Excel
- [ ] Email notifications for critical failures
- [ ] Batch certification workflow
- [ ] Multi-element comparison charts
- [ ] Historical trend analysis
- [ ] Anomaly detection algorithms

## Support

For questions or issues:
- Check documentation in [`plans/qaqc-ux-specifications.md`](../../../plans/qaqc-ux-specifications.md)
- Review backend docs in [`.OLD_FOR_REF_ONLY/QAQC-plan/`](../../../.OLD_FOR_REF_ONLY/QAQC-plan/)
- Contact: QAQC Manager or Database Team
