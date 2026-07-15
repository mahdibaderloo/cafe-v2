package org.cafe.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardStatsDto {
    private Long totalOrders;
    private BigDecimal monthlySales;
    private String topProduct;
    private Long topProductCount;
    private BigDecimal averageOrderValue;
}