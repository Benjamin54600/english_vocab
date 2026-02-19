package com.benjamin.Vocabulary.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "WORDS")
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "word_en", nullable = false)
    private String wordEn;

    @Column(name = "word_fr", nullable = false)
    private String wordFr;

    @Column(name = "example_en")
    private String exampleEn;

    @Column(name = "note")
    private Integer note;

    public Word() {
    }

    public Word(String wordEn, String wordFr, String exampleEn, Integer note) {
        this.wordEn = wordEn;
        this.wordFr = wordFr;
        this.exampleEn = exampleEn;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWordEn() {
        return wordEn;
    }

    public void setWordEn(String wordEn) {
        this.wordEn = wordEn;
    }

    public String getWordFr() {
        return wordFr;
    }

    public void setWordFr(String wordFr) {
        this.wordFr = wordFr;
    }

    public String getExampleEn() {
        return exampleEn;
    }

    public void setExampleEn(String exampleEn) {
        this.exampleEn = exampleEn;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }
}
