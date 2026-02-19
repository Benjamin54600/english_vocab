package com.benjamin.Vocabulary.controller;

import com.benjamin.Vocabulary.repository.WordRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseCheck {

    @Bean
    CommandLineRunner checkDatabase(WordRepository repository) {
        return args -> {
            long count = repository.count();
            System.out.println("------------------------------------------------");
            System.out.println("CONNEXION REUSSIE : La base de données contient actuellement " + count + " mots.");
            System.out.println("------------------------------------------------");
        };
    }
}
