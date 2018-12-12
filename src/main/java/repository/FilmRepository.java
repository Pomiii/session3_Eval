package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.Film;

@Repository
public interface FilmRepository extends JpaRepository<Film, Integer> {

	public List<Film> findByTitre(String titre);
	
}
