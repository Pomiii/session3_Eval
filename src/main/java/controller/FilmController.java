package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.Film;
import repository.FilmRepository;

@RestController
@RequestMapping("/api")
public class FilmController {
	
	
	@Autowired
	private FilmRepository filmRepo;
	
	@GetMapping("/bytitre/ {titre}")
	public ResponseEntity<?> byTitre(@PathVariable String titre) {
		List<Film> titres = null;
		titres = filmRepo.findByTitre(titre);
		return ResponseEntity.status(HttpStatus.CREATED).body(titres);
	}
	
	
}
