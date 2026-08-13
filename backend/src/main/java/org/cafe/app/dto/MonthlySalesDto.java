package org.cafe.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlySalesDto {
        private int month;
        private String monthName;
        private BigDecimal sales;
}