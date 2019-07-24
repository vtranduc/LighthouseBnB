select properties.city, count(reservations) as total_reservations
from properties
join reservations on reservations.property_id = properties.id
group by properties.city
order by total_reservations desc;
