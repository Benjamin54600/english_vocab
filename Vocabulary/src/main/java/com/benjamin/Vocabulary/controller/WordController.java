package com.benjamin.Vocabulary.controller;

import com.benjamin.Vocabulary.entity.Word;
import com.benjamin.Vocabulary.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/words")
@CrossOrigin(origins = "*") // Allow requests from frontend
public class WordController {

    @Autowired
    private WordRepository wordRepository;

    @GetMapping
    public List<Word> getAllWords(@RequestParam(required = false) Integer note) {
        if (note != null) {
            return wordRepository.findByNote(note);
        }
        return wordRepository.findAll();
    }

    @GetMapping("/random")
    public Word getRandomWord() {
        return wordRepository.findRandomWord();
    }

    @PutMapping("/{id}/note")
    public ResponseEntity<Word> updateNote(@PathVariable Long id, @RequestBody Integer newNote) {
        return wordRepository.findById(id)
                .map(word -> {
                    word.setNote(newNote);
                    return wordRepository.save(word);
                })
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Word> updateWord(@PathVariable Long id, @RequestBody Word wordDetails) {
        return wordRepository.findById(id)
                .map(word -> {
                    word.setWordEn(wordDetails.getWordEn());
                    word.setWordFr(wordDetails.getWordFr());
                    word.setExampleEn(wordDetails.getExampleEn());
                    return wordRepository.save(word);
                })
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
