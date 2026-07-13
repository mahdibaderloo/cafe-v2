package org.cafe.app.service;

import lombok.RequiredArgsConstructor;
import org.cafe.app.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

}
