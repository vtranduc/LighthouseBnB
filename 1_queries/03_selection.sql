select properties.id, properties.title, properties.cost_per_night, avg(property_reviews.rating) as average_rating
from properties
join property_reviews on property_reviews.property_id = properties.id
where properties.active = true
and properties.city LIKE '%ancouv%'
group by properties.id
having avg(property_reviews.rating) >= 4
order by properties.cost_per_night
limit 10;


-- SELECT properties.*, avg(property_reviews.rating) as average_rating
-- FROM properties
-- JOIN property_reviews ON properties.id = property_id
-- WHERE city LIKE '%ancouv%'
-- GROUP BY properties.id
-- HAVING avg(property_reviews.rating) >= 4
-- ORDER BY cost_per_night
-- LIMIT 10;