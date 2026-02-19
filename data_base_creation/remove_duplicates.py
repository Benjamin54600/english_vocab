import sqlite3
import os

# Configuration de la base de données SQLite
DB_FILE = "english_vocab.db"

def remove_duplicates():
    """
    Supprime les doublons dans la base de données en se basant sur la colonne 'word_en'.
    Conserve l'entrée avec le plus petit ID (la première insérée).
    """
    if not os.path.exists(DB_FILE):
        print(f"Erreur : Le fichier de base de données '{DB_FILE}' n'existe pas.")
        return

    print(f"Connexion à la base de données '{DB_FILE}' pour suppression des doublons...")
    
    try:
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()

        # Compter le nombre total de mots avant nettoyage
        cursor.execute("SELECT COUNT(*) FROM WORDS")
        total_before = cursor.fetchone()[0]
        print(f"Nombre total de mots avant nettoyage : {total_before}")

        # 1. Identifier et supprimer les doublons
        # On garde l'ID minimum pour chaque word_en (le premier inséré)
        # et on supprime tous les autres ID qui ne sont pas dans cette liste d'ID minimums.
        delete_query = """
        DELETE FROM WORDS
        WHERE id NOT IN (
            SELECT MIN(id)
            FROM WORDS
            GROUP BY word_en
        );
        """
        
        cursor.execute(delete_query)
        deleted_count = cursor.rowcount
        connection.commit()

        print(f"Nombre de doublons supprimés : {deleted_count}")

        # Compter le nombre total de mots après nettoyage
        cursor.execute("SELECT COUNT(*) FROM WORDS")
        total_after = cursor.fetchone()[0]
        print(f"Nombre total de mots après nettoyage : {total_after}")

    except sqlite3.Error as e:
        print(f"Erreur SQLite : {e}")
    finally:
        if connection:
            connection.close()
            print("Connexion fermée.")

if __name__ == "__main__":
    remove_duplicates()
