/*
  # Create Disney Movies Table

  1. New Tables
    - `disney_movies`
      - `id` (uuid, primary key) - Unique identifier for each movie
      - `title` (text, not null) - Movie title
      - `year` (integer, not null) - Release year
      - `description` (text) - Movie plot/description
      - `image_url` (text) - URL to movie poster image
      - `director` (text) - Movie director name
      - `rating` (decimal) - Movie rating out of 10
      - `genre` (text) - Movie genre
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `disney_movies` table
    - Add policy for public read access (anyone can view movies)
    - No write policies (data managed by admins only)
*/

CREATE TABLE IF NOT EXISTS disney_movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  year integer NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  director text DEFAULT '',
  rating decimal(3,1) DEFAULT 0,
  genre text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE disney_movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view Disney movies"
  ON disney_movies
  FOR SELECT
  USING (true);