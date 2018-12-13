package film.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import film.model.Film;

public interface FilmRepository extends JpaRepository<Film, Integer> {

	
}
