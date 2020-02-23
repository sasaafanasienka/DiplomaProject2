import "../src/styles/analytics.css";
import { AnalyticsRender } from "./blocks/graph/analyticsRender";

const analyticsRender = new AnalyticsRender();

analyticsRender._renderTitle();
analyticsRender._calculationForAxisDates();