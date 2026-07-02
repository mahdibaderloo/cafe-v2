package org.cafe.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "items")
public class items {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private String description;
    private int price;
    private String image;
}
