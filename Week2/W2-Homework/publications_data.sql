USE authorsdb;

  INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
VALUES
  ('Alice', 'University X', '1990-01-15', 25, 'Female', 2),
  ('Bob', 'University Y', '1985-05-20', 30, 'Male', NULL),
  ('Charlie', 'University Z', '1992-11-10', 22, 'Male', NULL),
  ('Diana', 'University X', '1988-07-03', 27, 'Female', 4),
  ('Eve', 'University Y', '1995-03-25', 18, 'Female', NULL),
  ('Frank', 'University Z', '1987-09-12', 21, 'Male', NULL),
  ('Grace', 'University X', '1993-08-08', 26, 'Female', 2),
  ('Harry', 'University Y', '1991-04-30', 23, 'Male', NULL),
  ('Ivy', 'University Z', '1989-10-05', 20, 'Female', NULL),
  ('Jack', 'University X', '1996-02-18', 29, 'Male', 2),
  ('Karen', 'University Y', '1986-06-22', 24, 'Female', NULL),
  ('Leo', 'University Z', '1994-12-15', 28, 'Male', NULL),
  ('Mary', 'University X', '1984-04-05', 19, 'Female', 2),
  ('Nathan', 'University Y', '1997-07-20', 17, 'Male', NULL),
  ('Olivia', 'University Z', '1998-09-28', 16, 'Female', NULL);

INSERT INTO research_papers (paper_title, conference, publish_date)
VALUES
    ('Paper 1', 'Conference A', '2023-05-15'),
    ('Paper 2', 'Conference B', '2023-06-20'),
    ('Paper 3', 'Conference A', '2023-07-25'),
    ('Paper 4', 'Conference C', '2023-08-30'),
    ('Paper 5', 'Conference B', '2023-09-05'),
    ('Paper 6', 'Conference C', '2023-10-10'),
    ('Paper 7', 'Conference A', '2023-11-15'),
    ('Paper 8', 'Conference B', '2023-12-20'),
    ('Paper 9', 'Conference C', '2024-01-25'),
    ('Paper 10', 'Conference A', '2024-02-28'),
    ('Paper 11', 'Conference B', '2024-03-05'),
    ('Paper 12', 'Conference C', '2024-04-10'),
    ('Paper 13', 'Conference A', '2024-05-15'),
    ('Paper 14', 'Conference B', '2024-06-20'),
    ('Paper 15', 'Conference C', '2024-07-25'),
    ('Paper 16', 'Conference A', '2024-08-30'),
    ('Paper 17', 'Conference B', '2024-09-05'),
    ('Paper 18', 'Conference C', '2024-10-10'),
    ('Paper 19', 'Conference A', '2024-11-15'),
    ('Paper 20', 'Conference B', '2024-12-20'),
    ('Paper 21', 'Conference C', '2025-01-25'),
    ('Paper 22', 'Conference A', '2025-02-28'),
    ('Paper 23', 'Conference B', '2025-03-05'),
    ('Paper 24', 'Conference C', '2025-04-10'),
    ('Paper 25', 'Conference A', '2025-05-15'),
    ('Paper 26', 'Conference B', '2025-06-20'),
    ('Paper 27', 'Conference C', '2025-07-25'),
    ('Paper 28', 'Conference A', '2025-08-30'),
    ('Paper 29', 'Conference B', '2025-09-05'),
    ('Paper 30', 'Conference C', '2025-10-10');


-- UPDATE authors
-- SET mentor = 1  
-- WHERE author_name = 'Mary';

    
-- UPDATE authors
-- SET mentor = (SELECT author_id FROM authors WHERE author_name = 'Olivia')
-- WHERE author_name = 'Karen';
