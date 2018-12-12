package repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import model.Film;

@Repository
public interface FilmRepository extends CrudRepository<Film, Integer> {

	
}
