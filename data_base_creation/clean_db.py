import sqlite3
import os

# Configuration de la base de données SQLite
DB_FILE = "english_vocab.db"

def clean_database():
    """
    Supprime les entrées de la base de données où la traduction française est manquante/non trouvée.
    """
    if not os.path.exists(DB_FILE):
        print(f"Erreur : Le fichier de base de données '{DB_FILE}' n'existe pas.")
        return

    print(f"Connexion à la base de données '{DB_FILE}'...")
    
    try:
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()

        # Compter le nombre de lignes à supprimer avant
        cursor.execute("SELECT COUNT(*) FROM WORDS WHERE word_fr = '[Traduction non trouvée]'")
        count_before = cursor.fetchone()[0]

        if count_before == 0:
            print("Aucune ligne à supprimer. La base de données est propre.")
        else:
            print(f"{count_before} ligne(s) trouvée(s) avec '[Traduction non trouvée]'. Suppression en cours...")
            
            # Suppression des lignes
            cursor.execute("DELETE FROM WORDS WHERE word_fr = '[Traduction non trouvée]'")
            connection.commit()
            
            print(f"{cursor.rowcount} ligne(s) supprimée(s) avec succès.")
            
            # Vérification (optionnel)
            cursor.execute("SELECT COUNT(*) FROM WORDS")
            count_total = cursor.fetchone()[0]
            print(f"Il reste {count_total} mots dans la base de données.")

    except sqlite3.Error as e:
        print(f"Erreur SQLite : {e}")
    finally:
        if connection:
            connection.close()
            print("Connexion à la base de données fermée.")

if __name__ == "__main__":
    clean_database()
