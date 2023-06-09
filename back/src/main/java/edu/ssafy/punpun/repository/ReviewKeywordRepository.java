package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.ReviewKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewKeywordRepository extends JpaRepository<ReviewKeyword, Long> {
}
