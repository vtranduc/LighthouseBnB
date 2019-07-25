select properties.id, properties.title, properties.cost_per_night, reservations.start_date, avg(property_reviews.rating) as average_rating
from properties
join reservations on reservations.property_id = properties.id
join users on users.id = reservations.guest_id
join property_reviews on property_reviews.property_id = properties.id
where reservations.end_date < now()::date
and users.id = 1
group by properties.id, reservations.id
order by reservations.start_date;

-- select properties.id, properties.title, properties.cost_per_night, avg(property_reviews.rating) as average_rating
-- from properties
-- join reservations on reservations.property_id = properties.id
-- join users on users.id = reservations.guest_id
-- join property_reviews on property_reviews.property_id = properties.id
-- where reservations.end_date < now()::date
-- and users.id = 1
-- group by properties.id;


