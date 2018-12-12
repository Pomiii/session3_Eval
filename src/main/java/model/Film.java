package model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Film implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private String titre;
	private String Genre;
	private String real;
	private Integer duree;
	private Integer annee;
		
	public Film(String titre, String genre, String real, Integer duree, Integer annee) {
		super();
		this.titre = titre;
		Genre = genre;
		this.real = real;
		this.duree = duree;
		this.annee = annee;
	}
		
	public Film() {
		super();
	}

	@Override
	public String toString() {
		return "Film [titre=" + titre + ", Genre=" + Genre + ", real=" + real + ", duree=" + duree + ", annee=" + annee
				+ "]";
	}
		
	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}
	public String getGenre() {
		return Genre;
	}
	public void setGenre(String genre) {
		Genre = genre;
	}
	public String getReal() {
		return real;
	}
	public void setReal(String real) {
		this.real = real;
	}
	public Integer getDuree() {
		return duree;
	}
	public void setDuree(Integer duree) {
		this.duree = duree;
	}
	public Integer getAnnee() {
		return annee;
	}
	public void setAnnee(Integer annee) {
		this.annee = annee;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((Genre == null) ? 0 : Genre.hashCode());
		result = prime * result + ((annee == null) ? 0 : annee.hashCode());
		result = prime * result + ((duree == null) ? 0 : duree.hashCode());
		result = prime * result + ((real == null) ? 0 : real.hashCode());
		result = prime * result + ((titre == null) ? 0 : titre.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Film other = (Film) obj;
		if (Genre == null) {
			if (other.Genre != null)
				return false;
		} else if (!Genre.equals(other.Genre))
			return false;
		if (annee == null) {
			if (other.annee != null)
				return false;
		} else if (!annee.equals(other.annee))
			return false;
		if (duree == null) {
			if (other.duree != null)
				return false;
		} else if (!duree.equals(other.duree))
			return false;
		if (real == null) {
			if (other.real != null)
				return false;
		} else if (!real.equals(other.real))
			return false;
		if (titre == null) {
			if (other.titre != null)
				return false;
		} else if (!titre.equals(other.titre))
			return false;
		return true;
	}	

}
