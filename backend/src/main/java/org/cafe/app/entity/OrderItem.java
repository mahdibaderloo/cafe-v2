package org.cafe.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "order-items")
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order-id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "item-id")
    private Item item;

    private int count;
    private BigDecimal price;
}
