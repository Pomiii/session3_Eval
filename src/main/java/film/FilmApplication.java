package film;


import java.util.Arrays;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import model.Film;
import repository.FilmRepository;



@SpringBootApplication
public class FilmApplication implements CommandLineRunner{
	
	@Autowired
	private FilmRepository filmRepository;
	

	public static void main(String[] args) {
		SpringApplication.run(FilmApplication.class, args);		
	}
	
	@Override
	public void run(String... args) throws Exception {	
		// Clean up Database Tables
		filmRepository.deleteAllInBatch();
		
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
		
		filmRepository.saveAll(films);
		
		
	}
}