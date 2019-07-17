import { NgModule } from '@angular/core';
import { NbCardModule, NbListModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ECommerceChartsPanelComponent } from './charts-panel/charts-panel.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { ECommerceLegendChartComponent } from './legend-chart/legend-chart.component';

@NgModule({
  imports: [
    NbTabsetModule,
    NbCardModule,
    ThemeModule,
    NbListModule,
  ],
  declarations: [
    DashboardComponent,
    ECommerceChartsPanelComponent,
    ChartPanelSummaryComponent,
    ChartPanelHeaderComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    ECommerceLegendChartComponent,
  ],
})
export class DashboardModule { }
