package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Film;
import repository.FilmRepository;

@RestController
@RequestMapping("/api")
public class FilmController {

	@Autowired
	private FilmRepository filmRepository;
	
	
	
	public FilmController() {}

	/**
	 * Retourner tous les films
	 * @return
	 */
	@RequestMapping(value = "/film", method = RequestMethod.GET)
	public ResponseEntity<?> getAllFilms(){
		List<Film> listeFilms = null;
		try {
			listeFilms = filmRepository.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeFilms);
	}
	
	/**
	 * rechercher
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/film/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getFilm(@PathVariable Integer id){
		Film film = null;
				
		try {
			film = filmRepository.findById(id);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(film == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(film);
	}
	
	/**
	 * ajouter
	 * @param film
	 * @return
	 */
	@RequestMapping(value = "/film", method = RequestMethod.POST)
	public ResponseEntity<?> addApprenant(@RequestBody Film film){
		Film resultFilm = null;
		String genre = film.getGenre();
		if((genre == null) || (genre.isEmpty()))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le prénom !");
		
		String titre = film.getTitre();
		if((titre == null) || (titre.isEmpty()))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom !");
		
		try {
			resultFilm = filmRepository.saveAndFlush(film);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.CREATED).body(resultFilm);
	}
	
	/**
	 * Mettre à jour
	 * @param film
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/film/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateFilm(@RequestBody Film film,@PathVariable Integer id) throws Exception {
		Film resultFilm = null;
		String genre = film.getGenre();
		if((genre == null) || (genre.isEmpty()))
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le prénom !");
		
		String titre = film.getTitre();
		if((titre == null) || (titre.isEmpty()))
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le titre !");
		
		try {
			resultFilm = filmRepository.save(film);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(resultFilm);
	}
	
	/**
	 * Détruire
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/film/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteFilm(@PathVariable Integer id){
		try {
		filmRepository.deleteById(id);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
}
	/**
	 * public FilmInsert() {
		// Clean up Database Tables
		filmRepo.deleteAllInBatch();
		
		// Create a film instance
		Film film1 = new Film(1,"La chèvre", "comédie", "Francis VEBER", 95, 1981);
		Film film2 = new Film(2,"Gravity", "aventure", "Alfonso CUARON", 90, 2013);
		Film film3 = new Film(3,"Le pont de la rivière Kwai", "guerre", "David LEAN", 161, 1957);
		Film film4 = new Film(4,"Les tontons flingueurs", "comédie", "George LAUTNER", 105, 1963);
		Film film5 = new Film(5,"Avatar", "science fiction", "James CAMERON", 162, 2009);
		Film film6 = new Film(6,"Le passage", "fantastique", "René MANZOR", 100, 1984);
		Film film7 = new Film(7,"Les anges gardiens", "comédie", "Jean Marie POIRE", 110, 1995);
		Film film8 = new Film(8,"Un témoin dans la ville", "policier", "Edouard MOLINARO", 90, 1959);
		Film film9 = new Film(9,"Le petit monde de Don Camillo", "comédie", "Julier DUVIVIER", 107, 1951);
		Film film10 = new Film(10,"Un taxi pour TOBROUK", "guerre", "Deny DE LA PATELIERE", 99, 1961);

		Collection<Film> films = Arrays.asList(film1, film2, film3, film4, film5, film6, film7, film8, film9, film10);
		
		filmRepo.saveAll(films);
		
		
	}*/
	
}
