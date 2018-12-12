package repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import model.Film;

public interface FilmRepository extends CrudRepository<Film, Integer> {

	public List<Film> findByTitre(String titre);
	
}
