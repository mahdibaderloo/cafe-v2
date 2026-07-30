package org.cafe.app.repository;

import org.cafe.app.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT COUNT(o) FROM Order o")
    Long countTotalOrders();

    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o " +
            "WHERE o.createdAt BETWEEN :startDate AND :endDate")
    BigDecimal sumSalesBetweenDates(@Param("startDate") LocalDateTime startDate,
                                    @Param("endDate") LocalDateTime endDate);

    @Query("SELECT i.productName, COUNT(oi) as count " +
            "FROM OrderItem oi JOIN oi.item i " +
            "GROUP BY i.productName " +
            "ORDER BY count DESC " +
            "LIMIT 1")
    List<Object[]> findTopProduct();

    List<Order> findTop5ByOrderByIdDesc();
}
