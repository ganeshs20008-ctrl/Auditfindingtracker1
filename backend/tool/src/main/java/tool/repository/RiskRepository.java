package tool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tool.entity.Risk;

public interface RiskRepository extends JpaRepository<Risk, Long> {
}