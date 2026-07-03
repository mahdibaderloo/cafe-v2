package org.cafe.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "items")
@Data
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private String description;
    private BigDecimal price;
    private String image;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
