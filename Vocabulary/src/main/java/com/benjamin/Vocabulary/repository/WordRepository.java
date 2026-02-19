package com.benjamin.Vocabulary.repository;

import com.benjamin.Vocabulary.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    
    List<Word> findByNote(Integer note);

    @Query(value = "SELECT * FROM WORDS ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Word findRandomWord();
}
