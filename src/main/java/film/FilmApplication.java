package film;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import film.repository.FilmRepository;

@SpringBootApplication
public class FilmApplication implements CommandLineRunner{
	
	@Autowired
	private FilmRepository filmRepository;
	public static void main(String[] args) {
		SpringApplication.run(FilmApplication.class, args);		
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	

}