import random
import string
import tkinter as tk
from tkinter import messagebox, ttk


WORDS = ["python", "developer", "coding", "challenge"]
MAX_ATTEMPTS = 6


class WordRescueGame:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title("Word Rescue")
        self.root.geometry("520x580")
        self.root.resizable(False, False)

        self.secret_word = ""
        self.display = []
        self.attempts = MAX_ATTEMPTS
        self.guessed_letters: set[str] = set()
        self.game_over = False
        self.letter_buttons: dict[str, tk.Button] = {}

        self._build_ui()
        self.new_game()

    def _build_ui(self) -> None:
        title = tk.Label(
            self.root,
            text="Word Rescue",
            font=("Segoe UI", 24, "bold"),
        )
        title.pack(pady=(18, 8))

        subtitle = tk.Label(
            self.root,
            text="Guess the hidden word one letter at a time.",
            font=("Segoe UI", 11),
            fg="#555555",
        )
        subtitle.pack(pady=(0, 14))

        self.word_label = tk.Label(
            self.root,
            text="",
            font=("Consolas", 28, "bold"),
            fg="#1565C0",
        )
        self.word_label.pack(pady=(0, 10))

        self.attempts_label = tk.Label(
            self.root,
            text="",
            font=("Segoe UI", 12),
            fg="#333333",
        )
        self.attempts_label.pack(pady=(0, 6))

        self.guessed_label = tk.Label(
            self.root,
            text="Guessed: ",
            font=("Segoe UI", 10),
            fg="#666666",
        )
        self.guessed_label.pack(pady=(0, 8))

        self.status_label = tk.Label(
            self.root,
            text="Click a letter to guess.",
            font=("Segoe UI", 11),
            fg="#333333",
        )
        self.status_label.pack(pady=(0, 12))

        letters_frame = ttk.LabelFrame(self.root, text="Pick a Letter", padding=12)
        letters_frame.pack(padx=20, pady=(0, 12))

        button_grid = tk.Frame(letters_frame)
        button_grid.pack()

        letters = list(string.ascii_uppercase)
        for index, letter in enumerate(letters):
            row = index // 7
            col = index % 7
            button = tk.Button(
                button_grid,
                text=letter,
                font=("Segoe UI", 11, "bold"),
                width=3,
                command=lambda l=letter.lower(): self.make_guess(l),
                bg="#F5F5F5",
                activebackground="#E0E0E0",
                relief=tk.RAISED,
            )
            button.grid(row=row, column=col, padx=3, pady=3)
            self.letter_buttons[letter.lower()] = button

        controls = tk.Frame(self.root)
        controls.pack(pady=(4, 0))

        new_game_button = tk.Button(
            controls,
            text="New Game",
            font=("Segoe UI", 11, "bold"),
            width=14,
            command=self.new_game,
            bg="#2196F3",
            fg="white",
            activebackground="#1e88e5",
            activeforeground="white",
            relief=tk.FLAT,
        )
        new_game_button.pack()

    def new_game(self) -> None:
        self.secret_word = random.choice(WORDS)
        self.display = ["_" for _ in self.secret_word]
        self.attempts = MAX_ATTEMPTS
        self.guessed_letters = set()
        self.game_over = False

        self._update_labels()
        self.status_label.config(text="Click a letter to guess.", fg="#333333")

        for button in self.letter_buttons.values():
            button.config(state=tk.NORMAL, bg="#F5F5F5")

    def _update_labels(self) -> None:
        self.word_label.config(text=" ".join(self.display))
        self.attempts_label.config(text=f"Attempts left: {self.attempts}")

        if self.guessed_letters:
            guessed_text = ", ".join(sorted(self.guessed_letters))
        else:
            guessed_text = "none"
        self.guessed_label.config(text=f"Guessed: {guessed_text}")

    def make_guess(self, letter: str) -> None:
        if self.game_over or letter in self.guessed_letters:
            return

        self.guessed_letters.add(letter)
        self.letter_buttons[letter].config(state=tk.DISABLED, bg="#E0E0E0")

        if letter in self.secret_word:
            for i, char in enumerate(self.secret_word):
                if char == letter:
                    self.display[i] = letter
            self.status_label.config(text="Good guess!", fg="#2E7D32")
        else:
            self.attempts -= 1
            self.status_label.config(
                text=f"Incorrect! {self.attempts} attempts left.",
                fg="#D32F2F",
            )

        self._update_labels()

        if "_" not in self.display:
            self.end_game(won=True)
        elif self.attempts == 0:
            self.end_game(won=False)

    def end_game(self, won: bool) -> None:
        self.game_over = True
        self.word_label.config(text=" ".join(self.secret_word))

        for button in self.letter_buttons.values():
            button.config(state=tk.DISABLED)

        if won:
            self.status_label.config(text="You rescued the word!", fg="#2E7D32")
            messagebox.showinfo(
                "You Win!",
                f"Congrats! You found the word: {self.secret_word}",
            )
        else:
            self.status_label.config(text="Game over!", fg="#D32F2F")
            messagebox.showinfo(
                "Game Over",
                f"You ran out of attempts. The word was: {self.secret_word}",
            )


def main() -> None:
    root = tk.Tk()
    WordRescueGame(root)
    root.mainloop()


if __name__ == "__main__":
    main()
