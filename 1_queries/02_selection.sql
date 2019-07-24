-- select (end_date - start_date) as average_duration
-- from reservations;

-- SELECT avg(end_date - start_date) as average_duration
-- FROM reservations;

select avg(end_date - start_date)
from reservations;