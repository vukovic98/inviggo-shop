package com.ns.inviggoshop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ns.inviggoshop.beans.Advertisement;
import com.ns.inviggoshop.beans.Category;

@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {

	@Query(value = "select * from advertisement where user_id = :user_id", nativeQuery = true)
	public Page<Advertisement> findMyAdds(Pageable pageRequest, @Param("user_id") long user_id);

	@Query(value = "select max(price) from advertisement", nativeQuery = true)
	public double findMaxPrice();

//	FILTER

	@Query(value = "select * from advertisement ad where lower(ad.name) like %:exp% and (ad.price between :min_price and :max_price) and ad.category = :category", nativeQuery = true)
	public Page<Advertisement> filterByAll(Pageable pageRequest, @Param("exp") String exp,
			@Param("min_price") double minPrice, @Param("max_price") double maxPrice,
			@Param("category") String category);

	@Query(value = "select * from advertisement ad where lower(ad.name) like %:exp% and (ad.price between :min_price and :max_price)", nativeQuery = true)
	public Page<Advertisement> filterByNameAndPrice(Pageable pageRequest, @Param("exp") String exp,
			@Param("min_price") double minPrice, @Param("max_price") double maxPrice);

//	FILTER - MY ADDS

	@Query(value = "select * from advertisement ad where lower(ad.name) like %:exp% and (ad.price between :min_price and :max_price) and ad.category = :category and user_id = :user_id", nativeQuery = true)
	public Page<Advertisement> filterMyAddsByAll(Pageable pageRequest, @Param("exp") String exp,
			@Param("min_price") double minPrice, @Param("max_price") double maxPrice,
			@Param("category") String category, @Param("user_id") long user_id);

	@Query(value = "select * from advertisement ad where lower(ad.name) like %:exp% and (ad.price between :min_price and :max_price) and user_id = :user_id", nativeQuery = true)
	public Page<Advertisement> filterMyAddssByNameAndPrice(Pageable pageRequest, @Param("exp") String exp,
			@Param("min_price") double minPrice, @Param("max_price") double maxPrice, @Param("user_id") long user_id);
}
